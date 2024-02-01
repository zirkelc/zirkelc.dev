import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Meta from '../components/layout/meta';
import PostList from '../components/post/post-list';
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
      <Meta title={"Chris Cooks's Blog"} />
      <PostList posts={posts} />
    </>
  );
}
