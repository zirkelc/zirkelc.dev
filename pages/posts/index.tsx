import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import PostList from '../../components/post/post-list';
import { NotionPost, getAllPosts } from '../../lib/notion';

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

export default function Posts({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PostList posts={posts} />;
}
