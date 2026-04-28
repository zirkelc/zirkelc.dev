import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <hr className="border-gray-200 dark:border-gray-800" />
      <footer className="flex flex-row justify-between py-6">
        <div className="font-mono text-sm text-gray-500 dark:text-gray-400">
          {'Chris Cook ('}
          <Link href="https://github.com/zirkelc" className="underline">
            @zirkelc
          </Link>
          {')'}
        </div>

        <div className="font-mono text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/zirkelc/zirkelc.dev" className="underline">
            Source
          </Link>
        </div>
      </footer>
    </>
  );
}
