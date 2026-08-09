import type { Metadata } from "next";
import Image from "next/image";
import LetterSignup from "@/components/LetterSignup";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import { contactDetails } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Books",
  description:
    "The ABC of Marriage — an alphabetical guide to activating bliss in your marriage, by Lauretta & Johnson Ogbum.",
  openGraph: {
    title: "The ABC of Marriage",
    description:
      "An alphabetical guide to activating bliss in your marriage, by Lauretta & Johnson Ogbum.",
    images: ["/abc-of-marriage.jpg"],
  },
};

const uses = [
  {
    title: "For couples",
    body: "Read a letter at a time, together. The alphabetical structure means you can start anywhere and finish nothing — which is exactly how most couples actually read.",
  },
  {
    title: "For marriage preparation",
    body: "Used alongside the Before You Marry programme as a shared reference, so both of you are working from the same language.",
  },
  {
    title: "For churches and groups",
    body: "The structure lends itself to small-group study — one entry per session. Bulk pricing is available on request.",
  },
  {
    title: "As a gift",
    body: "Frequently bought for weddings, anniversaries and engagements. Ask about signed copies when you order.",
  },
];

export default function BooksPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-44 -top-40 h-[36rem] w-[36rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-12 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="eyebrow">Books</p>
              <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.5rem]">
                The ABC of Marriage
              </h1>
              <p className="mt-4 text-lg text-sage-deep">
                An alphabetical guide to activating bliss in your marriage.
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">
                By Lauretta &amp; Johnson Ogbum
              </p>

              <div className="mt-7 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
                <p>
                  A bestselling book on marriage, written by two people who have been in one for
                  twenty-five years — and who work with other people&apos;s for a living.
                </p>
                <p>
                  It is organised alphabetically rather than as an argument, which means you can open
                  it at whatever you happen to need this week and put it down again. Marriages are
                  not repaired in one sitting, and the book does not pretend otherwise.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg">
                  Ask about copies
                </ButtonLink>
                <ButtonLink href={`mailto:${contactDetails.email}`} variant="outline" size="lg">
                  Bulk &amp; church orders
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm text-muted">
                Retail links are being finalised — email in the meantime and copies will be arranged
                directly.
              </p>
            </div>

            <div className="mx-auto w-full max-w-xs lg:max-w-sm">
              <Image
                src="/abc-of-marriage.jpg"
                alt="Front cover of The ABC of Marriage by Lauretta and Johnson Ogbum"
                width={512}
                height={768}
                priority
                sizes="(min-width: 1024px) 24rem, 20rem"
                className="w-full rounded-2xl shadow-2xl shadow-sage-deep/25"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="How people use it"
            title="Four ways it gets read"
            intro="An alphabetical guide is a reference, not a course. That is deliberate — it survives being picked up and put down, which is the only reading pattern a busy marriage actually supports."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {uses.map((use) => (
              <div key={use.title} className="rounded-4xl border border-line bg-white p-8">
                <h3 className="font-display text-2xl text-ink">{use.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{use.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <div className="rounded-4xl border border-line bg-white p-9 sm:p-12">
            <p className="eyebrow">The Activator Letter</p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              Hear about new writing and new editions.
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-7 text-muted">
              One letter a month from the practice. Subscribers hear about new work first.
            </p>
            <div className="mt-6">
              <LetterSignup />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
