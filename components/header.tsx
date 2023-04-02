import Link from 'next/link';
import Container from '../components/container';
import Image from 'next/image';

export default function Header() {
  return (
    <Container>
      <header className="py-6 flex flex-row justify-between">
        <Link
          href="/"
          className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold px-4 py-2 duration-200 transition-colors"
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
