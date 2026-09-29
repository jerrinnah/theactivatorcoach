import { Fragment } from "react";
import { parseInline } from "@/lib/richText";

/**
 * Renders the inline markers the content files allow.
 *
 * `**text**` becomes a `<strong>` in prose and the accent-coloured word in a
 * display heading (`emphasis="accent"`). `strongClassName` styles the strong —
 * pass a real utility rather than an arbitrary variant on the parent, because
 * the static build ships a Tailwind bundle compiled from this app and only
 * classes that already appear in it have a rule.
 */
export default function Rich({
  text,
  emphasis = "strong",
  strongClassName,
}: {
  text: string;
  emphasis?: "strong" | "accent";
  strongClassName?: string;
}) {
  return (
    <>
      {parseInline(text).map((token, index) => {
        if (token.emphasis === "em") {
          return <em key={index}>{token.text}</em>;
        }
        if (token.emphasis === "strong") {
          return emphasis === "accent" ? (
            <span key={index} className="text-sage-deep">
              {token.text}
            </span>
          ) : (
            <strong key={index} className={strongClassName}>
              {token.text}
            </strong>
          );
        }
        return <Fragment key={index}>{token.text}</Fragment>;
      })}
    </>
  );
}

/** Multi-line display headings: one content line per rendered line. */
export function RichLines({
  lines,
  emphasis = "accent",
}: {
  lines: string[];
  emphasis?: "strong" | "accent";
}) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          <Rich text={line} emphasis={emphasis} />
        </Fragment>
      ))}
    </>
  );
}
