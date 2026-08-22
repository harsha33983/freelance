"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Music, Mic2, Users, BookOpen, Globe } from "lucide-react";

const highlights = [
  {
    icon: BookOpen,
    title: "Grand Gita Parayana",
    desc: "50,000 voices reciting all 18 chapters of the Bhagavad Gita in unison.",
    href: "/programme/grand-parayana",
  },
  {
    icon: Mic2,
    title: "Peetadhipati Sammelanam",
    desc: "An assembly of the foremost spiritual heads and Shankaracharyas of India.",
    href: "/programme/peetadhipati-sammelanam",
  },
  {
    icon: BookOpen,
    title: "Gita Jnana Sabha",
    desc: "Scholarly discourses, debates, and dialogues on the Gita's timeless teachings.",
    href: "/programme/gita-jnana-sabha",
  },
  {
    icon: Users,
    title: "Youth Gita",
    desc: "A dedicated programme empowering the next generation with Gita wisdom.",
    href: "/programme/youth-gita",
  },
  {
    icon: Music,
    title: "Cultural Programme",
    desc: "Classical dance, devotional music, and theatrical depictions from across India.",
    href: "/programme/cultural",
  },
  {
    icon: Globe,
    title: "Global Connect",
    desc: "Live-streamed events connecting communities in 18 countries simultaneously.",
    href: "/programme/global-connect",
  },
];

export default function ProgrammeHighlights() {
  
  return null;
}
