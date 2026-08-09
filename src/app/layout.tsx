import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import { practitioner } from "@/lib/siteData";
import { siteUrl } from "@/lib/siteUrl";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const body = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${practitioner.shortName} | Psychotherapist & Relational Risk Specialist`,
    template: `%s | ${practitioner.shortName}`,
  },
  description:
    "Psychotherapy, couples work and relational risk assessment with Dr. Lauretta Ogbum — Port Harcourt and online worldwide. Assess where your relationship is exposed before it fails.",
  keywords: [
    "psychotherapist Nigeria",
    "couples therapy Port Harcourt",
    "marriage counselling Nigeria",
    "relationship assessment",
    "premarital counselling",
    "diaspora therapy",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: practitioner.shortName,
    title: `${practitioner.shortName} | Psychotherapist & Relational Risk Specialist`,
    description:
      "Therapy and relational risk assessment for individuals and couples. Port Harcourt and online worldwide.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full min-h-screen flex-col bg-cream text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-sage-deep focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <GlobalHeader />
        {/* pb-24 on mobile clears the fixed booking bar */}
        <main id="main" className="flex-1 pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
