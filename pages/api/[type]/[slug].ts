import type { NextApiRequest, NextApiResponse } from 'next';
import { getSingleNoteBySlug, getSinglePostBySlug } from '../../../lib/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, slug } = req.query;

  if (typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  if (type !== 'notes' && type !== 'posts') {
    return res.status(400).json({ error: 'Invalid type' });
  }

  const page = type === 'notes' ? await getSingleNoteBySlug(slug) : await getSinglePostBySlug(slug);

  if (!page || !page.markdown) {
    return res.status(404).json({ error: 'Page not found' });
  }

  res.status(200).json(page);
}
