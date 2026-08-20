"use client";

import { useState } from "react";

/**
 * Renders an editable form for arbitrary JSON by walking the value itself
 * rather than a hand-written schema. Every field in the content files is
 * therefore editable by construction — including ones added later, which a
 * fixed schema would have silently hidden.
 *
 * Shape is preserved: a string stays a string, a number stays a number. The
 * static build reads these files directly, so a number turning into "12" would
 * reach the live site.
 */

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

const input =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100";

/** Long or multi-line copy gets a textarea; short labels get a single line. */
function isProse(v: string) {
  return v.length > 90 || v.includes("\n");
}

function humanise(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
}

/** A short, recognisable caption for one item in an array of objects. */
function captionFor(v: Json, index: number): string {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    for (const k of ["title", "name", "label", "slug", "path", "step", "id"]) {
      const c = (v as Record<string, Json>)[k];
      if (typeof c === "string" && c.trim()) return c;
    }
  }
  if (typeof v === "string" && v.trim()) return v;
  return `Item ${index + 1}`;
}

/** A new element matching the shape of the existing ones. */
function blankLike(sample: Json | undefined): Json {
  if (sample === undefined || sample === null) return "";
  if (Array.isArray(sample)) return [];
  if (typeof sample === "object") {
    const out: Record<string, Json> = {};
    for (const [k, v] of Object.entries(sample)) out[k] = blankLike(v);
    return out;
  }
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  return "";
}

export function JsonField({
  label,
  value,
  onChange,
  depth = 0,
}: {
  label: string;
  value: Json;
  onChange: (next: Json) => void;
  depth?: number;
}) {
  if (typeof value === "string") {
    return (
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted">
          {label}
        </span>
        {isProse(value) ? (
          <textarea
            value={value}
            rows={Math.min(12, Math.max(3, value.split("\n").length + 1))}
            onChange={(e) => onChange(e.target.value)}
            className={input}
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={input}
          />
        )}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted">
          {label}
        </span>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            // Keep it a number; an empty box would otherwise write "".
            const n = e.target.value === "" ? 0 : Number(e.target.value);
            onChange(Number.isNaN(n) ? value : n);
          }}
          className={input}
        />
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-line"
        />
        <span className="text-xs font-medium text-muted">{label}</span>
      </label>
    );
  }

  if (value === null) {
    return (
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted">
          {label} <span className="text-slate-400">(empty)</span>
        </span>
        <input
          value=""
          placeholder="Leave blank to keep empty"
          onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
          className={input}
        />
      </label>
    );
  }

  if (Array.isArray(value)) {
    const primitive = value.every((v) => typeof v !== "object" || v === null);
    return (
      <ArrayField
        label={label}
        value={value}
        onChange={onChange}
        depth={depth}
        primitive={primitive}
      />
    );
  }

  return (
    <ObjectField
      label={label}
      value={value as Record<string, Json>}
      onChange={onChange}
      depth={depth}
    />
  );
}

function ObjectField({
  label,
  value,
  onChange,
  depth,
}: {
  label: string;
  value: Record<string, Json>;
  onChange: (next: Json) => void;
  depth: number;
}) {
  const entries = Object.entries(value);
  const body = (
    <div className="space-y-3">
      {entries.map(([k, v]) => (
        <JsonField
          key={k}
          label={humanise(k)}
          value={v}
          depth={depth + 1}
          onChange={(next) => onChange({ ...value, [k]: next })}
        />
      ))}
    </div>
  );

  // Top level renders flat; nested objects get a labelled frame.
  if (depth === 0) return body;

  return (
    <fieldset className="rounded-xl border border-line p-3">
      <legend className="px-1 text-xs font-medium text-muted">{label}</legend>
      {body}
    </fieldset>
  );
}

function ArrayField({
  label,
  value,
  onChange,
  depth,
  primitive,
}: {
  label: string;
  value: Json[];
  onChange: (next: Json) => void;
  depth: number;
  primitive: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const set = (i: number, next: Json) =>
    onChange(value.map((v, j) => (j === i ? next : v)));
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));
  const move = (i: number, by: number) => {
    const j = i + by;
    if (j < 0 || j >= value.length) return;
    const copy = [...value];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };
  const add = () => onChange([...value, blankLike(value[0])]);

  return (
    <div className="rounded-xl border border-line p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-muted">
          {label}{" "}
          <span className="text-slate-400">
            ({value.length} {value.length === 1 ? "item" : "items"})
          </span>
        </span>
        <button
          type="button"
          onClick={add}
          className="rounded-full px-2.5 py-1 text-xs text-brand transition hover:bg-blue-50"
        >
          + Add
        </button>
      </div>

      <div className={primitive ? "space-y-2" : "space-y-2"}>
        {value.map((v, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              {primitive ? (
                <JsonField
                  label=""
                  value={v}
                  depth={depth + 1}
                  onChange={(next) => set(i, next)}
                />
              ) : (
                <div className="rounded-lg border border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition hover:bg-slate-50"
                  >
                    <span className="truncate font-medium">
                      {captionFor(v, i)}
                    </span>
                    <span className="shrink-0 text-xs text-muted">
                      {open === i ? "Close" : "Edit"}
                    </span>
                  </button>
                  {open === i && (
                    <div className="border-t border-line p-3">
                      <JsonField
                        label={captionFor(v, i)}
                        value={v}
                        depth={depth + 1}
                        onChange={(next) => set(i, next)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-0.5 pt-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                aria-label="Move up"
                className="rounded px-1.5 text-xs text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                aria-label="Move down"
                className="rounded px-1.5 text-xs text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label="Remove"
                className="rounded px-1.5 text-xs text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export type { Json };
