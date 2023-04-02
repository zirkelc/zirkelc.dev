import { NotionPost } from '../lib/notion';
import DateTime from './datetime';
import Markdown from './markdown';
import Tag from './tag';

type Props = {
  post: NotionPost;
};

export default function Post({ post: { properties, markdown } }: Props) {
  return (
    <article className="">
      <header>
        <h1 className="text-4xl font-bold mb-1">{properties.title}</h1>
        <p className="text-gray-400 font-serif space-x-1">
          <DateTime dateString={properties.date} relative />
          {' /'}
          {properties.tags.map(({ name: tag }) => (
            <Tag key={tag} tag={tag} />
          ))}
        </p>
      </header>

      <div className="prose mt-10">
        <Markdown markdown={markdown} />
      </div>
    </article>
  );
}
