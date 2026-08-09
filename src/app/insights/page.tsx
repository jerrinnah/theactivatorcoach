import type { Metadata } from "next";
import Link from "next/link";
import LetterSignup from "@/components/LetterSignup";
import SectionHeading from "@/components/ui/SectionHeading";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import { categories, formatArticleDate, sortedArticles } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Writing from the practice — on self-assessment, relational risk, in-laws and boundaries, faith and counselling, and what twenty-five years of marriage actually teaches.",
};

export default function InsightsPage() {
  const [lead, ...rest] = sortedArticles;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-40 -top-44 h-[38rem] w-[38rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">Insights</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            Writing from the practice.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">
            Not tips. Not listicles. Ideas I use in the room, written out properly, mostly because I
            got tired of explaining them one person at a time.
          </p>
          <div className="mt-9 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-line bg-white/70 px-4 py-2 text-xs text-ink-soft"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Lead article */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <Link
            href={`/insights/${lead.slug}`}
            className="group grid gap-8 rounded-4xl border border-line bg-white p-9 transition hover:border-sage/50 hover:shadow-xl hover:shadow-sage-deep/8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center"
          >
            <div>
              <span className="inline-flex rounded-full bg-sage-mist px-3 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-sage-deep">
                Latest · {lead.category}
              </span>
              <h2 className="mt-5 font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">
                {lead.title}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">{lead.excerpt}</p>
              <p className="mt-6 text-sm text-muted">
                {formatArticleDate(lead.date)} · {lead.readingMinutes} min read
              </p>
              <p className="mt-6 text-sm text-sage-deep transition group-hover:translate-x-0.5">
                Read the article →
              </p>
            </div>
            <div className="relative hidden aspect-square items-center justify-center rounded-[2rem] bg-sage-mist lg:flex">
              <LeafBranch className="h-3/4 w-auto text-sage/40" />
            </div>
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-cream-deep">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <SectionHeading eyebrow="Archive" title="Everything else" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group flex flex-col rounded-4xl border border-line bg-white p-8 transition hover:-translate-y-1 hover:border-sage/50 hover:shadow-lg hover:shadow-sage-deep/8"
              >
                <span className="inline-flex w-fit rounded-full bg-sage-mist px-3 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-sage-deep">
                  {article.category}
                </span>
                <h3 className="mt-5 font-display text-[1.6rem] leading-snug text-ink">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-7 text-muted">{article.excerpt}</p>
                <p className="mt-6 border-t border-line-soft pt-5 text-xs text-muted">
                  {formatArticleDate(article.date)} · {article.readingMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <div className="rounded-4xl border border-line bg-white p-9 sm:p-12">
            <SectionHeading
              eyebrow="The Activator Letter"
              title="Get the next one by email."
              intro="One idea from the practice, once a month. No sequences, no upsells, unsubscribe in one click."
            />
            <div className="mt-8">
              <LetterSignup />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
