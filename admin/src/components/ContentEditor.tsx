"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { JsonField, type Json } from "./JsonFields";
import { deployStatus, saveContent } from "@/app/content/actions";

/** How long typing has to pause before an automatic publish fires. */
const AUTO_PUBLISH_DELAY = 4000;
const AUTO_PUBLISH_KEY = "cms:auto-publish";

// The auto-publish preference is per browser, kept in localStorage. Read
// through useSyncExternalStore so the server render (always off) and the
// first client render agree.
const autoPublishListeners = new Set<() => void>();

function subscribeAutoPublish(cb: () => void) {
  autoPublishListeners.add(cb);
  return () => autoPublishListeners.delete(cb);
}

function readAutoPublish() {
  try {
    return localStorage.getItem(AUTO_PUBLISH_KEY) === "1";
  } catch {
    return false;
  }
}

function toggleAutoPublish(on: boolean) {
  try {
    localStorage.setItem(AUTO_PUBLISH_KEY, on ? "1" : "0");
  } catch {
    // Storage blocked — the toggle stays off.
  }
  autoPublishListeners.forEach((cb) => cb());
}

type Deploy =
  | { kind: "queued"; commit: string }
  | { kind: "building"; commit: string; url: string }
  | { kind: "live"; commit: string; url: string; seconds: number }
  | { kind: "failed"; commit: string; url: string };

/**
 * Wraps the recursive field editor with the things that make it safe to point
 * at a live website: a dirty check, a commit message, conflict handling, and a
 * raw JSON escape hatch for edits the form makes awkward.
 *
 * Publishing keeps the editor open: the saved version becomes the new
 * baseline, and the deploy for that commit is followed until it is live.
 */
