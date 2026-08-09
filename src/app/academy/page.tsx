import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Blob, LeafBranch, PsiMark } from "@/components/ui/Ornaments";
import { contactDetails } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Activator Coaching Academy",
  description:
    "Training for coaches, pastoral workers, HR professionals and therapists who find themselves holding other people's relationships — taught by Dr. Lauretta Ogbum.",
};

const modules = [
  {
    number: "01",
    title: "Assessment before intervention",
    body: "How to find out what is actually happening in front of you before you do anything about it. The five exposure points, and how to run them in a real conversation rather than on paper.",
  },
  {
    number: "02",
    title: "The room, and your place in it",
    body: "Neutrality as a practical skill. How to refuse recruitment onto a side, hold two accounts at once, and notice the moment you have started taking one.",
  },
  {
    number: "03",
    title: "Repair as a teachable protocol",
    body: "What repair actually consists of, why most apologies fail structurally, and how to teach a couple a way back that survives contact with a real argument.",
  },
  {
    number: "04",
    title: "Culture, family and the third party",
    body: "Working with extended family as context rather than obstacle. Where the boundary goes in our setting, who defends it, and how to help without importing advice that doesn't fit.",
  },
  {
    number: "05",
    title: "Safety, limits and referral",
    body: "Screening for harm. When couples work is contraindicated. Recognising what is outside your scope, and referring properly rather than reluctantly.",
  },
  {
    number: "06",
    title: "Practice and supervision",
    body: "Live practice with feedback, then ongoing group supervision. Nobody leaves this course having only heard about the work.",
  },
];

const audience = [
  "Coaches who keep ending up in relationship conversations they were not trained for",
  "Pastoral and ministry workers doing marriage counselling by default",
  "HR and employee-wellbeing professionals holding staff through personal crisis",
  "Early-career therapists who want structure for couples work",
  "Community and NGO practitioners working with families",
];

export default function AcademyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-44 -top-40 h-[38rem] w-[38rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-10 bottom-0 h-72 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">Activator Coaching Academy</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            Training for people who hold other people&apos;s relationships.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">
            A very large number of people end up doing this work without ever having been taught it —
            pastors, coaches, HR leads, and the sensible friend everyone calls. This is the training I
            wish had existed when I started.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg">
              Register your interest
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
                eyebrow="Who it's for"
                title="You are probably already doing this work."
                intro="The question is whether you are doing it with a framework or with instinct. Instinct is not nothing — but it does not tell you when to stop, and it does not protect the people in front of you."
              />
            </div>
            <ul className="space-y-4 self-center">
              {audience.map((item) => (
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
            eyebrow="The curriculum"
            title="Six modules"
            intro="Taught live in cohorts, with practice and supervision built in rather than bolted on."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
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
            <h2 className="font-display text-3xl text-ink">How to join a cohort</h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
              Cohorts are small and run a few times a year, and places are offered after a short
              application conversation rather than on a first-come basis — partly to keep the group
              workable, and partly because this material is not right for everyone who wants it.
            </p>
            <ol className="mt-8 space-y-5">
              {[
                "Register your interest using the form, or email the Academy directly.",
                "You will receive the current cohort dates, the full syllabus, and the fee.",
                "A short conversation to check the fit in both directions.",
                "Confirm your place and receive the pre-course material.",
              ].map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-mist text-sm text-sage-deep">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-[0.9375rem] leading-7 text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm leading-6 text-muted">
              Fees and dates are confirmed at application stage and vary by cohort format. Ask and
              you will be told plainly.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-sage-mist">
        <PsiMark className="pointer-events-none absolute -right-8 top-1/4 h-64 w-64 text-sage/15" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
          <h2 className="font-display text-[2.25rem] leading-tight text-ink sm:text-[2.75rem]">
            Interested in the next cohort?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-ink-soft">
            Tell me what work you already do and what keeps arriving that you feel unequipped for.
            That is usually the most useful thing to start from.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/contact" size="lg">
              Register your interest
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
