import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import QuietExit from "@/components/QuietExit";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import { contactDetails } from "@/lib/siteData";
import { contactPage as content } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
};

const practicalities = [
  { label: content.practicalities.onlineLabel, value: contactDetails.reach },
  { label: content.practicalities.inPersonLabel, value: contactDetails.location },
];

export default function ContactPage() {
  return (
    <>
      <QuietExit />

      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-44 -top-40 h-[38rem] w-[38rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            {content.hero.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">{content.hero.intro}</p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14 lg:px-8 lg:py-20">
          <div className="rounded-4xl border border-line bg-white p-8 sm:p-10">
            <h2 className="font-display text-3xl text-ink">{content.form.title}</h2>
            <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{content.form.intro}</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-4xl bg-sage-dark p-8 text-sage-soft">
              <h2 className="font-display text-2xl text-white">{content.directEmail.title}</h2>
              <p className="mt-3 text-sm leading-7 text-sage-soft/85">{content.directEmail.generalLabel}</p>
              <a
                href={`mailto:${contactDetails.email}`}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-sage-dark transition hover:bg-sage-mist"
              >
                {contactDetails.email}
              </a>
            </div>

            <div className="rounded-4xl border border-line bg-white p-8">
              <h2 className="font-display text-2xl text-ink">{content.practicalities.title}</h2>
              <dl className="mt-5 space-y-4">
                {practicalities.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted">{item.label}</dt>
                    <dd className="mt-1 text-[0.9375rem] leading-6 text-ink-soft">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-cream-deep">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <div className="rounded-4xl border border-amber-300/50 bg-amber-50/60 p-8 sm:p-10">
            <h2 className="font-display text-3xl text-ink">{content.urgent.title}</h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">{content.urgent.intro}</p>
          </div>
        </div>
      </section>
    </>
  );
}
