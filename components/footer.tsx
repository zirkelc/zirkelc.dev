import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <hr />
      <footer className="flex flex-row justify-between py-6">
        <div className="font-mono text-sm text-gray-500">
          {'Chris Zirkel ('}
          <Link href="https://github.com/zirkelc" className="underline">
            @zirkelc
          </Link>
          {')'}
        </div>

        <div className="font-mono text-sm text-gray-500">
          <Link href="https://github.com/zirkelc/zirkelc.dev" className="underline">
            Source
          </Link>
        </div>
      </footer>
    </>
  );
}
