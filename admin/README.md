# Practice admin

Client records, progress notes, and a shared view of the practice mailboxes.
Separate from the public site on purpose: different hosting, different
credentials, no anonymous surface.

Staff sign in at **https://admin.theactivatorcoach.com/sign-in** — a subdomain,
not a path on the public site. `www.theactivatorcoach.com` is static HTML on
cPanel shared hosting and cannot run this app; keeping the two on separate
hosts is also what stops a compromise of the public site reaching client
records.

DNS for that subdomain lives in cPanel's Zone Editor, not Namecheap's DNS tab —
the domain uses custom nameservers (`ns1/ns2.octavedev.com`), which makes the
registrar's panel inert. The A record must point at a **current** Vercel IP
(`216.198.79.1`). The older `76.76.21.21` stopped routing in August 2026.

**This app stores confidential health data. Read [docs/DATA-PROTECTION.md](docs/DATA-PROTECTION.md)
before changing anything under `src/db/`.**

## Running it

```bash
npm install
vercel env pull .env.local   # Neon Postgres + Neon Auth credentials
npm run dev
```

## Environment

Neon variables are provisioned by the Vercel integration and come down with
`vercel env pull`. Three more have to be set by hand:

| Variable | What it is |
|---|---|
| `NEON_AUTH_COOKIE_SECRET` | 32+ chars, signs the session cookie. Generate with `openssl rand -base64 32`. Changing it signs everyone out. |
| `MAIL_HOST` | IMAP host for the practice mailboxes, e.g. `mail.theactivatorcoach.com` |
| `MAIL_ACCOUNTS` | One mailbox per line as `label\|user\|password` |

There is no longer an `ADMIN_EMAILS` allowlist. Who may sign in is a row in
`neon_auth.user`, not an env var — see **Staff accounts** below.

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

- **`src/lib/neon-auth.ts`** — the Neon Auth (managed Better Auth) instance.
  Users and sessions live in this same database under the `neon_auth` schema.
- **`src/app/sign-in/page.tsx`** — the only public page, plus the
  `/api/auth/*` endpoints it posts to. Both are excluded from the proxy matcher
  because they must work before you have a session. There is no `/sign-up`.
- **`src/proxy.ts`** — session gate. Next 16 renamed `middleware.ts` to
  `proxy.ts`. This is an *optimistic* check only: it asks whether a session
  exists, never whether it belongs to staff.
- **`src/lib/auth.ts`** — `requireAdmin()` is the real authorisation boundary.
  Every page and Server Function calls it, because Server Functions are
  reachable by direct POST and never pass through the proxy. It checks
  `neon_auth.user.role` on every request, so revoking access takes effect on
  the next request rather than the next deploy.
- **`src/app/schedule/page.tsx`** — the week calendar. `WeekGrid` positions
  sessions absolutely by minutes-into-day and lanes overlapping ones side by
  side; `createAppointment` refuses a clash outright, so overlaps should only
  ever come from rows written directly in SQL.
- **`src/lib/time.ts`** — every scheduling timestamp is rendered in
  `Africa/Lagos`, never the server's zone. Vercel runs in UTC, so a bare
  `toLocaleString()` would draw the calendar an hour off, silently. Appointments
  are stored as instants; this is the display layer.
- **`src/lib/style.ts`** — one source for status and service colour, so a
  client's state looks the same on the list, the detail page and the calendar.
- **`src/lib/audit.ts`** — appends to `audit_log` on reads as well as writes.
- **`src/db/schema.ts`** — clients, appointments, progress notes, audit log.
  An appointment is a *plan*; a progress note is the clinical record of what
  happened. Cancelling a session therefore never touches a clinical record.
- **`src/lib/mail.ts`** — reads IMAP per request. Messages are never stored;
  copying them into the database would create a second set of confidential
  records to protect.

## Staff accounts

Accounts live in `neon_auth.user`, in this project's own database. Public
sign-up is disabled (`neon_auth.project_config.email_and_password.disableSignUp`),
so an account only exists because someone created it.

Access is the `role` column. `admin` gets in; anything else is refused by
`requireAdmin()` even with a perfectly valid session.

```sql
-- who currently has access
select email, role, banned from neon_auth."user" order by email;

-- revoke, effective on their next request
update neon_auth."user" set role = 'revoked' where email = '...';

-- suspend instead, keeping the row for the audit trail
update neon_auth."user" set banned = true where email = '...';
```

To add someone, create the account through the auth API and then grant the
role — sign-up being disabled means this is the only route in:

```bash
curl -X POST https://admin.theactivatorcoach.com/api/auth/sign-up/email \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://admin.theactivatorcoach.com' \
  -d '{"email":"...","password":"...","name":"..."}'
```

Then `update neon_auth."user" set role = 'admin' where email = '...'`.

Redirect targets are allowlisted in `neon_auth.project_config.trusted_origins`.
A new domain has to be added there or sign-in fails with `INVALID_ORIGIN`.

## Schema changes

```bash
npx dotenv -e .env.local -- npx drizzle-kit push
```

`drizzle.config.ts` sets `schemaFilter: ["public"]`. `schema.ts` declares
`neon_auth.user` so `requireAdmin()` can read it, but those tables belong to
Neon Auth — a push must never try to reconcile them.

## Deploying

```bash
vercel --prod
```

The Vercel project is `theactivatorcoach-admin`, separate from the public site
so a compromise of one is not a compromise of the other.
