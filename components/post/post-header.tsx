import { DevArticle } from '../../lib/dev';
import { NotionPost } from '../../lib/notion';
import DateTime from '../controls/datetime';
import Link from '../controls/link';

type Props = {
  post: NotionPost;
  article?: DevArticle;
};

export default function PostHeader({ post, article }: Props) {
  const { properties } = post;

  const tags =
    properties.tags?.length > 0
      ? properties.tags.map(({ name: tag }) => (
          <Link key={tag} as={`/tags/${tag}`} href="/tags/[tag]">
            {`#${tag}`}
          </Link>
        ))
      : null;

  const comments = article ? (
    <Link asTab href={`${article.url}#comments`}>
      {article.comments_count === 0
        ? 'Comment on DEV'
        : `${article.comments_count} comment${article.comments_count > 1 ? 's' : ''}`}
    </Link>
  ) : null;

  return (
    <header>
      <h1 className="mb-1 font-mono text-2xl font-bold">{properties.title}</h1>
      <p className="space-x-1 font-mono text-sm tracking-tighter text-gray-400">
        <DateTime dateString={properties.date} relative />

        {tags ? (
          <>
            {' // '}
            {tags}
          </>
        ) : null}

        {comments ? (
          <>
            {' // '}
            {comments}
          </>
        ) : null}
      </p>
    </header>
  );
}
