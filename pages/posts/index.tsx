import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Meta from '../../components/layout/meta';
import NotionPageList from '../../components/post/notion-page-list';
import { getAllPosts, NotionHeader } from '../../lib/notion';

type Props = {
  pages: Array<NotionHeader>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getAllPosts();

  return {
    props: {
      pages: data,
    },
    revalidate: 60,
  };
};

export default function Posts({ pages }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title="Posts" />

      <section className="space-y-4">
        <h2 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">All posts</h2>
        <NotionPageList pages={pages} />
      </section>
    </>
  );
}
