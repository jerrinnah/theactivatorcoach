import type { Metadata } from "next";
import AssessmentPageShell from "@/components/AssessmentPageShell";
import { selfAudit } from "@/lib/assessments";

export const metadata: Metadata = {
  title: "The Self-Audit",
  description:
    "A free ten-minute self-assessment across five dimensions — self-knowledge, emotional regulation, inherited patterns, capacity and repair. Private, nothing stored.",
};

export default function SelfAuditPage() {
  return (
    <AssessmentPageShell
      assessment={selfAudit}
      headline="Before you assess anyone else, assess yourself."
      sibling={{
        title: "The Relational Risk Assessment",
        description:
          "Where is your relationship exposed, and what happens when that point fails? The five exposure points that account for most of what arrives in my room.",
        href: "/relational-risk-assessment",
      }}
    />
  );
}
