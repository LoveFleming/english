import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "../components/ui/shared";
import markdownContent from "../data/pronouns/pronouns.md?raw";

export default function Pronouns({ openApp }: { openApp: (id: string) => void }) {
  return (
    <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-200">
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">代名詞全攻略 (Pronouns)</h1>
        <button
          onClick={() => openApp("quiz.pronouns")}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          開始考試
        </button>
      </div>

      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({node, ...props}) => (
              <h2 className="text-xl font-bold text-blue-800 mt-10 mb-4 pb-2 border-b-2 border-blue-100 flex items-center gap-2" {...props}>
                 {props.children}
              </h2>
            ),
            p: ({node, ...props}) => <p className="mb-4 text-stone-700 text-lg leading-relaxed" {...props} />,
            strong: ({node, ...props}) => <strong className="font-bold text-stone-900 bg-blue-50 px-1 rounded" {...props} />,
            em: ({node, ...props}) => <em className="text-sm text-stone-500 italic block mt-1" {...props} />,
            ul: ({node, ...props}) => (
              <ul className="list-disc pl-6 my-6 bg-yellow-50/70 border border-yellow-200 rounded-2xl p-6 shadow-sm text-stone-700 space-y-2 text-lg" {...props} />
            ),
            table: ({node, ...props}) => (
              <div className="my-6 overflow-x-auto rounded-2xl border border-blue-200 shadow-lg">
                <table className="w-full text-left" {...props} />
              </div>
            ),
            thead: ({node, ...props}) => <thead className="bg-blue-600 text-white" {...props} />,
            th: ({node, ...props}) => <th className="px-4 py-3 font-bold text-center" {...props} />,
            td: ({node, ...props}) => <td className="px-4 py-3 text-center text-lg border-t border-blue-100" {...props} />,
            tr: ({node, ...props}) => <tr className="even:bg-blue-50/50" {...props} />,
            code: ({node, inline, className, children, ...props}: any) => {
              if (inline) return <code className="bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded-md text-sm font-mono border border-stone-200 shadow-sm" {...props}>{children}</code>;
              return <div className="my-4"><CodeBlock text={String(children).replace(/\n$/, '')} /></div>;
            }
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
