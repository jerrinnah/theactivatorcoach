import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSuperAdmin } from "@/lib/auth";
import { record } from "@/lib/audit";
import { isConfigured, readJson } from "@/lib/github";
import { fileForSlug } from "@/lib/content-files";
import { ContentEditor } from "@/components/ContentEditor";
import type { Json } from "@/components/JsonFields";

export const dynamic = "force-dynamic";

export default async function ContentFilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const admin = await requireSuperAdmin();
  const { slug } = await params;

  const file = fileForSlug(slug);
  if (!file) notFound();

  if (!isConfigured()) {
    return (
      <div className="card p-10 text-center">
        <p className="text-sm font-medium">Publishing isn&rsquo;t connected</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Set GITHUB_TOKEN and GITHUB_REPO in the admin&rsquo;s environment to
          edit {file.title.toLowerCase()}.
        </p>
        <Link
          href="/content"
          className="mt-6 inline-block text-sm text-muted underline-offset-4 hover:underline"
        >
          ← Website
        </Link>
      </div>
    );
  }

  let loaded;
  try {
    loaded = await readJson(file.path);
  } catch (e) {
    return (
      <div className="card p-10 text-center">
        <p className="text-sm font-medium">Could not load {file.title}</p>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
          {e instanceof Error ? e.message : "Unknown error"}
        </p>
        <Link
          href="/content"
          className="mt-6 inline-block text-sm text-muted underline-offset-4 hover:underline"
        >
          ← Website
        </Link>
      </div>
    );
  }

  await record(admin, "viewed", "content", file.slug);

  return (
    <div>
      <Link
        href="/content"
        className="text-sm text-muted underline-offset-4 hover:underline"
      >
        ← Website
      </Link>

      <div className="mb-6 mt-3">
        <h1 className="text-3xl font-bold tracking-tight text-brand-strong">
          {file.title}
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">{file.blurb}</p>
      </div>

      <ContentEditor
        slug={file.slug}
        title={file.title}
        initial={loaded.data as Json}
        sha={loaded.sha}
      />
    </div>
  );
}
