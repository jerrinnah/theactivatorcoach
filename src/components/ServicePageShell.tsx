import Link from "next/link";
import QuietExit from "@/components/QuietExit";
import Price from "@/components/Price";
import CurrencyToggle from "@/components/CurrencyToggle";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import { serviceCards } from "@/lib/siteData";
import type { PriceKey } from "@/lib/pricing";

export interface ServiceSection {
  title: string;
  content: string[];
  /** Render the content as a checklist rather than paragraphs. */
  list?: boolean;
}

export interface Fee {
  label: string;
  amount: PriceKey;
  note?: string;
}

interface ServicePageShellProps {
  eyebrow: string;
  title: string;
  heroCopy: string[];
  format: string[];
  fees: Fee[];
  feeNote?: string;
  sections: ServiceSection[];
  ctaLabel: string;
  ctaHref: string;
  ctaNote?: string;
  /** Hrefs of other services to surface at the foot of the page. */
  related?: string[];
}

export default function ServicePageShell({
  eyebrow,
  title,
  heroCopy,
  format,
  fees,
  feeNote,
  sections,
  ctaLabel,
  ctaHref,
  ctaNote,
  related = [],
}: ServicePageShellProps) {
  const relatedServices = serviceCards.filter((card) => related.includes(card.href));

  return (
    <>
      <QuietExit />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] text-sage-soft/40" />
        <LeafBranch className="pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-28">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.06] text-ink sm:text-6xl">
            {title}
          </h1>
          <div className="mt-7 max-w-2xl space-y-4 text-lg leading-[1.75] text-ink-soft">
            {heroCopy.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href={ctaHref} size="lg">
              {ctaLabel}
            </ButtonLink>
            {ctaNote ? <p className="text-sm text-muted">{ctaNote}</p> : null}
          </div>
        </div>
      </section>

      {/* Format & fees */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 rounded-4xl border border-line bg-white p-8 sm:p-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl text-ink">Format</h2>
              <ul className="mt-5 space-y-3">
                {format.map((line) => (
                  <li key={line} className="flex gap-3 text-[0.9375rem] leading-7 text-ink-soft">
                    <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-sage" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:border-l lg:border-line lg:pl-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-3xl text-ink">Investment</h2>
                <CurrencyToggle />
              </div>
              <dl className="mt-5 space-y-4">
                {fees.map((fee) => (
                  <div key={fee.label} className="border-b border-line-soft pb-4 last:border-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-[0.9375rem] text-ink-soft">{fee.label}</dt>
                      <dd className="font-display text-2xl text-sage-dark">
                        <Price amount={fee.amount} />
                      </dd>
                    </div>
                    {fee.note ? <p className="mt-1 text-xs text-muted">{fee.note}</p> : null}
                  </div>
                ))}
              </dl>
              {feeNote ? <p className="mt-5 text-sm leading-6 text-muted">{feeNote}</p> : null}
            </div>
          </div>
        </div>
      </section>

      {/* Detail sections */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl space-y-14 px-6 py-16 lg:px-8 lg:py-20">
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="font-display text-[2rem] leading-tight text-ink">{section.title}</h2>
              {section.list ? (
                <ul className="mt-5 space-y-3.5">
                  {section.content.map((item) => (
                    <li key={item} className="flex gap-3.5 text-[1.0625rem] leading-[1.75] text-ink-soft">
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="mt-1.5 h-4 w-4 shrink-0 text-sage-deep"
                        aria-hidden="true"
                      >
                        <path
                          d="m4 10.5 4 4 8-9"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
                  {section.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-sage-mist">
        <LeafBranch className="pointer-events-none absolute -right-8 -top-6 h-72 w-40 rotate-12 text-sage/25" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
          <h2 className="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">
            Start with a free conversation.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.75] text-ink-soft">
            Fifteen minutes, no charge, no obligation, and nothing goes on record. You describe what
            is happening; I tell you honestly whether I am the right person for it.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/contact" size="lg">
              Book that conversation
            </ButtonLink>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 ? (
        <section className="border-t border-line bg-cream">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
            <h2 className="font-display text-3xl text-ink">You might also be looking at</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group rounded-3xl border border-line bg-white p-7 transition hover:-translate-y-0.5 hover:border-sage/50 hover:shadow-lg hover:shadow-sage-deep/5"
                >
                  <h3 className="font-display text-2xl text-ink">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{card.tagline}</p>
                  <p className="mt-6 text-sm text-sage-deep transition group-hover:translate-x-0.5">
                    Read more →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
