import Link from 'next/link';
import Breadcrumb from './breadcrumb';
import { GitHubIcon, XIcon } from './social-icons';
import ThemeToggle from './theme-toggle';

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between gap-4 py-6">
      <Breadcrumb />

      <nav className="flex items-center gap-4 text-black dark:text-white">
        <Link href="https://github.com/zirkelc" aria-label="GitHub" className="hover:opacity-70">
          <GitHubIcon />
        </Link>
        <Link href="https://x.com/zirkelc_" aria-label="X" className="hover:opacity-70">
          <XIcon />
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
