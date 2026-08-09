import Link from "next/link";
import { contactDetails, footerSections, practitioner, whatsappLink } from "@/lib/siteData";
import { LeafBranch, PsiBadge } from "@/components/ui/Ornaments";

const columns = [
  { heading: "Work With Me", items: footerSections.work },
  { heading: "Learn", items: footerSections.learn },
  { heading: "More", items: footerSections.more },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-sage-dark/20 bg-sage-dark text-sage-soft">
      <LeafBranch className="pointer-events-none absolute -left-16 top-10 h-72 w-44 text-white/[0.07]" />
      <PsiMarkBackdrop />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1.6fr] lg:px-8 lg:py-20">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <PsiBadge className="h-10 w-10 text-sage-soft" />
            <span className="font-display text-2xl text-white">{practitioner.logoName}</span>
          </div>
          <p className="text-sm leading-7 text-sage-soft/85">
            {practitioner.fullName} — psychotherapist, founder of the Activator Coaching Academy, and
            co-author of <em>The ABC of Marriage</em>.
          </p>
          <div className="space-y-1.5 text-sm text-sage-soft/75">
            <p>{contactDetails.location}</p>
            <p>{contactDetails.reach}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href={`mailto:${contactDetails.email}`} className="underline-offset-4 hover:text-white hover:underline">
              {contactDetails.email}
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-white hover:underline"
            >
              WhatsApp
            </a>
            <a
              href={contactDetails.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-white hover:underline"
            >
              {contactDetails.instagram}
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.heading}>
              <h2 className="mb-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-white/70">
                {column.heading}
              </h2>
              <ul className="space-y-3 text-sm text-sage-soft/80">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10 px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-sage-soft/70">
            This practice is not an emergency service. If you or someone you know is in immediate
            danger or at risk of harm, please contact emergency services or a crisis line now.
          </p>
          <Link
            href="/crisis"
            className="shrink-0 rounded-full border border-white/25 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
          >
            Crisis resources →
          </Link>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 text-xs text-sage-soft/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {practitioner.shortName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy & confidentiality
            </Link>
            <span>Website by OctaveDev</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PsiMarkBackdrop() {
  return (
    <div className="pointer-events-none absolute -right-10 top-1/4 hidden lg:block" aria-hidden="true">
      <PsiBadge className="h-64 w-64 text-white/[0.05]" />
    </div>
  );
}
