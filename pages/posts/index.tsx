import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Container from '../../components/container';
import DateTime from '../../components/datetime';
import PostList from '../../components/post-list';
import { getAllPosts, getAllPostsByTag, NotionPost } from '../../lib/notion';

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
  return (
    <Container>
      <PostList posts={posts} />
    </Container>
  );
}
