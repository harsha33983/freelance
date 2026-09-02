"use client";

import { motion } from "framer-motion";

const events = [
  { date: "23rd Aug 2026", title: "Soft launch ", desc: "Launch of Broucher, Miniature and Website.", phase: "Pre-launch" },
  { date: "9th Sept 2026", title: "Registration Opens", desc: "Global registration platform goes live. Early-bird participants receive special recognition at the Mahotsav.", phase: "Phase 1" },
  { date: "oct 2026", title: "Awareness", desc: "Special activities in Schools, Colleges and Apartments to create awareness on Bhagvadgita Vishwa Mahotsav.", phase: "Phase 1" },
  { date: "20 Dec 2026", title: "Curtain Raiser", desc: "Gita Jayanti — synchronised launch events across 18 countries. Grand Parayana of Chapter 1.", phase: "Phase 1", highlight: true },
  { date: "25 Feb 2027", title: "Youth Gita & Cultural Day", desc: "Full day dedicated to youth programming, classical arts performances, and cultural exhibitions.", phase: "Mahotsav Week" },
  { date: "27 Feb 2027", title: "Bhagavad Gita Mahotsav", desc: "The culmination — Grand Parayana of all 18 chapters, Gita Sankalpa, spiritual procession, and closing ceremony.", phase: "Mahotsav", highlight: true },
];

export default function RoadTimeline() {
  return (
    <section className="bg-white section-pad">
      <div className="container-main max-w-4xl">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/20 via-gold/60 to-gold/20 md:-translate-x-1/2" />

          <div className="space-y-8">
            {events.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className={`relative flex gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Node */}
                <div className="flex-shrink-0 relative z-10 flex items-start md:items-center md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-md ${
                      ev.highlight
                        ? "bg-gold border-gold text-ink"
                        : "bg-white border-gold/50 text-gold hover:border-gold transition-colors"
                    }`}
                  >
                    <span className="font-serif font-bold text-xs">{i + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 ml-4 md:ml-0 md:w-5/12 ${
                    i % 2 === 0 ? "md:pr-16" : "md:pl-16 md:ml-auto"
                  }`}
                >
                  <div
                    className={`p-5 rounded-sm border transition-shadow hover:shadow-gold ${
                      ev.highlight
                        ? "bg-gold/5 border-gold"
                        : "bg-white border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gold text-xs font-semibold font-sans tracking-widest uppercase">
                        {ev.date}
                      </span>
                      <span className="text-gray-300 text-xs">|</span>
                      <span className="text-ink-muted text-xs font-sans">{ev.phase}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-ink mb-2">{ev.title}</h3>
                    <p className="text-ink-muted text-sm font-sans leading-relaxed">{ev.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
