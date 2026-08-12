# Data protection

This app stores psychotherapy client records: names, contact details, and
clinical progress notes. That is health data about identifiable people. Nigeria's
NDPA 2023 applies, and GDPR applies to any client in the UK or EU — which the
practice's diaspora offering means there will be.

Read this before changing anything under `src/db/` or adding a page that reads
client data.

## What the build already does

- **Access is authenticated.** Clerk sits in front of every route. `proxy.ts`
  does an optimistic check only; the real authorisation is re-checked inside
  every page and Server Function, because Server Functions are reachable by
  direct POST and cannot rely on the proxy having run.
- **Nothing is hard-deleted.** Clients archive via `archived_at`. Progress notes
  have `onDelete: "restrict"` on their client reference, so a client with notes
  cannot be removed by accident.
- **Access is logged.** Every read and write of a client record appends to
  `audit_log`, with the actor, the action, the record, and the time. Nothing in
  the app updates or deletes those rows.
- **Encrypted at rest and in transit.** Neon encrypts storage; connections are
  TLS. Backups are Neon's, retained per its plan.

## What is deliberately not done yet

- **Application-level encryption of note bodies.** Notes are encrypted at rest
  by Neon but readable by anyone with database access. Encrypting `content` in
  the app would mean managing a key, and losing that key loses the notes. Worth
  doing, but it is a decision with a real failure mode, so it is not assumed.
- **Retention and erasure.** There is no automatic deletion after N years, and
  no self-service "delete my data" route. Both are legal requirements that
  depend on the practice's retention policy and professional body's rules. That
  policy has to be written down before it can be automated.
- **A signed data processing agreement.** Neon, Clerk and Vercel each process
  data on the practice's behalf. Each offers a DPA; someone has to accept them.

## Rules for anyone adding to this

1. **Never log record contents.** No `console.log(client)`, no error messages
   that interpolate a note. Log ids.
2. **Re-check auth inside the function**, not just in the proxy or the page that
   renders the form.
3. **Write to `audit_log` on every read of a client's notes**, not only writes.
   The question after an incident is "who saw this", not "who changed it".
4. **Don't add a public route to this app.** There is no anonymous surface here
   by design.
5. **Don't copy client data into a third party** — analytics, error trackers,
   AI APIs — without checking it is covered by a DPA.

## If there is a breach

NDPA requires notifying the Commission within 72 hours of becoming aware of a
personal data breach; GDPR the same for the relevant supervisory authority. The
`audit_log` table is what establishes scope. Do not truncate it.
