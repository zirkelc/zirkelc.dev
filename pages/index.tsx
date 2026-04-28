import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Meta from '../components/layout/meta';
import NotionPageList from '../components/post/notion-page-list';
import { getAllPosts, NotionHeader } from '../lib/notion';

const RECENT_COUNT = 5;

type Props = {
  pages: Array<NotionHeader>;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      pages: posts.slice(0, RECENT_COUNT),
    },
    revalidate: 60,
  };
};

export default function HomePage({ pages }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title={"Chris Cook's Blog"} />

      <section className="mb-12 space-y-4">
        <h2 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">About</h2>
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1 space-y-4 font-mono text-base">
            <p className="text-black dark:text-white">Hi, I&apos;m Chris.</p>
            <p className="text-black dark:text-white">
              I&apos;m a software engineer from Mannheim, Germany and co-founder of{' '}
              <Link href="https://flyweight.io" className="underline hover:no-underline">
                flyweight.io
              </Link>
              .
            </p>
            <p className="text-black dark:text-white">I build things with TypeScript and ship open source projects.</p>
            <Link
              href="/about"
              className="block text-gray-500 hover:text-black dark:text-gray-500 dark:hover:text-white"
            >
              More about me →
            </Link>
          </div>
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/me.jpg"
              alt="Chris Cook"
              width={160}
              height={160}
              className="h-full w-full object-cover grayscale transition hover:grayscale-0"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">Recent posts</h2>
        <NotionPageList pages={pages} />
        <div className="pt-2">
          <Link
            href="/posts"
            className="block font-mono text-base text-gray-500 hover:text-black dark:text-gray-500 dark:hover:text-white"
          >
            View all posts →
          </Link>
        </div>
      </section>
    </>
  );
}
