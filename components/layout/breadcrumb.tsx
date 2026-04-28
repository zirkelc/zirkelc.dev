import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

export default function Breadcrumb() {
  const router = useRouter();
  const pathname = router.asPath.split('?')[0].split('#')[0];
  const segments = pathname.split('/').filter(Boolean);
  const isHome = segments.length === 0;

  const linkClass = 'text-gray-500 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors';
  const staticClass = 'text-black dark:text-white';
  const separatorClass = 'text-gray-400 dark:text-gray-600';

  return (
    <div className="flex min-w-0 items-center gap-2 font-mono text-base font-bold tracking-tighter">
      <Link href="/" aria-label="Home" className={`${linkClass} shrink-0`}>
        ~
      </Link>
      <span className={`${separatorClass} shrink-0`}>/</span>
      {isHome ? (
        <span className={`${staticClass} shrink-0`}>zirkelc</span>
      ) : (
        <Link href="/" className={`${linkClass} shrink-0`}>
          zirkelc
        </Link>
      )}
      {segments.map((segment, i) => {
        const isLast = i === segments.length - 1;
        const href = '/' + segments.slice(0, i + 1).join('/');
        return (
          <Fragment key={href}>
            <span className={`${separatorClass} shrink-0`}>/</span>
            {isLast ? (
              <span className={`min-w-0 max-w-[32ch] truncate ${staticClass}`}>{segment}</span>
            ) : (
              <Link href={href} className={`${linkClass} shrink-0`}>
                {segment}
              </Link>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
