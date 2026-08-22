"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Users, Globe, Handshake, Heart, Home, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useJoinModal } from "@/lib/useJoinModal";

const paths = [
  {
    icon: Globe,
    title: "Participate Globally",
    desc: "Join from your country — co-ordinate a local Gita event as part of the 18-country journey.",
    href: "/participate/global",
    cta: "Join Globally",
  },
  {
    icon: Handshake,
    title: "Partner With Us",
    desc: "Become a Title, Platinum, Gold, or Community Partner and amplify this sacred mission.",
    href: "/partners/proposal",
    cta: "Become a Partner",
  },
  {
    icon: Heart,
    title: "Volunteer",
    desc: "Offer your time, skills, and devotion to make this landmark event a success.",
    href: "/participate/volunteer",
    cta: "Volunteer Now",
  },
  {
    icon: Home,
    title: "Host a Parayana",
    desc: "Organise a Bhagavad Gita recitation at your temple, institution, or community space.",
    href: "/participate/host-parayana",
    cta: "Host an Event",
  },
  {
    icon: Gift,
    title: "Donor",
    desc: "Support the Mahotsav financially. Register your contribution as an individual or institution.",
    href: "/participate/donor",
    cta: "Donate Now",
  },
];

export default function JoinModal() {
  const { isOpen, close } = useJoinModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 w-full h-[100dvh] bg-white overflow-y-auto"
          >
            {/* Gold top bar */}
            <div className="h-1.5 bg-gold-gradient w-full fixed top-0 left-0 z-10" />

            <div className="max-w-6xl mx-auto p-6 md:p-12 lg:p-16 min-h-full flex flex-col justify-center pt-12">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-gold font-sans text-xs tracking-widest uppercase font-semibold mb-1">
                    🔱 Join the Movement
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink">
                    How Would You Like to Participate?
                  </h2>
                  <div className="gold-rule-left mt-2" />
                </div>
                <button
                  onClick={close}
                  className="p-2 text-ink-muted hover:text-ink transition-colors ml-4 flex-shrink-0"
                  aria-label="Close"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paths.map((path) => {
                  const Icon = path.icon;
                  return (
                    <Link
                      key={path.title}
                      href={path.href}
                      onClick={close}
                      className="card-gold-top p-4 group flex flex-col gap-2"
                    >
                      <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Icon size={16} className="text-gold" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base font-semibold text-ink mb-0.5">
                          {path.title}
                        </h3>
                        <p className="text-xs text-ink-muted leading-relaxed font-sans">
                          {path.desc}
                        </p>
                      </div>
                      <span className="mt-auto text-gold text-xs font-semibold font-sans tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                        {path.cta} →
                      </span>
                    </Link>
                  );
                })}
              </div>

              <p className="mt-4 text-center text-[11px] md:text-xs text-ink-muted font-sans">
                Questions? Contact us at{" "}
                <a href="mailto:info@bgvmahotsav2027.org" className="text-gold hover:underline">
                  info@bgvmahotsav2027.org
                </a>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
