import type { ReactNode } from "react";

/**
 * Renders the lightweight block markup used in `lib/insights.ts`:
 * `## ` subheading, `> ` pull quote, `- ` list item, anything else a paragraph.
 * Consecutive list items are grouped into a single <ul>.
 */
export default function ArticleBody({ blocks }: { blocks: string[] }) {
  const rendered: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    rendered.push(
      <ul key={key} className="my-6 space-y-3">
        {listBuffer.map((item) => (
          <li key={item} className="flex gap-3.5 text-[1.0625rem] leading-[1.8] text-ink-soft">
            <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage" />
            {item}
          </li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  blocks.forEach((block, index) => {
    if (block.startsWith("- ")) {
      listBuffer.push(block.slice(2));
      return;
    }

    flushList(`list-${index}`);

    if (block.startsWith("## ")) {
      rendered.push(
        <h2 key={index} className="mt-12 font-display text-[2rem] leading-tight text-ink">
          {block.slice(3)}
        </h2>,
      );
      return;
    }

    if (block.startsWith("> ")) {
      rendered.push(
        <blockquote
          key={index}
          className="my-9 border-l-2 border-sage pl-6 font-display text-[1.6rem] leading-snug text-sage-deep"
        >
          {block.slice(2)}
        </blockquote>,
      );
      return;
    }

    rendered.push(
      <p key={index} className="mt-5 text-[1.0625rem] leading-[1.85] text-ink-soft">
        {block}
      </p>,
    );
  });

  flushList("list-final");

  return <div>{rendered}</div>;
}
