import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Significance of 18",
  description: "The sacred numerological and scriptural significance of the number 18 in the Bhagavad Gita and the Mahotsav.",
};

const stats = [
  { number: "18", label: "Chapters", desc: "The Bhagavad Gita contains exactly 18 chapters (adhyayas), each a complete teaching in itself." },
  { number: "18", label: "Days", desc: "The Kurukshetra war lasted exactly 18 days — the context in which the Gita was revealed." },
  { number: "18", label: "Akshauhinis", desc: "The combined armies at Kurukshetra numbered 18 akshauhini — the largest military assembly in history." },
  { number: "700", label: "Verses", desc: "The Bhagavad Gita contains 700 slokas — 7 + 0 + 0 = 7, and 1 + 8 = 9; both sacred numbers." },
  { number: "18", label: "Puranas", desc: "There are 18 Mahapuranas in the Hindu scriptural canon — 18 is the foundational number of Sanatana Dharma." },
  { number: "18", label: "Countries", desc: "The Mahotsav journey spans 18 countries — mirroring the Gita's own sacred number across the globe." },
];

export default function SignificancePage() {
  return (
    <>
      <PageHero
        badge="Significance of 18"
        title="Why 18?"
        subtitle="In the Bhagavad Gita and in the Mahotsav, the number 18 is not arbitrary — it is the sacred thread that weaves the entire tapestry together."
      />

      <section className="bg-white section-pad">
        <div className="container-main">
          <div className="text-center mb-12">
            <p className="text-ink-muted font-sans text-base max-w-2xl mx-auto leading-relaxed">
              The number 18 appears throughout the Bhagavad Gita and the Mahabharata with striking consistency — it is the number of completion, of cosmic order, and of divine design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="card-gold-top p-8 text-center group">
                <div className="font-serif text-6xl font-bold text-gold mb-2 leading-none">{s.number}</div>
                <div className="font-sans text-xs font-semibold tracking-widest uppercase text-ink mb-4">{s.label}</div>
                <div className="w-8 h-px bg-gold mx-auto mb-4" />
                <p className="text-ink-muted text-sm font-sans leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider className="container-main" />

      <section className="bg-cream section-pad">
        <div className="container-main max-w-3xl">
          <h2 className="section-heading mb-6 text-center">The Deeper Significance</h2>
          <div className="gold-rule mb-8" />
          <div className="space-y-6 text-ink-body font-sans leading-relaxed">
            <p>In Sanskrit numerology, <strong className="text-ink">18 = 1 + 8 = 9</strong>, and 9 is considered the number of completion and perfection — the number that returns to itself when multiplied by any integer. It is the number of Brahman, of cosmic consciousness.</p>
            <p>The <strong className="text-ink">18 chapters</strong> of the Bhagavad Gita are not arbitrary divisions. Each chapter has a specific name, a specific yoga, and a specific teaching that builds upon the previous. Together they form a complete manual for human life.</p>
            <p>By structuring the Mahotsav around <strong className="text-ink">18 countries, 18 chapters, and 18 languages</strong>, the organisers are not simply adopting a marketing tagline — they are aligning the entire event with the cosmic architecture of the Gita itself.</p>
            <p>This is the Mahotsav's deepest aspiration: to mirror the completeness of the Gita's own structure in the completeness of its global celebration.</p>
          </div>
        </div>
      </section>
    </>
  );
}
