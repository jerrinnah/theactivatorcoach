import Link from "next/link";
import TrustBar from "@/components/TrustBar";
import LetterSignup from "@/components/LetterSignup";
import PortraitFrame from "@/components/ui/PortraitFrame";
import ServiceIcon from "@/components/ui/ServiceIcon";
import SectionHeading from "@/components/ui/SectionHeading";
import { RichLines } from "@/components/ui/Rich";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/Button";
import { Blob, LeafBranch, PsiMark } from "@/components/ui/Ornaments";
import { beliefs, contactDetails, processSteps, serviceCards, whatsappLink } from "@/lib/siteData";
import { featuredArticles, formatArticleDate } from "@/lib/insights";
import { homePage as content } from "@/lib/pageContent";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutPreview />
      <Services />
      <Assessments />
      <Beliefs />
      <Process />
      <Insights />
      <Letter />
      <ClosingCta />
    </>
  );
}

function Hero() {
  const { hero } = content;
  return (
    <section className="relative overflow-hidden bg-cream-deep">
      <Blob className="pointer-events-none absolute -right-32 -top-40 h-[46rem] w-[46rem] text-sage-soft/50" />
      <Blob className="pointer-events-none absolute -bottom-64 -left-40 h-[34rem] w-[34rem] rotate-45 text-sage-mist" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-6 font-display text-[3rem] leading-[1.02] text-ink sm:text-[4rem] lg:text-[4.5rem]">
            <RichLines lines={hero.titleLines} />
          </h1>
          <p className="mt-7 max-w-md text-[1.0625rem] leading-[1.8] text-ink-soft">{hero.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <div className="mt-9 flex items-center gap-2.5 text-sm text-muted">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-sage-deep" aria-hidden="true">
              <path
                d="M12 3.2 5 6v5.6c0 4.2 2.9 8.1 7 9.2 4.1-1.1 7-5 7-9.2V6l-7-2.8Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="m9.2 12 2 2 3.6-4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {hero.reassurance}
          </div>
        </div>

        <div className="relative">
          <LeafBranch className="pointer-events-none absolute -left-10 top-8 z-10 hidden h-64 w-32 text-sage/40 lg:block" />
          <PortraitFrame
            src={hero.portrait.image}
            alt={hero.portrait.alt}
            aspect="aspect-[4/5]"
            priority
            label={hero.portrait.label}
            className="shadow-xl shadow-sage-deep/10"
          />
          <div className="absolute -bottom-6 -left-4 max-w-[15rem] rounded-3xl border border-line bg-white/95 p-5 shadow-lg shadow-sage-deep/10 backdrop-blur sm:-left-8">
            <p className="font-display text-3xl text-sage-deep">{hero.badge.value}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{hero.badge.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  const { aboutPreview } = content;
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.1fr] lg:gap-16 lg:px-8 lg:py-24">
        <PortraitFrame
          src={aboutPreview.portrait.image}
          alt={aboutPreview.portrait.alt}
          aspect="aspect-[4/5]"
          label={aboutPreview.portrait.label}
        />

        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow={aboutPreview.eyebrow}
            title={aboutPreview.title}
            intro={
              <>
                {aboutPreview.paragraphs.map((paragraph, index) => (
                  <p key={paragraph} className={index > 0 ? "mt-4" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </>
            }
          />
          <p className="mt-6 font-display text-2xl leading-snug text-sage-deep">
            {aboutPreview.quote}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href={aboutPreview.cta.href} variant="outline">
              {aboutPreview.cta.label}
            </ButtonLink>
            <p className="text-sm text-muted">{aboutPreview.credentialLine}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { services } = content;
  return (
    <section className="relative overflow-hidden border-y border-line bg-cream-deep">
      <LeafBranch className="pointer-events-none absolute -right-10 top-16 h-80 w-40 text-sage/15" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          intro={services.intro}
          align="center"
        />

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
              <h3 className="mt-6 font-display text-[1.75rem] leading-tight text-ink">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-sage-deep">{card.tagline}</p>
              <p className="mt-4 flex-1 text-[0.9375rem] leading-7 text-muted">{card.description}</p>
              <div className="mt-7 flex items-center justify-between border-t border-line-soft pt-5">
                <span className="text-xs text-muted">{card.meta}</span>
                <span className="text-sm text-sage-deep transition group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ButtonLink href={services.cta.href} variant="outline">
            {services.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Assessments() {
  const { assessments } = content;

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow={assessments.eyebrow}
          title={assessments.title}
          intro={assessments.intro}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {assessments.cards.map((item) => (
            <div
              key={item.href}
              className="relative overflow-hidden rounded-4xl bg-sage-dark p-9 text-sage-soft sm:p-11"
            >
              <PsiMark className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-white/[0.06]" />
              <p className="relative text-[0.6875rem] uppercase tracking-[0.2em] text-sage-soft/70">
                {item.eyebrow}
              </p>
              <h3 className="relative mt-4 font-display text-[2.25rem] leading-tight text-white">
                {item.title}
              </h3>
              <p className="relative mt-4 text-[0.9375rem] leading-7 text-sage-soft/85">
                {item.body}
              </p>
              <div className="relative mt-8">
                <ButtonLink href={item.href} variant="light">
                  {item.cta}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Beliefs() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-sage-mist">
      <LeafBranch className="pointer-events-none absolute -left-12 top-10 h-80 w-40 text-sage/25" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow={content.beliefs.eyebrow}
          title={content.beliefs.title}
          align="center"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {beliefs.map((belief) => (
            <div key={belief.title} className="rounded-4xl border border-sage/25 bg-white/80 p-8">
              <h3 className="font-display text-[1.6rem] leading-snug text-ink">{belief.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">{belief.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow={content.process.eyebrow}
          title={content.process.title}
          intro={content.process.intro}
        />
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li key={step.step} className="relative">
              <span className="font-display text-5xl text-sage/45">{step.step}</span>
              <h3 className="mt-3 font-display text-2xl text-ink">{step.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section className="border-t border-line bg-cream-deep">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={content.insights.eyebrow} title={content.insights.title} />
          <ButtonLink href={content.insights.cta.href} variant="outline">
            {content.insights.cta.label}
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredArticles.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group flex flex-col rounded-4xl border border-line bg-white p-8 transition hover:-translate-y-1 hover:border-sage/50 hover:shadow-xl hover:shadow-sage-deep/8"
            >
              <span className="inline-flex w-fit rounded-full bg-sage-mist px-3 py-1 text-[0.6875rem] uppercase tracking-[0.14em] text-sage-deep">
                {article.category}
              </span>
              <h3 className="mt-5 font-display text-[1.7rem] leading-snug text-ink">
                {article.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-7 text-muted">{article.excerpt}</p>
              <p className="mt-6 border-t border-line-soft pt-5 text-xs text-muted">
                {formatArticleDate(article.date)} · {article.readingMinutes} min read
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Letter() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <div className="rounded-4xl border border-line bg-white p-9 sm:p-12">
          <SectionHeading
            eyebrow={content.letter.eyebrow}
            title={content.letter.title}
            intro={content.letter.intro}
          />
          <div className="mt-8">
            <LetterSignup />
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  const { closing } = content;
  return (
    <section className="relative overflow-hidden bg-sage-mist">
      <LeafBranch className="pointer-events-none absolute -left-14 bottom-0 h-96 w-48 text-sage/30" />
      <PsiMark className="pointer-events-none absolute -right-10 top-1/4 h-72 w-72 text-sage/15" />

      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
        <svg viewBox="0 0 24 24" fill="none" className="mx-auto h-7 w-7 text-sage-deep" aria-hidden="true">
          <path
            d="M12 20.4S3.8 15.5 3.8 9.6A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8.2 2.4c0 5.9-8.2 10.8-8.2 10.8Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>

        <h2 className="mt-7 font-display text-[2.5rem] leading-[1.08] text-ink sm:text-[3.25rem]">
          <RichLines lines={closing.titleLines} />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">
          {closing.intro}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href={closing.primaryCta.href} size="lg">
            {closing.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={whatsappLink} variant="outline" size="lg">
            <WhatsAppIcon />
            {closing.whatsappCtaLabel}
          </ButtonLink>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
          <a href={`mailto:${contactDetails.email}`} className="underline-offset-4 hover:text-sage-deep hover:underline">
            {contactDetails.email}
          </a>
          <span aria-hidden="true" className="hidden h-4 w-px bg-line sm:block" />
          <a
            href={contactDetails.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-sage-deep hover:underline"
          >
            {contactDetails.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}
