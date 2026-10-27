"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  Sparkles,
  Briefcase,
  Award,
  Globe2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Layers,
  Building,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { TeamMember } from "@/lib/teamData";

interface ProfileModalProps {
  member: TeamMember | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function ProfileModal({
  member,
  onClose,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
}: ProfileModalProps) {
  // Handle Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      }
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (member) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [member, handleKeyDown]);

  if (!member) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-member-name"
      >
        {/* Backdrop */}
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          key={member.id}
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-5xl bg-white border border-gold/30 rounded-lg shadow-2xl overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Gold Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-gold/60 via-gold to-gold-dark w-full shrink-0" />

          {/* Sticky Header with Navigation & Close */}
          <div className="sticky top-0 z-20 bg-cream/95 backdrop-blur-md border-b border-gold/20 px-6 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
              <p className="font-serif text-sm md:text-base font-semibold text-ink truncate">
                Organising Committee • <span className="text-gold-dark">{member.name}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Prev/Next Quick Controls */}
              {onPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  className="p-1.5 rounded-sm text-ink-body hover:text-gold hover:bg-gold/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Previous profile"
                  title="Previous profile"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!hasNext}
                  className="p-1.5 rounded-sm text-ink-body hover:text-gold hover:bg-gold/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Next profile"
                  title="Next profile"
                >
                  <ChevronRight size={20} />
                </button>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white hover:bg-gold text-ink font-sans font-semibold text-xs tracking-wider uppercase border border-gold/30 hover:border-gold transition-all ml-2 shadow-sm"
                aria-label="Close profile modal"
              >
                <span>Close</span>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto px-6 py-6 md:px-10 md:py-8 space-y-10 focus:outline-none">
            {/* Hero Section of Profile */}
            <div className="relative rounded-lg p-6 md:p-10 text-white overflow-hidden bg-gradient-to-br from-[#4d1314] via-[#651919] to-[#3a0d0e] border border-gold/40 shadow-lg">
              {/* Decorative Background Elements */}
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-gold/20 pointer-events-none" />
              <div className="absolute top-1/2 right-10 -translate-y-1/2 text-gold/10 font-serif text-[180px] pointer-events-none select-none">
                ॐ
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Photo Column */}
                <div className="md:col-span-4 flex justify-center md:justify-start">
                  <div className="relative w-48 sm:w-56 md:w-full aspect-[4/5] rounded-xl overflow-hidden border-4 border-[#fff7e6] shadow-2xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      style={{ objectPosition: member.objectPosition || "center 20%" }}
                      priority
                    />
                  </div>
                </div>

                {/* Details Column */}
                <div className="md:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-pale text-xs font-sans font-semibold tracking-wider uppercase">
                    <Sparkles size={13} className="text-gold" />
                    <span>{member.kicker}</span>
                  </div>

                  <h2
                    id="modal-member-name"
                    className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#fff7e6] leading-tight"
                  >
                    {member.name}
                  </h2>

                  <p className="text-gold-pale font-sans text-sm md:text-base font-medium">
                    {member.designation}
                  </p>

                  <p className="text-[#fbf3df]/90 font-sans text-sm md:text-base leading-relaxed pt-2">
                    {member.shortIntro}
                  </p>

                  {/* Mahotsav Role Badge */}
                  <div className="pt-3">
                    <span className="inline-block px-4 py-2 rounded-full border border-gold/60 bg-gold/15 text-gold-pale text-xs md:text-sm font-sans font-semibold tracking-wide shadow-inner">
                      🔱 {member.roleBadge}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            {member.stats && member.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {member.stats.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-md bg-cream/70 border border-gold/25 text-center shadow-sm"
                  >
                    <div className="font-serif text-2xl md:text-3xl font-bold text-ink mb-1">
                      {st.value}
                    </div>
                    <div className="text-ink-muted font-sans text-xs font-medium leading-tight">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Overview / Biography */}
            <div className="p-6 md:p-8 rounded-lg bg-cream/30 border border-gold/20 space-y-3">
              <div className="flex items-center gap-2 text-gold-dark font-sans text-xs tracking-widest uppercase font-bold">
                <Globe2 size={15} />
                <span>Executive Summary</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
                {member.overviewTitle}
              </h3>
              <div className="gold-rule-left" />
              <p className="text-ink-body font-sans text-base leading-relaxed pt-2">
                {member.overviewDescription}
              </p>
            </div>

            {/* Mahotsav Contribution Showcase */}
            <div className="p-6 md:p-8 rounded-lg bg-gradient-to-br from-[#FAF5E9] to-[#F5ECD7] border-2 border-gold/40 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-gold-dark font-sans text-xs tracking-widest uppercase font-bold">
                <Flame size={16} className="text-gold-dark" />
                <span>Bhagavadgita Vishwa Mahotsav 2027</span>
              </div>

              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
                  {member.mahotsavRoleTitle}
                </h3>
                <p className="text-ink-body font-sans text-sm md:text-base leading-relaxed mt-2">
                  {member.mahotsavRoleDescription}
                </p>
              </div>

              {/* Focus Pillars / Boxes */}
              {member.mahotsavBoxes && member.mahotsavBoxes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {member.mahotsavBoxes.map((box, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white/90 rounded border border-gold/30 shadow-sm space-y-1.5"
                    >
                      <h4 className="font-serif text-lg font-bold text-ink">
                        {box.title}
                      </h4>
                      <p className="text-ink-body/80 font-sans text-xs leading-relaxed">
                        {box.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Areas of Expertise & Skills */}
            {member.skills && member.skills.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gold-dark font-sans text-xs tracking-widest uppercase font-bold">
                  <Layers size={15} />
                  <span>Core Expertise & Leadership Capabilities</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full bg-cream border border-gold/35 text-ink font-sans text-xs md:text-sm font-semibold tracking-wide shadow-sm hover:border-gold transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Experience & Career Timeline */}
            {member.experiences && member.experiences.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-gold-dark font-sans text-xs tracking-widest uppercase font-bold">
                  <Briefcase size={15} />
                  <span>Professional Career & Leadership Experience</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
                  {member.experiencesTitle || "Career Highlights"}
                </h3>

                <div className="space-y-4">
                  {member.experiences.map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-5 md:p-6 rounded-lg bg-white border border-gold/20 shadow-sm hover:border-gold/40 transition-all space-y-2 relative pl-6 before:absolute before:left-0 before:top-4 before:bottom-4 before:w-1 before:bg-gold before:rounded-r"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-serif text-xl font-bold text-ink">
                          {exp.title}
                        </h4>
                        {exp.period && (
                          <span className="text-xs font-sans font-semibold text-gold-dark uppercase tracking-wider bg-gold/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                            {exp.period}
                          </span>
                        )}
                      </div>

                      {exp.organization && (
                        <p className="text-gold-dark font-sans text-xs font-semibold tracking-wide uppercase">
                          {exp.organization}
                        </p>
                      )}

                      {exp.description && (
                        <p className="text-ink-body font-sans text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      )}

                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="space-y-1.5 pt-2">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="text-ink-body/90 font-sans text-xs md:text-sm flex items-start gap-2"
                            >
                              <span className="text-gold shrink-0 mt-0.5">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Section */}
            {member.achievements && member.achievements.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-gold-dark font-sans text-xs tracking-widest uppercase font-bold">
                  <Award size={15} />
                  <span>Key Accomplishments & Significant Works</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
                  {member.achievementsTitle || "Accomplishments"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {member.achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-lg bg-cream/40 border border-gold/20 shadow-sm space-y-2.5"
                    >
                      <h4 className="font-serif text-lg font-bold text-ink flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-gold-dark shrink-0" />
                        <span>{ach.title}</span>
                      </h4>
                      {ach.description && (
                        <p className="text-ink-body font-sans text-xs md:text-sm leading-relaxed">
                          {ach.description}
                        </p>
                      )}
                      {ach.bullets && (
                        <ul className="space-y-1.5 pt-1">
                          {ach.bullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="text-ink-body/85 font-sans text-xs leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-gold-dark shrink-0">✦</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ventures Portfolio (Special for K. Satya Prasad) */}
            {member.ventures && member.ventures.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-gold-dark font-sans text-xs tracking-widest uppercase font-bold">
                  <Building size={15} />
                  <span>Diversified Business & Social Ventures Portfolio</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
                  {member.venturesTitle || "Ventures Portfolio"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {member.ventures.map((v, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-lg bg-white border border-gold/25 shadow-sm hover:border-gold hover:shadow-gold/20 transition-all space-y-2"
                    >
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-dark text-[10px] font-sans font-bold uppercase tracking-wider">
                        {v.tag}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-ink">
                        {v.name}
                      </h4>
                      <p className="text-ink-body font-sans text-xs leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Strengths */}
            {member.strengths && member.strengths.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-gold-dark font-sans text-xs tracking-widest uppercase font-bold">
                  <Sparkles size={15} />
                  <span>Leadership Strengths & Core Values</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink">
                  {member.strengthsTitle || "Core Strengths"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {member.strengths.map((str, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-lg bg-cream/40 border border-gold/20 space-y-2"
                    >
                      <h4 className="font-serif text-lg font-bold text-ink">
                        {str.title}
                      </h4>
                      <p className="text-ink-body font-sans text-xs md:text-sm leading-relaxed">
                        {str.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlight Leadership Quote */}
            {member.highlightQuote && (
              <div className="p-6 md:p-8 rounded-lg bg-gradient-to-r from-cream via-white to-cream border-l-4 border-gold shadow-sm text-center">
                <p className="font-serif italic text-lg md:text-xl text-ink leading-relaxed">
                  &ldquo;{member.highlightQuote}&rdquo;
                </p>
                <p className="text-gold-dark font-sans text-xs font-bold uppercase tracking-widest mt-2">
                  — {member.name}
                </p>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {onPrev && (
                  <button
                    type="button"
                    onClick={onPrev}
                    disabled={!hasPrev}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-gold/30 hover:border-gold hover:bg-gold/10 text-ink text-xs font-sans font-semibold tracking-wider uppercase transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>
                )}
                {onNext && (
                  <button
                    type="button"
                    onClick={onNext}
                    disabled={!hasNext}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-gold/30 hover:border-gold hover:bg-gold/10 text-ink text-xs font-sans font-semibold tracking-wider uppercase transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn-gold inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Close Profile & Return to Overview</span>
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
