import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Shield, Heart, Handshake, Star, Globe, Music } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Values",
  description: "The six core values of the Bhagavad Gita Vishwa Mahotsav 2027.",
};

const values = [
  {
    icon: Shield,
    title: "Authenticity",
    desc: "We present the Bhagavad Gita in its full depth and integrity — without dilution, distortion, or commercialisation. Every programme, speaker, and experience is selected for its genuine alignment with the Gita's teachings.",
  },
  {
    icon: Heart,
    title: "Inclusivity",
    desc: "The Mahotsav is open to every human being — regardless of religion, nationality, language, age, or background. The Gita belongs to all. We actively work to remove all barriers to participation.",
  },
  {
    icon: Handshake,
    title: "Service",
    desc: "We are driven by the spirit of seva — selfless service. Every member of the organising team, every volunteer, and every partner is serving not an organisation but the Gita's mission.",
  },
  {
    icon: Star,
    title: "Excellence",
    desc: "We hold ourselves to the highest standards of quality in every aspect of the Mahotsav — because the Bhagavad Gita deserves nothing less. We are meticulous in our preparation and relentless in our pursuit of excellence.",
  },
  {
    icon: Globe,
    title: "Responsibility",
    desc: "We take our responsibility to the environment, to our communities, and to the future seriously. The Mahotsav is committed to ecological sustainability, ethical governance, and transparent financial management.",
  },
  {
    icon: Music,
    title: "Harmony",
    desc: "We celebrate the diversity of India's and the world's spiritual traditions as expressions of one universal truth. We actively cultivate harmony — between traditions, between nations, between participants.",
  },
];

export default function ValuesPage() {
  return (
    <>
      <PageHero
        badge="Our Values"
        title="The Values We Live By"
        subtitle="Six principles that guide every decision, every programme, and every relationship in the Bhagavad Gita Vishwa Mahotsav."
      />
      <section className="bg-white section-pad">
        <div className="container-main grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="card-gold-top p-8 group">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink mb-3">{v.title}</h3>
                <p className="text-ink-muted text-sm font-sans leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
