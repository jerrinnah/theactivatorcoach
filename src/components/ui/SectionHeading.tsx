import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "items-start";
  const size =
    Tag === "h1"
      ? "text-[2.6rem] leading-[1.08] sm:text-6xl"
      : "text-[2.1rem] leading-[1.12] sm:text-[2.75rem]";

  return (
    <div className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag className={`font-display text-ink ${size}`}>{title}</Tag>
      {intro ? (
        <div
          className={`max-w-2xl text-[1.0625rem] leading-[1.75] text-ink-soft ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}
