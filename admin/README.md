# Practice admin

Client records, progress notes, and a shared view of the practice mailboxes.
Separate from the public site on purpose: different hosting, different
credentials, no anonymous surface.

**This app stores confidential health data. Read [docs/DATA-PROTECTION.md](docs/DATA-PROTECTION.md)
before changing anything under `src/db/`.**

## Running it

```bash
npm install
vercel env pull .env.local   # Neon + Clerk credentials
npm run dev
```

## Environment

Neon and Clerk variables are provisioned by the Vercel integrations and come
down with `vercel env pull`. Three more have to be set by hand:

| Variable | What it is |
|---|---|
| `ADMIN_EMAILS` | Comma-separated list of who may sign in. **Anyone not listed is refused, even with a valid Clerk account.** Empty means nobody gets in. |
| `MAIL_HOST` | IMAP host for the practice mailboxes, e.g. `mail.theactivatorcoach.com` |
| `MAIL_ACCOUNTS` | One mailbox per line as `label\|user\|password` |

`MAIL_PORT` defaults to 993 (IMAP over TLS).

`MAIL_ACCOUNTS` looks like this — the label is what shows as the tag in the
inbox list:

```
hello|hello@theactivatorcoach.com|<password>
speaking|speaking@theactivatorcoach.com|<password>
academy|academy@theactivatorcoach.com|<password>
```

Leave `MAIL_HOST`/`MAIL_ACCOUNTS` unset and the Inbox page says so plainly
rather than erroring — the rest of the app works without them.

## How it fits together

- **`src/proxy.ts`** — Clerk gate. Next 16 renamed `middleware.ts` to
  `proxy.ts`; the Clerk export is still `clerkMiddleware`. This is an
  *optimistic* check only.
- **`src/lib/auth.ts`** — `requireAdmin()` is the real authorisation boundary.
  Every page and Server Function calls it, because Server Functions are
  reachable by direct POST and never pass through the proxy.
- **`src/lib/audit.ts`** — appends to `audit_log` on reads as well as writes.
- **`src/db/schema.ts`** — clients, progress notes, audit log.
- **`src/lib/mail.ts`** — reads IMAP per request. Messages are never stored;
  copying them into the database would create a second set of confidential
  records to protect.

## Schema changes

```bash
npx dotenv -e .env.local -- npx drizzle-kit push
```

## Deploying

```bash
vercel --prod
```

The Vercel project is `theactivatorcoach-admin`, separate from the public site
so a compromise of one is not a compromise of the other.
