import Head from 'next/head';

type Props = {
  title: string;
  description?: string;
  url?: string;
};

export default function Meta({ title, description, url }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={title} />

      {description && (
        <>
          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
        </>
      )}

      {url && <meta property="og:url" content={url} />}
    </Head>
  );
}
