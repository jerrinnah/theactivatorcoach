import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch, PsiMark } from "@/components/ui/Ornaments";
import { contactDetails } from "@/lib/siteData";
import { academyPage as content } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function AcademyPage() {
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
            <ButtonLink href={content.hero.cta.href} size="lg">
              {content.hero.cta.label}
            </ButtonLink>
            <ButtonLink href={`mailto:${contactDetails.academyEmail}`} variant="outline" size="lg">
              {contactDetails.academyEmail}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow={content.audience.eyebrow}
                title={content.audience.title}
                intro={content.audience.intro}
              />
            </div>
            <ul className="space-y-4 self-center">
              {content.audience.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3.5 rounded-3xl border border-line bg-white p-5 text-[0.9375rem] leading-7 text-ink-soft"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="mt-1 h-4 w-4 shrink-0 text-sage-deep" aria-hidden="true">
                    <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow={content.curriculum.eyebrow}
            title={content.curriculum.title}
            intro={content.curriculum.intro}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.curriculum.modules.map((module) => (
              <div key={module.number} className="rounded-4xl border border-line bg-white p-8">
                <span className="font-display text-4xl text-sage/50">{module.number}</span>
                <h3 className="mt-3 font-display text-2xl leading-snug text-ink">{module.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{module.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <div className="rounded-4xl border border-line bg-white p-9 sm:p-12">
            <h2 className="font-display text-3xl text-ink">{content.joining.title}</h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
              {content.joining.intro}
            </p>
            <ol className="mt-8 space-y-5">
              {content.joining.steps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-mist text-sm text-sage-deep">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-[0.9375rem] leading-7 text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm leading-6 text-muted">{content.joining.note}</p>
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
          <div className="mt-8 flex justify-center">
            <ButtonLink href={content.closing.cta.href} size="lg">
              {content.closing.cta.label}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
