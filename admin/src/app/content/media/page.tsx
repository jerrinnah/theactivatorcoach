import Link from "next/link";
import { requireSuperAdmin } from "@/lib/auth";
import { listUploads, missingConfig } from "@/lib/github";
import { MediaLibrary } from "@/components/MediaLibrary";

export const dynamic = "force-dynamic";

const SITE_ORIGIN =
  process.env.SITE_ORIGIN || "https://theactivatorcoach.com";

export default async function MediaPage() {
  await requireSuperAdmin();

  if (missingConfig().length > 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-sm font-medium">Publishing isn&rsquo;t connected</p>
        <Link
          href="/content"
          className="mt-4 inline-block text-sm text-muted underline-offset-4 hover:underline"
        >
          ← Website
        </Link>
      </div>
    );
  }

  const uploads = await listUploads();

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
          Images
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Logos, portraits and anything else the site shows. Upload here, then
          paste the path into the theme&rsquo;s logo field or a content field.
        </p>
      </div>

      <MediaLibrary uploads={uploads} siteOrigin={SITE_ORIGIN} />
    </div>
  );
}
