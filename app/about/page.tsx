import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { ArrowRight, Building2, Users, Star, Award, Globe, Heart, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "About the Bhagavad Gita Vishwa Mahotsav 2027 — the organising body, spiritual leadership, advisory council, and values.",
};

const sections = [
  { icon: Building2, title: "Organising Body", href: "/about/organising-body" },
  { icon: Star, title: "Advisory Council", href: "/about/advisory-council" },
  { icon: Heart, title: "Spiritual Leadership", href: "/about/spiritual-leadership" },
  { icon: Users, title: "Organising Committee", href: "/about/organising-committee" },
  { icon: Globe, title: "Institutional Partners", href: "/about/institutional-partners" },
  { icon: Award, title: "Our Values", href: "/about/values" },
  { icon: Mail, title: "Contact", href: "/about/contact" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About"
        title="About the Mahotsav"
        subtitle="The people, institutions, and values behind the Bhagavad Gita Vishwa Mahotsav 2027."
      />
      <section className="bg-white section-pad">
        <div className="container-main grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.href} href={s.href} className="card-gold-top p-7 group flex items-center gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink">{s.title}</h3>
                  <span className="text-gold text-xs font-semibold font-sans flex items-center gap-1 group-hover:gap-2 transition-all mt-1">
                    View <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
