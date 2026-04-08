import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import markdownContent from "../data/lesson3/lesson3.md?raw";
import { CodeBlock } from "../components/ui/shared";

export default function Lesson3({ openApp }: { openApp: (id: string) => void }) {
  return (
    <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-200">
        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">7下 Lesson 3 (Numbers, Dates & Pronouns)</h1>
        <button onClick={() => openApp("quiz.lesson3")} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2">
          <span>開始考試</span>
        </button>
      </div>
      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({node, ...props}) => <h2 className="text-xl font-bold text-blue-800 mt-10 mb-4 pb-2 border-b-2 border-blue-100 flex items-center gap-2" {...props}>{props.children}</h2>,
            p: ({node, ...props}) => <p className="mb-4 text-stone-700 text-lg leading-relaxed" {...props} />,            
            strong: ({node, ...props}) => <strong className="font-bold text-stone-900 bg-blue-50 px-1 rounded" {...props} />,
            ul: ({node, ...props}) => (<ul className="list-disc pl-6 my-6 bg-yellow-50/70 border border-yellow-200 rounded-2xl p-6 shadow-sm text-stone-700 space-y-2 text-lg" {...props} />),
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
