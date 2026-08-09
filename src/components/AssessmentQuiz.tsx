"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { bandFor, type Assessment } from "@/lib/assessments";
import { ButtonLink } from "@/components/ui/Button";

type Stage = "intro" | "questions" | "safety" | "safe-exit" | "result";

/** Index into `assessment.scale`, or undefined while unanswered. */
type Answers = Record<string, number | undefined>;

const MAX_PER_QUESTION = 3;

function keyFor(dimensionId: string, index: number) {
  return `${dimensionId}:${index}`;
}

export default function AssessmentQuiz({ assessment }: { assessment: Assessment }) {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showIncomplete, setShowIncomplete] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const totalSteps = assessment.dimensions.length + 1; // dimensions + safety screen
  const dimension = assessment.dimensions[step];

  const scores = useMemo(() => {
    const perDimension = assessment.dimensions.map((dim) => {
      const raw = dim.questions.reduce(
        (sum, _question, index) => sum + (answers[keyFor(dim.id, index)] ?? 0),
        0,
      );
      const max = dim.questions.length * MAX_PER_QUESTION;
      return { dimension: dim, raw, max, percentage: Math.round((raw / max) * 100) };
    });

    const raw = perDimension.reduce((sum, entry) => sum + entry.raw, 0);
    const max = perDimension.reduce((sum, entry) => sum + entry.max, 0);

    return {
      perDimension,
      percentage: Math.round((raw / max) * 100),
      lowest: [...perDimension].sort((a, b) => a.percentage - b.percentage)[0],
    };
  }, [answers, assessment.dimensions]);

  const stepComplete =
    !dimension || dimension.questions.every((_q, index) => answers[keyFor(dimension.id, index)] !== undefined);

  const focusPanel = () => {
    // Move focus to the new step so screen readers and keyboard users follow along.
    requestAnimationFrame(() => panelRef.current?.focus());
  };

  const goNext = () => {
    if (!stepComplete) {
      setShowIncomplete(true);
      return;
    }
    setShowIncomplete(false);
    if (step < assessment.dimensions.length - 1) {
      setStep((value) => value + 1);
    } else {
      setStage("safety");
    }
    focusPanel();
  };

  const goBack = () => {
    setShowIncomplete(false);
    if (stage === "safety") {
      setStage("questions");
      setStep(assessment.dimensions.length - 1);
    } else if (step > 0) {
      setStep((value) => value - 1);
    } else {
      setStage("intro");
    }
    focusPanel();
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setShowIncomplete(false);
    setStage("intro");
    focusPanel();
  };

  const progress =
    stage === "questions" ? step + 1 : stage === "safety" ? totalSteps : stage === "result" ? totalSteps : 0;

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      className="scroll-mt-28 rounded-4xl border border-line bg-white p-7 outline-none sm:p-10"
      id="assessment"
    >
      {stage !== "intro" && stage !== "safe-exit" ? (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>
              Step {progress} of {totalSteps}
            </span>
            <span>{Math.round((progress / totalSteps) * 100)}% complete</span>
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-sage-mist"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={totalSteps}
            aria-label="Assessment progress"
          >
            <div
              className="h-full rounded-full bg-sage-deep transition-all duration-300"
              style={{ width: `${(progress / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      ) : null}

      {stage === "intro" ? (
        <div>
          <p className="eyebrow">{assessment.eyebrow}</p>
          <h2 className="mt-4 font-display text-[2rem] leading-tight text-ink">
            Before you begin
          </h2>
          <ul className="mt-6 space-y-3 text-[0.9375rem] leading-7 text-ink-soft">
            <li>
              Answer honestly rather than aspirationally. An accurate low score is worth more than a
              flattering high one.
            </li>
            <li>
              Nothing you enter leaves your browser. There is no account, no submission, and no
              record kept — refreshing the page clears it.
            </li>
            <li>
              This is not a diagnosis and it will not tell you what to do. It shows you where you are
              solid and where you are thin.
            </li>
          </ul>
          <button
            type="button"
            onClick={() => {
              setStage("questions");
              focusPanel();
            }}
            className="mt-8 rounded-full bg-sage-deep px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-sage-dark"
          >
            Begin — {assessment.dimensions.reduce((n, d) => n + d.questions.length, 0)} questions
          </button>
        </div>
      ) : null}

      {stage === "questions" && dimension ? (
        <div>
          <p className="eyebrow">
            Dimension {step + 1} of {assessment.dimensions.length}
          </p>
          <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink">{dimension.title}</h2>

          <div className="mt-8 space-y-8">
            {dimension.questions.map((question, index) => {
              const name = keyFor(dimension.id, index);
              const value = answers[name];
              const unanswered = showIncomplete && value === undefined;

              return (
                <fieldset key={name} className={unanswered ? "rounded-2xl bg-red-50/60 p-4 -m-1" : ""}>
                  <legend className="text-[1.0625rem] leading-7 text-ink">{question}</legend>
                  <div className="mt-4 grid gap-2 sm:grid-cols-4">
                    {assessment.scale.map((label, scaleIndex) => {
                      const selected = value === scaleIndex;
                      return (
                        <label
                          key={label}
                          className={`cursor-pointer rounded-2xl border px-4 py-3 text-center text-sm transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sage-deep ${
                            selected
                              ? "border-sage-deep bg-sage-deep text-white"
                              : "border-line bg-cream text-ink-soft hover:border-sage/50 hover:bg-sage-mist"
                          }`}
                        >
                          <input
                            type="radio"
                            name={name}
                            value={scaleIndex}
                            checked={selected}
                            onChange={() =>
                              setAnswers((prev) => ({ ...prev, [name]: scaleIndex }))
                            }
                            className="sr-only"
                          />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                  {unanswered ? (
                    <p className="mt-2 text-sm text-red-700">Please choose an answer.</p>
                  ) : null}
                </fieldset>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-line px-6 py-3 text-sm text-ink-soft transition hover:bg-sage-mist"
            >
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-full bg-sage-deep px-8 py-3.5 text-sm font-medium text-white transition hover:bg-sage-dark"
            >
              {step < assessment.dimensions.length - 1 ? "Next dimension" : "Continue"}
            </button>
          </div>
        </div>
      ) : null}

      {stage === "safety" ? (
        <div>
          <p className="eyebrow">One more question</p>
          <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink">
            {assessment.safetyQuestion}
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-7 text-muted">{assessment.safetyHelp}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setStage("safe-exit");
                focusPanel();
              }}
              className="rounded-full border border-sage-deep/40 px-8 py-3.5 text-sm text-sage-dark transition hover:bg-sage-mist"
            >
              Yes, or I&apos;m not sure
            </button>
            <button
              type="button"
              onClick={() => {
                setStage("result");
                focusPanel();
              }}
              className="rounded-full bg-sage-deep px-8 py-3.5 text-sm font-medium text-white transition hover:bg-sage-dark"
            >
              No — show my results
            </button>
          </div>

          <button
            type="button"
            onClick={goBack}
            className="mt-6 text-sm text-muted underline-offset-4 hover:text-sage-deep hover:underline"
          >
            ← Back to the last dimension
          </button>
        </div>
      ) : null}

      {stage === "safe-exit" ? (
        <div>
          <h2 className="font-display text-[2rem] leading-tight text-ink">
            Thank you for answering that honestly.
          </h2>
          <div className="mt-6 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
            <p>
              I am not going to show you a score, because a score is not what this needs and it would
              be the wrong response to what you have just told me.
            </p>
            <p>
              Where there is harm in a relationship, couples work is not the right first step — it can
              make things more dangerous, not less. What matters first is your safety, and there are
              people whose specific job that is.
            </p>
            <p>
              If you would like to talk to me directly, you are welcome to. Nothing you say obliges
              you to do anything, and I will not push you towards any service.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/crisis" size="lg">
              Crisis and safety resources
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Speak to me directly
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={restart}
            className="mt-6 text-sm text-muted underline-offset-4 hover:text-sage-deep hover:underline"
          >
            Start the assessment again
          </button>
        </div>
      ) : null}

      {stage === "result" ? (
        <div>
          <p className="eyebrow">Your result</p>

          <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2">
            <p className="font-display text-6xl leading-none text-sage-deep">{scores.percentage}%</p>
            <p className="font-display text-3xl text-ink">
              {bandFor(assessment, scores.percentage).label}
            </p>
          </div>

          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.8] text-ink-soft">
            {bandFor(assessment, scores.percentage).summary}
          </p>

          <div className="mt-10 space-y-6">
            <h3 className="font-display text-2xl text-ink">Dimension by dimension</h3>
            {scores.perDimension.map((entry) => (
              <div key={entry.dimension.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[0.9375rem] font-medium text-ink">{entry.dimension.title}</p>
                  <p className="text-sm text-muted">
                    {entry.raw}/{entry.max}
                  </p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-sage-mist">
                  <div
                    className={`h-full rounded-full ${
                      entry.percentage >= 75
                        ? "bg-sage-deep"
                        : entry.percentage >= 50
                          ? "bg-sage"
                          : "bg-amber-500/80"
                    }`}
                    style={{ width: `${Math.max(entry.percentage, 3)}%` }}
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {entry.percentage >= 60 ? entry.dimension.strong : entry.dimension.thin}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-sage-mist p-7">
            <h3 className="font-display text-2xl text-ink">
              Your thinnest point: {scores.lowest.dimension.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">
              {scores.lowest.dimension.thin}
            </p>
            <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">
              If you do one thing with this result, make it this dimension. It is where the next
              difficulty is most likely to originate, and it is the cheapest thing on the list to
              work on now rather than later.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={assessment.ctaHref} size="lg">
              {assessment.ctaLabel}
            </ButtonLink>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full border border-sage-deep/35 px-8 py-4 text-[0.9375rem] text-sage-dark transition hover:bg-sage-mist"
            >
              Print or save as PDF
            </button>
          </div>

          <p className="mt-8 border-t border-line-soft pt-6 text-sm leading-6 text-muted">
            This is a reflective instrument, not a clinical diagnosis, and it has not been
            psychometrically validated. It is designed to start an honest conversation — with
            yourself, with a partner, or with me.{" "}
            <Link href="/contact" className="text-sage-deep underline-offset-4 hover:underline">
              Book a free conversation
            </Link>{" "}
            if you would like to go through it properly.
          </p>

          <button
            type="button"
            onClick={restart}
            className="mt-6 text-sm text-muted underline-offset-4 hover:text-sage-deep hover:underline"
          >
            Take it again
          </button>
        </div>
      ) : null}
    </div>
  );
}
