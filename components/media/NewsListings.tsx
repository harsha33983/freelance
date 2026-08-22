"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, Tag, Video, Newspaper } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  author?: string;
  coverImage?: string;
}

interface Props { initialArticles: Article[]; }

const tabs = ["Articles", "Videos"] as const;
type Tab = typeof tabs[number];

// Sample articles for when DB is not connected
const sampleArticles: Article[] = [
  { id: "1", title: "Bhagavad Gita Vishwa Mahotsav 2027 Officially Announced", slug: "mahotsav-officially-announced", category: "Announcement", excerpt: "The Bhagavad Gita Vishwa Mahotsav Trust formally announces the Mahotsav on 27 February 2027, with 18 countries, 18 chapters, and 18 languages.", publishedAt: "2026-09-01", author: "Mahotsav Team" },
  { id: "2", title: "Registration Opens for the Curtain Raiser", slug: "curtain-raiser-registration-open", category: "News", excerpt: "Registrations are now open for the Curtain Raiser event on 20 December 2026 — Gita Jayanti.", publishedAt: "2026-10-01", author: "Mahotsav Team" },
  { id: "3", title: "18 Host Countries Confirmed for the Global Journey", slug: "18-host-countries-confirmed", category: "News", excerpt: "All 18 host countries for the chapter events have been confirmed, spanning every inhabited continent.", publishedAt: "2026-10-15", author: "Mahotsav Team" },
  { id: "4", title: "Partnership Applications Now Open", slug: "partnership-applications-open", category: "Announcement", excerpt: "Organisations wishing to partner with the Mahotsav as Title, Platinum, Gold, or Community Partners are invited to submit proposals.", publishedAt: "2026-11-01", author: "Mahotsav Team" },
];

export default function NewsListings({ initialArticles }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Articles");
  const articles = initialArticles.length > 0 ? initialArticles : sampleArticles;

  return (
    <section className="bg-white section-pad">
      <div className="container-main">
        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-100 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-sans font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab ? "border-gold text-gold" : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              {tab === "Articles" ? <Newspaper size={14} /> : <Video size={14} />}
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Articles" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="card-gold-top p-6 group flex flex-col"
              >
                {/* Cover image placeholder */}
                
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-gold text-xs font-semibold font-sans">
                    <Tag size={10} /> {a.category}
                  </span>
                  <span className="text-ink-muted text-xs font-sans flex items-center gap-1">
                    <CalendarDays size={10} /> {new Date(a.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-ink mb-2 flex-1">{a.title}</h3>
                <p className="text-ink-muted text-sm font-sans leading-relaxed mb-4 line-clamp-2">{a.excerpt}</p>
                <Link
                  href={`/media/news/${a.slug}`}
                  className="text-gold text-xs font-semibold font-sans tracking-wider uppercase group-hover:underline"
                >
                  Read More →
                </Link>
              </motion.div>
            ))}
            {articles.length === 0 && (
              <div className="col-span-3 text-center py-16 text-ink-muted font-sans">
                No articles published yet. Check back soon.
              </div>
            )}
          </div>
        )}

        {activeTab === "Videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-base p-0 overflow-hidden">
                <div className="h-48 bg-ink flex items-center justify-center relative">
                  <span className="font-serif text-5xl text-gold/30">▶</span>
                  <span className="absolute bottom-3 left-3 bg-gold text-ink text-xs font-semibold font-sans px-2 py-0.5 rounded-sm">Coming Soon</span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-semibold text-ink mb-1">Mahotsav Preview {i}</h3>
                  <p className="text-ink-muted text-xs font-sans">Video content will be published here as the event approaches.</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
