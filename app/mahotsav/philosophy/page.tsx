import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Event Philosophy",
  description: "The four Yoga paths and philosophical foundations of the Bhagavad Gita Vishwa Mahotsav 2027.",
};

export default function PhilosophyPage() {
  return (
    <>
      <PageHero
        badge="Event Philosophy"
        title="The Philosophy Behind the Mahotsav"
        subtitle="Rooted in the Bhagavad Gita's own structure, the Mahotsav is designed to honour every dimension of the human journey — intellectual, active, devotional, and contemplative."
      />

      <section className="bg-white section-pad">
        <div className="container-main max-w-4xl space-y-10">
          {[
            {
              num: "01",
              title: "Not a Religious Event — A Universal One",
              body: "The Bhagavad Gita does not belong to any single religion, sect, or community. It is a universal text addressing the deepest questions of human existence. The Mahotsav reflects this universality — it is open to every person, of every faith, from every nation, who seeks meaning, purpose, and inner peace.",
            },
            {
              num: "02",
              title: "Celebration Over Ceremony",
              body: "The Mahotsav is conceived not as a solemn religious ritual but as a joyful, vibrant celebration of wisdom. It is a festival — with music, dance, discourse, recitation, and community — reflecting the Gita's own spirit of active, joyful engagement with life.",
            },
            {
              num: "03",
              title: "From Text to Transformation",
              body: "The Mahotsav is not content with surface-level exposure to the Gita. Every programme, every session, every experience is designed to move participants from intellectual engagement to practical application — from knowing the Gita to living the Gita.",
            },
            {
              num: "04",
              title: "The Power of Collective Practice",
              body: "When thousands of voices recite the Gita together, something profound happens. Collective practice amplifies individual transformation. The Mahotsav harnesses this power — creating field-like experiences of shared wisdom that change individual lives and communities.",
            },
            {
              num: "05",
              title: "Technology as Sacred Tool",
              body: "The Mahotsav embraces modern technology as a means of spreading ancient wisdom. Live-streaming, digital registration, global virtual participation, multilingual broadcast — all serve the singular purpose of making the Gita accessible to every human being on earth.",
            },
          ].map((section) => (
            <div key={section.num} className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <span className="font-serif text-gold font-bold text-sm">{section.num}</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-ink mb-3">{section.title}</h3>
                <p className="text-ink-muted font-sans text-base leading-relaxed">{section.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
