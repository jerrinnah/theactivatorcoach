import Link from "next/link";
import { ClientForm } from "@/components/ClientForm";
import { createClient } from "../actions";
import { requireAdmin } from "@/lib/auth";

export default async function NewClientPage() {
  await requireAdmin();

  return (
    <div className="max-w-2xl">
      <Link
        href="/clients"
        className="text-sm text-muted underline-offset-4 hover:underline"
      >
        ← Clients
      </Link>
      <h1 className="mt-3 mb-6 text-2xl font-semibold tracking-tight">
        Add client
      </h1>
      <div className="card p-6">
        <ClientForm action={createClient} submitLabel="Create client" />
      </div>
    </div>
  );
}
