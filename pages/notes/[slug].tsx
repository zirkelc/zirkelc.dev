import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Meta from '../../components/layout/meta';
import NotionPage from '../../components/post/notion-page';
import { NotionBody, NotionHeader, getAllNotes, getSingleNoteBySlug } from '../../lib/notion';
import { DevArticle, getDevArticle } from '../../lib/dev';

type Params = {
  slug?: string;
};

type Props = {
  page: NotionHeader & NotionBody;
  // article: DevArticle | null;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const slug = params?.slug;

  const page = await getSingleNoteBySlug(slug);
  if (!page) return { notFound: true };

  // const article = await getDevArticle(post.properties.devArticleId);

  return {
    props: {
      page,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllNotes();
  const paths = pages.map(({ properties: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default function NotePage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title={page.properties.title} />

      <NotionPage page={page} />
    </>
  );
}
