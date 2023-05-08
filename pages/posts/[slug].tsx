import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Container from '../../components/container';
import Post from '../../components/post';
import { NotionPost, getAllPosts, getSinglePostBySlug } from '../../lib/notion';

type Params = {
  slug?: string;
};

type Props = {
  post: NotionPost;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const post = await getSinglePostBySlug(params?.slug);
  if (!post) return { notFound: true };

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
    fallback: 'blocking',
  };
};

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <Head>
        <title>{post.properties.title}</title>
        <meta property="og:title" content={post.properties.title} />
      </Head>
      <Post post={post} />
    </Container>
  );
}
