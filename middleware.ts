import { NextRequest, NextResponse } from 'next/server';
import { NotionBody, NotionHeader } from './lib/notion';

const notFound = () => NextResponse.json({ error: 'Not found' }, { status: 404 });

const sendMarkdown = async (body: string, filename: string) => {
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `inline; filename="${filename}.md"`,
    },
  });
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    if (pathname === '/posts.md' || pathname === '/notes.md') {
      const type = pathname === '/posts.md' ? 'posts' : 'notes';
      const apiUrl = new URL(`/api/${type}`, request.url);
      const response = await fetch(apiUrl);
      if (!response.ok) return notFound();

      const items = (await response.json()) as Array<NotionHeader>;

      const content = items
        .map(
          (item) =>
            `- [${item.properties?.title ? item.properties.title : 'Untitled'}](${new URL(
              `/${type}/${item.properties.slug}.md`,
              request.url,
            )})`,
        )
        .join('\n\n');

      return sendMarkdown(content, type);
    }

    // Check if the request is for a markdown version of a post
    if (
      (pathname.startsWith('/posts/') && pathname.endsWith('.md')) ||
      (pathname.startsWith('/notes/') && pathname.endsWith('.md'))
    ) {
      const type = pathname.startsWith('/posts/') ? 'posts' : 'notes';
      const slug = pathname.replace(`/${type}/`, '').replace('.md', '');

      // Fetch post data from internal API
      const apiUrl = new URL(`/api/${type}/${slug}`, request.url);
      const response = await fetch(apiUrl);

      if (!response.ok) return notFound();

      const item = (await response.json()) as NotionHeader & NotionBody;
      const content = `${item.properties?.title ? `# ${item.properties.title}` : ''} \n\n${item.markdown}`;

      return sendMarkdown(content, slug);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/posts.md', '/posts/:path*.md', '/notes.md', '/notes/:path*.md'],
};
