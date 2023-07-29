import { DevArticle } from '../../lib/dev';
import { NotionPost } from '../../lib/notion';
import Markdown from '../controls/markdown';
import PostHeader from './post-header';

type Props = {
  post: NotionPost;
  article?: DevArticle;
};

export default function Post({ post, article }: Props) {
  const { markdown } = post;

  return (
    <article>
      <PostHeader post={post} article={article} />

      <div className="prose mt-10">
        <Markdown markdown={markdown} />
      </div>
    </article>
  );
}
