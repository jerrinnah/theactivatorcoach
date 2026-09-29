import type { Metadata } from "next";
import Link from "next/link";
import CurrencyToggle from "@/components/CurrencyToggle";
import Price from "@/components/Price";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import { processSteps, serviceCards } from "@/lib/siteData";
import type { PriceKey } from "@/lib/pricing";
import { workWithMePage as content } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function WorkWithMePage() {
  const { fees } = content;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-44 -top-44 h-[40rem] w-[40rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            {content.hero.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">
            {content.hero.intro}
          </p>
          <div className="mt-9">
            <ButtonLink href={content.hero.cta.href} size="lg">
              {content.hero.cta.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={content.services.eyebrow} title={content.services.title} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col rounded-4xl border border-line bg-white p-8 transition duration-200 hover:-translate-y-1 hover:border-sage/50 hover:shadow-xl hover:shadow-sage-deep/8"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-mist text-sage-deep transition group-hover:bg-sage-soft">
                  <ServiceIcon name={card.icon} className="h-7 w-7" />
                </span>
                <h2 className="mt-6 font-display text-[1.75rem] leading-tight text-ink">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm text-sage-deep">{card.tagline}</p>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-7 text-muted">
                  {card.description}
                </p>
                <div className="mt-7 flex items-center justify-between border-t border-line-soft pt-5">
                  <span className="text-xs text-muted">{card.meta}</span>
                  <span className="text-sm text-sage-deep transition group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={fees.eyebrow} title={fees.title} />
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.16em] text-muted">
                {fees.toggleLabel}
              </span>
              <CurrencyToggle />
            </div>
          </div>

          <div className="mt-10 overflow-x-auto rounded-4xl border border-line bg-white">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">{fees.tableCaption}</caption>
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
                  <th scope="col" className="px-7 py-5 font-medium">
                    {fees.columns.service}
                  </th>
                  <th scope="col" className="px-7 py-5 font-medium">
                    {fees.columns.who}
                  </th>
                  <th scope="col" className="px-7 py-5 font-medium">
                    {fees.columns.format}
                  </th>
                  <th scope="col" className="px-7 py-5 text-right font-medium">
                    {fees.columns.fee}
                  </th>
                </tr>
              </thead>
              <tbody>
                {fees.rows.map((row) => (
                  <tr key={row.href} className="border-b border-line-soft last:border-0">
                    <th scope="row" className="px-7 py-6 align-top font-normal">
                      <Link
                        href={row.href}
                        className="font-display text-xl text-ink underline-offset-4 transition hover:text-sage-deep hover:underline"
                      >
                        {row.service}
                      </Link>
                    </th>
                    <td className="px-7 py-6 align-top text-sm leading-6 text-muted">{row.who}</td>
                    <td className="px-7 py-6 align-top text-sm leading-6 text-muted">
                      {row.length}
                    </td>
                    <td className="px-7 py-6 align-top text-right">
                      <span className="font-display text-2xl text-sage-dark">
                        <Price amount={row.price as PriceKey} />
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">{row.priceLabel}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">{fees.note}</p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow={content.process.eyebrow}
            title={content.process.title}
            intro={content.process.intro}
          />
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.step}>
                <span className="font-display text-5xl text-sage/45">{step.step}</span>
                <h3 className="mt-3 font-display text-2xl text-ink">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sage-mist">
        <LeafBranch className="pointer-events-none absolute -right-10 -top-6 h-72 w-40 rotate-12 text-sage/25" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
          <h2 className="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">
            {content.closing.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">
            {content.closing.intro}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={content.closing.primaryCta.href} size="lg">
              {content.closing.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={content.closing.secondaryCta.href} variant="outline" size="lg">
              {content.closing.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
