/**
 * Everything scheduling-related is rendered in the practice's timezone, never
 * the server's. Vercel runs in UTC, so a bare toLocaleString() would draw the
 * whole calendar an hour off — and silently, which is the dangerous part.
 *
 * Appointments are stored as instants (timestamptz). This is the display layer.
 */
export const PRACTICE_TZ = "Africa/Lagos";

const dayKeyFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: PRACTICE_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: PRACTICE_TZ,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const dayLabelFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: PRACTICE_TZ,
  weekday: "short",
  day: "numeric",
});

const longDateFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: PRACTICE_TZ,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const monthFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: PRACTICE_TZ,
  month: "long",
  year: "numeric",
});

/** `2026-08-17` in practice time — the key the calendar groups by. */
export function dayKey(d: Date): string {
  return dayKeyFmt.format(d);
}

/** `14:30` in practice time. */
export function hhmm(d: Date): string {
  return timeFmt.format(d);
}

/** `Mon 17` for a column heading. */
export function dayLabel(d: Date): string {
  return dayLabelFmt.format(d);
}

export function longDate(d: Date): string {
  return longDateFmt.format(d);
}

export function monthLabel(d: Date): string {
  return monthFmt.format(d);
}

/**
 * Minutes since midnight *in practice time*. This is what positions an
 * appointment vertically in the day grid.
 */
export function minutesIntoDay(d: Date): number {
  const [h, m] = hhmm(d).split(":").map(Number);
  return h * 60 + m;
}

/** Midnight practice-time on the Monday of the week containing `d`, as a day key. */
export function weekStartKey(d: Date): string {
  const key = dayKey(d);
  // Weekday index in practice time, Monday = 0.
  const wd = new Intl.DateTimeFormat("en-GB", {
    timeZone: PRACTICE_TZ,
    weekday: "short",
  }).format(d);
  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const idx = order.indexOf(wd);
  return addDaysToKey(key, -idx);
}

/** Day-key arithmetic, done on the calendar date so DST can't shift it. */
export function addDaysToKey(key: string, days: number): string {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

/** The seven day keys of the week starting at `startKey`. */
export function weekKeys(startKey: string): string[] {
  return Array.from({ length: 7 }, (_, i) => addDaysToKey(startKey, i));
}

/**
 * A day key back to an instant, for range queries. Uses the practice's UTC
 * offset at that date rather than assuming a fixed one.
 */
export function keyToInstant(key: string, hour = 0, minute = 0): Date {
  const [y, m, d] = key.split("-").map(Number);
  // Start from the naive UTC instant, then correct by the zone's offset there.
  const naive = Date.UTC(y, m - 1, d, hour, minute);
  const offset = tzOffsetMinutes(new Date(naive));
  return new Date(naive - offset * 60_000);
}

/** The zone's offset from UTC, in minutes, at a given instant. */
function tzOffsetMinutes(at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PRACTICE_TZ,
    timeZoneName: "shortOffset",
  }).formatToParts(at);
  const name = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const match = /GMT([+-]\d{1,2})(?::(\d{2}))?/.exec(name);
  if (!match) return 0;
  return Number(match[1]) * 60 + (match[1].startsWith("-") ? -1 : 1) * Number(match[2] ?? 0);
}

export function keyIsToday(key: string): boolean {
  return key === dayKey(new Date());
}
