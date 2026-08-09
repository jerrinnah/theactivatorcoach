import type { Metadata } from "next";
import TrustBar from "@/components/TrustBar";
import PortraitFrame, { portraits } from "@/components/ui/PortraitFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch, PsiMark } from "@/components/ui/Ornaments";
import { beliefs, practitioner } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dr. Lauretta Ogbum came into psychotherapy from risk assessment in the energy sector. Twenty-five years married, PhD in Psychology, and an assessor's discipline applied to relationships.",
};

const credentials = [
  { label: "PhD, Psychology", detail: "Doctoral training in psychology and psychotherapeutic practice." },
  {
    label: "Executive Council, Life Coaches Association of Nigeria",
    detail: "Serving on the executive council of the national professional body.",
  },
  {
    label: "Founder & Lead Therapist, Activator Coaching Academy",
    detail: "Training coaches, pastoral workers and practitioners in relational assessment and repair.",
  },
  {
    label: "Bestselling co-author — The ABC of Marriage",
    detail:
      "An alphabetical guide to activating bliss in your marriage, written with Johnson Ogbum.",
  },
  {
    label: "Pan-African Impact & Leadership Laureate nominee",
    detail: "Recognised for work on relational health across the continent and diaspora.",
  },
  {
    label: "Featured in Her Network",
    detail: "Writing and commentary on relationships, risk, and the private cost of public careers.",
  },
];

const notForYou = [
  "You want someone to confirm that your partner is the problem.",
  "You want a verdict on whether to stay or go, delivered by me.",
  "You want it fixed in three sessions because twenty years is inconvenient.",
  "You want a diagnosis of somebody who is not in the room.",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-40 -top-44 h-[40rem] w-[40rem] text-sage-soft/45" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.85fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="eyebrow">From risk assessment to the human heart</p>
            <h1 className="mt-5 font-display text-[2.75rem] leading-[1.04] text-ink sm:text-[3.75rem]">
              I did not begin in psychology.
            </h1>
            <div className="mt-7 space-y-5 text-lg leading-[1.8] text-ink-soft">
              <p>
                My early career was in the energy sector, in security and risk assessment. My job was
                to look at a system and answer one question honestly: where is this exposed, and what
                happens when that point fails?
              </p>
              <p>
                Catastrophes are almost never sudden — they are the visible moment of a failure that
                has been quietly accumulating for a long time, in a place nobody was looking.
              </p>
              <p>
                Then I started noticing the same pattern in people. Capable, senior, accomplished
                people would go home to relationships they had no framework for at all: no
                assessment, no maintenance, no repair protocol. Just hope, and the assumption that
                love would cover what nobody had ever been taught to build.
              </p>
              <p>
                I have spent the years since bringing an assessor&apos;s discipline to work that is
                usually done with nothing but good intentions.
              </p>
            </div>
          </div>

          <div className="relative">
            <LeafBranch className="pointer-events-none absolute -left-10 top-10 z-10 hidden h-64 w-32 text-sage/40 lg:block" />
            <PortraitFrame
              src={portraits.about}
              alt={`${practitioner.shortName}, psychotherapist`}
              aspect="aspect-[4/5]"
              priority
              label={practitioner.shortName}
              className="shadow-xl shadow-sage-deep/10"
            />
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="What I believe"
            title="Four things I will say out loud"
            intro="These are not marketing lines. They are the assumptions everything in my practice is built on, and it is fair for you to know them before you book anything."
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
          <SectionHeading eyebrow="Being straight with you" title="When I am not the right person" />
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.8] text-ink-soft">
            I would rather tell you this now than take a booking and disappoint you at session three.
            If any of the following is what you are looking for, I am not it — and in the free
            conversation I will say so and point you somewhere better.
          </p>
          <ul className="mt-9 space-y-4">
            {notForYou.map((item) => (
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
          <SectionHeading eyebrow="Credentials" title="Training, practice and public work" />
          <dl className="mt-12 grid gap-6 sm:grid-cols-2">
            {credentials.map((item) => (
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
            Twenty-five years married.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.8] text-sage-soft/85">
            Which does not make me an authority on your marriage. It does mean I have made most of
            the ordinary mistakes personally, before I ever saw them professionally.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="light" size="lg">
              Book a free conversation
            </ButtonLink>
            <ButtonLink href="/insights/twenty-five-years-married" variant="onDark" size="lg">
              Nine things I&apos;d tell my younger self
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
