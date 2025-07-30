import { ImageResponse } from '@vercel/og';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSinglePageBySlug } from '../../../lib/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query;

    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: `Invalid slug: ${slug}` });
    }

    const page = await getSinglePageBySlug(slug);

    if (!page) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const { title } = page.properties;
    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '64px',
            background: '#fff',
          }}
        >
          <div style={{ position: 'relative', display: 'flex', width: '100%', height: '100%' }}>
            {/* Background Card (offset left and up) */}
            <div
              style={{
                position: 'absolute',
                left: '24px',
                bottom: '24px',
                width: '100%',
                height: '100%',
                background: '#EEEDED',
                border: '5px dashed #000000',
                borderRadius: '6px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                opacity: 0.8,
              }}
            />

            {/* Main Card */}
            <div
              style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                padding: '48px',
                background: 'white',
                border: '5px solid #000',
                borderRadius: '6px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1
                  style={{
                    marginBottom: '32px',
                    fontSize: '64px',
                    fontFamily: 'JetBrains Mono',
                    fontWeight: '700',
                    lineHeight: '1.25',
                    color: '#111827',
                    overflow: 'hidden',
                  }}
                >
                  {title}
                </h1>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '32px', fontFamily: 'JetBrains Mono', fontWeight: '400' }}>Chris Cook</span>
                <span style={{ fontSize: '32px', fontFamily: 'JetBrains Mono', fontWeight: '800' }}>zirkelc.dev</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'JetBrains Mono',
            data: await fetch(
              'https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-Regular.ttf',
            ).then((res) => res.arrayBuffer()),
            style: 'normal',
            weight: 400,
          },
          {
            name: 'JetBrains Mono',
            data: await fetch(
              'https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-Bold.ttf',
            ).then((res) => res.arrayBuffer()),
            style: 'normal',
            weight: 700,
          },
          {
            name: 'JetBrains Mono',
            data: await fetch(
              'https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/ttf/JetBrainsMono-ExtraBold.ttf',
            ).then((res) => res.arrayBuffer()),
            style: 'normal',
            weight: 800,
          },
        ],
      },
    );

    const buffer = await imageResponse.arrayBuffer();

    imageResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    return res.end(Buffer.from(buffer));
  } catch (error) {
    console.error('Error generating OG image:', error);
    return res.status(500).json({ error: 'Failed to generate image' });
  }
}
