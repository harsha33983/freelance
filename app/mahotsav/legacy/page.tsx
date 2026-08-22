import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "The Legacy",
  description: "The lasting impact and future initiatives born from the Bhagavad Gita Vishwa Mahotsav 2027.",
};

const legacyItems = [
  "Establishment of an annual Bhagavad Gita Vishwa Diwas — a global day of Gita recitation and celebration",
  "A permanent Gita Research & Resource Centre housing the world's largest collection of Gita translations, commentaries, and multimedia resources",
  "The Global Gita in Schools Initiative — introducing Gita-based character education programmes in schools across participating countries",
  "The Mahotsav Youth Network — a global community of young Gita practitioners connected across 18 nations",
  "A multilingual digital archive of the entire Mahotsav — preserved for future generations",
  "Community Gita Parayanas in every participating country, continuing beyond the Mahotsav as sustained practice",
  "A Gita Scholarship Fund supporting research and translation of the Gita into additional world languages",
  "Seed funding for Gita-based social enterprises aligned with Karma Yoga principles",
  "A Global Gita Maitri Network — connecting Gita study circles across all 18 countries",
];

export default function LegacyPage() {
  return (
    <>
      <PageHero
        badge="The Legacy"
        title="A Beginning, Not an Ending"
        subtitle="The Mahotsav is designed to be a catalyst — not a one-time event. Its legacy will ripple across generations."
      />

      <section className="bg-white section-pad">
        <div className="container-main max-w-4xl">
          <div className="mb-12 text-ink-body font-sans text-base leading-relaxed space-y-5">
            <p>Great spiritual events leave lasting imprints. The <strong className="text-ink">Bhagavad Gita Vishwa Mahotsav 2027</strong> is conceived with this long-term vision at its centre — every component of the Mahotsav is designed to seed an institution, a community, or a practice that will continue to grow for years and decades after the event.</p>
            <p>The organising committee has identified nine specific legacy initiatives — one for each of the nine months between the Curtain Raiser and the Mahotsav — each of which will be formally launched during the Mega Mahotsav on 27 February 2027.</p>
          </div>

          <GoldDivider className="mb-12" />

          <h2 className="section-heading mb-8">Nine Legacy Initiatives</h2>
          <div className="space-y-5">
            {legacyItems.map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center mt-0.5 group-hover:bg-gold/20 transition-colors">
                  <CheckCircle size={16} className="text-gold" />
                </div>
                <p className="text-ink-body font-sans text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#F8F6F0] py-24 overflow-hidden">

  <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[#D4AF37]/10" />

  <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-[#D4AF37]/10" />

 <div className="container-main max-w-3xl text-center">
          <p className="font-serif text-2xl md:text-3xl italic text-[#1F1A17] leading-relaxed mb-6">
            "Let this Mahotsav be the moment when the world rediscovered the Bhagavad Gita — and through it, rediscovered itself."
          </p>
          <div className="gold-rule" />
        </div>

</section>
    </>
  );
}
