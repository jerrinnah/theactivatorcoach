import { trustItems } from "@/lib/siteData";

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-cream-deep" aria-label="Credentials">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-3 px-6 py-7 lg:px-8">
        {trustItems.map((item) => (
          <span
            key={item}
            className="rounded-full border border-line bg-white/70 px-4 py-2 text-xs text-ink-soft"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
