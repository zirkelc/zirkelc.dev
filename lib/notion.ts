import { Client } from '@notionhq/client';
import {
  ImageBlockObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';

type Tag = { name: string; color: string };

type Properties = {
  title: string;
  tags: Array<Tag>;
  date: string;
  slug: string;
};

type Markdown = string;

export type NotionPost = {
  id: string;
  properties: Properties;
  markdown?: Markdown;
  blocks?: any[];
};

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

n2m.setCustomTransformer('image', async (block) => {
  const { image } = block as ImageBlockObjectResponse;
  const src = image.type === 'external' ? image.external.url : image.file.url;
  const caption = image.caption?.length > 0 ? image.caption[0]?.plain_text : '';

  return `
  <figure>
    <img src="${src}" alt=${caption} />
    <figcaption>${caption}</figcaption>
  </figure>`;
});

const isPublishedProperty = {
  property: `is${process.env.NODE_ENV[0].toUpperCase() + process.env.NODE_ENV.slice(1)}`,
  checkbox: {
    equals: true,
  },
};

type Filter = Pick<QueryDatabaseParameters, 'filter'>;
const query = async (filter: Filter): Promise<NotionPost[]> => {
  const pages = await notion.databases.query({
    ...filter,
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
    database_id: process.env.DATABASE_ID!,
  });

  return pages.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map((page) => ({ id: page.id, properties: getProperties(page) }));
};

const getTags = (tags: MultiSelectPropertyItemObjectResponse['multi_select']) =>
  tags.map(({ name, color }) => ({ name, color })).sort((a, b) => a.name.localeCompare(b.name));

const getProperties = (page: PageObjectResponse): Properties => {
  const title = 'title' in page.properties.Name ? page.properties.Name.title[0].plain_text : '';
  const tags = 'multi_select' in page.properties.Tags ? getTags(page.properties.Tags.multi_select) : [];
  const date = 'date' in page.properties.Date ? page.properties.Date.date?.start || '' : '';
  const slug = 'rich_text' in page.properties.Slug ? page.properties.Slug.rich_text[0].plain_text : '';

  return {
    title,
    tags,
    date,
    slug,
  };
};

const getMarkdown = async (id: string): Promise<Markdown> => {
  const markdownBlocks = await n2m.pageToMarkdown(id);
  const markdown = n2m.toMarkdownString(markdownBlocks);

  return markdown;
};

export const getAllPosts = async (): Promise<NotionPost[]> => {
  const posts = await query({
    filter: {
      ...isPublishedProperty,
    },
  });

  return posts;
};

export const getAllPostsByTag = async (tag: string): Promise<NotionPost[]> => {
  const posts = await query({
    filter: {
      and: [
        {
          property: 'Tags',
          multi_select: {
            contains: tag,
          },
        },
        {
          ...isPublishedProperty,
        },
      ],
    },
  });

  return posts;
};

export const getSinglePostBySlug = async (slug: string): Promise<NotionPost | null> => {
  const posts = await query({
    filter: {
      and: [
        {
          property: 'Slug',
          formula: {
            string: {
              equals: slug,
            },
          },
        },
        {
          ...isPublishedProperty,
        },
      ],
    },
  });

  if (posts.length === 0) return null;

  const [post] = posts;
  const markdown = await getMarkdown(post.id);

  return { ...post, markdown };
};
