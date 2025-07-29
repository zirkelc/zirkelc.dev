import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllPages } from '../../../lib/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pages = await getAllPages();

  if (!pages || pages.length === 0) {
    return res.status(404).json({ error: 'Pages not found' });
  }

  const content = pages
    .map((item) => {
      return `- [${item.properties?.title ? item.properties.title : 'Untitled'}](${new URL(
        `/posts/${item.properties.slug}.md`,
        'https://zirkelc.dev',
      )})`;
    })
    .join('\n\n');

  res
    .status(200)
    .setHeader('Content-Type', 'text/markdown; charset=utf-8')
    .setHeader('Content-Disposition', `inline; filename="index.md"`)
    .send(content);
}
