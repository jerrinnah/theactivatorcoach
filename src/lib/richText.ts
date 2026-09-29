/**
 * The one piece of markup the content files are allowed to carry.
 *
 * Copy in content/*.json is plain text so the admin's form editor stays a form
 * rather than an HTML box. Two inline markers survive: `**text**` for strong
 * emphasis and `*text*` for italics. In display headings the strong marker is
 * what paints a word in the accent colour — that is the only styling either
 * renderer applies from content.
 */
export type InlineToken = {
  text: string;
  emphasis: "none" | "strong" | "em";
};

const MARKER = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;

export function parseInline(source: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let index = 0;

  for (const match of source.matchAll(MARKER)) {
    if (match.index > index) {
      tokens.push({ text: source.slice(index, match.index), emphasis: "none" });
    }
    tokens.push(
      match[1] !== undefined
        ? { text: match[1], emphasis: "strong" }
        : { text: match[2], emphasis: "em" },
    );
    index = match.index + match[0].length;
  }

  if (index < source.length) {
    tokens.push({ text: source.slice(index), emphasis: "none" });
  }
  return tokens;
}
