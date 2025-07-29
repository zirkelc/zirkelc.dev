import Head from 'next/head';

type Props = {
  title: string;
  description?: string;
  url?: string;
  slug?: string;
};

export default function Meta({ title, description, url, slug }: Props) {
  const siteUrl = 'https://zirkelc.dev';
  const ogImageUrl = slug ? `${siteUrl}/posts/${slug}.png` : `${siteUrl}/me.jpg`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="zirkelc.dev" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={ogImageUrl} />

      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}

      {url && <meta property="og:url" content={url} />}
    </Head>
  );
}
