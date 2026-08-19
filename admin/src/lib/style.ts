/**
 * Shared vocabulary for status and service colour. Defined once so a client's
 * status chip on the list, the detail page, and the calendar all agree —
 * mismatched colours for the same state is how someone misreads a screen.
 */

export const statusChip: Record<string, string> = {
  enquiry: "bg-amber-50 text-amber-700 ring-amber-200",
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  paused: "bg-slate-100 text-slate-600 ring-slate-200",
  completed: "bg-sky-50 text-sky-700 ring-sky-200",
  archived: "bg-slate-50 text-slate-400 ring-slate-200",
};

export const apptStatusChip: Record<string, string> = {
  scheduled: "bg-blue-50 text-blue-700 ring-blue-200",
  attended: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-slate-100 text-slate-500 ring-slate-200",
  no_show: "bg-rose-50 text-rose-700 ring-rose-200",
};

/** Card fill / border / text for an appointment block, keyed by service. */
export const serviceBlock: Record<
  string,
  { bg: string; border: string; text: string; dot: string }
> = {
  individual: {
    bg: "bg-blue-50",
    border: "border-blue-300",
    text: "text-blue-900",
    dot: "bg-blue-500",
  },
  couples: {
    bg: "bg-violet-50",
    border: "border-violet-300",
    text: "text-violet-900",
    dot: "bg-violet-500",
  },
  before_you_marry: {
    bg: "bg-rose-50",
    border: "border-rose-300",
    text: "text-rose-900",
    dot: "bg-rose-500",
  },
  annual_review: {
    bg: "bg-amber-50",
    border: "border-amber-300",
    text: "text-amber-900",
    dot: "bg-amber-500",
  },
  intensive: {
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    text: "text-emerald-900",
    dot: "bg-emerald-500",
  },
  diaspora: {
    bg: "bg-cyan-50",
    border: "border-cyan-300",
    text: "text-cyan-900",
    dot: "bg-cyan-500",
  },
  other: {
    bg: "bg-slate-50",
    border: "border-slate-300",
    text: "text-slate-800",
    dot: "bg-slate-400",
  },
};

export const SERVICES = [
  "individual",
  "couples",
  "before_you_marry",
  "annual_review",
  "intensive",
  "diaspora",
  "other",
] as const;

export function label(value: string): string {
  return value.replace(/_/g, " ");
}

/** Initials for the avatar circles. Never renders more than two letters. */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
