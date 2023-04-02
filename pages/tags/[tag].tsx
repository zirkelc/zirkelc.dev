import Post from '../../components/post';
import { getAllPosts, getAllPostsByTag, NotionPost } from '../../lib/notion';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Container from '../../components/container';
import { useRouter } from 'next/router';
import PostList from '../../components/post-list';
import Tag from '../../components/tag';

type Params = {
  tag: string;
};

type Props = {
  tag: string;
  posts: NotionPost[];
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  if (!params?.tag) return { notFound: true };

  const tag = params.tag;
  const posts = await getAllPostsByTag(tag);

  return {
    props: {
      tag,
      posts,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(({ properties: { tags } }) => tags.map(({ name: tag }) => ({ params: { tag } }))).flat();

  return {
    paths,
    // fallback: 'blocking',
    fallback: false,
  };
};

export default function TagPage({ tag, posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }

  return (
    <Container>
      <Head>
        <title>Posts tagged with {tag}</title>
      </Head>

      <h1 className="mb-1 text-4xl font-bold">Posts tagged with {<Tag tag={tag} hover />}</h1>

      {router.isFallback ? <div>Loading…</div> : <PostList posts={posts} />}
    </Container>
  );
}
