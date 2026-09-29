import type { Metadata } from "next";
import ServicePageShell from "@/components/ServicePageShell";
import { servicePage } from "@/lib/servicePages";

const page = servicePage("/couples-therapy");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Page() {
  return <ServicePageShell page={page} />;
}
