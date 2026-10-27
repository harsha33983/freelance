"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import type { TeamMember } from "@/lib/teamData";

interface TeamMemberCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
}

export default function TeamMemberCard({ member, onSelect }: TeamMemberCardProps) {
  return (
    <article
      className="group relative bg-white border border-gold/20 rounded-md overflow-hidden shadow-sm hover:shadow-gold transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
      style={{ minHeight: "560px" }}
    >
      {/* Decorative Gold Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-gold/50 via-gold to-gold-dark w-full" />

      {/* Profile Photo Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-cream/60">
        <Image
          src={member.image}
          alt={`Photograph of ${member.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ objectPosition: member.objectPosition || "center 20%" }}
          priority={false}
        />
        
        {/* Subtle Gradient Overlay at the base of photo */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Floating Role Pill on Photo */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-md border border-gold/40 text-gold-dark text-[11px] font-sans font-bold tracking-wider uppercase rounded-full shadow-sm">
            <Sparkles size={11} className="text-gold" />
            <span className="truncate max-w-[210px]">{member.kicker.split("•")[0]?.trim()}</span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Full Name */}
          <h3 className="font-serif text-2xl font-bold text-ink group-hover:text-gold-dark transition-colors duration-200 leading-snug mb-1">
            {member.name}
          </h3>

          {/* Professional Designation */}
          <p className="text-gold-dark font-sans text-xs font-semibold tracking-wide uppercase mb-3 line-clamp-1">
            {member.designation}
          </p>

          {/* Short Introduction (2-3 lines consistent) */}
          <p className="text-ink-body/85 font-sans text-sm leading-relaxed line-clamp-3 mb-4">
            {member.shortIntro}
          </p>
        </div>

        {/* Read More Button pinned to bottom */}
        <div className="pt-4 border-t border-gold/15 mt-auto">
          <button
            type="button"
            onClick={() => onSelect(member)}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-cream hover:bg-gold text-ink font-sans font-semibold text-xs tracking-widest uppercase border border-gold/30 hover:border-gold hover:text-ink shadow-sm transition-all duration-300 group-hover:bg-gold group-hover:text-ink cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50"
            aria-haspopup="dialog"
            aria-label={`Read more about ${member.name}`}
          >
            <span>Read Full Profile</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}
