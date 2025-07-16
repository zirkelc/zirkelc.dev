import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts, getSinglePostBySlug } from '../../../lib/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = await getAllPosts();

  if (!posts) {
    return res.status(404).json({ error: 'Posts not found' });
  }

  res.status(200).json({
    posts,
  });
}
