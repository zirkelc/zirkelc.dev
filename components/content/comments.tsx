import Link from 'next/link';

type Props = {
  url: string;
  comments: number;
};

export function Comments({ comments, url }: Props) {
  const message = comments === 0 ? 'Comment on DEV' : `${comments} comment${comments > 1 ? 's' : ''}`;
  return <Link href={`${url}#comments`}>{message}</Link>;
}
