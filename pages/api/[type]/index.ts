import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllNotes, getAllPosts } from '../../../lib/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query;

  if (type !== 'notes' && type !== 'posts') {
    return res.status(400).json({ error: 'Invalid type' });
  }

  const pages = type === 'notes' ? await getAllNotes() : type === 'posts' ? await getAllPosts() : [];

  if (!pages || pages.length === 0) {
    return res.status(404).json({ error: 'Pages not found' });
  }

  res.status(200).json(pages);
}
