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
  excerpt: z.string().min(10, "Excerpt required (min 10 chars)"),
  body: z.string().min(20, "Body required (min 20 chars)"),
  coverImage: z.string().optional(),
  author: z.string().optional(),
  publishedAt: z.string().optional(),
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

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

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

        <div className="sm:col-span-2">
          <label className="admin-label">Cover Image URL</label>
          <input {...register("coverImage")} className="admin-input" placeholder="https://…" />
        </div>
      </div>

      <div>
        <label className="admin-label">Excerpt * (shown in list view)</label>
        <textarea {...register("excerpt")} rows={3} className="admin-input resize-none" placeholder="Short summary of the article…" />
        {errors.excerpt && <p className="admin-error">{errors.excerpt.message}</p>}
      </div>

      <div>
        <label className="admin-label">Body * (HTML supported)</label>
        <textarea
          {...register("body")}
          rows={18}
          className="admin-input resize-y font-mono text-xs leading-relaxed"
          placeholder="<p>Article body here… HTML tags are supported.</p>"
        />
        {errors.body && <p className="admin-error">{errors.body.message}</p>}
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
