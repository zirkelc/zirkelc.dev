import type { NextApiRequest, NextApiResponse } from 'next';
import { getSinglePostBySlug } from '../../../lib/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  const isMarkdown = slug?.endsWith('.md');
  const cleanSlug = isMarkdown ? slug?.slice(0, -3) : slug;
  const post = await getSinglePostBySlug(cleanSlug);

  if (!post || !post.markdown) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const title = post.properties.title;
  const markdown = post.markdown.replace(/\n{2}/g, '\n');

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Content-Disposition', `inline; filename="${cleanSlug}.md"`);
  res.status(200).send(`# ${title}\n\n${markdown}`);
}
