import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Container from '../../components/container';
import Post from '../../components/post';
import { getAllPosts, getSinglePostBySlug, NotionPost } from '../../lib/notion';

type Params = {
  slug: string;
};

type Props = {
  post: NotionPost;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  if (!params?.slug) return { notFound: true };

  const post = await getSinglePostBySlug(params?.slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(({ properties: { slug } }) => ({ params: { slug } }));

  return {
    paths,
    // fallback: 'blocking',
    fallback: false,
  };
};

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (!router.isFallback && !post.properties?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <Head>
        <title>{post.properties.title}</title>
        <meta property="og:title" content={post.properties.title} />
        <meta property="og:description" content={post.properties.description} />
      </Head>

      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <Post post={post} />
        </div>
      )}
    </Container>
  );
}
