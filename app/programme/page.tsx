import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { ArrowRight, CalendarDays, Music, BookOpen, Globe, Mic2, Star, Heart, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Programme",
  description: "The full programme of the Bhagavad Gita Vishwa Mahotsav 2027 — from the Curtain Raiser to the Grand Parayana.",
};

const programmes = [
  { icon: CalendarDays, title: "Curtain Raiser", date: "20 Dec 2026", href: "/programme/curtain-raiser" },
  { icon: Star, title: "Mega Mahotsav", date: "27 Feb 2027", href: "/programme/mega-mahotsav" },
  { icon: BookOpen, title: "Grand Parayana", date: "27 Feb 2027", href: "/programme/grand-parayana" },
  { icon: Mic2, title: "Peetadhipati Sammelanam", date: "24 Feb 2027", href: "/programme/peetadhipati-sammelanam" },
  { icon: BookOpen, title: "Gita Jnana Sabha", date: "24–26 Feb 2027", href: "/programme/gita-jnana-sabha" },
  { icon: Zap, title: "Youth Gita", date: "25 Feb 2027", href: "/programme/youth-gita" },
  { icon: Music, title: "Cultural Programme", date: "25 Feb 2027", href: "/programme/cultural" },
  { icon: Globe, title: "Global Connect", date: "26 Feb 2027", href: "/programme/global-connect" },
  { icon: Heart, title: "Gita Sankalpa", date: "27 Feb 2027", href: "/programme/gita-sankalpa" },
];

export default function ProgrammePage() {
  return (
    <>
      <PageHero
        badge="Programme"
        title="The Full Programme"
        subtitle="Three days of the most profound Bhagavad Gita celebration ever conceived — every session designed to move from knowledge to experience to transformation."
      />
      <section className="bg-white section-pad">
        <div className="container-main grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map((p) => {
            const Icon = p.icon;
            return (
              <Link key={p.href} href={p.href} className="card-gold-top p-7 group flex flex-col gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <span className="text-gold text-xs font-semibold font-sans tracking-widest uppercase">{p.date}</span>
                <h3 className="font-serif text-xl font-semibold text-ink">{p.title}</h3>
                <span className="text-gold text-xs font-semibold font-sans tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  Details <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
