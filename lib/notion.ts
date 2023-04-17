import { Client } from '@notionhq/client';
import {
  EquationBlockObjectResponse,
  ImageBlockObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';

type Tag = { name: string; color: string };

type Properties = {
  title: string;
  tags: Array<Tag>;
  // description: string;
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

// n2m.setCustomTransformer('equation', async (block) => {
//   const { equation } = block as EquationBlockObjectResponse;
//   const expression = equation.expression;

//   return `
//   $$
//   ${expression}
//   $$`;
// });

const isPublishedProperty = process.env.NODE_ENV === 'development' ? 'Dev' : 'Published';

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

export const create = async (post: NotionPost): Promise<NotionPost['id']> => {
  const page = await notion.pages.create({
    parent: {
      database_id: process.env.DATABASE_ID!,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: post.properties.title,
            },
          },
        ],
      },
      Tags: {
        multi_select: post.properties.tags.map(({ name }) => ({ name })).sort((a, b) => a.name.localeCompare(b.name)),
      },
      // Description: {
      //   rich_text: [
      //     {
      //       text: {
      //         content: post.properties.description,
      //       },
      //     },
      //   ],
      // },
      Date: {
        date: {
          start: post.properties.date,
        },
      },
      Slug: {
        rich_text: [
          {
            text: {
              content: post.properties.slug,
            },
          },
        ],
      },
      Published: {
        checkbox: false,
      },
    },
  });

  return page.id;
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
      property: isPublishedProperty,
      checkbox: {
        equals: true,
      },
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
          property: isPublishedProperty,
          checkbox: {
            equals: true,
          },
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
          property: isPublishedProperty,
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  if (posts.length === 0) return null;

  const [post] = posts;
  const markdown = await getMarkdown(post.id);
  // const blocks = await getBlocks(post.id);

  return { ...post, markdown };
};
