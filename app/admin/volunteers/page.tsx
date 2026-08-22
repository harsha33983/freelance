"use client";

import { useAdminFetch } from "@/lib/useAdminFetch";
import AdminTable from "@/components/admin/AdminTable";
import { Download } from "lucide-react";

interface Volunteer { id: string; name: string; email: string; phone: string; area: string; city: string; country: string; createdAt: string; [key: string]: unknown; }

export default function VolunteersPage() {
  const { data, loading } = useAdminFetch<Volunteer[]>("/api/admin/volunteers");

  const handleCSV = () => {
    const token = localStorage.getItem("bgvm_admin_token");
    fetch("/api/admin/volunteers?format=csv", { headers: { Authorization: `Bearer ${token ?? ""}` } })
      .then((r) => r.blob()).then((b) => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "volunteers.csv"; a.click(); });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink">Volunteers</h1>
          <p className="text-ink-muted text-sm font-sans mt-0.5">{data?.length ?? "…"} applications</p>
        </div>
        <button onClick={handleCSV} className="btn-outline-gold flex items-center gap-2 text-sm"><Download size={14} /> Export CSV</button>
      </div>
      <AdminTable<Volunteer>
        loading={loading} rows={data ?? []} keyField="id" emptyMessage="No volunteer applications yet."
        columns={[
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "area", header: "Area", render: (r) => <span className="text-gold font-semibold">{r.area}</span> },
          { key: "city", header: "City" },
          { key: "country", header: "Country" },
          { key: "phone", header: "Phone" },
          { key: "createdAt", header: "Date", render: (r) => <span className="text-ink-muted">{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span> },
        ]}
      />
    </div>
  );
}
