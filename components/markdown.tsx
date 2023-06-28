import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import Code from './code';
// `rehype-katex` does not import the CSS
import 'katex/dist/katex.min.css';

type Props = {
  markdown: string;
};

export default function Markdown({ markdown }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <Code code={String(children).replace(/\n$/, '')} language={match[1]} />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        pre({ children }) {
          return <pre className="selection:bg-white selection:text-black">{children}</pre>;
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
