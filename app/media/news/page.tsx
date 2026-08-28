import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import NewsListings from "@/components/media/NewsListings";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = {
  title: "News",
  description: "Latest news and updates from the Bhagavad Gita Vishwa Mahotsav 2027.",
};

export default async function NewsPage() {
  // Fetch from API; render empty state gracefully if DB not ready
  let articles: any[] = [];
  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    articles = await sql`SELECT id, title, slug, category, "coverImage", caption, "articleUrl", author, "publishedAt" FROM "NewsArticle" ORDER BY "publishedAt" DESC LIMIT 100`;
  } catch (err) {
    console.error("Failed to fetch news:", err);
  }

  return (
    <>
      <PageHero badge="News" title="Latest News" subtitle="Updates, milestones, and announcements from the Mahotsav organisers." />
      <NewsListings initialArticles={articles} />
    </>
  );
}
