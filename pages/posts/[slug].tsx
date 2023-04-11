import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Container from '../../components/container';
import Post from '../../components/post';
import { getAllPosts, getSinglePostBySlug, NotionPost } from '../../lib/notion';

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
    fallback: false,
  };
};

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback && !post?.properties) {
    return <ErrorPage statusCode={404} />;
  }

  // router.back();

  return (
    <Container>
      <Head>
        <title>{post.properties.title}</title>
        <meta property="og:title" content={post.properties.title} />
      </Head>

      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <Post post={post} />
          {/* <hr /> */}
        </>
      )}
    </Container>
  );
}
