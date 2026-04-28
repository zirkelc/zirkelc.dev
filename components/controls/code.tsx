import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Props = {
  language: string;
  code: string;
};

const CUSTOM_STYLE = { padding: undefined, margin: undefined, background: 'transparent' } as const;

export default function Code({ language, code }: Props) {
  return (
    <>
      <div className="dark:hidden">
        <SyntaxHighlighter language={language} PreTag="div" style={oneLight} customStyle={CUSTOM_STYLE}>
          {code}
        </SyntaxHighlighter>
      </div>
      <div className="hidden dark:block">
        <SyntaxHighlighter language={language} PreTag="div" style={vscDarkPlus} customStyle={CUSTOM_STYLE}>
          {code}
        </SyntaxHighlighter>
      </div>
    </>
  );
}
