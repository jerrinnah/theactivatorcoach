import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch, PsiMark } from "@/components/ui/Ornaments";
import { contactDetails } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Speaking & Corporate",
  description:
    "Keynotes and corporate sessions on relational risk, burnout and the private cost of high-performing careers — from a psychotherapist with a background in risk assessment.",
};

const talks = [
  {
    title: "Where is this exposed?",
    audience: "Keynote · 45–60 minutes",
    body: "The five exposure points, taken from risk assessment and applied to the relationships your people go home to. The talk that most often produces a queue afterwards.",
  },
  {
    title: "The private cost of a public career",
    audience: "Corporate & leadership · 60 minutes",
    body: "What sustained high performance does to a household, why the most competent people are frequently the least maintained, and what an organisation can reasonably do about it.",
  },
  {
    title: "Repair is a skill",
    audience: "Workshop · 90 minutes–half day",
    body: "Practical repair mechanics for teams and for couples. Interactive, uncomfortable in the useful way, and immediately usable.",
  },
  {
    title: "Before you marry",
    audience: "Church, campus & community · 60–90 minutes",
    body: "The six subjects that end marriages, delivered to a room rather than a couple. Frequently booked as a marriage-preparation series.",
  },
];

const formats = [
  "Conference keynotes",
  "Leadership offsites and executive retreats",
  "Employee wellbeing and EAP programmes",
  "Church and community marriage series",
  "University and campus events",
  "Panels, podcasts and broadcast media",
];

export default function SpeakingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-44 -top-40 h-[38rem] w-[38rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">Speaking & corporate</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            Your people are competent at work and unassessed at home.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">
            I came into psychology from risk assessment in the energy sector, and I talk about
            relationships the way I used to talk about systems: where is this exposed, and what
            happens when that point fails?
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${contactDetails.speakingEmail}`} size="lg">
              Enquire about a booking
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Use the contact form
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Talks"
            title="Four sessions, adapted to your room"
            intro="Each of these can run as a keynote, a workshop, or a series. Tell me who is in the room and what you want them to leave with, and I will tell you which of these fits — or propose something else."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {talks.map((talk) => (
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
              eyebrow="Formats"
              title="Where this usually happens"
              intro="In person across Nigeria, and remotely worldwide. Corporate sessions can be paired with confidential one-to-one slots for staff on the day, which is frequently where the real work starts."
            />
            <ul className="grid gap-3 self-center sm:grid-cols-2">
              {formats.map((format) => (
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
            <h2 className="font-display text-3xl text-ink">What to include in your enquiry</h2>
            <ul className="mt-6 space-y-3 text-[1.0625rem] leading-[1.8] text-ink-soft">
              {[
                "Date, city and format — in person or remote",
                "Who is in the room, roughly how many, and what they do",
                "What you want them to leave with",
                "Session length and whether you'd like one-to-one slots alongside",
                "Whether this is a one-off or part of a series",
              ].map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-6 text-muted">
              Speaker biography, headshots and a one-page overview are available on request. Fees
              depend on format, travel and whether one-to-one slots are included — ask and you will
              get a straight number.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sage-mist">
        <PsiMark className="pointer-events-none absolute -right-8 top-1/4 h-64 w-64 text-sage/15" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
          <h2 className="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">
            Booking or media enquiry?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">
            Speaking, media and corporate enquiries go to a dedicated inbox and are answered within
            two working days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={`mailto:${contactDetails.speakingEmail}`} size="lg">
              {contactDetails.speakingEmail}
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Contact form
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
