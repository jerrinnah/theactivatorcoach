"use server";

import { revalidatePath } from "next/cache";
import { requireSuperAdmin } from "@/lib/auth";
import { record } from "@/lib/audit";
import { deleteUpload, writeUpload } from "@/lib/github";

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

/**
 * Images go into the repo, so the size cap is about keeping the repo and the
 * FTP deploy sane rather than about storage cost. 4 MB is generous for a logo
 * or a portrait and still uploads over a slow connection.
 */
const MAX_BYTES = 4 * 1024 * 1024;

const ALLOWED = new Map<string, string[]>([
  ["image/jpeg", ["jpg", "jpeg"]],
  ["image/png", ["png"]],
  ["image/webp", ["webp"]],
  ["image/svg+xml", ["svg"]],
  ["image/x-icon", ["ico"]],
  ["image/vnd.microsoft.icon", ["ico"]],
]);

/** Strip anything that could escape the uploads folder or break a URL. */
function safeName(raw: string): string {
  const base = raw.split(/[\\/]/).pop() ?? "file";
  return base
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[-.]+/, "")
    .slice(0, 80);
}

export async function uploadImage(form: FormData): Promise<UploadResult> {
  const admin = await requireSuperAdmin();

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image first." };
  }
  if (file.size > MAX_BYTES) {
    return {
      ok: false,
      error: `That's ${(file.size / 1024 / 1024).toFixed(1)} MB. Keep images under 4 MB — resize it and try again.`,
    };
  }

  const exts = ALLOWED.get(file.type);
  if (!exts) {
    return {
      ok: false,
      error: "Images only — JPG, PNG, WebP, SVG or ICO.",
    };
  }

  const name = safeName(file.name);
  const ext = name.split(".").pop() ?? "";
  // A .png named .jpg would serve with the wrong content type on cPanel.
  if (!exts.includes(ext)) {
    return {
      ok: false,
      error: `That file is ${file.type} but is named .${ext}. Rename it to .${exts[0]} and try again.`,
    };
  }

  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const replacingSha = form.get("sha");

  try {
    const { url } = await writeUpload({
      name,
      base64,
      message: `content: upload ${name}`,
      authorName: admin.name,
      authorEmail: admin.email,
      sha: typeof replacingSha === "string" && replacingSha ? replacingSha : undefined,
    });
    await record(admin, "created", "content", `upload:${name}`);
    revalidatePath("/content/media");
    return { ok: true, url };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Upload failed.";
    if (msg.includes("422") || msg.includes("sha")) {
      return {
        ok: false,
        error: `An image called ${name} already exists. Rename the file, or delete the existing one first.`,
      };
    }
    return { ok: false, error: msg };
  }
}

export async function removeImage(form: FormData) {
  const admin = await requireSuperAdmin();
  const name = String(form.get("name") ?? "");
  const sha = String(form.get("sha") ?? "");
  if (!name || !sha) throw new Error("Missing image");

  await deleteUpload({
    name,
    sha,
    message: `content: remove ${name}`,
    authorName: admin.name,
    authorEmail: admin.email,
  });
  await record(admin, "archived", "content", `upload:${name}`);
  revalidatePath("/content/media");
}
