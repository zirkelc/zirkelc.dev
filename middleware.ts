import { NextRequest, NextResponse } from 'next/server';

const OG_IMAGE_PATHNAME = /\/(posts)\/(?<slug>[a-zA-Z0-9-]*)\.png/;
const MD_INDEX_PATHNAME = /\/(posts)\.md/;
const MD_PAGE_PATHNAME = /\/(posts)\/(?<slug>[a-zA-Z0-9-]*)\.md/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * Handle opengraph image requests at /posts/<slug>.png
   */
  if (OG_IMAGE_PATHNAME.test(pathname)) {
    const match = pathname.match(OG_IMAGE_PATHNAME);
    const { slug } = match.groups;

    const ogUrl = new URL(`/api/og/${slug}`, request.url);
    return NextResponse.rewrite(ogUrl);
  }

  /**
   * Handle markdown index requests at /posts.md
   */
  if (MD_INDEX_PATHNAME.test(pathname)) {
    const mdUrl = new URL(`/api/md`, request.url);
    return NextResponse.rewrite(mdUrl);
  }

  /**
   * Handle markdown page requests at /posts/<slug>.md
   */
  if (MD_PAGE_PATHNAME.test(pathname)) {
    const match = pathname.match(MD_PAGE_PATHNAME);
    const { slug } = match.groups;

    const mdUrl = new URL(`/api/md/${slug}`, request.url);
    return NextResponse.rewrite(mdUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /**
     * opengraph image requests
     */
    '/posts/:path*.png',
    /**
     * markdown index requests at /posts.md or /notes.md
     */
    '/posts.md',
    /**
     * markdown page requests at /posts/<slug>.md or /notes/<slug>.md
     */
    '/posts/:path*.md',
  ],
};
