import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Meta from '../../components/layout/meta';
import NotionPage from '../../components/post/notion-page';
import { getAllPosts, getSinglePageBySlug, NotionBody, NotionHeader } from '../../lib/notion';

type Params = {
  slug?: string;
};

type Props = {
  page: NotionHeader & NotionBody;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const slug = params?.slug;

  const page = await getSinglePageBySlug(slug);
  if (!page) return { notFound: true };

  return {
    props: {
      page,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllPosts();
  const paths = pages.map(({ properties: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default function PostPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title={page.properties.title} slug={page.properties.slug} />

      <NotionPage page={page} />
    </>
  );
}
