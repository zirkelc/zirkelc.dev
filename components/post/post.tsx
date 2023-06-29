import { NotionPost } from '../../lib/notion';
import Markdown from '../controls/markdown';
import PostHeader from './post-header';

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
