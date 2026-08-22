"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useJoinModal } from "@/lib/useJoinModal";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/bh5.png",
    bg: "from-black/70 via-black/50 to-black/30",
    accent: "#D4AF37",
    headline: "Bhagavad Gita\nVishwa Mahotsav 2027",
    sub: "A Global Celebration of the Eternal Wisdom of the Bhagavad Gita",
  },
  {
    id: 2,
    image: "/bh2.png",
    bg: "from-black/75 via-black/50 to-transparent",
    accent: "#D4AF37",
    headline: "18 Countries.\n18 Chapters.\n18 Languages.",
    sub: "One Gita. One Voice. One Global Consciousness.",
  },
  {
    id: 3,
    image: "/bh3.png",
    bg: "from-black/70 via-black/45 to-black/20",
    accent: "#D4AF37",
    headline: "50,000+ Participants\nAcross the Globe",
    sub: "Join the largest Bhagavad Gita event in history — 27 February 2027",
  },
  {
    id: 4,
    image: "/bh1.png",
    bg: "from-black/65 via-black/40 to-transparent",
    accent: "#D4AF37",
    headline: "Recitation.\nRealization.\nTransformation.",
    sub: "Register today and be part of a spiritual movement that spans continents.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const openJoin = useJoinModal((s) => s.open);

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((c) => (c + dir + slides.length) % slides.length);
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => go(1), 6000);
    return () => clearInterval(timer);
  }, [go]);

  const slide = slides[current];

  const variants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d > 0 ? 60 : -60,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -60 : 60,
    }),
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[560px] overflow-hidden">

      {/* ============================= */}
      {/* SLIDE BACKGROUND */}
      {/* ============================= */}

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`bg-${current}`}
          custom={direction}
          variants={{
            enter: { opacity: 0 },
            center: { opacity: 1 },
            exit: { opacity: 0 },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        >

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-black/10" />

          {/* Gold radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.12)_0%,transparent_70%)]" />


        </motion.div>
      </AnimatePresence>


      {/* ============================= */}
      {/* SLIDE CONTENT */}
      {/* ============================= */}

      <AnimatePresence
        initial={false}
        custom={direction}
        mode="wait"
      >
        <motion.div
          key={`content-${current}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.55,
            ease: "easeOut",
          }}
          className="absolute inset-0 flex items-center"
        >

          {/* Main full-width container */}
          <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">

            {/* RIGHT SIDE CONTENT */}
            <div className="w-full max-w-xl ml-auto mr-0 lg:mr-8 xl:mr-12 text-center md:text-right">

              {/* ============================= */}
              {/* BADGE */}
              {/* ============================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15,
                }}
                className="mb-6"
              />



              {/* ============================= */}
              {/* HEADLINE */}
              {/* ============================= */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FFF8E7] leading-tight mb-6 whitespace-pre-line"
              >
                {slide.headline}
              </motion.h1>


              {/* ============================= */}
              {/* DESCRIPTION */}
              {/* ============================= */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                }}
                className="text-[#F5EAD2] text-base md:text-lg font-sans leading-relaxed mb-8 max-w-xl ml-auto"
              >
                {slide.sub}
              </motion.p>


              {/* ============================= */}
              {/* DATE / INFORMATION BOXES */}
              {/* ============================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                }}
                className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-end"
              >

                {[
                  {
                    label: "Curtain Raiser",
                    date: "20 Dec 2026",
                  },
                  {
                    label: "Mahotsav",
                    date: "27 Feb 2027",
                  },
                  {
                    label: "Participants",
                    date: "50,000+",
                  },
                ].map((item) => (

                  <div
                    key={item.date}
                    className="flex flex-col items-center px-4 py-2.5 bg-black/20 backdrop-blur-sm border border-[#D4AF37]/40 rounded-sm"
                  >

                    <span className="text-[#D4AF37] text-xs font-semibold font-sans tracking-wider uppercase">
                      {item.label}
                    </span>

                    <span className="text-[#FFF8E7] text-base font-serif font-semibold mt-0.5">
                      {item.date}
                    </span>

                  </div>

                ))}

              </motion.div>


              {/* ============================= */}
              {/* BUTTONS */}
              {/* ============================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.42,
                }}
                className="flex flex-wrap gap-4 justify-center md:justify-end mt-6"
              >

                <Link
                  href="/mahotsav"
                  className="btn-gold"
                >
                  Explore the Mahotsav
                </Link>

                <button
                  onClick={openJoin}
                  className="btn-gold"
                >
                  Join the Movement
                </button>
                 
              </motion.div>

              {/* ============================= */}
              {/* UPCOMING BUTTON */}
              {/* ============================= */}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-6 flex justify-center md:justify-end"
              >
                <Link
                  href="/media/upcoming"
                  className="inline-flex items-center bg-[#D4AF37] text-black font-bold uppercase tracking-wider px-6 py-3 rounded-md hover:scale-105 transition-all duration-300"
                >
                  UP COMING
                </Link>
              </motion.div>

            </div>
          </div>

        </motion.div>
      </AnimatePresence>


      {/* ============================= */}
      {/* SLIDE DOTS */}
      {/* ============================= */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">

        {slides.map((_, i) => (

          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2 bg-gold"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${i + 1}`}
          />

        ))}

      </div>


      {/* ============================= */}
      {/* SLIDE NUMBER */}
      {/* ============================= */}

      <div className="absolute bottom-8 right-8 z-10 text-[#FFF8E7] font-sans text-xs tracking-widest">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>


      {/* ============================= */}
      {/* LEFT ARROW */}
      {/* ============================= */}

      <button
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#FFF8E7] hover:bg-gold hover:text-ink hover:border-gold transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>


      {/* ============================= */}
      {/* RIGHT ARROW */}
      {/* ============================= */}

      <button
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#FFF8E7] hover:bg-gold hover:text-ink hover:border-gold transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>


      {/* ============================= */}
      {/* BOTTOM FADE */}
      {/* ============================= */}

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

    </section>
  );
}