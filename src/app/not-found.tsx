import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { LeafBranch } from "@/components/ui/Ornaments";

const suggestions = [
  { label: "Work with me", href: "/work-with-me" },
  { label: "The Self-Audit", href: "/self-audit" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-cream-deep">
      <LeafBranch className="pointer-events-none absolute -left-12 bottom-0 h-80 w-40 text-sage/20" />
      <div className="relative mx-auto max-w-2xl px-6 py-28 text-center lg:px-8">
        <p className="font-display text-7xl text-sage/50">404</p>
        <h1 className="mt-4 font-display text-[2.5rem] leading-tight text-ink">
          That page isn&apos;t here.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-[1.8] text-ink-soft">
          Either it has moved or the link was wrong. Here is where most people were heading.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {suggestions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink-soft transition hover:border-sage/50 hover:bg-sage-mist"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-9 flex justify-center">
          <ButtonLink href="/" size="lg">
            Back to the home page
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
