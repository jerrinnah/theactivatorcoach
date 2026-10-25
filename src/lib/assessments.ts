import data from "../../content/assessments.json" with { type: "json" };

export interface Dimension {
  id: string;
  title: string;
  /** One line under the dimension's title, in the quiz and the report. */
  description: string;
  /** What to work on in this dimension. Empty when the description says it. */
  guidance: string;
  questions: string[];
}

/** A feedback band for one dimension's raw score (three questions × 1–4). */
export interface Band {
  min: number;
  max: number;
  label: string;
  summary: string;
}

export type SafetyAnswer = "yes" | "unsure" | "no" | "skip";

export interface Safety {
  eyebrow: string;
  question: string;
  help: string;
  options: { label: string; value: SafetyAnswer }[];
  /**
   * When true, a "yes" or "not sure" never reaches the scores. When false the
   * safety message still comes first, with a way on to the results.
   */
  bypassResults: boolean;
}

export interface Assessment {
  slug: string;
  name: string;
  /** The page's h1 — deliberately not the assessment's own name. */
  headline: string;
  metaDescription: string;
  /** How the *other* assessment's page describes this one. */
  siblingBlurb: string;
  eyebrow: string;
  intro: string[];
  /** The "Before you begin" list on the quiz's first screen. */
  introPoints: string[];
  scaleHelp: string;
  /** Likert labels, lowest first. Scored 1 to 4 in this order. */
  scale: string[];
  dimensions: Dimension[];
  safety: Safety;
  bands: Band[];
  bandsNote: string;
  resultsIntro: string[];
  nextStep: { title: string; body: string };
  ctaLabel: string;
  ctaHref: string;
  printNote: string;
  disclaimerTitle: string;
  disclaimer: string[];
}

export const selfAudit = data.selfAudit as Assessment;
export const relationalRisk = data.relationalRisk as Assessment;

export const assessments = [selfAudit, relationalRisk];

/** Answers that show the safety message instead of going straight to results. */
export const SAFETY_CONCERNS: SafetyAnswer[] = ["yes", "unsure"];

/** Every visible string in the quiz itself, for both renderers. */
export interface QuizCopy {
  stepLabel: string;
  ofLabel: string;
  completeLabel: string;
  progressLabel: string;
  introTitle: string;
  beginPrefix: string;
  beginSuffix: string;
  dimensionLabel: string;
  unansweredError: string;
  backLabel: string;
  nextLabel: string;
  continueLabel: string;
  safetyBackLabel: string;
  safeExitTitle: string;
  safeExitParagraphs: string[];
  safeExitContactCta: { label: string; href: string };
  safeExitResultsLabel: string;
  restartLabel: string;
  resultEyebrow: string;
  perDimensionTitle: string;
  overallLabel: string;
  strongestLabel: string;
  attentionLabel: string;
  printLabel: string;
  retakeLabel: string;
}

/** Copy shared by both assessment pages. */
export const assessmentPageCopy: {
  privacyNote: string;
  startLabel: string;
  aboutTitle: string;
  isTitle: string;
  isItems: string[];
  isntTitle: string;
  isntItems: string[];
  siblingEyebrow: string;
  siblingCtaLabel: string;
  quiz: QuizCopy;
} = data.pageCopy;

export function bandFor(assessment: Assessment, score: number): Band {
  return assessment.bands.find((band) => score >= band.min && score <= band.max) ?? assessment.bands[0];
}
