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

export function bandFor(assessment: Assessment, percentage: number): Band {
  return [...assessment.bands].reverse().find((band) => percentage >= band.min) ?? assessment.bands[0];
}
