import type { Metadata } from "next";
import TrustBar from "@/components/TrustBar";
import PortraitFrame from "@/components/ui/PortraitFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import Rich from "@/components/ui/Rich";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch, PsiMark } from "@/components/ui/Ornaments";
import { beliefs } from "@/lib/siteData";
import { aboutPage as content } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function AboutPage() {
  const { hero, approach, helpWith, credentials, book, closing } = content;
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-40 -top-44 h-[40rem] w-[40rem] text-sage-soft/45" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="mt-5 font-display text-[2.75rem] leading-[1.04] text-ink sm:text-[3.75rem]">
              {hero.title}
            </h1>
            <div className="mt-7 space-y-5 text-lg leading-[1.8] text-ink-soft">
              {hero.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            <LeafBranch className="pointer-events-none absolute -left-10 top-10 z-10 hidden h-64 w-32 text-sage/40 lg:block" />
            <PortraitFrame
              src={hero.portrait.image}
              alt={hero.portrait.alt}
              aspect="aspect-[4/5]"
              priority
              label={hero.portrait.label}
              className="shadow-xl shadow-sage-deep/10"
            />
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={approach.eyebrow} title={approach.title} />
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.8] text-ink-soft">
            {approach.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-line bg-sage-mist">
        <PsiMark className="pointer-events-none absolute -right-10 top-1/4 h-72 w-72 text-sage/15" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={helpWith.eyebrow} title={helpWith.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {helpWith.items.map((item) => (
              <div key={item.title} className="rounded-4xl border border-sage/25 bg-white/80 p-8">
                <h3 className="font-display text-[1.6rem] leading-snug text-ink">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-[1.0625rem] leading-[1.8] text-ink-soft">{helpWith.note}</p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow={content.beliefs.eyebrow}
            title={content.beliefs.title}
            intro={content.beliefs.intro}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {beliefs.map((belief, index) => (
              <div key={belief.title} className="rounded-4xl border border-line bg-white p-8">
                <span className="font-display text-4xl text-sage/50">{index + 1}</span>
                <h3 className="mt-3 font-display text-[1.6rem] leading-snug text-ink">{belief.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">{belief.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading eyebrow={credentials.eyebrow} title={credentials.title} />
          <dl className="mt-12 grid gap-6 sm:grid-cols-2">
            {credentials.items.map((item) => (
              <div key={item.label} className="rounded-4xl border border-line bg-white p-7">
                <dt className="font-display text-2xl leading-snug text-ink">{item.label}</dt>
                <dd className="mt-2.5 text-[0.9375rem] leading-7 text-muted">
                  <Rich text={item.detail} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-3xl text-[1.0625rem] leading-[1.8] text-ink-soft">{credentials.note}</p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <div className="rounded-4xl border border-line bg-white p-9 sm:p-12">
            <p className="eyebrow">{book.eyebrow}</p>
            <h2 className="mt-4 font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">
              {book.title}
            </h2>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">{book.byline}</p>
            <p className="mt-5 text-lg text-sage-deep">{book.intro}</p>
            <div className="mt-8">
              <ButtonLink href={book.cta.href}>{book.cta.label}</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sage-dark">
        <LeafBranch className="pointer-events-none absolute -left-14 bottom-0 h-96 w-48 text-white/[0.07]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <h2 className="font-display text-[2.5rem] leading-tight text-white sm:text-[3rem]">{closing.title}</h2>
          <div className="mx-auto mt-6 max-w-xl space-y-4 text-[1.0625rem] leading-[1.8] text-sage-soft/85">
            {closing.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl font-display text-2xl leading-snug text-white">{closing.tagline}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={closing.primaryCta.href} variant="light" size="lg">
              {closing.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={closing.secondaryCta.href} variant="onDark" size="lg">
              {closing.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
