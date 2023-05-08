import { NotionPost } from '../lib/notion';
import DateTime from './datetime';
import Markdown from './markdown';
import PostHeader from './post-header';
import Tag from './tag';

type Props = {
  post: NotionPost;
};

export default function Post({ post, post: { properties, markdown, blocks } }: Props) {
  return (
    <article>
      <PostHeader post={post} />

      <div className="prose mt-10">
        <Markdown markdown={markdown} />
      </div>
    </article>
  );
}
