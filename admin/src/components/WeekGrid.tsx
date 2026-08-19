import Link from "next/link";
import { serviceBlock, label } from "@/lib/style";
import { dayKey, dayLabel, hhmm, keyIsToday, minutesIntoDay } from "@/lib/time";

export type CalendarEntry = {
  id: string;
  clientId: string;
  clientName: string;
  startsAt: Date;
  endsAt: Date;
  service: string;
  status: string;
  location: string | null;
};

/** Working day drawn in full; anything outside is hatched but still usable. */
const DAY_START = 7; // 07:00
const DAY_END = 21; // 21:00
const PX_PER_HOUR = 60;
const HOURS = Array.from({ length: DAY_END - DAY_START }, (_, i) => DAY_START + i);

export function WeekGrid({
  days,
  entries,
}: {
  days: string[];
  entries: CalendarEntry[];
}) {
  // Group once, so each column is a cheap lookup rather than a scan.
  const byDay = new Map<string, CalendarEntry[]>();
  for (const e of entries) {
    const k = dayKey(e.startsAt);
    const list = byDay.get(k);
    if (list) list.push(e);
    else byDay.set(k, [e]);
  }

  const gridHeight = (DAY_END - DAY_START) * PX_PER_HOUR;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[840px]">
        {/* Column headings */}
        <div className="grid grid-cols-[64px_repeat(7,minmax(0,1fr))] border-b border-line">
          <div />
          {days.map((k) => {
            const today = keyIsToday(k);
            return (
              <div key={k} className="px-2 pb-3 text-center">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                    today ? "bg-brand text-white" : "text-slate-500"
                  }`}
                >
                  {dayLabel(new Date(`${k}T12:00:00Z`))}
                </span>
              </div>
            );
          })}
        </div>

        {/* Time grid */}
        <div className="relative grid grid-cols-[64px_repeat(7,minmax(0,1fr))]">
          {/* Hour gutter */}
          <div className="time-gutter relative" style={{ height: gridHeight }}>
            {HOURS.map((h, i) => (
              <div
                key={h}
                className="absolute right-2 -translate-y-1/2 text-xs text-slate-400"
                style={{ top: i * PX_PER_HOUR }}
              >
                {String(h).padStart(2, "0")}:00
              </div>
            ))}
          </div>

          {days.map((k) => {
            const dayEntries = (byDay.get(k) ?? []).slice().sort(
              (a, b) => a.startsAt.getTime() - b.startsAt.getTime(),
            );
            const lanes = assignLanes(dayEntries);

            return (
              <div
                key={k}
                className="relative border-l border-line"
                style={{ height: gridHeight }}
              >
                {/* Hour lines */}
                {HOURS.map((h, i) => (
                  <div
                    key={h}
                    className={`absolute inset-x-0 border-t border-line ${
                      h < 9 || h >= 18 ? "offhours" : ""
                    }`}
                    style={{ top: i * PX_PER_HOUR, height: PX_PER_HOUR }}
                  />
                ))}

                {dayEntries.map((e) => {
                  const top =
                    (minutesIntoDay(e.startsAt) - DAY_START * 60) *
                    (PX_PER_HOUR / 60);
                  const rawHeight =
                    ((e.endsAt.getTime() - e.startsAt.getTime()) / 60000) *
                    (PX_PER_HOUR / 60);
                  // Keep very short sessions legible.
                  const height = Math.max(rawHeight, 30);
                  const { lane, of } = lanes.get(e.id)!;
                  const c = serviceBlock[e.service] ?? serviceBlock.other;
                  const cancelled = e.status === "cancelled";

                  return (
                    <Link
                      key={e.id}
                      href={`/clients/${e.clientId}`}
                      title={`${e.clientName} · ${hhmm(e.startsAt)}–${hhmm(e.endsAt)} · ${label(e.service)}`}
                      className={`absolute overflow-hidden rounded-lg border-l-4 px-2 py-1.5 text-left transition hover:z-10 hover:shadow-md ${c.bg} ${c.border} ${c.text} ${
                        cancelled ? "opacity-50 line-through" : ""
                      }`}
                      style={{
                        top: top + 2,
                        height: height - 4,
                        left: `calc(${(lane / of) * 100}% + 4px)`,
                        width: `calc(${100 / of}% - 8px)`,
                      }}
                    >
                      <span className="block truncate text-xs font-semibold">
                        {e.clientName}
                      </span>
                      <span className="block truncate text-[11px] opacity-80">
                        {hhmm(e.startsAt)} – {hhmm(e.endsAt)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Side-by-side placement for overlapping sessions. createAppointment refuses
 * clashes, but rows predating that rule — or created directly in SQL — must
 * still be visible rather than hidden behind each other.
 */
function assignLanes(entries: CalendarEntry[]) {
  const result = new Map<string, { lane: number; of: number }>();
  let cluster: CalendarEntry[] = [];
  let clusterEnd = 0;

  const flush = () => {
    if (cluster.length === 0) return;
    const laneEnds: number[] = [];
    const laneOf = new Map<string, number>();
    for (const e of cluster) {
      let lane = laneEnds.findIndex((end) => end <= e.startsAt.getTime());
      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(0);
      }
      laneEnds[lane] = e.endsAt.getTime();
      laneOf.set(e.id, lane);
    }
    for (const e of cluster) {
      result.set(e.id, { lane: laneOf.get(e.id)!, of: laneEnds.length });
    }
    cluster = [];
  };

  for (const e of entries) {
    if (cluster.length > 0 && e.startsAt.getTime() >= clusterEnd) flush();
    cluster.push(e);
    clusterEnd = Math.max(clusterEnd, e.endsAt.getTime());
  }
  flush();

  return result;
}
