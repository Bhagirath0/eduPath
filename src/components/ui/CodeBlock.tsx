import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  output?: string;
  explanation?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'code',
  output,
  explanation,
  title,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-card overflow-hidden border border-border">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2">
          {title && (
            <span className="text-xs text-gray-300 font-medium mr-2">{title}</span>
          )}
          <span className="badge badge-blue text-xs">{language}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-2 py-1"
        >
          {copied ? (
            <>
              <Check size={13} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code area */}
      <div className="bg-dark-DEFAULT overflow-x-auto">
        <pre className="font-mono text-sm text-gray-100 p-4 leading-relaxed whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>

      {/* Output section */}
      {output && (
        <div className="bg-gray-950 border-t border-gray-700">
          <div className="px-4 pt-3 pb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Output
            </span>
          </div>
          <pre className="font-mono text-sm text-green-400 px-4 pb-4 whitespace-pre-wrap leading-relaxed">
            {output}
          </pre>
        </div>
      )}

      {/* Explanation section */}
      {explanation && (
        <div className="bg-surface-secondary border-t border-border px-4 py-3">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">
            Explanation
          </p>
          <p className="text-sm text-text-primary leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
