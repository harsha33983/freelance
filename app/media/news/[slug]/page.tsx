import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { CalendarDays, ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';


interface Props { params: { slug: string }; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `News | ${params.slug.replace(/-/g, " ")}`,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  let article: any = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/news/${params.slug}`, { cache: "no-store" });
    if (res.ok) article = await res.json();
  } catch {}

  if (!article) {
    // Graceful fallback for sample content
    article = {
      title: params.slug.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      body: "Full article content will appear here once published.",
      publishedAt: new Date().toISOString(),
      author: "Mahotsav Team",
      category: "News",
    };
  }

  return (
    <>
      <PageHero badge={article.category} title={article.title} />
      <section className="bg-white section-pad">
        <div className="container-main max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/media/news" className="flex items-center gap-2 text-gold text-sm font-sans font-semibold hover:underline">
              <ArrowLeft size={14} /> Back to News
            </Link>
            <span className="text-ink-muted text-sm font-sans flex items-center gap-1">
              <CalendarDays size={13} />
              {new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {article.author && <span className="text-ink-muted text-sm font-sans">by {article.author}</span>}
          </div>
          <div
            className="prose prose-lg max-w-none font-sans text-ink-body leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.body || "<p>Article content coming soon.</p>" }}
          />
        </div>
      </section>
    </>
  );
}
