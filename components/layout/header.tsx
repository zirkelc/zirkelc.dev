import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex flex-row justify-between py-6">
      <nav className="flex items-center space-x-4">
        <div className="flex bg-black text-white hover:bg-white hover:text-black">
          <Link href="/" className="px-1 font-mono text-lg font-bold tracking-tighter">
            @zirkelc
          </Link>
        </div>
      </nav>

      <nav className="flex items-center space-x-4">
        <Link href="https://github.com/zirkelc">
          <Image src="/github.svg" height={24} width={24} alt="GitHub" />
        </Link>

        <Link href="https://dev.to/zirkelc">
          <Image src="/dev.to.svg" height={32} width={32} alt="DEV.to" />
        </Link>

        <Link href="https://twitter.com/zirkelc_">
          <Image src="/twitter.svg" height={24} width={24} alt="Twitter" />
        </Link>

        <Link href="https://bsky.app/profile/zirkelc.dev">
          <Image src="/bluesky.svg" height={24} width={24} alt="Bluesky" />
        </Link>
      </nav>
    </header>
  );
}
