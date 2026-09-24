# Practice admin

Client records, progress notes, and a shared view of the practice mailboxes.
Separate from the public site on purpose: different hosting, different
credentials, no anonymous surface.

Staff sign in at **https://admin.theactivatorcoach.com/sign-in** — a subdomain,
not a path on the public site. Accounts are created and reset by a super admin
on the **Staff** page inside the app; see [Staff accounts](#staff-accounts). `www.theactivatorcoach.com` is static HTML on
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
| `BETTER_AUTH_SECRET` | 32+ chars, signs the session cookie. Generate with `openssl rand -base64 32`. Changing it signs everyone out. `NEON_AUTH_COOKIE_SECRET` is still read as a fallback, so the existing value keeps working. |
| `MAIL_HOST` | IMAP host for the practice mailboxes, e.g. `mail.theactivatorcoach.com` |
| `MAIL_ACCOUNTS` | One mailbox per line as `label\|user\|password` |

There is no longer an `ADMIN_EMAILS` allowlist. Who may sign in is a row in
`neon_auth.user`, not an env var — see **Staff accounts** below.

`MAIL_PORT` defaults to 993 (IMAP over TLS).

Two optional ones: `BETTER_AUTH_URL` pins the origin Better Auth serves from —
leave it unset and it is inferred from the request, which is correct on
production and on preview deployments alike. `BETTER_AUTH_TRUSTED_ORIGINS` is a
comma-separated allowlist of origins a sign-in may come from; it defaults to the
admin domain and the project's `.vercel.app` URL, and an origin outside it fails
with `INVALID_ORIGIN`.

**`NEON_AUTH_BASE_URL` is not this app's URL** — it addressed the managed Neon
Auth service. Nothing reads it any more. Do not set it as `BETTER_AUTH_URL`:
Better Auth strips its own base URL off the incoming path, so a foreign origin
there makes every `/api/auth/*` route 404.

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

- **`src/lib/better-auth.ts`** — Better Auth, self-hosted, against this
  project's own Postgres. Users and sessions live in this same database under
  the `neon_auth` schema — the tables Neon Auth created, kept because the
  password hashes in them are ordinary Better Auth scrypt and carried over
  untouched. What moved off the managed service is the *configuration*:
  sign-up, password length, session lifetime, trusted origins and the roles
  below are code here, reviewed and deployed like anything else.
- **`src/lib/roles.ts`** — the roles, in one place, because three things have
  to agree about them: `requireAdmin()`, `requireSuperAdmin()`, and Better
  Auth's admin plugin.
- **`src/app/sign-in/page.tsx`** — the only public page, plus the
  `/api/auth/*` endpoints it posts to. Both are excluded from the proxy matcher
  because they must work before you have a session. There is no `/sign-up`.
- **`src/app/staff/page.tsx`** — who can sign in and what they may do. Create
  an account, set a password, change a role, suspend, sign someone out of every
  device. Super admins only, and every action is written to `audit_log`.
- **`src/proxy.ts`** — session gate. Next 16 renamed `middleware.ts` to
  `proxy.ts`. This is an *optimistic* check only: it asks whether a signed
  session cookie is present, never whether it is still valid or belongs to
  staff.
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

Accounts live in `neon_auth.user`, in this project's own database. There is no
public sign-up (`disableSignUp` in `src/lib/better-auth.ts`), so an account
exists only because a super admin created it on the **Staff** page.

Access is the `role` column, read on every request — so granting or withdrawing
it takes effect on that person's next click, not the next deploy:

| Role | What it reaches |
|---|---|
| `super_admin` | Everything, plus the website content editor and this Staff page |
| `admin` | Client records, schedule, inbox |
| `pending` | Signs in successfully and is then refused everything |
| `revoked` | Same, for someone who used to have access |

Suspending (`banned`) is the other lever: it keeps the row, and the audit trail
pointing at it, while ending every session immediately. Nothing here deletes an
account — after an incident you need the row.

**Everything above is done on `/staff`.** The SQL below is the break-glass
route, for when nobody can sign in at all:

```sql
-- who currently has access
select email, role, banned from neon_auth."user" order by email;

-- revoke, effective on their next request
update neon_auth."user" set role = 'revoked' where email = '...';

-- suspend instead, keeping the row for the audit trail
update neon_auth."user" set banned = true where email = '...';
```

To set a password without a working sign-in, hash it the way Better Auth does
and write it to the credential row — the format is `salt:hash`, scrypt with
N=16384, r=16, p=1, dkLen=64:

```bash
node -e "import('@better-auth/utils/password').then(m=>m.hashPassword('<password>')).then(console.log)"
```

```sql
update neon_auth.account a
   set password = '<the salt:hash line>', "updatedAt" = now()
  from neon_auth."user" u
 where a."userId" = u.id and a."providerId" = 'credential'
   and lower(u.email) = '...';
```

The old `curl` recipe against `/api/auth/sign-up/email` no longer works and has
been removed: sign-up is disabled, which is the point.

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

### Moving off Neon Auth

The deploy that introduced self-hosted Better Auth signs everyone out once: the
session cookie is a different name, so existing sessions are not carried over.
Nothing else about an account changes — same row, same password.

The Neon Auth integration can stay provisioned; nothing calls it any more, and
`neon_auth.project_config` (where `disableSignUp` and `trusted_origins` used to
live) is no longer read by anything. When you are satisfied the change has
settled, disconnecting it is the last step — but check first that it does not
drop the `neon_auth` tables, because those are now this app's own.
