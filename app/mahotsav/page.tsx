import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";
import Link from "next/link";
import { BookOpen, Eye, HelpCircle, Hash, Landmark, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "The Mahotsav — Overview",
  description: "Discover the Bhagavad Gita Vishwa Mahotsav 2027 — a landmark global spiritual celebration spanning 18 countries, 18 chapters, and 18 languages.",
  alternates: {
    canonical: "https://divineaura.world/mahotsav",
  },
};

const subpages = [
  { icon: Eye, title: "Vision & Mission", desc: "Six pillars driving this global movement.", href: "/mahotsav/vision" },
  { icon: BookOpen, title: "Event Philosophy", desc: "The four Yoga paths at the heart of the Mahotsav.", href: "/mahotsav/philosophy" },
  { icon: HelpCircle, title: "Why Bhagavad Gita?", desc: "The eternal relevance of the Gita in modern life.", href: "/mahotsav/why-gita" },
  { icon: Hash, title: "Significance of 18", desc: "Why eighteen is the sacred number of this event.", href: "/mahotsav/significance-of-18" },
  { icon: Landmark, title: "The Legacy", desc: "The lasting impact and future initiatives born from the Mahotsav.", href: "/mahotsav/legacy" },
];

export default function MahotsavOverviewPage() {
  return (
    <>
      <PageHero
        badge="The Mahotsav"
        title="Bhagavad Gita Vishwa Mahotsav 2027"
        subtitle="A landmark global spiritual celebration — bringing together 50,000+ seekers across 18 nations to honour the eternal wisdom of the Bhagavad Gita."
      />

      {/* Overview body */}
      <section className="bg-white section-pad">
        <div className="container-main max-w-4xl">
          <div className="prose-gold space-y-6 text-ink-body font-sans leading-relaxed">
            <p className="text-lg">
              The <strong className="text-ink">Bhagavad Gita Vishwa Mahotsav 2027</strong> is conceived as the most comprehensive global celebration of the Bhagavad Gita ever organised. It is not merely an event — it is a movement rooted in the conviction that the Gita's timeless teachings hold the answers to humanity's deepest challenges.
            </p>
            <p>
              Structured around the sacred number <span className="text-gold font-semibold">18</span> — eighteen countries, eighteen chapters, eighteen languages — the Mahotsav unfolds in three phases over eighteen months. <strong className="text-ink">Bhagavad Gita Vishwa Mahotsav on 27 February 2027</strong>.
            </p>
            <p>
              The event is anchored by the <strong className="text-ink">Curtain Raiser</strong> on 20 December 2026 — the globally-observed Gita Jayanti date — followed by chapter-specific events hosted across participating nations, and finally the convergence of all streams into the Mega Mahotsav.
            </p>
            <p>
              At its core, the Mahotsav aspires to do three things: facilitate mass <span className="text-gold font-semibold">Recitation</span> of the Gita, deepen collective <span className="text-gold font-semibold">Realization</span> of its teachings, and catalyse individual and social <span className="text-gold font-semibold">Transformation</span>.
            </p>
          </div>
        </div>
      </section>

      <GoldDivider className="container-main" />

      {/* Sub-page navigation cards */}
      <section className="bg-cream section-pad">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Explore the Mahotsav</h2>
            <div className="gold-rule" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subpages.map((p) => {
              const Icon = p.icon;
              return (
                <Link key={p.href} href={p.href} className="card-gold-top p-7 group flex flex-col gap-3">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-ink">{p.title}</h3>
                  <p className="text-ink-muted text-sm font-sans leading-relaxed flex-1">{p.desc}</p>
                  <span className="text-gold text-xs font-semibold font-sans tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore {p.title} <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
