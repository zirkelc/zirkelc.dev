import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Container from '../components/container';
import DateTime from '../components/datetime';
import PostList from '../components/post-list';
import { getAllPosts, NotionPost } from '../lib/notion';

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
      <PostList posts={posts} />
    </Container>
  );
}

//   return (
//     <>
//       <Container>
//         <div className="space-y-6">
//           <h1 className="text-2xl font-bold">
//             Hey, Im a Senior Software Engineer at Company. I enjoy working with Next.js and crafting beautiful front-end
//             experiences.
//           </h1>
//           <p>
//             This portfolio is built with Next.js and a library called next-mdx. It allows you to write Markdown and
//             focus on the content of your portfolio.
//           </p>

//           <p>Deploy your own in a few minutes.</p>
//         </div>
//       </Container>

//       {/* <div className="container max-w-4xl m-auto px-4 mt-20">
//         <Image
//           src="/desk.jpg"
//           alt="my desk"
//           width={1920 / 2}
//           height={1280 / 2}
//         />
//       </div> */}
//     </>
//   );
// }
