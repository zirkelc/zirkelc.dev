import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Meta from '../components/layout/meta';
import NotionPageList from '../components/post/notion-page-list';
import { getAllNotes, getAllPages, getAllPosts, NotionHeader } from '../lib/notion';

type Props = {
  pages: Array<NotionHeader>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pages = await getAllPages();

  return {
    props: {
      pages,
    },
    revalidate: 60,
  };
};

export default function HomePage({ pages }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title={"Chris Cooks's Blog"} />
      <NotionPageList pages={pages} />
    </>
  );
}
