import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";
import { Target, Globe, Heart, Lightbulb, Users, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description: "The six mission pillars driving the Bhagavad Gita Vishwa Mahotsav 2027 — a global spiritual movement built on authenticity, inclusivity, and service.",
};

const pillars = [
  {
    icon: BookOpen,
    title: "Spread Gita Wisdom",
    desc: "Make the Bhagavad Gita's teachings accessible to every human being — across age, culture, language, and background — through authentic, engaging, and inspiring formats.",
  },
  {
    icon: Globe,
    title: "Foster Global Unity",
    desc: "Use the Gita's universal philosophy to build bridges across nations, cultures, and communities, demonstrating that the human experience is fundamentally one.",
  },
  {
    icon: Heart,
    title: "Inspire Personal Transformation",
    desc: "Facilitate deep personal encounters with the Gita that move beyond intellectual understanding to genuine inner change and sustained spiritual practice.",
  },
  {
    icon: Users,
    title: "Empower Youth",
    desc: "Equip the next generation with the Gita's wisdom on identity, purpose, resilience, and leadership — tools for navigating a complex world with clarity and courage.",
  },
  {
    icon: Lightbulb,
    title: "Honour Scholarly Tradition",
    desc: "Celebrate and preserve the rich tradition of Gita scholarship and commentary, while making it relevant and resonant for contemporary seekers.",
  },
  {
    icon: Target,
    title: "Create a Living Legacy",
    desc: "Establish enduring institutions, programmes, and communities that continue the Gita's mission long after the Mahotsav — making 2027 a beginning, not an endpoint.",
  },
];

const yogaPaths = [
  {
    name: "Jnana Yoga",
    subtitle: "The Path of Knowledge",
    desc: "Gita discourses, scholarly symposia, and wisdom retreats that deepen intellectual and spiritual understanding of the Gita's teachings.",
    color: "border-t-blue-400",
  },
  {
    name: "Karma Yoga",
    subtitle: "The Path of Action",
    desc: "Community service initiatives, social welfare projects, and real-world applications of the Gita's principles of selfless action.",
    color: "border-t-green-500",
  },
  {
    name: "Bhakti Yoga",
    subtitle: "The Path of Devotion",
    desc: "Mass Gita recitations, devotional music, kirtan, and sacred rituals that open the heart to the Gita's divine dimension.",
    color: "border-t-gold",
  },
  {
    name: "Dhyana Yoga",
    subtitle: "The Path of Meditation",
    desc: "Meditative sessions, silence retreats, and contemplative practices drawn from the Gita's teachings on inner stillness and self-mastery.",
    color: "border-t-purple-500",
  },
];

export default function VisionPage() {
  return (
    <>
      <PageHero
        badge="Vision & Mission"
        title="Our Vision for the Mahotsav"
        subtitle="A world where every human being has access to the transformative wisdom of the Bhagavad Gita — and is inspired to live by it."
      />

      {/* Vision statement */}
      <section className="bg-white section-pad">
        <div className="container-main max-w-4xl text-center">
          <span className="gold-badge mb-6">Our Mission</span>
          <h2 className="section-heading mb-6 mt-4">
            Six Pillars of the Movement
          </h2>
          <div className="gold-rule mb-8" />
          <p className="text-ink-muted font-sans text-base leading-relaxed max-w-2xl mx-auto">
            The Bhagavad Gita Vishwa Mahotsav is guided by six core mission pillars — each representing a distinct dimension of the Gita's wisdom and its application in the world.
          </p>
        </div>

        <div className="container-main mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="card-gold-top p-7 group">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink mb-3">{p.title}</h3>
                <p className="text-ink-muted text-sm font-sans leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <GoldDivider className="container-main" />

      {/* Four Yoga paths */}
      <section className="bg-cream section-pad">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="gold-badge mb-4">Event Philosophy</span>
            <h2 className="section-heading mt-4 mb-4">Four Yoga Paths</h2>
            <div className="gold-rule mb-6" />
            <p className="text-ink-muted font-sans text-base max-w-xl mx-auto leading-relaxed">
              The Mahotsav is structured around the four paths of Yoga taught by Sri Krishna in the Bhagavad Gita — offering every participant a meaningful entry point.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {yogaPaths.map((y) => (
              <div key={y.name} className={`card-base border-t-2 ${y.color} p-7 text-center`}>
                <h3 className="font-serif text-xl font-semibold text-ink mb-1">{y.name}</h3>
                <p className="text-gold text-xs font-sans font-semibold tracking-wider uppercase mb-4">{y.subtitle}</p>
                <div className="w-8 h-px bg-gold mx-auto mb-4" />
                <p className="text-ink-muted text-sm font-sans leading-relaxed">{y.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
