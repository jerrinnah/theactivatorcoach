import type { Metadata } from "next";
import Link from "next/link";
import LetterSignup from "@/components/LetterSignup";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import { formatArticleDate, sortedArticles } from "@/lib/insights";
import { letterPage as content } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function LetterPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-40 -top-44 h-[38rem] w-[38rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-12 bottom-0 h-80 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            {content.hero.title}
          </h1>
          <p className="mt-7 text-lg leading-[1.8] text-ink-soft">{content.hero.intro}</p>

          <div className="mt-10 rounded-4xl border border-line bg-white p-8 sm:p-10">
            <LetterSignup />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <h2 className="font-display text-[2.25rem] leading-tight text-ink">
            {content.promises.title}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {content.promises.items.map((promise) => (
              <div key={promise.title} className="rounded-3xl border border-line bg-white p-7">
                <h3 className="font-display text-2xl text-ink">{promise.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-7 text-muted">{promise.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-cream-deep">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <h2 className="font-display text-[2.25rem] leading-tight text-ink">
            {content.samples.title}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
            {content.samples.intro}
          </p>
          <div className="mt-10 space-y-4">
            {sortedArticles.slice(0, 4).map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group flex flex-col gap-2 rounded-3xl border border-line bg-white p-7 transition hover:border-sage/50 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-sage-deep">
                    {article.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-snug text-ink">
                    {article.title}
                  </h3>
                </div>
                <p className="shrink-0 text-sm text-muted">{formatArticleDate(article.date)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
