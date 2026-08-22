"use client";

import { useAdminFetch, adminFetch } from "@/lib/useAdminFetch";
import AdminTable from "@/components/admin/AdminTable";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedAt: string;
  [key: string]: unknown;
}

export default function AdminNewsPage() {
  const { data, loading, refetch } = useAdminFetch<Article[]>("/api/admin/news");
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const res = await adminFetch(`/api/admin/news/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Article deleted."); refetch(); }
      else toast.error("Delete failed.");
    } catch { toast.error("Network error."); }
    finally { setDeleting(null); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-ink">News Articles</h1>
          <p className="text-ink-muted text-sm font-sans mt-0.5">{data?.length ?? "…"} articles</p>
        </div>
        <Link href="/admin/news/new" className="btn-gold flex items-center gap-2 text-sm">
          <Plus size={14} /> New Article
        </Link>
      </div>

      <AdminTable<Article>
        loading={loading} rows={data ?? []} keyField="id" emptyMessage="No articles yet. Create the first one!"
        columns={[
          { key: "title", header: "Title", render: (r) => <span className="font-medium text-ink">{r.title}</span> },
          { key: "category", header: "Category", render: (r) => <span className="text-gold font-semibold text-xs uppercase">{r.category}</span> },
          { key: "author", header: "Author" },
          { key: "publishedAt", header: "Published", render: (r) => <span className="text-ink-muted">{new Date(r.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span> },
          {
            key: "actions", header: "Actions",
            render: (r) => (
              <div className="flex items-center gap-2">
                <Link href={`/admin/news/${r.id}`} className="p-1.5 text-ink-muted hover:text-gold transition-colors" title="Edit">
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(r.id)}
                  disabled={deleting === r.id}
                  className="p-1.5 text-ink-muted hover:text-red-500 transition-colors disabled:opacity-40"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
                <Link href={`/media/news/${r.slug}`} target="_blank" className="text-xs text-gold hover:underline ml-1">View</Link>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
