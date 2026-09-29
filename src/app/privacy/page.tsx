import type { Metadata } from "next";
import Link from "next/link";
import { contactDetails, practitioner } from "@/lib/siteData";
import { privacyPage as content } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-line bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 className="mt-5 font-display text-[2.5rem] leading-[1.06] text-ink sm:text-[3.25rem]">
            {content.hero.title}
          </h1>
          <p className="mt-6 text-lg leading-[1.8] text-ink-soft">{content.hero.intro}</p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl space-y-12 px-6 py-16 lg:px-8">
          {content.sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-[1.875rem] leading-tight text-ink">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-4xl border border-line bg-white p-8">
            <h2 className="font-display text-2xl text-ink">{content.questions.title}</h2>
            <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">
              {content.questions.intro}
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <a
                href={`mailto:${contactDetails.email}`}
                className="rounded-full bg-sage-deep px-6 py-3 font-medium text-white transition hover:bg-sage-dark"
              >
                {contactDetails.email}
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-line px-6 py-3 text-ink-soft transition hover:bg-sage-mist"
              >
                {content.questions.contactFormLabel}
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted">
              {content.questions.controllerPrefix} {practitioner.fullName},{" "}
              {contactDetails.location}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
