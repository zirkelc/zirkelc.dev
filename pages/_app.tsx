import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import Container from '../components/layout/container';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header />

      <main className="py-14">
        <Component {...pageProps} />
      </main>

      <Footer />
    </Container>
  );
}
