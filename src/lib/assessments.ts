import data from "../../content/assessments.json" with { type: "json" };

export interface Dimension {
  id: string;
  title: string;
  /** Shown alongside the dimension's score in the report. */
  strong: string;
  thin: string;
  questions: string[];
}

export interface Band {
  /** Inclusive lower bound as a percentage of the maximum score. */
  min: number;
  label: string;
  summary: string;
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
  intro: string;
  /** Likert labels, lowest agreement first. */
  scale: string[];
  dimensions: Dimension[];
  safetyQuestion: string;
  safetyHelp: string;
  bands: Band[];
  ctaLabel: string;
  ctaHref: string;
}

const SCALE = ["Rarely true", "Sometimes true", "Often true", "Consistently true"];

export const selfAudit = data.selfAudit as Assessment;
export const relationalRisk = data.relationalRisk as Assessment;

export const assessments = [selfAudit, relationalRisk];

/** Every visible string in the quiz itself, for both renderers. */
export interface QuizCopy {
  stepLabel: string;
  ofLabel: string;
  completeLabel: string;
  progressLabel: string;
  introTitle: string;
  introPoints: string[];
  beginPrefix: string;
  beginSuffix: string;
  dimensionLabel: string;
  unansweredError: string;
  backLabel: string;
  nextLabel: string;
  continueLabel: string;
  safetyEyebrow: string;
  safetyYesLabel: string;
  safetyNoLabel: string;
  safetyBackLabel: string;
  safeExitTitle: string;
  safeExitParagraphs: string[];
  safeExitCrisisCta: { label: string; href: string };
  safeExitContactCta: { label: string; href: string };
  restartLabel: string;
  resultEyebrow: string;
  perDimensionTitle: string;
  lowestTitlePrefix: string;
  lowestAdvice: string;
  printLabel: string;
  disclaimer: string;
  disclaimerLinkLabel: string;
  disclaimerSuffix: string;
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

export function bandFor(assessment: Assessment, percentage: number): Band {
  return [...assessment.bands].reverse().find((band) => percentage >= band.min) ?? assessment.bands[0];
}
