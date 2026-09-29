import type { Metadata } from "next";
import TrustBar from "@/components/TrustBar";
import PortraitFrame from "@/components/ui/PortraitFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch, PsiMark } from "@/components/ui/Ornaments";
import { beliefs } from "@/lib/siteData";
import { aboutPage as content } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-40 -top-44 h-[40rem] w-[40rem] text-sage-soft/45" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1 className="mt-5 font-display text-[2.75rem] leading-[1.04] text-ink sm:text-[3.75rem]">
              {content.hero.title}
            </h1>
            <div className="mt-7 space-y-5 text-lg leading-[1.8] text-ink-soft">
              {content.hero.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            <LeafBranch className="pointer-events-none absolute -left-10 top-10 z-10 hidden h-64 w-32 text-sage/40 lg:block" />
            <PortraitFrame
              src={content.hero.portrait.image}
              alt={content.hero.portrait.alt}
              aspect="aspect-[4/5]"
              priority
              label={content.hero.portrait.label}
              className="shadow-xl shadow-sage-deep/10"
            />
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow={content.beliefs.eyebrow}
            title={content.beliefs.title}
            intro={content.beliefs.intro}
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {beliefs.map((belief) => (
              <div key={belief.title} className="rounded-4xl border border-line bg-white p-8">
                <h3 className="font-display text-[1.6rem] leading-snug text-ink">{belief.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">{belief.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-line bg-sage-mist">
        <PsiMark className="pointer-events-none absolute -right-10 top-1/4 h-72 w-72 text-sage/15" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow={content.notForYou.eyebrow}
            title={content.notForYou.title}
          />
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.8] text-ink-soft">
            {content.notForYou.intro}
          </p>
          <ul className="mt-9 space-y-4">
            {content.notForYou.items.map((item) => (
              <li
                key={item}
                className="flex gap-4 rounded-3xl border border-sage/25 bg-white/80 p-6 text-[1.0625rem] leading-7 text-ink-soft"
              >
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow={content.credentials.eyebrow}
            title={content.credentials.title}
          />
          <dl className="mt-12 grid gap-6 sm:grid-cols-2">
            {content.credentials.items.map((item) => (
              <div key={item.label} className="rounded-4xl border border-line bg-white p-7">
                <dt className="font-display text-2xl leading-snug text-ink">{item.label}</dt>
                <dd className="mt-2.5 text-[0.9375rem] leading-7 text-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sage-dark">
        <LeafBranch className="pointer-events-none absolute -left-14 bottom-0 h-96 w-48 text-white/[0.07]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <h2 className="font-display text-[2.5rem] leading-tight text-white sm:text-[3rem]">
            {content.closing.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.8] text-sage-soft/85">
            {content.closing.intro}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={content.closing.primaryCta.href} variant="light" size="lg">
              {content.closing.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={content.closing.secondaryCta.href} variant="onDark" size="lg">
              {content.closing.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
