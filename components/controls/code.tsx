import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Props = {
  language: string;
  code: string;
};

export default function Code({ language, code }: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      PreTag="div"
      style={theme}
      customStyle={{ padding: undefined, margin: undefined, background: undefined }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
