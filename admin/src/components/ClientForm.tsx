import type { Client } from "@/db/schema";

const services = [
  ["individual", "Individual therapy"],
  ["couples", "Couples therapy"],
  ["before_you_marry", "Before You Marry"],
  ["annual_review", "Annual review"],
  ["intensive", "The Intensive"],
  ["diaspora", "Diaspora"],
  ["other", "Other"],
] as const;

const statuses = [
  ["enquiry", "Enquiry"],
  ["active", "Active"],
  ["paused", "Paused"],
  ["completed", "Completed"],
  ["archived", "Archived"],
] as const;

const field =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100";
const label = "mb-1.5 block text-sm font-medium text-slate-700";

export function ClientForm({
  client,
  action,
  submitLabel,
}: {
  client?: Client;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5">
      {client && <input type="hidden" name="id" value={client.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="fullName">
            Name
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            defaultValue={client?.fullName ?? ""}
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={client?.email ?? ""}
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            defaultValue={client?.phone ?? ""}
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="service">
            Service
          </label>
          <select
            id="service"
            name="service"
            defaultValue={client?.service ?? "individual"}
            className={field}
          >
            {services.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={client?.status ?? "enquiry"}
            className={field}
          >
            {statuses.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="source">
            How they found the practice
          </label>
          <input
            id="source"
            name="source"
            defaultValue={client?.source ?? ""}
            placeholder="Contact form, referral, Instagram…"
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="startedOn">
            Started on
          </label>
          <input
            id="startedOn"
            name="startedOn"
            type="date"
            defaultValue={client?.startedOn ?? ""}
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="notes">
          Background
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={client?.notes ?? ""}
          placeholder="Context that isn't a session note — presenting concern, referral details, practicalities."
          className={field}
        />
        <p className="mt-1.5 text-xs text-stone-500">
          Session-by-session clinical detail belongs in progress notes, not here.
        </p>
      </div>

      <button
        type="submit"
        className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-strong"
      >
        {submitLabel}
      </button>
    </form>
  );
}
