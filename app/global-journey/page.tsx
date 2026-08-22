import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Global Journey",
  description: "The 18-country, 18-chapter, 18-language global journey of the Bhagavad Gita Vishwa Mahotsav 2027.",
};

const sections = [
  { title: "Curtain Raiser", date: "20 Dec 2026", desc: "The global launch event — 18 nations light the flame simultaneously.", href: "/global-journey/curtain-raiser" },
  { title: "18 Countries", date: "Jan–Feb 2027", desc: "One chapter, one country — a sacred geography of wisdom.", href: "/global-journey/18-countries" },
  { title: "18 Chapters", date: "Jan–Feb 2027", desc: "Every chapter of the Gita celebrated in its full depth.", href: "/global-journey/18-chapters" },
  { title: "18 Languages", date: "Jan–Feb 2027", desc: "The Gita's voice resonating across eighteen world languages.", href: "/global-journey/18-languages" },
  { title: "Global Parayana", date: "27 Feb 2027", desc: "The world's largest Bhagavad Gita recitation.", href: "/global-journey/global-parayana" },
  { title: "Global Sankalpa", date: "27 Feb 2027", desc: "A collective vow taken by 50,000+ participants.", href: "/global-journey/global-sankalpa" },
  { title: "Road to 27 Feb 2027", date: "Dec 2026 – Feb 2027", desc: "The full timeline of events leading to the Mega Mahotsav.", href: "/global-journey/road-to-mahotsav" },
];

export default function GlobalJourneyPage() {
  return (
    <>
      <PageHero
        badge="Global Journey"
        title="A Journey Across 18 Nations"
        subtitle="From the Curtain Raiser to the Mega Mahotsav — a sacred itinerary spanning continents, cultures, and languages."
      />
      <section className="bg-white section-pad">
        <div className="container-main grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="card-gold-top p-7 group flex flex-col gap-3">
              <span className="text-gold text-xs font-semibold font-sans tracking-widest uppercase">{s.date}</span>
              <h3 className="font-serif text-xl font-semibold text-ink">{s.title}</h3>
              <p className="text-ink-muted text-sm font-sans leading-relaxed flex-1">{s.desc}</p>
              <span className="text-gold text-xs font-semibold font-sans tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
