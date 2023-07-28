import { NotionPost } from '../../lib/notion';
import { Comments } from '../content/comments';
import DateTime from '../controls/datetime';
import Tag from './tag';

type Props = {
  post: NotionPost;
};

export default function PostHeader({ post: { properties } }: Props) {
  return (
    <header>
      <h1 className="mb-1 font-mono text-2xl font-bold">{properties.title}</h1>
      <p className="space-x-1 font-mono text-sm tracking-tighter text-gray-400">
        <DateTime dateString={properties.date} relative />
        {' // '}
        {properties.tags.map(({ name: tag }) => (
          <Tag key={tag} tag={tag} />
        ))}
        {properties.devArticleId ? (
          <>
            {' // '}
            <Comments devArticleId={properties.devArticleId} />
          </>
        ) : null}
      </p>
    </header>
  );
}
