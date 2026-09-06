import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Venue — Four Signature Entrances",
  description: "The Mahotsav venue — a sacred space with four signature entrances representing the four paths of Yoga in the Bhagavad Gita.",
};

const entrances = [
  {
    name: "Rigveda Dwara",
    subtitle: "The Gateway of Knowledge & Invocation",
    quote: "“Where the journey of sacred knowledge begins.”",
    theme: "Wisdom • Knowledge • Invocation",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-700",
  },
  {
    name: "Yajurveda Dwara",
    subtitle: "The Gateway of Action & Dharma",
    quote: "“Where knowledge becomes purposeful action.”",
    theme: "Duty • Action • Discipline",
    color: "bg-green-50 border-green-200",
    accent: "text-green-700",
  },
  {
    name: "Samaveda Dwara",
    subtitle: "The Gateway of Harmony & Devotion",
    quote: "“Where wisdom finds its voice in music and devotion.”",
    theme: "Music • Harmony • Devotion",
    color: "bg-rose-50 border-rose-200",
    accent: "text-rose-700",
  },
  {
    name: "Atharvaveda Dwara",
    subtitle: "The Gateway of Life & Well-being",
    quote: "“Where wisdom embraces life, harmony and well-being.”",
    theme: "Life • Well-being",
    color: "bg-purple-50 border-purple-200",
    accent: "text-purple-700",
  },
];

export default function VenuePage() {
  return (
    <>
      <PageHero
        badge="Venue"
        title="A Sacred Mandala"
        subtitle="The Mahotsav venue is designed as a living mandala — four sacred gateways converging at a central point of unity."
      />

      <section className="bg-white section-pad">
        <div className="container-main">
          {/* Venue Gates visual */}
          <div className="mb-16 max-w-5xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-amber-500/20 to-gold/20 blur-xl opacity-50 group-hover:opacity-75 transition duration-500 rounded-xl" />
            <div className="relative rounded-xl overflow-hidden border border-gold/20 shadow-2xl bg-black">
              <img 
                src="/centre-stage.jpg" 
                alt="Bhagavad Gita Vishwa Mahotsav - Four Entrances" 
                className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700" 
              />
            </div>
          </div>

          <GoldDivider className="mb-12" />
          
          <div className="max-w-4xl mx-auto mb-10 text-center">
            <p className="text-lg font-sans text-ink-body leading-relaxed">
              The Mahotsav venue is designed so that every participant chooses their primary pathway into the experience. The four entrances can represent the four foundational streams of Vedic knowledge, with all four journeys converging toward the Bhagavadgita at the heart of the Mahotsav.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {entrances.map((e) => (
              <div key={e.name} className={`${e.color} border rounded-sm p-8`}>
                <h3 className={`font-serif text-xl font-semibold ${e.accent} mb-1`}>{e.name}</h3>
                <p className="text-xs font-sans font-semibold tracking-wider uppercase text-gray-400 mb-3">{e.subtitle}</p>
                <p className="italic text-ink-muted text-sm mb-3">{e.quote}</p>
                <p className="text-sm font-sans"><span className="font-semibold text-ink">Theme:</span> {e.theme}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
