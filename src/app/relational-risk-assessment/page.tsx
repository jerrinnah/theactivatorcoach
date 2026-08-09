import type { Metadata } from "next";
import AssessmentPageShell from "@/components/AssessmentPageShell";
import { relationalRisk } from "@/lib/assessments";

export const metadata: Metadata = {
  title: "The Relational Risk Assessment",
  description:
    "A free twelve-minute assessment of the five exposure points in a relationship — unaudited individuals, repair protocol, third parties, silent withdrawal and scheduled review.",
};

export default function RelationalRiskAssessmentPage() {
  return (
    <AssessmentPageShell
      assessment={relationalRisk}
      headline="Where is your relationship exposed?"
      sibling={{
        title: "The Self-Audit",
        description:
          "Most people evaluating a relationship are running the assessment on the wrong person. Ten minutes of honest questions about you.",
        href: "/self-audit",
      }}
    />
  );
}
