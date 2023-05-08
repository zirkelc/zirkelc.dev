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
