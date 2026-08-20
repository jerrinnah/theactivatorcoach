"use server";

import { revalidatePath } from "next/cache";
import { requireSuperAdmin } from "@/lib/auth";
import { record } from "@/lib/audit";
import { readJson, writeJson } from "@/lib/github";
import { fileForSlug } from "@/lib/content-files";

export type SaveResult =
  | { ok: true; commit: string }
  | { ok: false; error: string; stale?: boolean };

/**
 * Commits an edited content file. Re-checks authorisation because Server
 * Functions are reachable by direct POST and never pass through the proxy.
 */
export async function saveContent(
  slug: string,
  json: string,
  sha: string,
  summary: string,
): Promise<SaveResult> {
  const admin = await requireSuperAdmin();

  const file = fileForSlug(slug);
  // The path comes from our own allowlist, never from the request body.
  if (!file) return { ok: false, error: "Unknown content file." };

  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { ok: false, error: "That isn't valid JSON — nothing was saved." };
  }

  const message = summary.trim()
    ? `content: ${summary.trim()}`
    : `content: update ${file.title.toLowerCase()}`;

  try {
    const { commit } = await writeJson({
      path: file.path,
      data,
      sha,
      message,
      authorName: admin.name,
      authorEmail: admin.email,
    });

    await record(admin, "updated", "content", file.slug);
    revalidatePath("/content");
    revalidatePath(`/content/${slug}`);
    return { ok: true, commit };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not save.";
    // 409 means the file moved on since this editor loaded it. Overwriting
    // would silently discard the other edit, so refuse and say why.
    if (msg.includes("409") || msg.includes("does not match")) {
      return {
        ok: false,
        stale: true,
        error:
          "Someone else changed this file since you opened it. Reload to get their version, then reapply your edit.",
      };
    }
    return { ok: false, error: msg };
  }
}

/** Re-reads a file so the editor can recover from a stale-sha conflict. */
export async function reloadContent(slug: string) {
  await requireSuperAdmin();
  const file = fileForSlug(slug);
  if (!file) throw new Error("Unknown content file");
  return readJson(file.path);
}
