"use client";

import { useState } from "react";
import { uploadImage, removeImage } from "@/app/content/media/actions";
import type { Upload } from "@/lib/github";

/**
 * Uploaded images are committed to the repo and served from /uploads by the
 * built site. The preview here points at the live site, so a freshly uploaded
 * image shows as broken until the deploy finishes — which is honest, and the
 * note below says so rather than leaving people guessing.
 */
export function MediaLibrary({
  uploads,
  siteOrigin,
}: {
  uploads: Upload[];
  siteOrigin: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justUploaded, setJustUploaded] = useState<string | null>(null);

  async function onUpload(form: FormData) {
    setBusy(true);
    setError(null);
    const res = await uploadImage(form);
    setBusy(false);
    if (res.ok) setJustUploaded(res.url);
    else setError(res.error);
  }

  return (
    <div className="space-y-6">
      <section className="card p-6">
        <h2 className="text-lg font-semibold tracking-tight">Upload an image</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          JPG, PNG, WebP, SVG or ICO, up to 4 MB. Images are committed to the
          repository and deploy with the site, so they appear a couple of
          minutes after uploading.
        </p>

        <form action={onUpload} className="mt-4 flex flex-wrap items-center gap-3">
          <input
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml,image/x-icon"
            required
            className="text-sm file:mr-3 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-slate-200"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-strong disabled:opacity-50"
          >
            {busy ? "Uploading…" : "Upload"}
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        {justUploaded && (
          <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            Committed. Use this path in the theme or a content field:{" "}
            <code className="rounded bg-white/70 px-1 font-mono">
              {justUploaded}
            </code>
          </div>
        )}
      </section>

      <section className="card p-6">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">
          Library{" "}
          <span className="text-sm font-normal text-muted">
            ({uploads.length})
          </span>
        </h2>

        {uploads.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line p-10 text-center text-sm text-muted">
            Nothing uploaded yet.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uploads.map((u) => (
              <li key={u.sha} className="rounded-xl border border-line p-3">
                <div className="grid h-32 place-items-center overflow-hidden rounded-lg bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${siteOrigin}${u.url}`}
                    alt={u.name}
                    className="max-h-32 w-auto object-contain"
                  />
                </div>
                <p className="mt-2 truncate text-sm font-medium" title={u.name}>
                  {u.name}
                </p>
                <p className="text-xs text-muted">
                  {(u.size / 1024).toFixed(0)} KB
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <code className="truncate rounded bg-slate-50 px-1.5 py-0.5 font-mono text-xs text-slate-600">
                    {u.url}
                  </code>
                  <form action={removeImage}>
                    <input type="hidden" name="name" value={u.name} />
                    <input type="hidden" name="sha" value={u.sha} />
                    <button
                      type="submit"
                      className="shrink-0 rounded-full px-2 py-1 text-xs text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
