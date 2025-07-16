import type { NextApiRequest, NextApiResponse } from 'next';
import { getSinglePostBySlug } from '../../../lib/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  const post = await getSinglePostBySlug(slug);

  if (!post || !post.markdown) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.status(200).json({
    post,
  });
}
