import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Container from '../../components/container';
import PostList from '../../components/post-list';
import Tag from '../../components/tag';
import { getAllPosts, getAllPostsByTag, NotionPost } from '../../lib/notion';
import ErrorPage from 'next/error';

type Params = {
  tag: string;
};

type Props = {
  tag: string;
  posts: NotionPost[];
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const { tag } = params;
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
    fallback: false,
  };
};

export default function TagPage({ tag, posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

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
