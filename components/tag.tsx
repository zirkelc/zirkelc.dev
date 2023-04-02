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
      } hover:bg-black hover:text-white duration-200 transition-colors p-0.5`}
    >
      {`#${tag}`}
    </Link>
  );
}
