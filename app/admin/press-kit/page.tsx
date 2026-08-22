"use client";

import { useState } from "react";
import { useAdminFetch, adminFetch } from "@/lib/useAdminFetch";
import { Plus, Trash2, Loader2, FileText } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface PressFile { id: string; title: string; fileUrl: string; fileType: string; uploadedAt: string; }

const schema = z.object({
  title: z.string().min(2, "Title required"),
  fileUrl: z.string().url("Must be a valid URL"),
  fileType: z.enum(["pdf", "image", "video", "zip", "doc"]).refine((v) => !!v, "Select file type"),
});
type FormData = z.infer<typeof schema>;

export default function AdminPressKitPage() {
  const { data, loading, refetch } = useAdminFetch<PressFile[]>("/api/admin/press-kit");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onAdd = async (formData: FormData) => {
    setAdding(true);
    try {
      const res = await adminFetch("/api/admin/press-kit", { method: "POST", body: JSON.stringify(formData) });
      if (res.ok) { toast.success("File added!"); reset(); refetch(); }
      else toast.error("Failed to add file.");
    } catch { toast.error("Network error."); }
    finally { setAdding(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this file?")) return;
    setDeleting(id);
    try {
      const res = await adminFetch(`/api/admin/press-kit/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Deleted."); refetch(); }
      else toast.error("Delete failed.");
    } catch { toast.error("Network error."); }
    finally { setDeleting(null); }
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink mb-6">Press Kit Files</h1>

      {/* Add form */}
      <div className="bg-white rounded-sm border border-gray-200 p-6 mb-8">
        <h2 className="font-serif text-lg font-semibold text-ink mb-4">Add File</h2>
        <form onSubmit={handleSubmit(onAdd)} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="admin-label">File Title *</label>
            <input {...register("title")} className="admin-input" placeholder="e.g. Official Logo Pack" />
            {errors.title && <p className="admin-error">{errors.title.message}</p>}
          </div>
          <div>
            <label className="admin-label">File URL *</label>
            <input {...register("fileUrl")} className="admin-input" placeholder="https://…" />
            {errors.fileUrl && <p className="admin-error">{errors.fileUrl.message}</p>}
          </div>
          <div>
            <label className="admin-label">File Type *</label>
            <select {...register("fileType")} className="admin-input bg-white">
              <option value="">Select…</option>
              {["pdf", "image", "video", "zip", "doc"].map((t) => <option key={t} value={t}>{t.toUpperCase()}</option>)}
            </select>
            {errors.fileType && <p className="admin-error">{errors.fileType.message}</p>}
          </div>
          <div className="sm:col-span-3">
            <button type="submit" disabled={adding} className="btn-gold flex items-center gap-2 text-sm">
              {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Add File
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-gold font-serif text-xl animate-pulse text-center py-12">Loading…</p>
      ) : (
        <div className="space-y-3">
          {(data ?? []).map((file) => (
            <div key={file.id} className="flex items-center gap-4 p-4 bg-white rounded-sm border border-gray-100 hover:border-gold transition-colors group">
              <div className="w-9 h-9 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText size={16} className="text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-medium text-ink text-sm truncate">{file.title}</p>
                <p className="text-ink-muted text-xs font-sans">{file.fileType.toUpperCase()} • {new Date(file.uploadedAt).toLocaleDateString("en-IN")}</p>
              </div>
              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-gold text-xs font-semibold hover:underline font-sans">
                View
              </a>
              <button
                onClick={() => handleDelete(file.id)}
                disabled={deleting === file.id}
                className="text-ink-muted hover:text-red-500 transition-colors p-1.5 disabled:opacity-40"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {(data ?? []).length === 0 && (
            <p className="text-center text-ink-muted font-sans py-10">No press kit files yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
