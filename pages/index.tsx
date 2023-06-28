import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Meta from '../components/meta';
import PostList from '../components/post-list';
import { NotionPost, getAllPosts } from '../lib/notion';

type Props = {
  posts: NotionPost[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getAllPosts();

  return {
    props: {
      posts: data,
    },
    revalidate: 60,
  };
};

export default function HomePage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title={"Chris Zirkel's Blog"} />
      <PostList posts={posts} />
    </>
  );
}
