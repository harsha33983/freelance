import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Venue — Four Signature Entrances",
  description: "The Mahotsav venue — a sacred space with four signature entrances representing the four paths of Yoga in the Bhagavad Gita.",
};

const entrances = [
  {
    name: "Jnana Dwara",
    subtitle: "Gate of Knowledge",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-700",
    desc: "The northern entrance — flanked by towering text pillars inscribed with key Gita slokas. Leads to the Jnana Zone: the Gita Experience Centre, Scholarship Hall, and discourse spaces.",
  },
  {
    name: "Karma Dwara",
    subtitle: "Gate of Action",
    color: "bg-green-50 border-green-200",
    accent: "text-green-700",
    desc: "The eastern entrance — a wide, welcoming gateway representing active engagement. Leads to the Karma Zone: community service fair, institutional exhibitions, and the Global Partnership Pavilion.",
  },
  {
    name: "Bhakti Dwara",
    subtitle: "Gate of Devotion",
    color: "bg-rose-50 border-rose-200",
    accent: "text-rose-700",
    desc: "The southern entrance — adorned with flowers, devotional art, and the sound of kirtan. Leads to the Bhakti Zone: the main stage, Grand Parayana ground, and devotional arts space.",
  },
  {
    name: "Dhyana Dwara",
    subtitle: "Gate of Meditation",
    color: "bg-purple-50 border-purple-200",
    accent: "text-purple-700",
    desc: "The western entrance — a serene, quiet pathway leading inward. Leads to the Dhyana Zone: meditation gardens, yoga spaces, and the silent reflection sanctuary.",
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
          {/* 4-quadrant visual */}
          <div className="mb-16 max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-2 relative">
              {/* Central badge */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-28 h-28 rounded-full bg-gold border-4 border-white shadow-gold-lg flex flex-col items-center justify-center text-center">
                  <span className="text-ink font-serif text-xs font-bold leading-tight">Sri Krishna</span>
                  <span className="text-ink font-serif text-[9px] leading-tight">Bhagavad Gita</span>
                </div>
              </div>
              {entrances.map((e, i) => (
                <div key={e.name} className={`${e.color} border rounded-sm p-8 text-center`}>
                  <h3 className={`font-serif text-lg font-semibold ${e.accent} mb-1`}>{e.name}</h3>
                  <p className="text-xs font-sans text-gray-500 tracking-wider uppercase">{e.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <GoldDivider className="mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {entrances.map((e) => (
              <div key={e.name} className={`${e.color} border rounded-sm p-8`}>
                <h3 className={`font-serif text-xl font-semibold ${e.accent} mb-1`}>{e.name}</h3>
                <p className="text-xs font-sans font-semibold tracking-wider uppercase text-gray-400 mb-4">{e.subtitle}</p>
                <p className="text-ink-muted text-sm font-sans leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
