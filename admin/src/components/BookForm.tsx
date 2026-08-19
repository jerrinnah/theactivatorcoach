"use client";

import { useState } from "react";
import { SERVICES, label } from "@/lib/style";
import { createAppointment } from "@/app/schedule/actions";

const field =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100";

/**
 * Collapsed by default — the calendar is what people come here to read, not
 * the form. Errors from the action (a clash, a bad time) surface inline
 * instead of throwing to the error boundary.
 */
export function BookForm({
  clients,
  defaultDay,
}: {
  clients: { id: string; fullName: string }[];
  defaultDay: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(formData: FormData) {
    setPending(true);
    setError(null);
    try {
      await createAppointment(formData);
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not book that session.");
    } finally {
      setPending(false);
    }
  }

  if (clients.length === 0) {
    return (
      <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-muted">
        Add a client before booking a session.
      </p>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-full bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-strong"
      >
        + Book a session
      </button>
    );
  }

  return (
    <form action={submit} className="space-y-3">
      <div>
        <label htmlFor="clientId" className="mb-1 block text-xs text-muted">
          Client
        </label>
        <select id="clientId" name="clientId" required className={field}>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.fullName}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="day" className="mb-1 block text-xs text-muted">
            Date
          </label>
          <input
            id="day"
            name="day"
            type="date"
            required
            defaultValue={defaultDay}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="startTime" className="mb-1 block text-xs text-muted">
            Start
          </label>
          <input
            id="startTime"
            name="startTime"
            type="time"
            required
            defaultValue="10:00"
            step={900}
            className={field}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="duration" className="mb-1 block text-xs text-muted">
            Minutes
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            min={15}
            max={480}
            step={15}
            defaultValue={60}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-1 block text-xs text-muted">
            Service
          </label>
          <select id="service" name="service" className={field}>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {label(s)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="location" className="mb-1 block text-xs text-muted">
          Location <span className="text-slate-400">(optional)</span>
        </label>
        <input
          id="location"
          name="location"
          placeholder="Room 2, or a video link"
          className={field}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700"
        >
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError(null);
          }}
          className="flex-1 rounded-full px-4 py-2 text-sm text-muted transition hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="flex-1 rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-strong disabled:opacity-60"
        >
          {pending ? "Booking…" : "Save"}
        </button>
      </div>
    </form>
  );
}
