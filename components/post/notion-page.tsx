import { NotionBody, NotionHeader } from '../../lib/notion';
import Markdown from '../controls/markdown';
import NotionPageHeader from './notion-page-header';
import PostHeader from './notion-page-header';

type Props = {
  page: NotionHeader & NotionBody;
};

export default function NotionPage({ page }: Props) {
  const { markdown } = page;

  return (
    <article>
      <NotionPageHeader page={page} />

      <div className="prose mt-10 font-mono">
        <Markdown markdown={markdown} />
      </div>
    </article>
  );
}
