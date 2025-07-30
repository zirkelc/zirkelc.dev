import Link from 'next/link';
import { Fragment } from 'react';
import { NotionHeader } from '../../lib/notion';
import DateTime from '../controls/datetime';

type Props = {
  pages: Array<NotionHeader>;
};

export default function NotionPageList({ pages }: Props) {
  return pages.length ? (
    <div className="grid grid-cols-1 md:gap-y-4">
      {pages.map((page) => (
        <Link
          key={page.properties.slug}
          as={`/posts/${page.properties.slug}`}
          href={`/posts/[slug]`}
          className="group flex items-center py-1 px-1 hover:bg-black"
        >
          <span className="truncate font-mono text-sm font-bold text-black group-hover:text-white">
            {page.properties.title}
          </span>
          <div className="mx-3 min-w-[20px] flex-1 border-b-2 border-dotted border-gray-300 group-hover:border-white"></div>
          <span className="flex-shrink-0 font-mono text-sm tracking-tighter text-gray-400 group-hover:text-white">
            <DateTime dateString={page.properties.date} />
          </span>
        </Link>
      ))}
    </div>
  ) : (
    <p>No entries yet</p>
  );
}
