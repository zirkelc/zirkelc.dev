import Link from 'next/link';

type Props = {
  tag: string;
  hover?: boolean;
};

export default function Tag({ tag, hover }: Props) {
  return (
    <Link
      key={tag}
      as={`/tags/${tag}`}
      href="/tags/[tag]"
      className={`${
        hover ? 'bg-black text-white' : ''
      } p-0.5 transition-colors duration-200 hover:bg-black hover:text-white`}
    >
      {`#${tag}`}
    </Link>
  );
}
