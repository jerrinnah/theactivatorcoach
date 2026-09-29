import Link from "next/link";
import AssessmentQuiz from "@/components/AssessmentQuiz";
import QuietExit from "@/components/QuietExit";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import { assessmentPageCopy as copy, type Assessment } from "@/lib/assessments";

interface AssessmentPageShellProps {
  assessment: Assessment;
  /** The other assessment, surfaced at the foot of the page. */
  sibling: Assessment;
}

export default function AssessmentPageShell({ assessment, sibling }: AssessmentPageShellProps) {
  return (
    <>
      <QuietExit />

      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-40 -top-48 h-[40rem] w-[40rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-12 bottom-0 h-80 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">{assessment.name}</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            {assessment.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">{assessment.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span>{assessment.eyebrow}</span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-line sm:block" />
            <span>{copy.privacyNote}</span>
          </div>
          <a
            href="#assessment"
            className="mt-9 inline-flex rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark"
          >
            {copy.startLabel}
          </a>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <AssessmentQuiz assessment={assessment} />
        </div>
      </section>

      <section className="border-t border-line bg-cream-deep">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <h2 className="font-display text-3xl text-ink">{copy.aboutTitle}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-7">
              <h3 className="font-display text-2xl text-sage-deep">{copy.isTitle}</h3>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-7 text-ink-soft">
                {copy.isItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-line bg-white p-7">
              <h3 className="font-display text-2xl text-ink">{copy.isntTitle}</h3>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-7 text-ink-soft">
                {copy.isntItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <Link
            href={`/${sibling.slug}`}
            className="group flex flex-col gap-3 rounded-4xl border border-line bg-white p-9 transition hover:border-sage/50 hover:shadow-lg hover:shadow-sage-deep/5"
          >
            <span className="eyebrow">{copy.siblingEyebrow}</span>
            <h2 className="font-display text-3xl text-ink">{sibling.name}</h2>
            <p className="text-[0.9375rem] leading-7 text-muted">{sibling.siblingBlurb}</p>
            <span className="mt-2 text-sm text-sage-deep transition group-hover:translate-x-0.5">
              {copy.siblingCtaLabel}
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
