import type { Metadata } from "next";
import Link from "next/link";
import QuietExit from "@/components/QuietExit";
import Rich from "@/components/ui/Rich";
import { contactDetails } from "@/lib/siteData";
import { crisisPage as content } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  robots: { index: true, follow: true },
};

/**
 * ⚠️ VERIFY BEFORE PUBLISHING CHANGES.
 *
 * The resource list is editable in the admin, but publishing a wrong crisis
 * number is worse than publishing none. Confirm every number and link directly
 * with the organisation before it goes live, and re-check periodically —
 * helpline numbers change. Recommended additions once confirmed:
 *   • Lagos State DSVA / DSVRT domestic & sexual violence helpline
 *   • Mentally Aware Nigeria Initiative (MANI) helpline
 *   • Nigeria Suicide Prevention Initiative
 *   • Rivers State / Port Harcourt local services
 */

export default function CrisisPage() {
  return (
    <>
      <QuietExit />

      <section className="border-b border-line bg-amber-50">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-amber-800">
            {content.hero.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[2.5rem] leading-[1.06] text-ink sm:text-[3.5rem]">
            {content.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.8] text-ink-soft">
            {content.hero.intro}
          </p>
          <a
            href={content.hero.emergencyHref}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-red-700 px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-red-800"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path
                d="M6.2 3.6h3.2l1.6 4-2 1.4a11.5 11.5 0 0 0 6 6l1.4-2 4 1.6v3.2a1.6 1.6 0 0 1-1.7 1.6C10.9 19.9 4.1 13.1 3.4 5.3a1.6 1.6 0 0 1 1.6-1.7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            {content.hero.emergencyLabel}
          </a>
          <p className="mt-4 text-sm text-muted">{content.hero.note}</p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <h2 className="font-display text-[2rem] leading-tight text-ink">
            {content.resources.title}
          </h2>
          <div className="mt-8 space-y-5">
            {content.resources.items.map((resource) => (
              <div
                key={resource.name}
                className={`rounded-4xl border p-8 ${
                  resource.urgent ? "border-red-200 bg-red-50/50" : "border-line bg-white"
                }`}
              >
                <h3 className="font-display text-2xl text-ink">{resource.name}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">{resource.detail}</p>
                <a
                  href={resource.href}
                  target={resource.href.startsWith("http") ? "_blank" : undefined}
                  rel={resource.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-5 inline-flex rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition hover:bg-ink hover:text-white"
                >
                  {resource.action} →
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 rounded-3xl border border-line bg-cream-deep p-6 text-sm leading-6 text-muted">
            {content.resources.note}
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {[content.ifUnsafe, content.ifSuicidal].map((panel) => (
              <div key={panel.title} className="rounded-4xl border border-line bg-white p-8">
                <h2 className="font-display text-[1.75rem] leading-snug text-ink">{panel.title}</h2>
                <ul className="mt-5 space-y-4">
                  {panel.items.map((item) => (
                    <li key={item} className="flex gap-3.5 text-[0.9375rem] leading-7 text-ink-soft">
                      <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <div className="rounded-4xl bg-sage-dark p-9 text-sage-soft sm:p-12">
            <h2 className="font-display text-3xl text-white">{content.coveringTracks.title}</h2>
            <div className="mt-5 space-y-4 text-[0.9375rem] leading-7 text-sage-soft/85">
              {content.coveringTracks.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <Rich text={paragraph} strongClassName="text-white" />
                </p>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-4xl border border-line bg-white p-9">
            <h2 className="font-display text-2xl text-ink">{content.whenSafe.title}</h2>
            <p className="mt-4 text-[0.9375rem] leading-7 text-ink-soft">{content.whenSafe.intro}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link
                href={content.whenSafe.cta.href}
                className="rounded-full bg-sage-deep px-6 py-3 font-medium text-white transition hover:bg-sage-dark"
              >
                {content.whenSafe.cta.label}
              </Link>
              <a
                href={`mailto:${contactDetails.email}`}
                className="rounded-full border border-line px-6 py-3 text-ink-soft transition hover:bg-sage-mist"
              >
                {contactDetails.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
