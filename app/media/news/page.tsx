import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import NewsListings from "@/components/media/NewsListings";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news and updates from the Bhagavad Gita Vishwa Mahotsav 2027.",
};

export default async function NewsPage() {
  // Fetch from API; render empty state gracefully if DB not ready
  let articles: any[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/news`, { cache: "no-store" });
    if (res.ok) articles = await res.json();
  } catch {}

  return (
    <>
      <PageHero badge="News" title="Latest News" subtitle="Updates, milestones, and announcements from the Mahotsav organisers." />
      <NewsListings initialArticles={articles} />
    </>
  );
}
