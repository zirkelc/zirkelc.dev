import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Meta from '../../components/layout/meta';
import NotionPageList from '../../components/post/notion-page-list';
import PostList from '../../components/post/notion-page-list';
import { getAllNotes, NotionHeader } from '../../lib/notion';

type Props = {
  notes: Array<NotionHeader>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getAllNotes();

  return {
    props: {
      notes: data,
    },
    revalidate: 60,
  };
};

export default function NotesPage({ notes }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title="Notes - Chris Cooks's Blog" />
      <NotionPageList pages={notes} />
    </>
  );
}
