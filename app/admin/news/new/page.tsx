import ArticleForm from "@/components/admin/ArticleForm";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "New Article" };

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-ink mb-6">New Article</h1>
      <ArticleForm />
    </div>
  );
}
