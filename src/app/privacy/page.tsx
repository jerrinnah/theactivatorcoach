import type { Metadata } from "next";
import Link from "next/link";
import { contactDetails, practitioner } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Privacy & Confidentiality",
  description:
    "How enquiries, assessment answers and clinical notes are handled — what is stored, what is not, and the limits of confidentiality.",
};

const sections = [
  {
    title: "The assessments store nothing",
    body: [
      "The Self-Audit and the Relational Risk Assessment run entirely inside your browser. Your answers are not sent anywhere, not saved to any account, and not visible to me. Closing or refreshing the page clears them permanently.",
      "There is no login, no submission step, and no result emailed to you. If you want a copy, use the print/save button on the results screen — that file is yours and exists only on your device.",
    ],
  },
  {
    title: "What the contact form collects",
    body: [
      "The name, email address, topic, preferred reply method and message you enter. It is used for one purpose: replying to you.",
      "Enquiries are not added to a marketing list, not shared with anyone, and not sold. If you decide not to proceed, say so and your enquiry is deleted.",
    ],
  },
  {
    title: "The Activator Letter",
    body: [
      "Only your email address is held, and only to send the letter. It is never shared or sold. Every letter carries a one-click unsubscribe that takes effect immediately.",
    ],
  },
  {
    title: "Clinical confidentiality",
    body: [
      "What is said in a session stays in the session. Notes are kept securely, held only as long as professional standards require, and are not shared with your family, employer, or anyone else without your written consent.",
      "In couples work I hold information from individual sessions carefully. I will not keep a secret that makes the couples work dishonest, and I will tell you that before those sessions rather than afterwards.",
    ],
  },
  {
    title: "The limits of confidentiality",
    body: [
      "There are narrow circumstances in which I may need to act without your consent: where there is a serious and immediate risk to your life or someone else's, where a child or vulnerable adult is at risk of harm, or where I am required to disclose by law or a court.",
      "These are rare. Wherever it is safe and possible to do so, I will discuss it with you first rather than acting behind you.",
    ],
  },
  {
    title: "This website",
    body: [
      "The site does not run advertising trackers or third-party analytics profiling, and it does not set marketing cookies.",
      "Standard server logs may record technical information such as IP address and browser type as part of ordinary hosting operation.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You may ask what information is held about you, ask for corrections, or ask for it to be deleted where there is no professional or legal obligation to retain it. Email the practice and it will be handled.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-line bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="eyebrow">Privacy & confidentiality</p>
          <h1 className="mt-5 font-display text-[2.5rem] leading-[1.06] text-ink sm:text-[3.25rem]">
            What is kept, and what isn&apos;t.
          </h1>
          <p className="mt-6 text-lg leading-[1.8] text-ink-soft">
            People considering therapy are entitled to know exactly what happens to their
            information before they hand any of it over. This is that, in plain language.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl space-y-12 px-6 py-16 lg:px-8">
          {sections.map((section) => (
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
            <h2 className="font-display text-2xl text-ink">Questions about any of this</h2>
            <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">
              Ask before you book rather than afterwards — it is a completely reasonable thing to
              want settled first.
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
                Contact form
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted">
              Data controller: {practitioner.fullName}, {contactDetails.location}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
