import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for a markdown version of a post
  if (pathname.startsWith('/posts/') && pathname.endsWith('.md')) {
    const slug = pathname.replace('/posts/', '').replace('.md', '');

    try {
      // Fetch post data from internal API
      const apiUrl = new URL(`/api/posts/${slug}`, request.url);
      const response = await fetch(apiUrl, {
        headers: {
          Accept: 'text/markdown',
        },
      });

      if (!response.ok) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      const { properties, markdown } = await response.json();
      const content = `# ${properties.title}\n\n${markdown}`;

      return new NextResponse(content, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Disposition': `inline; filename="${slug}.md"`,
        },
      });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/posts/:path*.md',
};
