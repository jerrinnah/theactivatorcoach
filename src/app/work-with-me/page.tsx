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

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Six ways to work with Dr. Lauretta Ogbum — individual and couples therapy, premarital work, the Annual Review, Intensives and Diaspora sessions. Fees shown in ₦, £ or $.",
};

const comparison: {
  service: string;
  href: string;
  who: string;
  length: string;
  price: PriceKey;
  priceLabel: string;
}[] = [
  {
    service: "Individual Therapy",
    href: "/individual-therapy",
    who: "One person, patterns that repeat",
    length: "50 min · 8–16 sessions",
    price: "individualSession",
    priceLabel: "per session",
  },
  {
    service: "Couples Therapy",
    href: "/couples-therapy",
    who: "Two people, still willing",
    length: "75–90 min · 8–12 sessions",
    price: "couplesSession",
    priceLabel: "per session",
  },
  {
    service: "Before You Marry",
    href: "/before-you-marry",
    who: "Engaged, or seriously considering",
    length: "5 × 75 min",
    price: "beforeYouMarry",
    priceLabel: "full programme",
  },
  {
    service: "The Annual Review",
    href: "/annual-review",
    who: "Couples who are genuinely fine",
    length: "120 min · yearly",
    price: "annualReview",
    priceLabel: "per review",
  },
  {
    service: "The Intensive",
    href: "/the-intensive",
    who: "Crisis, or no time for weekly",
    length: "1–2 full days",
    price: "intensiveOneDay",
    priceLabel: "from, one day",
  },
  {
    service: "Diaspora Sessions",
    href: "/diaspora",
    who: "Nigerians abroad",
    length: "50–90 min · out of hours",
    price: "diasporaIndividual",
    priceLabel: "from, individual",
  },
];

export default function WorkWithMePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-44 -top-44 h-[40rem] w-[40rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">Work with me</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            Every piece of work here starts the same way.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">
            A free fifteen-minute conversation. There is no charge, no obligation, and nothing goes
            on record. You describe what is happening; I tell you honestly which of these — if any —
            is the right one.
          </p>
          <div className="mt-9">
            <ButtonLink href="/contact" size="lg">
              Book that conversation
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow="The six services" title="Choose where to start" />
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
            <SectionHeading eyebrow="Fees" title="Side by side" />
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.16em] text-muted">Show fees in</span>
              <CurrencyToggle />
            </div>
          </div>

          <div className="mt-10 overflow-x-auto rounded-4xl border border-line bg-white">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">
                Comparison of services, who each is for, session length and fee
              </caption>
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-[0.14em] text-muted">
                  <th scope="col" className="px-7 py-5 font-medium">
                    Service
                  </th>
                  <th scope="col" className="px-7 py-5 font-medium">
                    Who it&apos;s for
                  </th>
                  <th scope="col" className="px-7 py-5 font-medium">
                    Format
                  </th>
                  <th scope="col" className="px-7 py-5 text-right font-medium">
                    Fee
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
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
                        <Price amount={row.price} />
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">{row.priceLabel}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">
            Block and programme rates carry a saving on the per-session fee — see each service page
            for the full breakdown. A limited number of reduced-fee places are held at any time; if
            cost is the only thing in the way, say so in your first conversation.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="What happens"
            title="Four steps, and you can stop at any of them"
            intro="Nothing here is a commitment you cannot withdraw from."
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
            Not sure which one?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">
            Most people aren&apos;t. That is what the free conversation is for — and if you would
            rather look at it privately first, either assessment will tell you a great deal in ten
            minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" size="lg">
              Book a free conversation
            </ButtonLink>
            <ButtonLink href="/self-audit" variant="outline" size="lg">
              Take the Self-Audit
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
