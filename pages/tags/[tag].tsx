import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Meta from '../../components/layout/meta';
import PostList from '../../components/post/post-list';
import Tag from '../../components/post/tag';
import { NotionPost, getAllPosts, getAllPostsByTag } from '../../lib/notion';

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
    fallback: 'blocking',
  };
};

export default function TagPage({ tag, posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return (
    <>
      <Meta title={`Posts tagged with ${tag}`} />

      <h1 className="mb-1 text-4xl font-bold">Posts tagged with {<Tag tag={tag} hover />}</h1>

      <PostList posts={posts} />
    </>
  );
}
