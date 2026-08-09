import type { Metadata } from "next";
import Link from "next/link";
import LetterSignup from "@/components/LetterSignup";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import { formatArticleDate, sortedArticles } from "@/lib/insights";

export const metadata: Metadata = {
  title: "The Activator Letter",
  description:
    "One idea from the practice, written out properly, once a month. No sequences, no upsells, unsubscribe in one click.",
};

const promises = [
  {
    title: "Once a month",
    body: "Not weekly, not whenever something occurs to me. One letter, at the start of the month.",
  },
  {
    title: "One idea, properly",
    body: "A single thing from the practice, written at enough length to actually be useful. Not tips.",
  },
  {
    title: "No sequences",
    body: "You will not be dropped into an automated funnel. Nothing gets sold to you between letters.",
  },
  {
    title: "One click out",
    body: "Unsubscribe is in every email and works immediately. Your address is never shared or sold.",
  },
];

export default function LetterPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-40 -top-44 h-[38rem] w-[38rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-12 bottom-0 h-80 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">The Activator Letter</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            One letter a month. No noise.
          </h1>
          <p className="mt-7 text-lg leading-[1.8] text-ink-soft">
            One idea from the practice, written out properly and sent once a month. It is the same
            material I use in the room — occasionally something I have changed my mind about, which
            in my experience is the more interesting kind of letter.
          </p>

          <div className="mt-10 rounded-4xl border border-line bg-white p-8 sm:p-10">
            <LetterSignup />
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <h2 className="font-display text-[2.25rem] leading-tight text-ink">
            What you are agreeing to
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {promises.map((promise) => (
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
            The kind of thing you&apos;ll get
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
            These went out as letters first. If they read like something you want in your inbox, sign
            up above.
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
