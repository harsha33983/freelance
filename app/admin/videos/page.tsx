"use client";

import { useState } from "react";
import { useAdminFetch, adminFetch } from "@/lib/useAdminFetch";
import { Plus, Trash2, Loader2, Play } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  publishedAt: string;
}

const schema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().optional(),
  youtubeUrl: z.string()
    .url("Must be a valid URL")
    .regex(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/, "Must be a valid YouTube link"),
});
type FormData = z.infer<typeof schema>;

function getYoutubeId(url: string) {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function AdminVideosPage() {
  const { data, loading, refetch } = useAdminFetch<Video[]>("/api/admin/videos");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onAdd = async (data: FormData) => {
    setAdding(true);
    try {
      const res = await adminFetch("/api/admin/videos", { method: "POST", body: JSON.stringify(data) });
      if (res.ok) { 
        toast.success("Video added!"); 
        reset(); 
        refetch(); 
      }
      else {
        const err = await res.json();
        toast.error(err.message || "Failed to add video.");
      }
    } catch { toast.error("Network error."); }
    finally { setAdding(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    setDeleting(id);
    try {
      const res = await adminFetch(`/api/admin/videos/${id}`, { method: "DELETE" });
      if (res.ok) { toast.success("Deleted."); refetch(); }
      else toast.error("Delete failed.");
    } catch { toast.error("Network error."); }
    finally { setDeleting(null); }
  };

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink mb-6">Videos</h1>

      {/* Add form */}
      <div className="bg-white rounded-sm border border-gray-200 p-6 mb-8">
        <h2 className="font-serif text-lg font-semibold text-ink mb-4">Add Video</h2>
        <form onSubmit={handleSubmit(onAdd)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Video Title *</label>
            <input {...register("title")} className="admin-input" placeholder="Mahotsav Highlights" />
            {errors.title && <p className="admin-error">{errors.title.message}</p>}
          </div>
          <div>
            <label className="admin-label">YouTube Link *</label>
            <input {...register("youtubeUrl")} className="admin-input" placeholder="https://youtube.com/watch?v=..." />
            {errors.youtubeUrl && <p className="admin-error">{errors.youtubeUrl.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="admin-label">Description (Optional)</label>
            <textarea {...register("description")} className="admin-input h-24 resize-none" placeholder="Enter video description" />
            {errors.description && <p className="admin-error">{errors.description.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <button type="submit" disabled={adding} className="btn-gold flex items-center gap-2 text-sm">
              {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Add Video
            </button>
          </div>
        </form>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="text-gold font-serif text-xl animate-pulse text-center py-12">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data ?? []).map((item) => {
            const videoId = getYoutubeId(item.youtubeUrl);
            return (
              <div key={item.id} className="group relative rounded-sm overflow-hidden border border-gray-100 bg-white">
                <div className="aspect-video bg-ink flex items-center justify-center overflow-hidden">
                  {videoId ? (
                    <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={item.title} className="w-full h-full object-cover opacity-80" />
                  ) : (
                    <Play className="text-gold/30 w-12 h-12" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-ink text-sm font-semibold font-sans">{item.title}</h3>
                  <p className="text-ink-muted text-xs font-sans mt-1 line-clamp-2">{item.description}</p>
                  <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-gold text-xs font-medium hover:underline mt-2 inline-block">Watch on YouTube &rarr;</a>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity hover:bg-red-600 shadow-md"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
          {(data ?? []).length === 0 && (
            <p className="col-span-full text-center text-ink-muted font-sans py-10">No videos yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
