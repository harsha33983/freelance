import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { ArrowRight, UserPlus, Globe, Building2, Zap, Heart, Home, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Participate",
  description: "Join the Bhagavad Gita Vishwa Mahotsav 2027 — register, volunteer, host a Parayana, or participate globally.",
};

const options = [
  { icon: UserPlus, title: "Register Now", desc: "Individual, family, group, or institutional registration for the Mega Mahotsav.", href: "/participate/register", highlight: true },
  { icon: Globe, title: "Global Participation", desc: "Join from your country — participate in the 18-nation chapter journey.", href: "/participate/global" },
  { icon: Building2, title: "Institution Participation", desc: "Register your school, university, or organisation as a participant.", href: "/participate/institution" },
  { icon: Zap, title: "Youth Participation", desc: "Special registration for ages 15–35 with dedicated Youth Gita programme.", href: "/participate/youth" },
  { icon: Heart, title: "Volunteer", desc: "Offer your time and skills to serve the Mahotsav.", href: "/participate/volunteer" },
  { icon: Home, title: "Host a Gita Parayana", desc: "Organise a Bhagavad Gita recitation in your community or institution.", href: "/participate/host-parayana" },
  { icon: Users, title: "Group Registration", desc: "Register a group of 10 or more participants together.", href: "/participate/group" },
];

export default function ParticipatePage() {
  return (
    <>
      <PageHero
        badge="Participate"
        title="Be Part of the Movement"
        subtitle="There are many ways to participate in the Bhagavad Gita Vishwa Mahotsav 2027 — find the path that resonates with you."
      />
      <section className="bg-white section-pad">
        <div className="container-main grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((o) => {
            const Icon = o.icon;
            return (
              <Link
                key={o.href}
                href={o.href}
                className={`card-base p-7 group flex flex-col gap-3 ${o.highlight ? "border-t-2 border-t-gold shadow-gold" : "card-gold-top"}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors ${o.highlight ? "bg-gold/20" : "bg-gold/10"}`}>
                  <Icon size={18} className="text-gold" />
                </div>
                {o.highlight && <span className="gold-badge self-start text-[10px]">Most Popular</span>}
                <h3 className="font-serif text-xl font-semibold text-ink">{o.title}</h3>
                <p className="text-ink-muted text-sm font-sans leading-relaxed flex-1">{o.desc}</p>
                <span className="text-gold text-xs font-semibold font-sans tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                  {o.highlight ? "Register Now" : "Learn More"} <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
