"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
    content: string;
    className?: string;
}

export default function MarkdownContent({
    content,
    className = "",
}: MarkdownContentProps) {
    if (!content.trim()) {
        return null;
    }

    return (
        <div
            className={[
                "min-w-0 break-words",
                "text-xs leading-6 text-slate-700",
                "@[30rem]:text-sm @[30rem]:leading-7",
                className,
            ].join(" ")}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="mt-6 text-2xl font-bold leading-tight text-slate-950 first:mt-0 @[30rem]:text-3xl">
                            {children}
                        </h1>
                    ),

                    h2: ({ children }) => (
                        <h2 className="mt-6 text-xl font-bold leading-tight text-slate-950 @[30rem]:text-2xl">
                            {children}
                        </h2>
                    ),

                    h3: ({ children }) => (
                        <h3 className="mt-5 text-lg font-bold leading-tight text-slate-950 @[30rem]:text-xl">
                            {children}
                        </h3>
                    ),

                    p: ({ children }) => (
                        <p className="mt-4 leading-7 first:mt-0">
                            {children}
                        </p>
                    ),

                    ul: ({ children }) => (
                        <ul className="mt-4 list-disc space-y-2 pl-5">
                            {children}
                        </ul>
                    ),

                    ol: ({ children }) => (
                        <ol className="mt-4 list-decimal space-y-2 pl-5">
                            {children}
                        </ol>
                    ),

                    li: ({ children }) => (
                        <li className="leading-7">
                            {children}
                        </li>
                    ),

                    blockquote: ({ children }) => (
                        <blockquote
                            className="
                                my-5
                                border-l-4
                                border-amber-400
                                bg-blue-50
                                px-4
                                py-3
                                italic
                                text-slate-600
                            "
                        >
                            {children}
                        </blockquote>
                    ),

                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                font-medium
                                text-blue-700
                                underline
                                decoration-blue-300
                                underline-offset-2
                                hover:text-blue-900
                            "
                        >
                            {children}
                        </a>
                    ),

                    strong: ({ children }) => (
                        <strong className="font-bold text-slate-900">
                            {children}
                        </strong>
                    ),

                    em: ({ children }) => (
                        <em className="italic">
                            {children}
                        </em>
                    ),

                    del: ({ children }) => (
                        <del className="text-slate-500">
                            {children}
                        </del>
                    ),

                    hr: () => (
                        <hr className="my-6 border-blue-200" />
                    ),

                    img: ({ src, alt }) => (
                        <img
                            src={src}
                            alt={alt ?? ""}
                            className="
                                my-5
                                h-auto
                                w-full
                                rounded-lg
                                object-cover
                                shadow-sm
                            "
                        />
                    ),

                    table: ({ children }) => (
                        <div className="my-5 w-full overflow-x-auto">
                            <table className="w-full border-collapse text-left text-sm">
                                {children}
                            </table>
                        </div>
                    ),

                    thead: ({ children }) => (
                        <thead className="bg-slate-100">
                            {children}
                        </thead>
                    ),

                    th: ({ children }) => (
                        <th className="border border-blue-200 px-3 py-2 font-semibold text-slate-900">
                            {children}
                        </th>
                    ),

                    td: ({ children }) => (
                        <td className="border border-blue-200 px-3 py-2">
                            {children}
                        </td>
                    ),

                    code: ({ children }) => (
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800">
                            {children}
                        </code>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}