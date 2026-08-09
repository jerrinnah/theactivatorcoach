import type { Metadata } from "next";
import Link from "next/link";
import QuietExit from "@/components/QuietExit";
import { contactDetails } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Crisis & Safety Resources",
  description:
    "If you are in immediate danger or thinking about suicide, this page lists where to get help now. This practice is not an emergency service.",
  robots: { index: true, follow: true },
};

/**
 * ⚠️ VERIFY BEFORE LAUNCH.
 *
 * Only resources that could be confirmed are listed. Publishing a wrong crisis
 * number is worse than publishing none, so local services have deliberately not
 * been guessed at. Add verified entries here — recommended additions:
 *   • Lagos State DSVA / DSVRT domestic & sexual violence helpline
 *   • Mentally Aware Nigeria Initiative (MANI) helpline
 *   • Nigeria Suicide Prevention Initiative
 *   • Rivers State / Port Harcourt local services
 * Confirm each number directly with the organisation before it goes live, and
 * re-check them periodically — helpline numbers change.
 */
const verifiedResources = [
  {
    name: "Emergency services (Nigeria)",
    detail: "112 — the national toll-free emergency number, reachable from any phone.",
    action: "Call 112",
    href: "tel:112",
    urgent: true,
  },
  {
    name: "Find a helpline — worldwide",
    detail:
      "A free directory of verified crisis lines in almost every country, including the UK, US, Canada and the Gulf. Useful if you are outside Nigeria.",
    action: "findahelpline.com",
    href: "https://findahelpline.com",
  },
];

const ifUnsafe = [
  "If you can leave safely, leave. Go to a public place, a trusted person's home, or a police station.",
  "Tell one person outside the household what is happening. Isolation is the condition that harm depends on.",
  "Keep identification, money and a phone somewhere you can reach quickly, and if it is safe to, keep a charged phone on you.",
  "Note that couples counselling is not a safe first step where there is violence or coercion. It can increase risk. Individual support comes first.",
];

const ifSuicidal = [
  "You do not have to be certain, or in immediate danger, to deserve help. Wanting it to stop is enough of a reason to tell someone.",
  "Tell one person tonight — a friend, a family member, a doctor, or a helpline. Saying it out loud to another person is the single most useful thing available right now.",
  "If you have a plan or the means to act, treat this as an emergency and call 112 or go to your nearest hospital.",
  "Try not to be alone while you feel this way. Ask someone to stay, or go to where other people are.",
];

export default function CrisisPage() {
  return (
    <>
      <QuietExit />

      <section className="border-b border-line bg-amber-50">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-amber-800">
            Crisis & safety
          </p>
          <h1 className="mt-5 font-display text-[2.5rem] leading-[1.06] text-ink sm:text-[3.5rem]">
            If you are in danger right now, do not wait for me.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.8] text-ink-soft">
            This practice is not an emergency service. Enquiries are answered within two working
            days, which is not fast enough for an emergency. What follows is where to go instead.
          </p>
          <a
            href="tel:112"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-red-700 px-8 py-4 text-[0.9375rem] font-medium text-white transition hover:bg-red-800"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path
                d="M6.2 3.6h3.2l1.6 4-2 1.4a11.5 11.5 0 0 0 6 6l1.4-2 4 1.6v3.2a1.6 1.6 0 0 1-1.7 1.6C10.9 19.9 4.1 13.1 3.4 5.3a1.6 1.6 0 0 1 1.6-1.7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            Call 112 — Nigeria emergency
          </a>
          <p className="mt-4 text-sm text-muted">
            Outside Nigeria, use your local emergency number — 999 in the UK, 911 in the US and
            Canada.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <h2 className="font-display text-[2rem] leading-tight text-ink">Where to get help now</h2>
          <div className="mt-8 space-y-5">
            {verifiedResources.map((resource) => (
              <div
                key={resource.name}
                className={`rounded-4xl border p-8 ${
                  resource.urgent ? "border-red-200 bg-red-50/50" : "border-line bg-white"
                }`}
              >
                <h3 className="font-display text-2xl text-ink">{resource.name}</h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-ink-soft">{resource.detail}</p>
                <a
                  href={resource.href}
                  target={resource.href.startsWith("http") ? "_blank" : undefined}
                  rel={resource.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-5 inline-flex rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition hover:bg-ink hover:text-white"
                >
                  {resource.action} →
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 rounded-3xl border border-line bg-cream-deep p-6 text-sm leading-6 text-muted">
            If you are in Port Harcourt or elsewhere in Nigeria and need a local service — domestic
            violence, sexual assault, or mental health — your nearest teaching hospital&apos;s
            emergency department can direct you, and 112 can connect you to police and medical
            response.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-4xl border border-line bg-white p-8">
              <h2 className="font-display text-[1.75rem] leading-snug text-ink">
                If someone is hurting you
              </h2>
              <ul className="mt-5 space-y-4">
                {ifUnsafe.map((item) => (
                  <li key={item} className="flex gap-3.5 text-[0.9375rem] leading-7 text-ink-soft">
                    <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-4xl border border-line bg-white p-8">
              <h2 className="font-display text-[1.75rem] leading-snug text-ink">
                If you are thinking about suicide
              </h2>
              <ul className="mt-5 space-y-4">
                {ifSuicidal.map((item) => (
                  <li key={item} className="flex gap-3.5 text-[0.9375rem] leading-7 text-ink-soft">
                    <span aria-hidden="true" className="mt-3 h-1 w-1 shrink-0 rounded-full bg-sage" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          <div className="rounded-4xl bg-sage-dark p-9 text-sage-soft sm:p-12">
            <h2 className="font-display text-3xl text-white">Covering your tracks</h2>
            <div className="mt-5 space-y-4 text-[0.9375rem] leading-7 text-sage-soft/85">
              <p>
                If you are reading this on a device someone else can access, the{" "}
                <strong className="text-white">Quick exit</strong> button on this page leaves
                immediately and removes this site from your back button. Pressing{" "}
                <strong className="text-white">Escape three times</strong> does the same thing.
              </p>
              <p>
                It does not clear your browsing history. To do that, use your browser&apos;s history
                settings — or use a private/incognito window, or a device the other person cannot
                reach, such as a friend&apos;s phone or a library computer.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-4xl border border-line bg-white p-9">
            <h2 className="font-display text-2xl text-ink">When you are safe</h2>
            <p className="mt-4 text-[0.9375rem] leading-7 text-ink-soft">
              When the immediate danger has passed, there is work worth doing and you are welcome to
              bring it here. Nothing you say obliges you to book anything.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link
                href="/contact"
                className="rounded-full bg-sage-deep px-6 py-3 font-medium text-white transition hover:bg-sage-dark"
              >
                Contact Dr. Ogbum
              </Link>
              <a
                href={`mailto:${contactDetails.email}`}
                className="rounded-full border border-line px-6 py-3 text-ink-soft transition hover:bg-sage-mist"
              >
                {contactDetails.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
