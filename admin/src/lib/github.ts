/**
 * Reads and writes the public site's content files in the GitHub repo.
 *
 * The published site is static HTML built by GitHub Actions and uploaded to
 * cPanel over FTP, so the only way an edit reaches visitors is by committing to
 * the default branch and letting that workflow run. This module is that commit.
 *
 * Nothing here touches client records. It is deliberately a separate credential
 * and a separate blast radius from the Neon database.
 */

const API = "https://api.github.com";

type Config = { repo: string; branch: string; token: string };

function config(): Config {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) {
    throw new Error(
      "Publishing is not configured. Set GITHUB_TOKEN and GITHUB_REPO (owner/name).",
    );
  }
  return { token, repo, branch: process.env.GITHUB_BRANCH || "main" };
}

/** True when the deployment has credentials, so the UI can say so plainly. */
export function isConfigured(): boolean {
  return missingConfig().length === 0;
}

/**
 * Exactly which variables are absent. Listing the ones already set sends people
 * to re-check settings that are fine, so the UI names only what is missing.
 */
export function missingConfig(): string[] {
  const missing: string[] = [];
  if (!process.env.GITHUB_TOKEN) missing.push("GITHUB_TOKEN");
  if (!process.env.GITHUB_REPO) missing.push("GITHUB_REPO");
  return missing;
}

async function gh(path: string, init: RequestInit = {}) {
  const { token } = config();
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
    // Content must never be served from a cache — a stale sha loses an edit.
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    // Don't leak the token; GitHub echoes the URL but never the header.
    throw new Error(
      `GitHub ${init.method ?? "GET"} ${path} failed: ${res.status} ${body.slice(0, 300)}`,
    );
  }
  return res.json();
}

export type ContentFile = {
  /** Repo-relative path, e.g. "content/site.json". */
  path: string;
  /** Parsed JSON. */
  data: unknown;
  /** Blob sha — required to write without clobbering a concurrent edit. */
  sha: string;
};

export async function readJson(path: string): Promise<ContentFile> {
  const { repo, branch } = config();
  const json = await gh(
    `/repos/${repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(branch)}`,
  );
  const text = Buffer.from(json.content, "base64").toString("utf8");
  return { path, data: JSON.parse(text), sha: json.sha };
}

/**
 * Commits a new version of a JSON file.
 *
 * `sha` is the blob the editor started from. GitHub rejects the write if the
 * file has moved on since, which is what stops two people silently overwriting
 * each other — the caller surfaces that as "reload and try again" rather than
 * force-pushing over someone's work.
 */
export async function writeJson({
  path,
  data,
  sha,
  message,
  authorEmail,
  authorName,
}: {
  path: string;
  data: unknown;
  sha: string;
  message: string;
  authorEmail: string;
  authorName: string;
}): Promise<{ commit: string }> {
  const { repo, branch } = config();

  // Trailing newline matches what the extraction wrote, so diffs stay clean.
  const text = `${JSON.stringify(data, null, 2)}\n`;

  const json = await gh(`/repos/${repo}/contents/${encodeURI(path)}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(text, "utf8").toString("base64"),
      sha,
      branch,
      // Attributes the change to the person who made it, not to a bot.
      committer: { name: authorName, email: authorEmail },
      author: { name: authorName, email: authorEmail },
    }),
  });

  return { commit: json.commit?.sha ?? "" };
}

export type Upload = {
  name: string;
  /** Where the built site will serve it from. */
  url: string;
  size: number;
  sha: string;
};

const UPLOAD_DIR = "content/uploads";

/** Images live in the repo so they deploy with everything else. */
export async function listUploads(): Promise<Upload[]> {
  const { repo, branch } = config();
  try {
    const json = await gh(
      `/repos/${repo}/contents/${UPLOAD_DIR}?ref=${encodeURIComponent(branch)}`,
    );
    if (!Array.isArray(json)) return [];
    return json
      .filter((f: { type: string }) => f.type === "file")
      .map((f: { name: string; size: number; sha: string }) => ({
        name: f.name,
        url: `/uploads/${f.name}`,
        size: f.size,
        sha: f.sha,
      }));
  } catch (e) {
    // The folder doesn't exist until the first upload — that isn't an error.
    if (e instanceof Error && e.message.includes("404")) return [];
    throw e;
  }
}

/**
 * Commits a binary. `sha` is required only when replacing an existing file;
 * GitHub rejects a create that collides with something already there, which is
 * what stops an upload silently replacing a different image of the same name.
 */
export async function writeUpload({
  name,
  base64,
  message,
  authorEmail,
  authorName,
  sha,
}: {
  name: string;
  base64: string;
  message: string;
  authorEmail: string;
  authorName: string;
  sha?: string;
}): Promise<{ url: string }> {
  const { repo, branch } = config();
  await gh(`/repos/${repo}/contents/${UPLOAD_DIR}/${encodeURIComponent(name)}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: base64,
      branch,
      ...(sha ? { sha } : {}),
      committer: { name: authorName, email: authorEmail },
      author: { name: authorName, email: authorEmail },
    }),
  });
  return { url: `/uploads/${name}` };
}

export async function deleteUpload({
  name,
  sha,
  message,
  authorEmail,
  authorName,
}: {
  name: string;
  sha: string;
  message: string;
  authorEmail: string;
  authorName: string;
}): Promise<void> {
  const { repo, branch } = config();
  await gh(`/repos/${repo}/contents/${UPLOAD_DIR}/${encodeURIComponent(name)}`, {
    method: "DELETE",
    body: JSON.stringify({
      message,
      sha,
      branch,
      committer: { name: authorName, email: authorEmail },
      author: { name: authorName, email: authorEmail },
    }),
  });
}

export type Deployment = {
  status: string;
  conclusion: string | null;
  startedAt: string | null;
  url: string;
  headSha: string;
};

/** The most recent run of the deploy workflow, so the editor can show progress. */
export async function latestDeployment(): Promise<Deployment | null> {
  const { repo, branch } = config();
  const json = await gh(
    `/repos/${repo}/actions/runs?branch=${encodeURIComponent(branch)}&per_page=1`,
  );
  const run = json.workflow_runs?.[0];
  if (!run) return null;
  return {
    status: run.status,
    conclusion: run.conclusion,
    startedAt: run.run_started_at ?? null,
    url: run.html_url,
    headSha: run.head_sha,
  };
}
