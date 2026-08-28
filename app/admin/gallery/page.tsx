"use client";

import { useState } from "react";
import { useAdminFetch, adminFetch } from "@/lib/useAdminFetch";
import { Plus, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface GalleryItem { id: string; imageUrl: string; category: string; caption: string; uploadedAt: string; }

const schema = z.object({
  imageUrl: z.string().optional().or(z.literal("")),
  category: z.string().min(1, "Category required"),
  caption: z.string().min(2, "Caption required"),
});
type FormData = z.infer<typeof schema>;

const CATEGORIES = ["Curtain Raiser", "18 Countries", "Venue", "Community", "Spiritual", "Cultural", "General", "Media Coverage"];

export default function AdminGalleryPage() {
  const { data, loading, refetch } = useAdminFetch<GalleryItem[]>("/api/gallery");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await adminFetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const json = await res.json();
        setUploadedUrl(json.url);
        setUploadedFileName(file.name);
        toast.success("File uploaded!");
      } else {
        toast.error("Upload failed.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setUploading(false);
      e.target.value = ''; // reset input
    }
  };

  const onAdd = async (data: FormData) => {
    const finalUrl = uploadedUrl || data.imageUrl;
    if (!finalUrl) {
      toast.error("Please provide an Image URL or upload a file.");
      return;
    }

    const payload = { ...data, imageUrl: finalUrl };
    
    setAdding(true);
    try {
      const res = await adminFetch("/api/admin/gallery", { method: "POST", body: JSON.stringify(payload) });
      if (res.ok) { 
        toast.success("Image added!"); 
        reset(); 
        setUploadedUrl(null);
        setUploadedFileName(null);
        refetch(); 
      }
      else toast.error("Failed to add image.");
    } catch { toast.error("Network error."); }
    finally { setAdding(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return;
    setDeleting(id);
    try {
      const res = await adminFetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Deleted."); refetch(); }
      else toast.error("Delete failed.");
    } catch { toast.error("Network error."); }
    finally { setDeleting(null); }
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink mb-6">Gallery</h1>

      {/* Add form */}
      <div className="bg-white rounded-sm border border-gray-200 p-6 mb-8">
        <h2 className="font-serif text-lg font-semibold text-ink mb-4">Add Image</h2>
        <form onSubmit={handleSubmit(onAdd)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="admin-label">Upload Image</label>
            <label className={`cursor-pointer flex items-center justify-center w-full h-[42px] rounded-sm text-xs font-semibold uppercase tracking-wide transition-colors ${uploadedUrl ? 'bg-green-100 text-green-700 border border-green-200' : uploading ? 'bg-gray-100 text-gray-400 border border-gray-200' : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'}`}>
              {uploading ? <Loader2 size={14} className="animate-spin" /> : uploadedFileName ? "Uploaded ✓" : "Select File"}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
            </label>
          </div>
          <div>
            <label className="admin-label">Or Image URL</label>
            <input {...register("imageUrl")} className="admin-input" placeholder="https://…" />
            {errors.imageUrl && <p className="admin-error">{errors.imageUrl.message}</p>}
          </div>
          <div>
            <label className="admin-label">Category *</label>
            <select {...register("category")} className="admin-input bg-white">
              <option value="">Select…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="admin-error">{errors.category.message}</p>}
          </div>
          <div>
            <label className="admin-label">Caption *</label>
            <input {...register("caption")} className="admin-input" placeholder="Image caption" />
            {errors.caption && <p className="admin-error">{errors.caption.message}</p>}
          </div>
          <div className="sm:col-span-3">
            <button type="submit" disabled={adding} className="btn-gold flex items-center gap-2 text-sm">
              {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Add to Gallery
            </button>
          </div>
        </form>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-gold font-serif text-xl animate-pulse text-center py-12">Loading…</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {(data ?? []).map((item) => (
            <div key={item.id} className="group relative rounded-sm overflow-hidden border border-gray-100 bg-white">
              <div className="h-36 bg-cream flex items-center justify-center overflow-hidden">
                <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover" />
              </div>
              <div className="p-2">
                <p className="text-gold text-[10px] font-semibold font-sans uppercase">{item.category}</p>
                <p className="text-ink-muted text-xs font-sans truncate">{item.caption}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                disabled={deleting === item.id}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity hover:bg-red-600"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
          {(data ?? []).length === 0 && (
            <p className="col-span-full text-center text-ink-muted font-sans py-10">No gallery items yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
