import Link from 'next/link';
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
          className="group -mx-2 flex items-center px-2 py-1 hover:bg-black dark:hover:bg-white"
        >
          <span className="truncate font-mono text-base font-bold text-black group-hover:text-white dark:text-white dark:group-hover:text-black">
            {page.properties.title}
          </span>
          <div className="mx-3 min-w-[20px] flex-1 border-b-2 border-dotted border-gray-300 group-hover:border-white dark:border-gray-700 dark:group-hover:border-black"></div>
          <span className="flex-shrink-0 font-mono text-base tracking-tighter text-gray-400 group-hover:text-white dark:text-gray-500 dark:group-hover:text-black">
            <DateTime dateString={page.properties.date} />
          </span>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-black dark:text-white">No entries yet</p>
  );
}
