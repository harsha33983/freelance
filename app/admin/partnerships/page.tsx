"use client";

import { useAdminFetch } from "@/lib/useAdminFetch";
import AdminTable from "@/components/admin/AdminTable";
import { Download } from "lucide-react";

interface Proposal { id: string; orgName: string; contactPerson: string; email: string; phone: string; interestArea: string; message: string; createdAt: string; [key: string]: unknown; }

export default function PartnershipsPage() {
  const { data, loading } = useAdminFetch<Proposal[]>("/api/admin/partnerships");

  const handleCSV = () => {
    const token = localStorage.getItem("bgvm_admin_token");
    fetch("/api/admin/partnerships?format=csv", { headers: { Authorization: `Bearer ${token ?? ""}` } })
      .then((r) => r.blob()).then((b) => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "partnerships.csv"; a.click(); });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink">Partnership Proposals</h1>
          <p className="text-ink-muted text-sm font-sans mt-0.5">{data?.length ?? "…"} proposals received</p>
        </div>
        <button onClick={handleCSV} className="btn-outline-gold flex items-center gap-2 text-sm"><Download size={14} /> Export CSV</button>
      </div>
      <AdminTable<Proposal>
        loading={loading} rows={data ?? []} keyField="id" emptyMessage="No partnership proposals yet."
        columns={[
          { key: "orgName", header: "Organisation" },
          { key: "contactPerson", header: "Contact" },
          { key: "email", header: "Email" },
          { key: "interestArea", header: "Interest", render: (r) => <span className="text-gold font-semibold">{r.interestArea}</span> },
          { key: "phone", header: "Phone" },
          { key: "message", header: "Message", render: (r) => <span className="text-ink-muted line-clamp-2 max-w-xs">{r.message}</span>, className: "max-w-xs" },
          { key: "createdAt", header: "Date", render: (r) => <span className="text-ink-muted">{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span> },
        ]}
      />
    </div>
  );
}
