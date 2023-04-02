import Link from 'next/link';
import Container from '../components/container';
import Image from 'next/image';

export default function Header() {
  return (
    <Container>
      <header className="flex flex-row justify-between py-6">
        <Link
          href="/"
          className="border border-black bg-black px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black"
        >
          zirkelc.dev
        </Link>

        <nav className="flex space-x-4">
          <Link href="https://github.com/zirkelc">
            <Image src="/github.svg" height={32} width={32} alt="GitHub" />
          </Link>

          <Link href="https://www.linkedin.com/in/christian-zirkel/">
            <Image src="/linkedin.svg" height={32} width={32} alt="LinkedIn" />
          </Link>

          <Link href="https://dev.to/zirkelc">
            <Image src="/dev.to.svg" height={32} width={32} alt="Dev.to" />
          </Link>
        </nav>
      </header>
    </Container>
  );
}
