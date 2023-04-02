import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/header';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Chris Zirkel's personal knowledge base" />
        <title>zirkelc.dev</title>
      </Head>

      <Header />

      <main className="py-14">
        <Component {...pageProps} />
      </main>
    </>
  );
}
