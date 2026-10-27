"use client";

import { useState } from "react";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import ProfileModal from "@/components/team/ProfileModal";
import { teamMembers, type TeamMember } from "@/lib/teamData";
import { Sparkles, Users } from "lucide-react";

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const currentIndex = selectedMember
    ? teamMembers.findIndex((m) => m.id === selectedMember.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedMember(teamMembers[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < teamMembers.length - 1) {
      setSelectedMember(teamMembers[currentIndex + 1]);
    }
  };

  return (
    <section className="bg-cream/40 section-pad relative overflow-hidden" id="committee-members">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container-main relative">
        {/* Section Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold-dark text-xs font-sans font-semibold tracking-widest uppercase mb-4">
            <Users size={14} className="text-gold" />
            <span>Organising Leadership</span>
          </div>

          <h2 className="section-heading mb-4">
            Organising Committee Profiles
          </h2>

          <div className="gold-rule mx-auto mb-6" />

          <p className="text-ink-muted font-sans text-base md:text-lg leading-relaxed">
            Meet the distinguished leaders and domain specialists steering the vision,
            creative direction, media broadcast, communications, and partnerships for the
            historic Bhagavadgita Vishwa Mahotsav 2027.
          </p>
        </div>

        {/* Responsive Grid: 3 Desktop, 2 Tablet, 1 Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onSelect={(m) => setSelectedMember(m)}
            />
          ))}
        </div>

        {/* Section Footnote / Supporting Note */}
        <div className="mt-16 text-center max-w-2xl mx-auto p-6 rounded-lg bg-white/80 border border-gold/20 shadow-sm">
          <div className="flex items-center justify-center gap-2 text-gold-dark font-sans text-xs uppercase tracking-widest font-bold mb-2">
            <Sparkles size={14} />
            <span>Karma Yoga in Action</span>
          </div>
          <p className="text-ink-body font-sans text-sm leading-relaxed">
            Supported by over 200 dedicated sub-committee leaders, domain coordinators, and
            thousands of volunteers worldwide working collaboratively towards 27 February 2027.
          </p>
        </div>
      </div>

      {/* Expandable Profile Modal */}
      <ProfileModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < teamMembers.length - 1}
      />
    </section>
  );
}
