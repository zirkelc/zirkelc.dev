import Link from 'next/link';
import { NotionPost } from '../lib/notion';
import DateTime from './datetime';

type Props = {
  posts: NotionPost[];
};

export default function PostList({ posts }: Props) {
  return posts.length ? (
    <ul>
      {posts.map((post) => (
        <li key={post.properties.slug} className="my-6 flex">
          <div className="w-1/4 pr-2 text-right font-serif text-gray-400">
            <DateTime dateString={post.properties.date} />
          </div>
          <div className="... w-3/4">
            <Link
              as={`/posts/${post.properties.slug}`}
              href="/posts/[slug]"
              className="truncate px-2 py-2 font-bold text-black transition-colors duration-200 hover:bg-black hover:text-white"
            >
              {post.properties.title}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>No posts yet</p>
  );
}
