import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import NotionPageList from '../../components/post/notion-page-list';
import PostList from '../../components/post/notion-page-list';
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
  return <NotionPageList pages={pages} />;
}
