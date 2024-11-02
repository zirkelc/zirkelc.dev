import Link from 'next/link';
import { Fragment } from 'react';
import { NotionPost } from '../../lib/notion';
import DateTime from '../controls/datetime';

type Props = {
  posts: NotionPost[];
};

export default function PostList({ posts }: Props) {
  return posts.length ? (
    <div className="grid grid-cols-1 md:gap-y-4">
      {posts.map((post) => (
        <Link
          key={post.properties.slug}
          as={`/posts/${post.properties.slug}`}
          href="/posts/[slug]"
          className="group grid py-0 px-1 hover:bg-black md:grid-cols-[100px_auto] md:gap-x-2"
        >
          <div className="flex items-center justify-start font-mono text-sm tracking-tighter text-gray-400 group-hover:text-white">
            <DateTime dateString={post.properties.date} />
          </div>
          <div className="mb-6 flex overflow-hidden md:mb-0">
            <span className="truncate font-mono text-sm font-bold text-black group-hover:text-white">
              {post.properties.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <p>No posts yet</p>
  );
}
