import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import Container from '../components/container';
import Footer from '../components/footer';
import Header from '../components/header';

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
