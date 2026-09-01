import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { ArrowRight, MapPin, Users, Star, BookOpen, Zap, Music } from "lucide-react";

export const metadata: Metadata = {
  title: "The Experience",
  description: "The full sensory and spiritual experience of the Bhagavad Gita Vishwa Mahotsav 2027 — venue, zones, stages, and pathways.",
  alternates: {
    canonical: "https://divineaura.world/experience",
  },
};

const sections = [
  { icon: MapPin, title: "Venue", desc: "Four Signature Entrances converging at the sacred centre.", href: "/experience/venue" },
  { icon: BookOpen, title: "Four Pathways", desc: "Enter through Jnana, Karma, Bhakti, or Dhyana.", href: "/experience/four-pathways" },
  { icon: Users, title: "50,000+ Participants", desc: "The largest Gita gathering in history.", href: "/experience/participants" },
  { icon: Star, title: "Central Stage", desc: "The heart of the Mahotsav — where wisdom meets wonder.", href: "/experience/central-stage" },
  { icon: BookOpen, title: "Experience ", desc: "Interactive immersion in the Gita's universe.", href: "/experience/gita-experience" },
  { icon: Zap, title: "Youth Zone", desc: "A dedicated space for the next generation of seekers.", href: "/experience/youth-zone" },
  { icon: Music, title: "Cultural & Spiritual Zones", desc: "Classical arts, devotional music, and sacred spaces.", href: "/experience/zones" },
];

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        badge="The Experience"
        title="An Immersive Spiritual World"
        subtitle="The Mahotsav venue is designed as a living mandala — a sacred space where every pathway, zone, and structure reflects the Bhagavad Gita's cosmic vision."
      />
      <section className="bg-white section-pad">
        <div className="container-main grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.href} href={s.href} className="card-gold-top p-7 group flex flex-col gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink">{s.title}</h3>
                <p className="text-ink-muted text-sm font-sans leading-relaxed flex-1">{s.desc}</p>
                <span className="text-gold text-xs font-semibold font-sans tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore {s.title} <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
