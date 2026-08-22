"use client";

import { useAdminFetch } from "@/lib/useAdminFetch";
import AdminTable from "@/components/admin/AdminTable";

interface Contact { id: string; name: string; email: string; category: string; message: string; createdAt: string; [key: string]: unknown; }

export default function ContactsPage() {
  const { data, loading } = useAdminFetch<Contact[]>("/api/admin/contacts");

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-semibold text-ink">Contact Messages</h1>
        <p className="text-ink-muted text-sm font-sans mt-0.5">{data?.length ?? "…"} messages</p>
      </div>
      <AdminTable<Contact>
        loading={loading} rows={data ?? []} keyField="id" emptyMessage="No contact messages yet."
        columns={[
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "category", header: "Category", render: (r) => <span className="text-gold font-semibold">{r.category}</span> },
          { key: "message", header: "Message", render: (r) => <span className="text-ink-muted line-clamp-2 max-w-sm">{r.message}</span>, className: "max-w-sm" },
          { key: "createdAt", header: "Date", render: (r) => <span className="text-ink-muted">{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span> },
        ]}
      />
    </div>
  );
}
