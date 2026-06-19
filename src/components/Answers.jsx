import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Answer({ ans }) {
  const copyCode = (code) => {
    navigator.clipboard.writeText(String(code));
  };

  return (
    <div className="text-left text-zinc-300 leading-6 sm:leading-7 text-sm sm:text-base break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-5 mb-3">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-5 mb-3">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-semibold text-white mt-4 mb-2">
              {children}
            </h3>
          ),

          p: ({ children }) => <p className="mb-3">{children}</p>,

          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),

          ul: ({ children }) => (
            <ul className="list-disc ml-5 sm:ml-6 mb-4 space-y-1">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal ml-5 sm:ml-6 mb-4 space-y-1">
              {children}
            </ol>
          ),

          li: ({ children }) => <li className="pl-1">{children}</li>,

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-zinc-600 pl-3 sm:pl-4 my-4 text-zinc-400 italic">
              {children}
            </blockquote>
          ),

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline underline-offset-4 hover:text-blue-300 break-all"
            >
              {children}
            </a>
          ),

          table: ({ children }) => (
            <div className="w-full overflow-x-auto my-5 rounded-lg border border-zinc-700">
              <table className="min-w-[600px] border-collapse text-xs sm:text-sm">
                {children}
              </table>
            </div>
          ),

          th: ({ children }) => (
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-r border-zinc-700 last:border-r-0">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-r border-zinc-700 last:border-r-0">
              {children}
            </td>
          ),

          code: ({ inline, children }) => {
            const codeText = String(children).replace(/\n$/, "");

            if (inline) {
              return (
                <code className="bg-zinc-800 text-pink-300 px-1.5 py-0.5 rounded text-xs sm:text-sm break-words">
                  {children}
                </code>
              );
            }

            return (
              <div className="my-4 w-full max-w-full border border-zinc-700 rounded-lg overflow-hidden">
                <div className="flex justify-end items-center bg-zinc-800 px-3 py-2 border-b border-zinc-700">
                  <button
                    onClick={() => copyCode(codeText)}
                    className="text-xs text-zinc-300 hover:text-white cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <pre className="bg-zinc-900 p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm">
                  <code>{codeText}</code>
                </pre>
              </div>
            );
          },

          hr: () => <hr className="border-zinc-700 my-6" />,
        }}
      >
        {ans}
      </ReactMarkdown>
    </div>
  );
}