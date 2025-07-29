import type { NextApiRequest, NextApiResponse } from 'next';
import { getSinglePageBySlug } from '../../../lib/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: `Invalid slug: ${slug}` });
  }

  const page = await getSinglePageBySlug(slug);
  if (!page || !page.markdown) {
    return res.status(404).json({ error: 'Page not found' });
  }

  const content = `${page.properties?.title ? `# ${page.properties.title}` : ''} \n\n${page.markdown}`;

  res
    .status(200)
    .setHeader('Content-Type', 'text/markdown; charset=utf-8')
    .setHeader('Content-Disposition', `inline; filename="${slug}.md"`)
    .send(content);
}
