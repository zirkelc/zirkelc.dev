import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Meta from '../../components/layout/meta';
import Post from '../../components/post/post';
import { NotionPost, getAllPosts, getSinglePostBySlug } from '../../lib/notion';
import { DevArticle, getDevArticle } from '../../lib/dev';

type Params = {
  slug?: string;
};

type Props = {
  post: NotionPost;
  article: DevArticle | null;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const post = await getSinglePostBySlug(params?.slug);
  if (!post) return { notFound: true };

  const article = await getDevArticle(post.properties.devArticleId);

  return {
    props: {
      post,
      article,
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

export default function PostPage({ post, article }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title={post.properties.title} />

      <Post post={post} article={article} />
    </>
  );
}
