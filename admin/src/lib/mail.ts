import { ImapFlow } from "imapflow";

/**
 * Reads the practice mailboxes over IMAP and merges them into one list.
 *
 * Nothing is stored — messages are fetched per request and held in memory only.
 * That keeps the confidential contents of client emails out of this app's
 * database, where they would become a second copy to protect.
 */

export type Mailbox = {
  label: string;
  user: string;
  password: string;
};

export type Message = {
  id: string;
  mailbox: string;
  from: string;
  fromEmail: string;
  subject: string;
  date: Date;
  preview: string;
  seen: boolean;
};

/**
 * Credentials come from MAIL_ACCOUNTS as
 * `label|user|password` entries separated by newlines or semicolons.
 * Keeping them in one variable avoids nine near-identical env vars.
 */
export function mailboxes(): Mailbox[] {
  const raw = process.env.MAIL_ACCOUNTS ?? "";
  return raw
    .split(/[\n;]+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, user, ...rest] = line.split("|");
      return { label: label?.trim(), user: user?.trim(), password: rest.join("|").trim() };
    })
    .filter((m): m is Mailbox => Boolean(m.label && m.user && m.password));
}

async function fetchOne(box: Mailbox, limit: number): Promise<Message[]> {
  const client = new ImapFlow({
    host: process.env.MAIL_HOST!,
    port: Number(process.env.MAIL_PORT ?? 993),
    secure: true,
    auth: { user: box.user, pass: box.password },
    logger: false,
    // Shared cPanel mail servers are slow to greet.
    greetingTimeout: 20_000,
    socketTimeout: 60_000,
  });

  await client.connect();
  const out: Message[] = [];

  try {
    const lock = await client.getMailboxLock("INBOX");
    try {
      const status =
        typeof client.mailbox === "object" ? client.mailbox.exists : 0;
      if (!status) return out;

      const from = Math.max(1, status - limit + 1);
      for await (const msg of client.fetch(`${from}:*`, {
        envelope: true,
        flags: true,
        bodyStructure: false,
      })) {
        const sender = msg.envelope?.from?.[0];
        out.push({
          id: `${box.label}:${msg.uid}`,
          mailbox: box.label,
          from: sender?.name || sender?.address || "Unknown",
          fromEmail: sender?.address ?? "",
          subject: msg.envelope?.subject || "(no subject)",
          date: msg.envelope?.date ?? new Date(0),
          preview: "",
          seen: msg.flags?.has("\\Seen") ?? false,
        });
      }
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => client.close());
  }

  return out;
}

export type InboxResult = {
  messages: Message[];
  errors: { mailbox: string; message: string }[];
};

/**
 * One slow or misconfigured mailbox shouldn't blank the whole page, so each is
 * fetched independently and failures are reported alongside what did load.
 */
export async function fetchInbox(limit = 25): Promise<InboxResult> {
  const boxes = mailboxes();
  if (boxes.length === 0 || !process.env.MAIL_HOST) {
    return { messages: [], errors: [] };
  }

  const settled = await Promise.allSettled(
    boxes.map((b) => fetchOne(b, limit)),
  );

  const messages: Message[] = [];
  const errors: InboxResult["errors"] = [];

  settled.forEach((r, i) => {
    if (r.status === "fulfilled") messages.push(...r.value);
    else
      errors.push({
        mailbox: boxes[i].label,
        message: r.reason?.message ?? "Could not connect",
      });
  });

  messages.sort((a, b) => b.date.getTime() - a.date.getTime());
  return { messages, errors };
}
