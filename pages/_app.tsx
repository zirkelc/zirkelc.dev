import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/header';
import Meta from '../components/meta';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />

      <main className="py-14">
        <Component {...pageProps} />
      </main>
    </>
  );
}
