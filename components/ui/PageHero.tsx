"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  bg?: string; // tailwind bg class
}

export default function PageHero({
  badge,
  title,
  subtitle,
  bg = "bg-cream",
}: PageHeroProps) {
  return (
    <section className={`${bg} py-16 md:py-24 relative overflow-hidden`}>
      
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">

        {/* Bottom Left Bubble */}
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-gold/5" />

        {/* Right Side Bubble */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/5" />

        {/* OM Image on Right Side */}
        <div className="absolute top-4 right-4 opacity-20">
          <img
            src="/om.png"
            alt="Om Symbol"
            className="w-[260px] h-auto"
          />
        </div>

      </div>

      {/* Content */}
      <div className="container-main relative text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <span className="gold-badge">{badge}</span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-heading mb-4"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-ink-muted max-w-2xl mx-auto font-sans text-base md:text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="gold-rule mx-auto mt-6"
        />
      </div>
    </section>
  );
}