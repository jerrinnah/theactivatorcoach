import type { Metadata } from "next";
import AssessmentPageShell from "@/components/AssessmentPageShell";
import { relationalRisk, selfAudit } from "@/lib/assessments";

export const metadata: Metadata = {
  title: selfAudit.name,
  description: selfAudit.metaDescription,
};

export default function SelfAuditPage() {
  return <AssessmentPageShell assessment={selfAudit} sibling={relationalRisk} />;
}