export function ContentEditor({
  slug,
  title,
  initial,
  sha,
}: {
  slug: string;
  title: string;
  initial: Json;
  sha: string;
}) {
  // What the repo holds now. Moves forward on every successful publish, so
  // the next save is checked against it rather than against page load.
  const [base, setBase] = useState({ data: initial, sha });
  const [value, setValue] = useState<Json>(initial);
  const [summary, setSummary] = useState("");
  const [raw, setRaw] = useState(false);
  const [rawText, setRawText] = useState(() => JSON.stringify(initial, null, 2));
  const [rawError, setRawError] = useState<string | null>(null);
  const [state, setState] = useState<
    { kind: "idle" } | { kind: "saving" } | { kind: "error"; message: string }
  >({ kind: "idle" });
  const [deploy, setDeploy] = useState<Deploy | null>(null);
  const autoPublish = useSyncExternalStore(
    subscribeAutoPublish,
    readAutoPublish,
    () => false,
  );

  const dirty = JSON.stringify(value) !== JSON.stringify(base.data);


  function toRaw() {
    setRawText(JSON.stringify(value, null, 2));
    setRawError(null);
    setRaw(true);
  }

  function fromRaw() {
    try {
      setValue(JSON.parse(rawText));
      setRawError(null);
      setRaw(false);
    } catch (e) {
      setRawError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  async function save() {
    if (state.kind === "saving") return;
    // Editing raw and hitting save should commit what's on screen, not the
    // last value the form knew about.
    let payload = value;
    if (raw) {
      try {
        payload = JSON.parse(rawText);
      } catch (e) {
        setRawError(e instanceof Error ? e.message : "Invalid JSON");
        return;
      }
    }

    setState({ kind: "saving" });
    const res = await saveContent(
      slug,
      JSON.stringify(payload),
      base.sha,
      summary,
    );
    if (res.ok) {
      setBase({ data: payload, sha: res.sha });
      setSummary("");
      setState({ kind: "idle" });
      if (res.commit) setDeploy({ kind: "queued", commit: res.commit });
    } else {
      setState({ kind: "error", message: res.error });
    }
  }

  // Effects below always reach the latest save(), not the one from the render
  // that scheduled them.
  const saveRef = useRef(save);
  useEffect(() => {
    saveRef.current = save;
  });

  // Cmd/Ctrl+S publishes from anywhere on the page.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveRef.current();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-publish once typing pauses. Only form edits count — half-written
  // JSON is never valid enough to send.
  useEffect(() => {
    if (!autoPublish || raw || !dirty || state.kind !== "idle") return;
    const t = setTimeout(() => saveRef.current(), AUTO_PUBLISH_DELAY);
    return () => clearTimeout(t);
  }, [autoPublish, raw, dirty, value, state.kind]);

  // Closing the tab with unpublished edits would silently lose them.
  useEffect(() => {
    if (!dirty && !raw) return;
    function onUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
    }
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [dirty, raw]);

  // Follow the deploy for the latest publish until it finishes. A newer
  // publish replaces the commit being watched.
  const watching =
    deploy && (deploy.kind === "queued" || deploy.kind === "building")
      ? deploy.commit
      : null;
  useEffect(() => {
    if (!watching) return;
    let stopped = false;
    const startedPolling = Date.now();

    async function poll() {
      if (stopped) return;
      const run = await deployStatus(watching!).catch(() => null);
      if (stopped) return;
      if (run?.status === "completed") {
        const seconds = run.startedAt
          ? Math.max(1, Math.round((Date.now() - Date.parse(run.startedAt)) / 1000))
          : 0;
        setDeploy(
          run.conclusion === "success"
            ? { kind: "live", commit: watching!, url: run.url, seconds }
            : { kind: "failed", commit: watching!, url: run.url },
        );
        return;
      }
      if (run) setDeploy({ kind: "building", commit: watching!, url: run.url });
      // Give up quietly after five minutes; the Website page still shows it.
      if (Date.now() - startedPolling < 5 * 60_000) setTimeout(poll, 3000);
    }

    const t = setTimeout(poll, 2000);
    return () => {
      stopped = true;
      clearTimeout(t);
    };
  }, [watching]);

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <button
            type="button"
            onClick={raw ? fromRaw : toRaw}
            className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:bg-slate-50"
          >
            {raw ? "Back to fields" : "Edit as JSON"}
          </button>
        </div>

        {raw ? (
          <div>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              spellCheck={false}
              rows={28}
              className="w-full rounded-lg border border-line bg-slate-50 p-3 font-mono text-xs outline-none focus:border-brand"
            />
            {rawError && (
              <p role="alert" className="mt-2 text-sm text-rose-700">
                {rawError}
              </p>
            )}
          </div>
        ) : (
          <JsonField label={title} value={value} onChange={setValue} />
        )}
      </div>

      <div className="card sticky bottom-4 flex flex-wrap items-center gap-3 p-4">
        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="What changed? (optional — becomes the commit message)"
          className="min-w-0 flex-1 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-blue-100"
        />
        <span className="text-xs text-muted">
          {state.kind === "saving"
            ? "Publishing…"
            : dirty || raw
              ? autoPublish && !raw
                ? "Publishing when you pause…"
                : "Unsaved changes"
              : "All changes published"}
        </span>
        <label className="flex items-center gap-1.5 text-xs text-muted">
          <input
            type="checkbox"
            checked={autoPublish}
            onChange={(e) => toggleAutoPublish(e.target.checked)}
            className="accent-brand"
          />
          Publish automatically
        </label>
        <button
          type="button"
          onClick={save}
          disabled={state.kind === "saving" || (!dirty && !raw)}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-strong disabled:opacity-50"
        >
          {state.kind === "saving" ? "Publishing…" : "Publish"}
        </button>
        {deploy && <DeployLine deploy={deploy} />}
      </div>

      {state.kind === "error" && (
        <p
          role="alert"
          className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {state.message}
        </p>
      )}
    </div>
  );
}

function DeployLine({ deploy }: { deploy: Deploy }) {
  const dot =
    deploy.kind === "live"
      ? "bg-emerald-500"
      : deploy.kind === "failed"
        ? "bg-rose-500"
        : "animate-pulse bg-amber-400";
  const text =
    deploy.kind === "queued"
      ? "Saved — starting the site build…"
      : deploy.kind === "building"
        ? "Saved — rebuilding theactivatorcoach.com…"
        : deploy.kind === "live"
          ? `Live on theactivatorcoach.com${deploy.seconds ? ` (${deploy.seconds}s)` : ""}`
          : "Saved, but the site build failed — the live site is unchanged.";

  return (
    <div className="flex w-full items-center gap-2 text-xs text-muted" role="status">
      <span aria-hidden className={`h-2 w-2 rounded-full ${dot}`} />
      <span>{text}</span>
      <span className="font-mono text-slate-400">{deploy.commit.slice(0, 7)}</span>
      {deploy.kind !== "queued" && (
        <a
          href={deploy.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto underline-offset-4 hover:underline"
        >
          View run
        </a>
      )}
    </div>
  );
}
