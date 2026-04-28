import Image from 'next/image';
import Link from 'next/link';
import Meta from '../components/layout/meta';

export default function AboutPage() {
  return (
    <>
      <Meta title="About" />

      <article className="prose max-w-none font-mono dark:prose-invert">
        <h1>About</h1>

        <div className="not-prose float-right mb-4 ml-6 h-40 w-40 shrink-0 overflow-hidden rounded-full">
          <Image
            src="/me.jpg"
            alt="Chris Cook"
            width={320}
            height={320}
            className="h-full w-full object-cover grayscale transition hover:grayscale-0"
          />
        </div>

        <p>
          I&apos;m Chris Cook, a software engineer and co-founder of{' '}
          <Link href="https://flyweight.io">flyweight.io</Link>, based in Mannheim, Germany.
        </p>

        <p>
          I started coding at 14, building my clan website in PHP. A few years later I started an apprenticeship in
          software engineering at the German chemical company BASF, while doing a part-time university degree in
          Computer Science and Economics.
        </p>

        <p>
          In 2018 my co-founders and I started flyweight as a side project, an Amazon FBA brand around kids&apos; toys.
          We sold this business at the end of 2021, but we kept the name. I left my main job shortly after to work
          full-time on our new idea: building software tools for the kind of e-commerce problems we&apos;d hit
          ourselves. After a few pivots, we found product-market fit with an AI assistant for e-commerce merchants that
          drives sales and automates customer support.
        </p>

        <p>
          I maintain a few open source projects. My current focus is mainly the AI SDK, and I try to publish useful
          packages that complement its functionality. To get the latest updates on what I&apos;m working on, check out
          my <Link href="https://github.com/zirkelc">GitHub profile</Link>.
        </p>
      </article>
    </>
  );
}
