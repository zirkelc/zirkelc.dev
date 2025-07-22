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
          as={`/${page.properties.type === 'Post' ? 'posts' : 'notes'}/${page.properties.slug}`}
          href={`/${page.properties.type === 'Post' ? 'posts' : 'notes'}/[slug]`}
          className="group grid py-0 px-1 hover:bg-black md:grid-cols-[100px_auto] md:gap-x-2"
        >
          <div className="flex items-center justify-start font-mono text-sm tracking-tighter text-gray-400 group-hover:text-white">
            <DateTime dateString={page.properties.date} />
          </div>
          <div className="mb-6 flex overflow-hidden md:mb-0">
            <span className="truncate font-mono text-sm font-bold text-black group-hover:text-white">
              {page.properties.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <p>No entries yet</p>
  );
}
