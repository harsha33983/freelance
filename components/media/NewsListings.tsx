"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, Tag, Video, Newspaper, Eye } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  author?: string;
  coverImage?: string;
  articleUrl?: string;
}

interface Props { 
  initialArticles: Article[];
}

// Sample articles for when DB is not connected
const sampleArticles: Article[] = [
  { id: "1", title: "Bhagavad Gita Vishwa Mahotsav 2027 Officially Announced", slug: "mahotsav-officially-announced", category: "Announcement", publishedAt: "2026-09-01", author: "Mahotsav Team" },
  { id: "2", title: "Registration Opens for the Curtain Raiser", slug: "curtain-raiser-registration-open", category: "News", publishedAt: "2026-10-01", author: "Mahotsav Team" },
  { id: "3", title: "18 Host Countries Confirmed for the Global Journey", slug: "18-host-countries-confirmed", category: "News", publishedAt: "2026-10-15", author: "Mahotsav Team" },
  { id: "4", title: "Partnership Applications Now Open", slug: "partnership-applications-open", category: "Announcement", publishedAt: "2026-11-01", author: "Mahotsav Team" },
];

export default function NewsListings({ initialArticles }: Props) {
  const articles = initialArticles;

  return (
    <section className="bg-white section-pad">
      <div className="container-main">
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
              <a
                href={a.articleUrl || a.coverImage || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gold text-xs font-semibold font-sans tracking-wider uppercase group-hover:underline mt-2"
              >
                <Eye size={14} /> View Article
              </a>
            </motion.div>
          ))}
          {articles.length === 0 && (
            <div className="col-span-3 text-center py-16 text-ink-muted font-sans">
              No articles published yet. Check back soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
