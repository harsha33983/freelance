"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Filter } from "lucide-react";

interface GalleryItem {
  id: string;
  imageUrl: string;
  category: string;
  caption: string;
  uploadedAt?: string;
}

const categories = ["All", "Curtain Raiser", "18 Countries", "Venue", "Community", "Spiritual", "Cultural", "Media Coverage"];

// Placeholder items for when DB is empty
const placeholders: GalleryItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  imageUrl: "",
  category: categories[((i % (categories.length - 1)) + 1)],
  caption: `Gallery image ${i + 1} — More photos will be added as the event approaches.`,
}));

export default function GalleryGrid({ initialItems }: { initialItems: GalleryItem[] }) {
  const items = initialItems.length > 0 ? initialItems : placeholders;
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <section className="bg-white section-pad">
      <div className="container-main">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Filter size={16} className="text-gold mt-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-sm text-xs font-sans font-semibold tracking-wider uppercase transition-all ${
                filter === cat ? "bg-gold text-ink" : "border border-gray-200 text-ink-muted hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="break-inside-avoid group cursor-pointer relative"
              onClick={() => setLightbox(item)}
            >
              <div className="relative rounded-sm overflow-hidden bg-cream border border-gray-100/50">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.caption} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                ) : (
                  <div className="w-full aspect-[4/3] flex items-center justify-center text-gold/30">
                    <ZoomIn size={24} />
                  </div>
                )}
                <div className="absolute inset-0 bg-ink/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" size={32} />
                </div>
              </div>
              <div className="mt-2 mb-3">
                <span className="text-gold text-[10px] font-semibold font-sans tracking-wider uppercase">{item.category}</span>
                <p className="text-ink-muted text-xs font-sans mt-0.5 line-clamp-2">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <>
              <motion.div
                key="lb-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm"
                onClick={() => setLightbox(null)}
              />
              <motion.div
                key="lb-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-4 z-50 flex items-center justify-center"
              >
                <div className="relative max-w-4xl w-full">
                  <button
                    onClick={() => setLightbox(null)}
                    className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <div className="bg-white rounded-sm overflow-hidden">
                    {lightbox.imageUrl && (
                      <div className="bg-cream border-b border-gray-100 flex items-center justify-center">
                        <img src={lightbox.imageUrl} alt={lightbox.caption} className="w-full max-h-[75vh] object-contain" />
                      </div>
                    )}
                    <div className="p-4 flex items-start justify-between">
                      <div>
                        <span className="text-gold text-xs font-semibold font-sans tracking-wider uppercase">{lightbox.category}</span>
                        <p className="text-ink-muted text-sm font-sans mt-1">{lightbox.caption}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
