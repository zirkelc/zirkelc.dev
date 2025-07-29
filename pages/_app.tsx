import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import Container from '../components/layout/container';
import Footer from '../components/layout/footer';
import Header from '../components/layout/header';
import { Analytics } from '@vercel/analytics/react';
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={jetbrainsMono.variable}>
      <Container>
        <Header />
        <Analytics />

        <div className="py-14">
          <Component {...pageProps} />
        </div>

        <Footer />
      </Container>
    </main>
  );
}
