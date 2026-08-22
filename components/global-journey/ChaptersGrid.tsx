"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "@/lib/chapters";
import { X, MapPin, BookOpen } from "lucide-react";

export default function ChaptersGrid() {
  const [selected, setSelected] = useState<(typeof chapters)[0] | null>(null);

  return (
    <section className="bg-white section-pad">
      <div className="container-main">
        <p className="text-center text-ink-muted font-sans text-sm mb-10">
          Click any chapter card to explore its teachings, host country, and significance.
        </p>

        {/* 6×3 grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {chapters.map((ch, i) => (
            <motion.button
              key={ch.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              onClick={() => setSelected(ch)}
              className={`relative group rounded-sm p-4 text-left bg-gradient-to-br ${ch.color} hover:scale-105 hover:shadow-gold-lg transition-all duration-250 cursor-pointer overflow-hidden`}
            >
              {/* Decorative glyph */}
              
              <span className="block text-gold font-serif text-2xl font-bold mb-1 leading-none">
                {ch.number}
              </span>
              <span className="block text-white/80 font-sans text-[10px] leading-tight tracking-wide uppercase font-semibold mb-1">
                {ch.theme}
              </span>
              <span className="block text-white/50 font-sans text-[9px] leading-snug">
                {ch.country}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Chapter detail panel */}
        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                onClick={() => setSelected(null)}
              />
              <motion.div
                key="panel"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-2xl mx-auto bg-white rounded-sm shadow-2xl overflow-hidden"
              >
                {/* Gradient header */}
                <div className={`bg-gradient-to-br ${selected.color} p-8 relative`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                   
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  <span className="text-gold font-sans text-xs font-semibold tracking-widest uppercase">
                    Chapter {selected.number}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mt-2 mb-1">
                    {selected.sanskrit}
                  </h2>
                  <p className="text-white/70 font-sans text-sm">{selected.title}</p>
                </div>

                {/* Body */}
                <div className="p-8">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-ink-muted text-sm font-sans">
                      <MapPin size={14} className="text-gold" />
                      <span>Host Country: <strong className="text-ink">{selected.country}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-ink-muted text-sm font-sans">
                      <BookOpen size={14} className="text-gold" />
                      <span><strong className="text-ink">{selected.verses}</strong> verses</span>
                    </div>
                    <span className="gold-badge">{selected.theme}</span>
                  </div>

                  <div className="w-12 h-0.5 bg-gold mb-5" />

                  <p className="text-ink-body font-sans text-base leading-relaxed">
                    {selected.description}
                  </p>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setSelected(null)}
                      className="btn-outline-gold text-sm"
                    >
                      Close
                    </button>
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
