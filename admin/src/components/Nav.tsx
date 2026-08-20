"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/schedule", label: "Schedule" },
  { href: "/clients", label: "Clients" },
  { href: "/inbox", label: "Inbox" },
];

/**
 * `Website` only appears for super admins. Hiding it is presentation, not
 * protection — requireSuperAdmin() refuses the route either way.
 */
export function Nav({ superAdmin = false }: { superAdmin?: boolean }) {
  const pathname = usePathname();
  const items = superAdmin
    ? [...links, { href: "/content", label: "Website" }]
    : links;

  return (
    <nav className="flex items-center gap-1 rounded-full bg-slate-50 p-1">
      {items.map((l) => {
        // "/" would otherwise match every route.
        const active =
          l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active
                ? "bg-brand text-white shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
