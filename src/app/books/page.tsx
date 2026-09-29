import type { Metadata } from "next";
import Image from "next/image";
import LetterSignup from "@/components/LetterSignup";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import { contactDetails } from "@/lib/siteData";
import { booksPage as content } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  openGraph: {
    title: content.seo.shareTitle,
    description: content.seo.shareDescription,
    images: [content.hero.cover.image],
  },
};

export default function BooksPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-44 -top-40 h-[36rem] w-[36rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-12 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.5rem]">
                {content.hero.title}
              </h1>
              <p className="mt-4 text-lg text-sage-deep">{content.hero.subtitle}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">
                {content.hero.byline}
              </p>

              <div className="mt-7 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
                {content.hero.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={content.hero.primaryCta.href} size="lg">
                  {content.hero.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={`mailto:${contactDetails.email}`} variant="outline" size="lg">
                  {content.hero.secondaryCtaLabel}
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm text-muted">{content.hero.note}</p>
            </div>

            <div className="mx-auto w-full max-w-xs lg:max-w-sm">
              <Image
                src={content.hero.cover.image}
                alt={content.hero.cover.alt}
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
            eyebrow={content.uses.eyebrow}
            title={content.uses.title}
            intro={content.uses.intro}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {content.uses.items.map((use) => (
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
            <p className="eyebrow">{content.letter.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl text-ink">{content.letter.title}</h2>
            <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{content.letter.intro}</p>
            <div className="mt-6">
              <LetterSignup />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
