import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { fetchInbox, mailboxes } from "@/lib/mail";

export const dynamic = "force-dynamic";

const boxStyle: Record<string, string> = {
  hello: "bg-emerald-100 text-emerald-800",
  speaking: "bg-violet-100 text-violet-800",
  academy: "bg-amber-100 text-amber-800",
};

function when(d: Date) {
  const days = (Date.now() - d.getTime()) / 86_400_000;
  if (days < 1)
    return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  if (days < 7) return d.toLocaleDateString("en-GB", { weekday: "short" });
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

async function Inbox() {
  const { messages, errors } = await fetchInbox();

  if (mailboxes().length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-stone-700">
          No mailboxes configured
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-stone-500">
          Set <code className="rounded bg-stone-100 px-1">MAIL_HOST</code> and{" "}
          <code className="rounded bg-stone-100 px-1">MAIL_ACCOUNTS</code> to
          read the practice mailboxes. See the README.
        </p>
      </div>
    );
  }

  return (
    <>
      {errors.length > 0 && (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-900">
            {errors.length === 1 ? "A mailbox" : "Some mailboxes"} could not be
            read
          </p>
          <ul className="mt-1.5 space-y-0.5 text-sm text-amber-800">
            {errors.map((e) => (
              <li key={e.mailbox}>
                <span className="font-medium">{e.mailbox}</span>: {e.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {messages.length === 0 ? (
        <p className="rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500">
          Nothing in the inboxes.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
          <ul className="divide-y divide-stone-100">
            {messages.map((m) => (
              <li
                key={m.id}
                className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3.5 transition hover:bg-stone-50 ${
                  m.seen ? "" : "bg-sky-50/40"
                }`}
              >
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    boxStyle[m.mailbox] ?? "bg-stone-100 text-stone-600"
                  }`}
                >
                  {m.mailbox}
                </span>
                <span
                  className={`text-sm ${m.seen ? "text-stone-700" : "font-semibold text-stone-900"}`}
                >
                  {m.from}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-stone-600">
                  {m.subject}
                </span>
                <span className="shrink-0 text-xs text-stone-400">
                  {when(m.date)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default async function InboxPage() {
  await requireAdmin();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Inbox</h1>
        <p className="mt-1 text-sm text-stone-500">
          hello@, speaking@ and academy@ in one place. Read live over IMAP —
          nothing is copied into this app.
        </p>
      </div>
      <Suspense
        fallback={
          <p className="rounded-lg border border-stone-200 bg-white p-10 text-center text-sm text-stone-500">
            Connecting to the mailboxes…
          </p>
        }
      >
        <Inbox />
      </Suspense>
    </div>
  );
}
