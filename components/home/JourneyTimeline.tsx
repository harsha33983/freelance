"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, Globe, Star } from "lucide-react";

const steps = [
  {
    icon: CalendarDays,
    phase: "Phase 1",
    date: "20 December 2026",
    title: "Curtain Raiser",
    desc: "A synchronised global launch event, setting the tone for the Vishwa Mahotsav. Communities across 18 countries begin their Gita journey together.",
    href: "/global-journey/curtain-raiser",
    cta: "Learn More",
  },
  {
    icon: Globe,
    phase: "Phase 2",
    date: "Jan – Feb 2027",
    title: "Global Gita Connect",
    desc: "18-chapter events across 18 countries, in 18 languages. Each chapter celebrated through recitation, discourse, and cultural immersion.",
    href: "/global-journey/18-chapters",
    cta: "Explore the Journey",
  },
  {
    icon: Star,
    phase: "Phase 3",
    date: "27 February 2027",
    title: "Bhagavad Gita Mahotsav",
    desc: "The grand culmination — 50,000+ pilgrims, global spiritual leaders, and seekers converge for a three-day celebration of the Bhagavad Gita.",
    href: "/programme/mega-mahotsav",
    cta: "Explore the Programme",
  },
];

export default function JourneyTimeline() {
 
  return null;
}
