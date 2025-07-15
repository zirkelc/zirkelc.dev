import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
  isMarkdown?: boolean;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const slug = params?.slug;
  const isMarkdown = slug?.endsWith('.md');
  const cleanSlug = isMarkdown ? slug?.slice(0, -3) : slug;

  const post = await getSinglePostBySlug(cleanSlug);
  if (!post) return { notFound: true };

  const article = await getDevArticle(post.properties.devArticleId);

  return {
    props: {
      post,
      article,
      isMarkdown,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.flatMap(({ properties: { slug } }) => [{ params: { slug } }, { params: { slug: `${slug}.md` } }]);

  return {
    paths,
    fallback: 'blocking',
  };
};

export default function PostPage({ post, article, isMarkdown }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  useEffect(() => {
    if (isMarkdown) {
      // Redirect to the API route which serves raw markdown
      const cleanSlug = router.query.slug?.toString().replace('.md', '');
      window.location.href = `/api/posts/${cleanSlug}.md`;
    }
  }, [isMarkdown, router]);

  // Don't render anything for markdown requests during the redirect
  if (isMarkdown) {
    return null;
  }

  return (
    <>
      <Meta title={post.properties.title} />

      <Post post={post} article={article} />
    </>
  );
}
