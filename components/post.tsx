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
        <h1 className="mb-1 text-4xl font-bold">{properties.title}</h1>
        <p className="space-x-1 font-serif text-gray-400">
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
