import { Client } from '@notionhq/client';
import {
  ImageBlockObjectResponse,
  LinkPreviewBlockObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import { getMetadata } from 'page-metadata-parser';
import domino from 'domino';

type Tag = { name: string; color: string };

type Properties = {
  title: string;
  tags: Array<Tag>;
  date: string;
  slug: string;
  type: 'Post' | 'Note' | null;
};

type Markdown = string;

export type NotionHeader = {
  id: string;
  properties: Properties;
};

export type NotionBody = {
  id: string;
  markdown: Markdown;
};

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

n2m.setCustomTransformer('image', async (block) => {
  const { image } = block as ImageBlockObjectResponse;
  const src = image.type === 'external' ? image.external.url : image.file.url;
  const text = image.caption?.length > 0 ? image.caption[0]?.plain_text : '';
  const href = image.caption?.length > 0 ? image.caption[0].href : '';

  return `
  <figure>
    <img src="${src}" alt=${text} />
    <figcaption>${href ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>` : text}</figcaption>
  </figure>`;
});

n2m.setCustomTransformer('link_preview', async (block) => {
  const { link_preview } = block as LinkPreviewBlockObjectResponse;
  const { url } = link_preview;

  const response = await fetch(url);
  const html = await response.text();
  const doc = domino.createWindow(html).document;
  const metadata = getMetadata(doc, url);

  console.log({ metadata });

  const preview = metadata.image
    ? `<img src="${metadata.image}" alt="${metadata.title}" />`
    : `<div style="display: flex; align-items: center; padding: 10px 10px">
        <img style="margin-right: 10px;" src="${metadata.icon}" />
        <span>${metadata.title}</span>
      </div>`;

  return `
  <div class="not-prose">
    <a href="${url}" target="_blank" rel="noopener noreferrer">
      <div style="border-radius: 5px; border-width: 1px; overflow: hidden;">
        ${preview}
      </div>
    </a>
  </div>`;
});

const isPublishedProperty = {
  property: `Is${process.env.NODE_ENV[0].toUpperCase() + process.env.NODE_ENV.slice(1)}`,
  checkbox: {
    equals: true,
  },
};

type Filter = Pick<QueryDatabaseParameters, 'filter'>;
const query = async (filter: Filter): Promise<Array<NotionHeader>> => {
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
  const type =
    'select' in page.properties.Type && page.properties.Type.select
      ? (page.properties.Type.select.name as 'Post' | 'Note')
      : 'Post';

  return {
    title,
    tags,
    date,
    slug,
    type,
  };
};

const getMarkdown = async (id: string): Promise<Markdown> => {
  const markdownBlocks = await n2m.pageToMarkdown(id);
  const markdown = n2m.toMarkdownString(markdownBlocks);

  // Remove double newlines
  return markdown.replace(/\n{2}/g, '\n');
};

export const getAllPosts = async (): Promise<Array<NotionHeader>> => {
  const posts = await query({
    filter: {
      and: [
        {
          ...isPublishedProperty,
        },
        {
          or: [
            {
              property: 'Type',
              select: {
                equals: 'post',
              },
            },
            {
              property: 'Type',
              select: {
                is_empty: true,
              },
            },
          ],
        },
      ],
    },
  });

  return posts ?? [];
};

export const getAllNotes = async (): Promise<Array<NotionHeader>> => {
  const notes = await query({
    filter: {
      and: [
        {
          ...isPublishedProperty,
        },
        {
          property: 'Type',
          select: {
            equals: 'Note',
          },
        },
      ],
    },
  });

  return notes ?? [];
};

export const getAllPostsByTag = async (tag: string): Promise<Array<NotionHeader>> => {
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

export const getAllPages = async (): Promise<Array<NotionHeader>> => {
  const [posts, notes] = await Promise.all([getAllPosts(), getAllNotes()]);
  const pages = [...posts, ...notes].sort(
    (a, b) => new Date(b.properties.date).getTime() - new Date(a.properties.date).getTime(),
  );

  return pages;
};

export const getAllPagesByType = async (type: 'Post' | 'Note'): Promise<Array<NotionHeader>> => {
  if (type === 'Post') {
    return await getAllPosts();
  } else if (type === 'Note') {
    return await getAllNotes();
  }
  return [];
};

export const getSinglePageBySlug = async (slug: string): Promise<(NotionHeader & NotionBody) | null> => {
  const pages = await query({
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

  if (pages.length === 0) {
    console.warn(`No page found with slug: ${slug}`);
    return null;
  }

  const [page] = pages;
  const markdown = await getMarkdown(page.id);

  return { ...page, markdown };
};

export const getSinglePostBySlug = async (slug: string): Promise<(NotionHeader & NotionBody) | null> => {
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
        {
          or: [
            {
              property: 'Type',
              select: {
                equals: 'Post',
              },
            },
            {
              property: 'Type',
              select: {
                is_empty: true,
              },
            },
          ],
        },
      ],
    },
  });

  if (posts.length === 0) {
    console.warn(`No post found with slug: ${slug}`);
    return null;
  }

  const [post] = posts;
  const markdown = await getMarkdown(post.id);

  return { ...post, markdown };
};

export const getSingleNoteBySlug = async (slug: string): Promise<(NotionHeader & NotionBody) | null> => {
  const notes = await query({
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
        {
          property: 'Type',
          select: {
            equals: 'Note',
          },
        },
      ],
    },
  });

  if (notes.length === 0) {
    console.warn(`No note found with slug: ${slug}`);
    return null;
  }

  const [note] = notes;
  const markdown = await getMarkdown(note.id);

  return { ...note, markdown };
};
