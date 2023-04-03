import { Client } from '@notionhq/client';
import {
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
        multi_select: post.properties.tags.map(({ name }) => ({ name })).sort(),
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
  tags.map(({ name, color }) => ({ name, color }));

const getProperties = (page: PageObjectResponse): Properties => {
  const title = 'title' in page.properties.Name ? page.properties.Name.title[0].plain_text : '';
  const tags = 'multi_select' in page.properties.Tags ? getTags(page.properties.Tags.multi_select) : [];
  // const description =
  //   'rich_text' in page.properties.Description ? page.properties.Description.rich_text[0].plain_text : '';
  const date = 'date' in page.properties.Date ? page.properties.Date.date?.start || '' : '';
  const slug = 'rich_text' in page.properties.Slug ? page.properties.Slug.rich_text[0].plain_text : '';

  return {
    title,
    tags,
    // description,
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
      property: 'Published',
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
          property: 'Published',
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
          property: 'Published',
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
  const blocks = await getBlocks(post.id);

  return { ...post, markdown, blocks };
};

export const getBlocks = async (blockId) => {
  blockId = blockId.replaceAll('-', '');

  const { results } = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  // Fetches all child blocks recursively - be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = results.map(async (block) => {
    //@ts-ignore
    if (block.has_children) {
      const children = await getBlocks(block.id);
      return { ...block, children };
    }
    return block;
  });

  return await Promise.all(childBlocks).then((blocks) => {
    return blocks.reduce((acc, curr) => {
      if (curr.type === 'bulleted_list_item') {
        if (acc[acc.length - 1]?.type === 'bulleted_list') {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: 'bulleted_list',
            bulleted_list: { children: [curr] },
          });
        }
      } else if (curr.type === 'numbered_list_item') {
        if (acc[acc.length - 1]?.type === 'numbered_list') {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: getRandomInt(10 ** 99, 10 ** 100).toString(),
            type: 'numbered_list',
            numbered_list: { children: [curr] },
          });
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  });
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
