import Link from "next/link";
import AssessmentQuiz from "@/components/AssessmentQuiz";
import QuietExit from "@/components/QuietExit";
import { Blob, LeafBranch } from "@/components/ui/Ornaments";
import type { Assessment } from "@/lib/assessments";

interface AssessmentPageShellProps {
  assessment: Assessment;
  headline: string;
  /** The other assessment, surfaced at the foot of the page. */
  sibling: { title: string; description: string; href: string };
}

export default function AssessmentPageShell({
  assessment,
  headline,
  sibling,
}: AssessmentPageShellProps) {
  return (
    <>
      <QuietExit />

      <section className="relative overflow-hidden border-b border-line bg-cream-deep">
        <Blob className="pointer-events-none absolute -right-40 -top-48 h-[40rem] w-[40rem] text-sage-soft/45" />
        <LeafBranch className="pointer-events-none absolute -left-12 bottom-0 h-80 w-40 text-sage/20" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="eyebrow">{assessment.name}</p>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] text-ink sm:text-[3.75rem]">
            {headline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-ink-soft">{assessment.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span>{assessment.eyebrow}</span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-line sm:block" />
            <span>Nothing is stored or submitted</span>
          </div>
          <a
            href="#assessment"
            className="mt-9 inline-flex rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark"
          >
            Start the assessment
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
          <h2 className="font-display text-3xl text-ink">What this is, and what it isn&apos;t</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-7">
              <h3 className="font-display text-2xl text-sage-deep">What it is</h3>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-7 text-ink-soft">
                <li>A structured way to look at five things at once</li>
                <li>Private — it runs entirely in your browser</li>
                <li>A starting point for an honest conversation</li>
                <li>Free, with nothing to sign up for</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-line bg-white p-7">
              <h3 className="font-display text-2xl text-ink">What it isn&apos;t</h3>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-7 text-ink-soft">
                <li>A clinical diagnosis or a validated psychometric</li>
                <li>A verdict on you or on anyone else</li>
                <li>Advice on whether to stay or leave</li>
                <li>A substitute for speaking to someone</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <Link
            href={sibling.href}
            className="group flex flex-col gap-3 rounded-4xl border border-line bg-white p-9 transition hover:border-sage/50 hover:shadow-lg hover:shadow-sage-deep/5"
          >
            <span className="eyebrow">The other instrument</span>
            <h2 className="font-display text-3xl text-ink">{sibling.title}</h2>
            <p className="text-[0.9375rem] leading-7 text-muted">{sibling.description}</p>
            <span className="mt-2 text-sm text-sage-deep transition group-hover:translate-x-0.5">
              Take it →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
