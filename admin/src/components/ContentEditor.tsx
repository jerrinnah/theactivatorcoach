"use client";

import { useState } from "react";
import { JsonField, type Json } from "./JsonFields";
import { saveContent } from "@/app/content/actions";

/**
 * Wraps the recursive field editor with the things that make it safe to point
 * at a live website: a dirty check, a commit message, conflict handling, and a
 * raw JSON escape hatch for edits the form makes awkward.
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
  const [value, setValue] = useState<Json>(initial);
  const [summary, setSummary] = useState("");
  const [raw, setRaw] = useState(false);
  const [rawText, setRawText] = useState(() => JSON.stringify(initial, null, 2));
  const [rawError, setRawError] = useState<string | null>(null);
  const [state, setState] = useState<
    { kind: "idle" } | { kind: "saving" } | { kind: "saved"; commit: string } | { kind: "error"; message: string }
  >({ kind: "idle" });

  const dirty = JSON.stringify(value) !== JSON.stringify(initial);

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
    const res = await saveContent(slug, JSON.stringify(payload), sha, summary);
    if (res.ok) {
      setState({ kind: "saved", commit: res.commit });
    } else {
      setState({ kind: "error", message: res.error });
    }
  }

  if (state.kind === "saved") {
    return (
      <div className="card p-8 text-center">
        <p className="text-lg font-semibold tracking-tight">Committed</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          The deploy workflow is building the site now. It usually takes a
          couple of minutes to appear on theactivatorcoach.com.
        </p>
        {state.commit && (
          <p className="mt-3 font-mono text-xs text-slate-400">
            {state.commit.slice(0, 7)}
          </p>
        )}
        <a
          href={`/content/${slug}`}
          className="mt-6 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-strong"
        >
          Back to {title}
        </a>
      </div>
    );
  }

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
          {dirty || raw ? "Unsaved changes" : "No changes"}
        </span>
        <button
          type="button"
          onClick={save}
          disabled={state.kind === "saving" || (!dirty && !raw)}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-strong disabled:opacity-50"
        >
          {state.kind === "saving" ? "Publishing…" : "Publish"}
        </button>
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
