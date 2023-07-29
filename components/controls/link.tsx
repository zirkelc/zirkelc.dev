import NextLink from 'next/link';

type Props = React.ComponentProps<typeof NextLink> & {
  hover?: boolean;
  asTab?: boolean;
};

export default function Link({ asTab, hover, children, ...linkProps }: Props) {
  return (
    <NextLink
      {...linkProps}
      {...(asTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${
        hover ? 'bg-black text-white' : ''
      } p-0.5 transition-colors duration-200 hover:bg-black hover:text-white`}
    >
      {children}
    </NextLink>
  );
}
