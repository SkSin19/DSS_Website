import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { type BlogBlock, slugifyHeading } from "@/lib/blog";

/** Renders **bold** and [label](href) inline syntax used in blog content. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        const bold = part.match(/^\*\*(.+)\*\*$/);
        if (bold) {
          return <strong key={i} className="font-semibold text-gray-900!">{bold[1]}</strong>;
        }
        const link = part.match(/^\[(.+?)\]\((.+?)\)$/);
        if (link) {
          const [, label, href] = link;
          const className = "font-medium text-red-600! underline! decoration-red-200! underline-offset-2 hover:decoration-red-600!";
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={className}>{label}</Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={className}>{label}</a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="text-[16px] leading-[1.8] text-gray-700!">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i} className="mt-5"><Inline text={block.text} /></p>;
          case "h2":
            return (
              <h2 key={i} id={slugifyHeading(block.text)} className="mt-10 scroll-mt-36 text-2xl font-bold leading-snug text-gray-900!">
                <Inline text={block.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-7 text-lg font-semibold text-gray-900!">
                <Inline text={block.text} />
              </h3>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List key={i} className={`mt-5 space-y-2 pl-6 ${block.type === "ul" ? "list-disc" : "list-decimal"} marker:text-red-600`}>
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1"><Inline text={item} /></li>
                ))}
              </List>
            );
          }
          case "tip":
            return (
              <aside key={i} className="mt-7 flex gap-3 rounded-xl border border-red-100 bg-red-50/60 p-4 sm:p-5">
                <Lightbulb className="mt-1 h-5 w-5 shrink-0 text-red-600!" aria-hidden="true" />
                <p className="text-[15px] leading-relaxed"><Inline text={block.text} /></p>
              </aside>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-120 border-collapse text-left text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {block.head.map((h, j) => (
                        <th key={j} scope="col" className="border-b border-gray-200 px-4 py-3 font-semibold text-gray-900!">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="even:bg-gray-50/50">
                        {row.map((cell, c) =>
                          c === 0 ? (
                            <th key={c} scope="row" className="border-b border-gray-100 px-4 py-3 font-medium text-gray-900!">
                              <Inline text={cell} />
                            </th>
                          ) : (
                            <td key={c} className="border-b border-gray-100 px-4 py-3"><Inline text={cell} /></td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
