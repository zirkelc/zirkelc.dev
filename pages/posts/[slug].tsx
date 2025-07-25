import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Meta from '../../components/layout/meta';
import NotionPage from '../../components/post/notion-page';
import { NotionHeader, getAllPosts, getSinglePostBySlug } from '../../lib/notion';
import { DevArticle, getDevArticle } from '../../lib/dev';
import { NotionBody } from '../../lib/notion';

type Params = {
  slug?: string;
};

type Props = {
  page: NotionHeader & NotionBody;
  // article: DevArticle | null;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const slug = params?.slug;

  const page = await getSinglePostBySlug(slug);
  if (!page) return { notFound: true };

  // const article = await getDevArticle(post.properties.devArticleId);

  return {
    props: {
      page,
      // article,
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
      <Meta title={page.properties.title} />

      <NotionPage page={page} />
    </>
  );
}
