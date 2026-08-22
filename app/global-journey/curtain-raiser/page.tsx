import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Curtain Raiser — 20 December 2026",
  description: "The Curtain Raiser event on 20 December 2026 — Gita Jayanti — launching the Bhagavad Gita Vishwa Mahotsav 2027 across 18 nations simultaneously.",
};

export default function CurtainRaiserPage() {
  return (
    <>
      <PageHero
        badge="20 December 2026"
        title="Curtain Raiser"
        subtitle="On Gita Jayanti — the auspicious day commemorating the divine revelation of the Bhagavad Gita — communities across 18 nations will ignite the flame of the Vishwa Mahotsav simultaneously."
      />
      <section className="bg-white section-pad">
        <div className="container-main max-w-4xl space-y-8 text-ink-body font-sans text-base leading-relaxed">
          <p>The <strong className="text-ink">Curtain Raiser</strong> is conceived as a single, unified global event — a moment of synchronised spiritual intention spanning 18 countries and every time zone.</p>
          <p>On the evening of <strong className="text-ink">20 December 2026</strong>, at a coordinated hour, communities in all 18 participating countries will simultaneously:</p>
          <ul className="space-y-3 pl-6">
            {[
              "Light a ceremonial lamp (deepa) as a symbol of the Gita's light entering the world",
              "Recite the first chapter (Arjuna Vishada Yoga) of the Bhagavad Gita",
              "Read aloud the Mahotsav Declaration — a collective statement of intent and aspiration",
              "Register their participation in the Global Sankalpa (collective vow)",
              "Inaugurate their chapter-specific local events leading up to the Mega Mahotsav",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-gold font-bold flex-shrink-0">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <GoldDivider />
          <p>The Curtain Raiser will be live-streamed globally, with a dedicated multilingual broadcast in all 18 languages. It is expected to be witnessed by over <strong className="text-ink">1 million viewers</strong> across digital platforms.</p>
          <div className="card-gold-top p-8 mt-8">
            <h3 className="font-serif text-2xl font-semibold text-ink mb-4">Register for the Curtain Raiser</h3>
            <p className="text-ink-muted mb-6">Join your local Curtain Raiser event or participate virtually from anywhere in the world.</p>
            <a href="/participate/register" className="btn-gold">Register Now</a>
          </div>
        </div>
      </section>
    </>
  );
}
