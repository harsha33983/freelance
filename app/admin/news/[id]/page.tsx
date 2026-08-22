"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminFetch } from "@/lib/useAdminFetch";
import ArticleForm from "@/components/admin/ArticleForm";

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch(`/api/admin/news/${id}`)
      .then((r) => r.json())
      .then((data) => {
        // Format publishedAt for <input type="date">
        if (data.publishedAt) {
          data.publishedAt = new Date(data.publishedAt).toISOString().split("T")[0];
        }
        setArticle(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-gold font-serif text-xl animate-pulse py-20 text-center">Loading…</div>;
  if (!article) return <div className="text-red-500 font-sans py-10">Article not found.</div>;

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink mb-6">Edit Article</h1>
      <ArticleForm articleId={id} defaultValues={article as Record<string, string>} />
    </div>
  );
}
