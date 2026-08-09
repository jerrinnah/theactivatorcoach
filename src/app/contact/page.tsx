import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import QuietExit from "@/components/QuietExit";
import { WhatsAppIcon } from "@/components/ui/Button";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import { contactDetails, whatsappLink } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Book a free fifteen-minute conversation with Dr. Lauretta Ogbum, or send an enquiry. Port Harcourt by appointment, online worldwide. Replies within two working days.",
};

const directContacts = [
  { label: "General & practice enquiries", value: contactDetails.email, href: `mailto:${contactDetails.email}` },
  { label: "Speaking, media & corporate", value: contactDetails.speakingEmail, href: `mailto:${contactDetails.speakingEmail}` },
  { label: "Academy applications", value: contactDetails.academyEmail, href: `mailto:${contactDetails.academyEmail}` },
];

const practicalities = [
  { label: "In person", value: contactDetails.location },
  { label: "Online", value: `${contactDetails.reach} — timezone-aware scheduling for diaspora clients` },
  { label: "Response time", value: contactDetails.responseTime },
  { label: "Confidentiality", value: "Enquiries are private and never shared. Nothing you send here goes on a clinical record." },
];

export default function ContactPage() {
  return (
    <>
      <QuietExit />

      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-44 -top-40 h-[38rem] w-[38rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">Contact & booking</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            Start with a free conversation.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">
            Fifteen minutes, no charge, no obligation, and nothing goes on record. You describe what
            is happening; I tell you honestly whether I am the right person for it — and if I am not,
            I will tell you who is.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14 lg:px-8 lg:py-20">
          <div className="rounded-4xl border border-line bg-white p-8 sm:p-10">
            <h2 className="font-display text-3xl text-ink">Send me a message</h2>
            <p className="mt-3 text-[0.9375rem] leading-7 text-muted">
              Everything here comes to me directly. You do not need to explain your whole situation —
              a sentence or two is enough to go on.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-4xl bg-sage-dark p-8 text-sage-soft">
              <h2 className="font-display text-2xl text-white">Prefer WhatsApp?</h2>
              <p className="mt-3 text-sm leading-7 text-sage-soft/85">
                Scheduling and admin only — please do not send clinical detail over WhatsApp.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-sage-dark transition hover:bg-sage-mist"
              >
                <WhatsAppIcon />
                {contactDetails.whatsappDisplay}
              </a>
            </div>

            <div className="rounded-4xl border border-line bg-white p-8">
              <h2 className="font-display text-2xl text-ink">Direct email</h2>
              <dl className="mt-5 space-y-4">
                {directContacts.map((item) => (
                  <div key={item.value}>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted">{item.label}</dt>
                    <dd className="mt-1">
                      <a
                        href={item.href}
                        className="text-[0.9375rem] text-sage-deep underline-offset-4 hover:underline"
                      >
                        {item.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-4xl border border-line bg-white p-8">
              <h2 className="font-display text-2xl text-ink">Practicalities</h2>
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
            <h2 className="font-display text-3xl text-ink">If your situation is urgent</h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
              This practice is not an emergency service and this form is not monitored continuously.
              If you or someone you know is in immediate danger, at risk of harm, or thinking about
              suicide, please do not wait for a reply from me.
            </p>
            <Link
              href="/crisis"
              className="mt-7 inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition hover:bg-ink-soft"
            >
              Crisis and safety resources →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
