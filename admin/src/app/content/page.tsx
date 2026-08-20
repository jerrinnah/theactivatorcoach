import Link from "next/link";
import { requireSuperAdmin } from "@/lib/auth";
import { isConfigured, missingConfig, latestDeployment } from "@/lib/github";
import { CONTENT_FILES } from "@/lib/content-files";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  await requireSuperAdmin();
  const configured = isConfigured();
  const missing = missingConfig();

  const deployment = configured
    ? await latestDeployment().catch(() => null)
    : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-brand-strong">
          Website
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Edit what the public site says. Saving commits to the repository, and
          the deploy workflow rebuilds theactivatorcoach.com — usually within a
          couple of minutes.
        </p>
      </div>

      {!configured && (
        <div className="card mb-6 border-l-4 border-amber-400 p-5">
          <p className="text-sm font-medium">Publishing isn&rsquo;t connected</p>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Set{" "}
            {missing.map((m, i) => (
              <span key={m}>
                {i > 0 && " and "}
                <code className="rounded bg-slate-100 px-1">{m}</code>
              </span>
            ))}{" "}
            in the admin&rsquo;s environment, then redeploy — Vercel only picks
            up environment changes on a new deployment. Until then you can open
            the editors but not save.
          </p>
        </div>
      )}

      {deployment && (
        <div className="card mb-6 flex flex-wrap items-center gap-3 p-4">
          <span
            aria-hidden
            className={`h-2.5 w-2.5 rounded-full ${
              deployment.status !== "completed"
                ? "animate-pulse bg-amber-400"
                : deployment.conclusion === "success"
                  ? "bg-emerald-500"
                  : "bg-rose-500"
            }`}
          />
          <span className="text-sm">
            Last deploy:{" "}
            <span className="font-medium">
              {deployment.status === "completed"
                ? (deployment.conclusion ?? "unknown")
                : deployment.status.replace(/_/g, " ")}
            </span>
          </span>
          <span className="font-mono text-xs text-slate-400">
            {deployment.headSha.slice(0, 7)}
          </span>
          <a
            href={deployment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-sm text-muted underline-offset-4 hover:underline"
          >
            View run
          </a>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/content/media" className="card p-6 transition hover:shadow-md">
          <h2 className="text-lg font-semibold tracking-tight">Images</h2>
          <p className="mt-2 text-sm text-muted">
            Upload logos, portraits and photographs. Committed to the repository
            and served from <code className="text-xs">/uploads</code>.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-400">
            content/uploads/
          </p>
        </Link>

        {CONTENT_FILES.map((f) => (
          <Link
            key={f.slug}
            href={`/content/${f.slug}`}
            className="card p-6 transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold tracking-tight">{f.title}</h2>
            <p className="mt-2 text-sm text-muted">{f.blurb}</p>
            <p className="mt-4 font-mono text-xs text-slate-400">{f.path}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
