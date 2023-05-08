import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Container from '../components/container';
import PostList from '../components/post-list';
import { getAllPosts, NotionPost } from '../lib/notion';
import Meta from '../components/meta';

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
    <Container>
      <Meta title={"Chris Zirkel's Blog"} />
      <PostList posts={posts} />
    </Container>
  );
}
