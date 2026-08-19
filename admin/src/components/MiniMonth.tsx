import Link from "next/link";
import { addDaysToKey, keyIsToday, monthLabel } from "@/lib/time";

/**
 * Month overview that jumps the week grid. Days with sessions get a dot, so
 * the sidebar answers "how busy is the rest of the month" without a click.
 */
export function MiniMonth({
  anchorKey,
  busyDays,
  weekKeys: currentWeek,
}: {
  anchorKey: string;
  busyDays: Set<string>;
  weekKeys: string[];
}) {
  const [y, m] = anchorKey.split("-").map(Number);
  const firstKey = `${y}-${String(m).padStart(2, "0")}-01`;
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();

  // Monday-first offset for the 1st of the month.
  const firstDow = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const lead = (firstDow + 6) % 7;

  const cells: (string | null)[] = [
    ...Array<null>(lead).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => addDaysToKey(firstKey, i)),
  ];

  const inWeek = new Set(currentWeek);
  const prevMonth = addDaysToKey(firstKey, -1);
  const nextMonth = addDaysToKey(firstKey, daysInMonth);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight">
          {monthLabel(new Date(`${firstKey}T12:00:00Z`))}
        </h2>
        <div className="flex gap-1">
          <Link
            href={`/schedule?week=${prevMonth}`}
            aria-label="Previous month"
            className="grid h-7 w-7 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
          >
            ‹
          </Link>
          <Link
            href={`/schedule?week=${nextMonth}`}
            aria-label="Next month"
            className="grid h-7 w-7 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
          >
            ›
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] text-slate-400">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d}>{d[0]}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-y-1">
        {cells.map((key, i) => {
          if (!key) return <span key={`pad-${i}`} />;
          const day = Number(key.slice(8));
          const today = keyIsToday(key);
          const selected = inWeek.has(key);
          return (
            <Link
              key={key}
              href={`/schedule?week=${key}`}
              className={`relative mx-auto grid h-8 w-8 place-items-center rounded-full text-xs transition ${
                today
                  ? "bg-brand font-semibold text-white"
                  : selected
                    ? "bg-blue-50 text-brand-strong"
                    : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {day}
              {busyDays.has(key) && !today && (
                <span
                  aria-hidden
                  className="absolute bottom-1 h-1 w-1 rounded-full bg-brand"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
