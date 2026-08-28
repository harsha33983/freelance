"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { adminFetch } from "@/lib/useAdminFetch";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Save, Loader2 } from "lucide-react";

const schema = z.object({
  title: z.string().min(3, "Title required"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, hyphens only"),
  category: z.string().min(1, "Category required"),

  coverImage: z.string().optional(),
  author: z.string().optional(),
  publishedAt: z.string().optional(),
  caption: z.string().optional(),
  articleUrl: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const CATEGORIES = ["News", "Announcement", "Press Release", "Story", "Update"];

interface Props {
  articleId?: string;
  defaultValues?: Partial<FormData>;
}

export default function ArticleForm({ articleId, defaultValues }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await adminFetch("/api/admin/upload", { method: "POST", body: formData });
      if (res.ok) {
        const json = await res.json();
        setUploadedUrl(json.url);
        setUploadedFileName(file.name);
        setValue("coverImage", json.url);
        toast.success("Image uploaded!");
      } else {
        toast.error("Upload failed.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // Auto-generate slug from title
  const autoSlug = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!articleId) setValue("slug", slug); // only auto-set for new articles
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = articleId
        ? await adminFetch(`/api/admin/news/${articleId}`, { method: "PUT", body: JSON.stringify(data) })
        : await adminFetch("/api/admin/news", { method: "POST", body: JSON.stringify(data) });

      if (res.ok) {
        toast.success(articleId ? "Article updated!" : "Article published!");
        router.push("/admin/news");
      } else {
        const err = await res.json();
        toast.error(err.message || "Save failed.");
      }
    } catch { toast.error("Network error."); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="admin-label">Title *</label>
          <input
            {...register("title")}
            onChange={(e) => { register("title").onChange(e); autoSlug(e.target.value); }}
            className="admin-input"
            placeholder="Article title"
          />
          {errors.title && <p className="admin-error">{errors.title.message}</p>}
        </div>

        <div>
          <label className="admin-label">Slug *</label>
          <input {...register("slug")} className="admin-input font-mono text-xs" placeholder="url-friendly-slug" />
          {errors.slug && <p className="admin-error">{errors.slug.message}</p>}
        </div>

        <div>
          <label className="admin-label">Category *</label>
          <select {...register("category")} className="admin-input bg-white">
            <option value="">Select category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <p className="admin-error">{errors.category.message}</p>}
        </div>

        <div>
          <label className="admin-label">Author</label>
          <input {...register("author")} className="admin-input" placeholder="Mahotsav Team" />
        </div>

        <div>
          <label className="admin-label">Published Date</label>
          <input {...register("publishedAt")} type="date" className="admin-input" />
        </div>

        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-100 p-4 rounded-sm bg-gray-50/50">
          <div>
            <label className="admin-label">Upload Cover Image</label>
            <label className={`cursor-pointer flex items-center justify-center w-full h-[42px] rounded-sm text-xs font-semibold uppercase tracking-wide transition-colors ${uploadedUrl ? 'bg-green-100 text-green-700 border border-green-200' : uploading ? 'bg-gray-100 text-gray-400 border border-gray-200' : 'bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20'}`}>
              {uploading ? <Loader2 size={14} className="animate-spin" /> : uploadedFileName ? "Uploaded ✓" : "Select File"}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
            </label>
          </div>
          <div>
            <label className="admin-label">Or Image URL</label>
            <input {...register("coverImage")} className="admin-input" placeholder="https://…" />
            {errors.coverImage && <p className="admin-error">{errors.coverImage.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="admin-label">Image Caption (Optional)</label>
            <input {...register("caption")} className="admin-input" placeholder="Enter caption for cover image" />
            {errors.caption && <p className="admin-error">{errors.caption.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="admin-label">External Article URL (Optional)</label>
            <input {...register("articleUrl")} className="admin-input" placeholder="https://timesofindia.com/..." />
            {errors.articleUrl && <p className="admin-error">{errors.articleUrl.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="btn-gold flex items-center gap-2">
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {articleId ? "Update Article" : "Publish Article"}
        </button>
        <button type="button" onClick={() => router.push("/admin/news")} className="btn-outline-gold">
          Cancel
        </button>
      </div>
    </form>
  );
}
