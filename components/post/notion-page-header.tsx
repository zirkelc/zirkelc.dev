import { DevArticle } from '../../lib/dev';
import { NotionBody, NotionHeader } from '../../lib/notion';
import DateTime from '../controls/datetime';
import Link from '../controls/link';
import { useRouter } from 'next/router';

type Props = {
  page: NotionHeader;
  // article?: DevArticle;
};

export default function NotionPageHeader({ page }: Props) {
  const { properties } = page;
  const router = useRouter();

  // Removed tags
  // const tags =
  //   properties.tags?.length > 0
  //     ? properties.tags.map(({ name: tag }) => (
  //         <Link key={tag} as={`/tags/${tag}`} href="/tags/[tag]">
  //           {`#${tag}`}
  //         </Link>
  //       ))
  //     : null;

  // Removed comments
  // const comments = article ? (
  //   <Link asTab href={`${article.url}#comments`}>
  //     {article.comments_count === 0
  //       ? 'Comment on DEV'
  //       : `${article.comments_count} comment${article.comments_count > 1 ? 's' : ''}`}
  //   </Link>
  // ) : null;

  const showMarkdown = (asTab: boolean = false) => {
    const pathname = router.asPath.replace(`/${properties.slug}`, `/${properties.slug}.md`);

    if (asTab) {
      window.open(pathname, '_blank');
    } else {
      window.location.href = pathname;
    }
  };

  return (
    <header>
      <div className="mb-1 flex items-center justify-between">
        <h1 className="font-mono text-xl font-bold">{properties.title}</h1>
      </div>
      <div className="flex items-center justify-between">
        <p className="space-x-1 font-mono text-sm tracking-tighter text-gray-400">
          <DateTime dateString={properties.date} relative />

          {/* {tags ? (
          <>
            {' // '}
            {tags}
          </>
        ) : null} */}

          {/* {comments ? (
            <>
              {' // '}
              {comments}
            </>
          ) : null} */}
        </p>
        <button
          onClick={() => showMarkdown(true)}
          title="Show as markdown"
          className="rounded bg-gray-100 px-2 py-1 font-mono text-xs transition-colors  hover:bg-black hover:text-white"
        >
          {'.md'}
        </button>
      </div>
    </header>
  );
}
