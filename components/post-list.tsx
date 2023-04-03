import Link from 'next/link';
import { Fragment } from 'react';
import { NotionPost } from '../lib/notion';
import DateTime from './datetime';

type Props = {
  posts: NotionPost[];
};

export default function PostList({ posts }: Props) {
  return posts.length ? (
    <div className="grid grid-cols-1 md:grid-cols-[160px_auto] md:gap-x-2 md:gap-y-4">
      {posts.map((post) => (
        <Fragment key={post.properties.slug}>
          <div className="font-serif text-gray-400 md:text-right">
            <DateTime dateString={post.properties.date} />
          </div>
          <div className="mb-6 flex md:mb-0">
            <Link
              as={`/posts/${post.properties.slug}`}
              href="/posts/[slug]"
              className="truncate font-bold text-black transition-colors duration-200 hover:bg-black hover:text-white md:p-2"
            >
              {post.properties.title}
            </Link>
          </div>
        </Fragment>
      ))}
    </div>
  ) : (
    <p>No posts yet</p>
  );
}
