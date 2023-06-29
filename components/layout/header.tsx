import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex flex-row justify-between py-6">
      <nav className="flex items-center space-x-4">
        <div className="flex h-8 w-8 bg-black text-white hover:bg-white hover:text-black">
          <Link href="/" className="font-serif text-4xl font-bold">
            Z.
          </Link>
        </div>
      </nav>

      <nav className="flex items-center space-x-4">
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
  );
}
