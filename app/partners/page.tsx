import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";
import Link from "next/link";
import { Check, Crown, Award, Star, BookOpen, Zap, Globe, Tv, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Partners — Bhagavad Gita Vishwa Mahotsav 2027",
  description: "Partner with the Bhagavad Gita Vishwa Mahotsav 2027 — sponsorship, CSR, knowledge, youth, media, and community partnership opportunities.",
};

const tiers = [
  {
    icon: Crown,
    tier: "Title Partner",
    subtitle: "Presenting Sponsor",
    price: "₹5 Cr+",
    highlight: true,
    benefits: [
      "Exclusive naming rights for the Mega Mahotsav",
      "Primary logo placement on all materials",
      "Speaking slot at the inaugural ceremony",
      "VIP pavilion at the venue for 200 guests",
      "Full-page coverage in all Mahotsav publications",
      "Dedicated social media campaign",
      "Global press release featuring your brand",
    ],
  },
  {
    icon: Award,
    tier: "Platinum Partner",
    subtitle: "Co-Presenting Sponsor",
    price: "₹2 Cr+",
    benefits: [
      "Prominent logo on main stage and key venues",
      "Co-branding on the Mahotsav website",
      "VIP access for 100 guests",
      "Full-page in the Mahotsav souvenir publication",
      "Brand feature in Gita Sankalpa ceremony",
      "Social media mentions across all platforms",
    ],
  },
  {
    icon: Star,
    tier: "Gold Partner",
    subtitle: "Gold Sponsor",
    price: "₹75 L+",
    benefits: [
      "Logo on stage backdrop and digital screens",
      "Branding on the Mahotsav website",
      "VIP access for 50 guests",
      "Half-page in souvenir publication",
      "Social media recognition",
      "Mention in press releases",
    ],
  },
  {
    icon: BookOpen,
    tier: "Knowledge Partner",
    subtitle: "Academic & Scholarly",
    price: "Custom",
    benefits: [
      "Gita Research Centre naming rights",
      "Scholarly content partnership",
      "Speaker slots in Gita Jnana Sabha",
      "Co-authored publications",
      "Academic network access",
    ],
  },
  {
    icon: Zap,
    tier: "Youth Partner",
    subtitle: "Youth Programme",
    price: "₹25 L+",
    benefits: [
      "Youth Zone naming/branding rights",
      "Youth Gita programme co-branding",
      "Engagement with 10,000+ youth participants",
      "Youth Network founding partner status",
    ],
  },
  {
    icon: Globe,
    tier: "Digital Partner",
    subtitle: "Technology & Platform",
    price: "Custom",
    benefits: [
      "Digital platform co-branding",
      "Featured in live-stream opening/closing",
      "App and website branding",
      "Digital archive partnership",
    ],
  },
  {
    icon: Tv,
    tier: "Media Partner",
    subtitle: "Media & Broadcasting",
    price: "Custom",
    benefits: [
      "Official Media Partner designation",
      "Exclusive broadcasting rights (negotiable)",
      "Press box access at all events",
      "Co-branded digital content",
    ],
  },
  {
    icon: Users,
    tier: "Community Partner",
    subtitle: "NGO / Spiritual Org",
    price: "₹5 L+",
    benefits: [
      "Community Partner logo on website",
      "Exhibition space at Mahotsav venue",
      "Access for 20 participants",
      "Community Partner certificate",
    ],
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        badge="Partners"
        title="Partner With the Mahotsav"
        subtitle="Align your organisation with the world's largest Bhagavad Gita celebration — and make a lasting impact on millions of lives."
      />

      {/* Why partner */}
      <section className="bg-cream section-pad-sm">
        <div className="container-main max-w-4xl text-center">
          <h2 className="section-heading mb-4">Why Partner With Us?</h2>
          <div className="gold-rule mb-6" />
          <p className="text-ink-muted font-sans text-base leading-relaxed">
            Partnership with the Bhagavad Gita Vishwa Mahotsav is an opportunity to associate your organisation with one of the most significant cultural and spiritual events of our time — reaching over <strong className="text-ink">50,000 physical participants</strong>, <strong className="text-ink">1 million+ virtual viewers</strong>, and a global community of Gita practitioners in <strong className="text-ink">18 countries</strong>.
          </p>
        </div>
      </section>

      <GoldDivider className="container-main" />

      {/* Tier cards */}
      <section className="bg-white section-pad">
        <div className="container-main">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-4">Partnership Tiers</h2>
            <div className="gold-rule mb-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.tier}
                  className={`rounded-sm border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-gold ${
                    t.highlight
                      ? "border-gold bg-gold/5 shadow-gold"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  {t.highlight && (
                    <div className="bg-gold-gradient text-ink text-center text-xs font-semibold font-sans tracking-widest uppercase py-2">
                      ★ Flagship Opportunity
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                      <Icon size={22} className="text-gold" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-ink mb-0.5">{t.tier}</h3>
                    <p className="text-ink-muted text-xs font-sans uppercase tracking-wider mb-3">{t.subtitle}</p>
                    <p className="text-gold font-serif text-2xl font-bold mb-4">{t.price}</p>
                    <div className="w-8 h-px bg-gold mb-4" />
                    <ul className="space-y-2 flex-1 mb-6">
                      {t.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-ink-muted font-sans">
                          <Check size={12} className="text-gold flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/partners/proposal" className={`text-center py-2.5 px-4 rounded-sm text-xs font-semibold font-sans tracking-wider uppercase transition-all ${
                      t.highlight ? "bg-gold text-ink hover:bg-ink hover:text-gold" : "border border-gold text-gold hover:bg-gold hover:text-ink"
                    }`}>
                      Enquire Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
