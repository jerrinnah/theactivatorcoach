import type { Metadata } from "next";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Practice admin",
  description: "Client records and enquiries.",
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/", label: "Overview" },
  { href: "/clients", label: "Clients" },
  { href: "/inbox", label: "Inbox" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <ClerkProvider>
          {/* proxy.ts protects every route, so this only renders when signed in. */}
          <header className="border-b border-stone-200 bg-white">
              <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
                <div className="flex items-center gap-6">
                  <span className="text-sm font-semibold tracking-tight">
                    Practice admin
                  </span>
                  <nav className="flex gap-1">
                    {nav.map((n) => (
                      <Link
                        key={n.href}
                        href={n.href}
                        className="rounded-md px-3 py-1.5 text-sm text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
                      >
                        {n.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                <UserButton />
              </div>
            </header>
          <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
