import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Why Bhagavad Gita?",
  description: "The eternal relevance of the Bhagavad Gita in addressing modern humanity's deepest challenges.",
};

const qaItems = [
  {
    q: "Why is the Bhagavad Gita relevant today?",
    a: "The Bhagavad Gita addresses the universal human condition — doubt, duty, fear, identity, purpose, and the nature of reality itself. In an age of unprecedented complexity, anxiety, and disconnection, its answers are more urgently needed than ever. Every question Arjuna asks on the battlefield is a question we ask in our own lives.",
  },
  {
    q: "What makes the Gita unique among world scriptures?",
    a: "Unlike most scriptures, the Gita is not a historical narrative or a code of law — it is a dialogue. It meets the seeker exactly where they are, in the midst of their greatest crisis, and guides them through every possible approach to wisdom: rational inquiry, selfless action, devotion, and meditation. No other text offers this complete spectrum.",
  },
  {
    q: "Is the Bhagavad Gita only for Hindus?",
    a: "Absolutely not. The Gita has been translated into over 80 languages and has inspired thinkers, leaders, and seekers from every tradition — from Mahatma Gandhi to Albert Einstein, from Aldous Huxley to J. Robert Oppenheimer. Its wisdom transcends any single religion or culture.",
  },
  {
    q: "How can the Gita help with modern challenges?",
    a: "The Gita's teachings on equanimity (samatvam), detachment from outcomes, the nature of the true self, and the power of disciplined action are directly applicable to challenges like mental health, professional burnout, relationship breakdown, existential emptiness, and moral confusion. It offers not platitudes but a complete philosophical system.",
  },
  {
    q: "Why celebrate all 18 chapters?",
    a: "Each of the 18 chapters of the Bhagavad Gita addresses a distinct aspect of human life and spiritual practice. By celebrating each chapter separately — across 18 countries — the Mahotsav ensures that the Gita's full wisdom is explored, not just its most famous verses. Every chapter deserves its moment in the light.",
  },
  {
    q: "What is the significance of 50,000 participants reciting together?",
    a: "Mass recitation of sacred texts is one of humanity's oldest and most powerful spiritual technologies. When 50,000 voices recite the Bhagavad Gita simultaneously, it creates a collective field of attention, intention, and energy that is qualitatively different from individual practice. It is an act of cultural memory and spiritual renewal.",
  },
];

export default function WhyGitaPage() {
  return (
    <>
      <PageHero
        badge="Why Bhagavad Gita?"
        title="The Eternal Relevance of the Gita"
        subtitle="Answers to the most frequently asked questions about the Bhagavad Gita and why the world needs its wisdom now more than ever."
      />

      <section className="bg-white section-pad">
        <div className="container-main max-w-4xl">
          <div className="space-y-8">
            {qaItems.map((item, i) => (
              <div key={i} className="border-l-2 border-gold pl-6 py-1">
                <h3 className="font-serif text-xl font-semibold text-ink mb-3">
                  {item.q}
                </h3>
                <p className="text-ink-muted font-sans text-base leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider className="container-main" />

      {/* Quote */}
      <section className="bg-cream section-pad-sm">
        <div className="container-main max-w-3xl text-center">
          <p className="font-serif text-2xl md:text-3xl italic text-ink leading-relaxed mb-6">
            "When I read the Bhagavad Gita and reflect about how God created this universe, everything else seems so superfluous."
          </p>
          <div className="gold-rule mb-4" />
          <p className="text-ink-muted font-sans text-sm">— Albert Einstein</p>
        </div>
      </section>
    </>
  );
}
