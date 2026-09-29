import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch, PsiMark } from "@/components/ui/Ornaments";
import { contactDetails } from "@/lib/siteData";
import { speakingPage as content } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function SpeakingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-44 -top-40 h-[38rem] w-[38rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            {content.hero.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">
            {content.hero.intro}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${contactDetails.speakingEmail}`} size="lg">
              {content.hero.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink href={content.hero.secondaryCta.href} variant="outline" size="lg">
              {content.hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow={content.talks.eyebrow}
            title={content.talks.title}
            intro={content.talks.intro}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {content.talks.items.map((talk) => (
              <div key={talk.title} className="rounded-4xl border border-line bg-white p-8">
                <p className="text-xs uppercase tracking-[0.16em] text-sage-deep">{talk.audience}</p>
                <h3 className="mt-4 font-display text-[1.75rem] leading-snug text-ink">
                  {talk.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{talk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <SectionHeading
              eyebrow={content.formats.eyebrow}
              title={content.formats.title}
              intro={content.formats.intro}
            />
            <ul className="grid gap-3 self-center sm:grid-cols-2">
              {content.formats.items.map((format) => (
                <li
                  key={format}
                  className="rounded-2xl border border-line bg-white px-5 py-4 text-sm leading-6 text-ink-soft"
                >
                  {format}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <div className="rounded-4xl border border-line bg-white p-9 sm:p-12">
            <h2 className="font-display text-3xl text-ink">{content.enquiry.title}</h2>
            <ul className="mt-6 space-y-3 text-[1.0625rem] leading-[1.8] text-ink-soft">
              {content.enquiry.items.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-6 text-muted">{content.enquiry.note}</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sage-mist">
        <PsiMark className="pointer-events-none absolute -right-8 top-1/4 h-64 w-64 text-sage/15" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
          <h2 className="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">
            {content.closing.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">
            {content.closing.intro}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={`mailto:${contactDetails.speakingEmail}`} size="lg">
              {contactDetails.speakingEmail}
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
