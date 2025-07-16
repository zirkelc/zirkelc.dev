import { NextRequest, NextResponse } from 'next/server';

const sendMarkdown = async (body: string, filename: string) => {
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `inline; filename="${filename}.md"`,
    },
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(pathname);

  try {
    if (pathname === '/posts.md') {
      const apiUrl = new URL(`/api/posts`, request.url);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        return NextResponse.json({ error: 'Posts not found' }, { status: 404 });
      }

      const { posts } = await response.json();

      const content = posts.map((post) => `- [${post.properties.title}](${new URL(`/posts/${post.properties.slug}.md`, request.url)})`).join('\n\n');

      return sendMarkdown(content, 'posts');
    }

    // Check if the request is for a markdown version of a post
    if (pathname.startsWith('/posts/') && pathname.endsWith('.md')) {
      const slug = pathname.replace('/posts/', '').replace('.md', '');


      // Fetch post data from internal API
      const apiUrl = new URL(`/api/posts/${slug}`, request.url);
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      const { properties, markdown } = await response.json();
      const content = `# ${properties.title}\n\n${markdown}`;

      return sendMarkdown(content, slug);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/posts.md', '/posts/:path*.md',]
};
