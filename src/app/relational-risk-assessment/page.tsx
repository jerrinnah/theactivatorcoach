import type { Metadata } from "next";
import AssessmentPageShell from "@/components/AssessmentPageShell";
import { relationalRisk, selfAudit } from "@/lib/assessments";

export const metadata: Metadata = {
  title: relationalRisk.name,
  description: relationalRisk.metaDescription,
};

export default function RelationalRiskAssessmentPage() {
  return <AssessmentPageShell assessment={relationalRisk} sibling={selfAudit} />;
}
