"use client";

import { useMemo, useRef, useState } from "react";
import {
  bandFor,
  type Assessment,
  type SafetyAnswer,
  SAFETY_CONCERNS,
  assessmentPageCopy,
} from "@/lib/assessments";
import { ButtonLink } from "@/components/ui/Button";

type Stage = "intro" | "questions" | "safety" | "safe-exit" | "result";

/** Index into `assessment.scale`, or undefined while unanswered. */
type Answers = Record<string, number | undefined>;

function keyFor(dimensionId: string, index: number) {
  return `${dimensionId}:${index}`;
}

const copy = assessmentPageCopy.quiz;

const outlineButton =
  "inline-flex items-center justify-center rounded-full border border-sage-deep/35 px-8 py-4 text-[0.9375rem] text-sage-dark transition hover:bg-sage-mist";
const textLink = "mt-6 text-sm text-muted underline-offset-4 hover:text-sage-deep hover:underline";

/**
 * Each answer scores 1–4 (Rarely true … Consistently true), so a dimension of
 * three questions scores 3–12 and the whole instrument 15–60. The safety
 * question is never part of the score.
 */
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
      const score = dim.questions.reduce((sum, _question, index) => {
        const value = answers[keyFor(dim.id, index)];
        return sum + (value === undefined ? 0 : value + 1);
      }, 0);
      return { dimension: dim, score, max: dim.questions.length * assessment.scale.length };
    });

    // Ties go to the dimension asked first, so the result is stable.
    return {
      perDimension,
      total: perDimension.reduce((sum, entry) => sum + entry.score, 0),
      max: perDimension.reduce((sum, entry) => sum + entry.max, 0),
      strongest: perDimension.reduce((a, b) => (b.score > a.score ? b : a)),
      attention: perDimension.reduce((a, b) => (b.score < a.score ? b : a)),
    };
  }, [answers, assessment.dimensions, assessment.scale.length]);

  const stepComplete =
    !dimension || dimension.questions.every((_q, index) => answers[keyFor(dimension.id, index)] !== undefined);

  const focusPanel = () => {
    // Move focus to the new step so screen readers and keyboard users follow along.
    requestAnimationFrame(() => panelRef.current?.focus());
  };

  const go = (next: Stage) => {
    setStage(next);
    focusPanel();
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

  const answerSafety = (value: SafetyAnswer) => go(SAFETY_CONCERNS.includes(value) ? "safe-exit" : "result");

  const restart = () => {
    setAnswers({});
    setStep(0);
    setShowIncomplete(false);
    go("intro");
  };

  const progress = stage === "questions" ? step + 1 : totalSteps;

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      className="scroll-mt-28 rounded-4xl border border-line bg-white p-7 outline-none sm:p-10"
      id="assessment"
    >
      {stage === "questions" || stage === "safety" ? (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>
              {copy.stepLabel} {progress} {copy.ofLabel} {totalSteps}
            </span>
            <span>
              {Math.round((progress / totalSteps) * 100)}
              {copy.completeLabel}
            </span>
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-sage-mist"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={totalSteps}
            aria-label={copy.progressLabel}
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
          <h2 className="mt-4 font-display text-[2rem] leading-tight text-ink">{copy.introTitle}</h2>
          <ul className="mt-6 space-y-3 text-[0.9375rem] leading-7 text-ink-soft">
            {assessment.introPoints.map((point) => (
              <li key={point} className="flex gap-3.5">
                <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage" />
                {point}
              </li>
            ))}
          </ul>
          {assessment.scaleHelp ? (
            <p className="mt-6 text-[0.9375rem] leading-7 text-muted">{assessment.scaleHelp}</p>
          ) : null}
          <button
            type="button"
            onClick={() => go("questions")}
            className="mt-8 rounded-full bg-sage px-8 py-4 text-[0.9375rem] font-medium text-sage-dark transition hover:bg-sage-dark hover:text-white"
          >
            {copy.beginPrefix} {assessment.dimensions.reduce((n, d) => n + d.questions.length, 0)}{" "}
            {copy.beginSuffix}
          </button>
        </div>
      ) : null}

      {stage === "questions" && dimension ? (
        <div>
          <p className="eyebrow">
            {copy.dimensionLabel} {step + 1} {copy.ofLabel} {assessment.dimensions.length}
          </p>
          <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink">{dimension.title}</h2>
          {dimension.description ? (
            <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{dimension.description}</p>
          ) : null}

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
                            onChange={() => setAnswers((prev) => ({ ...prev, [name]: scaleIndex }))}
                            className="sr-only"
                          />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                  {unanswered ? <p className="mt-2 text-sm text-red-700">{copy.unansweredError}</p> : null}
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
              {copy.backLabel}
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-full bg-sage px-8 py-3.5 text-sm font-medium text-sage-dark transition hover:bg-sage-dark hover:text-white"
            >
              {step < assessment.dimensions.length - 1 ? copy.nextLabel : copy.continueLabel}
            </button>
          </div>
        </div>
      ) : null}

      {stage === "safety" ? (
        <div>
          <p className="eyebrow">{assessment.safety.eyebrow}</p>
          <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink">{assessment.safety.question}</h2>
          {assessment.safety.help ? (
            <p className="mt-4 text-[0.9375rem] leading-7 text-muted">{assessment.safety.help}</p>
          ) : null}

          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            {assessment.safety.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => answerSafety(option.value)}
                className="rounded-2xl border border-line bg-cream px-4 py-3 text-sm text-ink-soft transition hover:border-sage/50 hover:bg-sage-mist"
              >
                {option.label}
              </button>
            ))}
          </div>

          <button type="button" onClick={goBack} className={textLink}>
            {copy.safetyBackLabel}
          </button>
        </div>
      ) : null}

      {stage === "safe-exit" ? (
        <div>
          <h2 className="font-display text-[2rem] leading-tight text-ink">{copy.safeExitTitle}</h2>
          <div className="mt-6 space-y-4 text-[1.0625rem] leading-[1.8] text-ink-soft">
            {copy.safeExitParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={copy.safeExitContactCta.href} size="lg">
              {copy.safeExitContactCta.label}
            </ButtonLink>
            {/* Never offered where the instrument says a concern bypasses the results. */}
            {assessment.safety.bypassResults ? null : (
              <button type="button" onClick={() => go("result")} className={outlineButton}>
                {copy.safeExitResultsLabel}
              </button>
            )}
          </div>
          <button type="button" onClick={restart} className={textLink}>
            {copy.restartLabel}
          </button>
        </div>
      ) : null}

      {stage === "result" ? (
        <div>
          <p className="eyebrow">{copy.resultEyebrow}</p>
          {assessment.resultsIntro.length ? (
            <div className="mt-5 max-w-2xl space-y-3 text-[1.0625rem] leading-[1.8] text-ink-soft">
              {assessment.resultsIntro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          <h3 className="mt-9 font-display text-2xl text-ink">{copy.perDimensionTitle}</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {scores.perDimension.map((entry) => {
              const band = bandFor(assessment, entry.score);
              const detail = entry.dimension.guidance || entry.dimension.description;
              return (
                <div key={entry.dimension.id} className="rounded-3xl border border-line bg-white p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-display text-2xl leading-snug text-ink">{entry.dimension.title}</h4>
                    <p className="shrink-0 font-display text-3xl text-sage-deep">
                      {entry.score}
                      <span className="text-base text-muted">/{entry.max}</span>
                    </p>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-sage-mist">
                    <div
                      className="h-full rounded-full bg-sage-deep"
                      style={{ width: `${Math.round((entry.score / entry.max) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-4 text-sm font-medium text-sage-deep">{band.label}</p>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{band.summary}</p>
                  {detail ? (
                    <p className="mt-4 border-t border-line-soft pt-4 text-sm leading-6 text-muted">{detail}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">{assessment.bandsNote}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { label: copy.strongestLabel, entry: scores.strongest },
              { label: copy.attentionLabel, entry: scores.attention },
            ].map(({ label, entry }) => (
              <div key={label} className="rounded-3xl bg-sage-mist p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
                <p className="mt-2 font-display text-2xl leading-snug text-ink">{entry.dimension.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {entry.score}/{entry.max} · {bandFor(assessment, entry.score).label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[0.9375rem] text-ink-soft">
            {copy.overallLabel}: <span className="font-display text-2xl text-sage-deep">{scores.total}</span>/
            {scores.max}
          </p>

          <div className="mt-9 rounded-3xl border border-line p-7">
            <h3 className="font-display text-2xl text-ink">{assessment.nextStep.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">{assessment.nextStep.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={assessment.ctaHref} size="lg">
                {assessment.ctaLabel}
              </ButtonLink>
              <button type="button" onClick={() => window.print()} className={outlineButton}>
                {copy.printLabel}
              </button>
            </div>
            {assessment.printNote ? (
              <p className="mt-5 text-sm leading-6 text-muted">{assessment.printNote}</p>
            ) : null}
          </div>

          <div className="mt-8 border-t border-line-soft pt-6 text-sm leading-6 text-muted">
            {assessment.disclaimerTitle ? (
              <p className="font-medium text-ink-soft">{assessment.disclaimerTitle}</p>
            ) : null}
            <div className="mt-2 space-y-2">
              {assessment.disclaimer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <button type="button" onClick={restart} className={textLink}>
            {copy.retakeLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
