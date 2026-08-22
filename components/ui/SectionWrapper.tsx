"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: "white" | "cream" | "dark";
  delay?: number;
}

export default function SectionWrapper({
  children,
  className = "",
  id,
  bg = "white",
  delay = 0,
}: SectionWrapperProps) {
  const bgClass =
    bg === "cream"
      ? "bg-cream"
      : bg === "dark"
      ? "bg-footer text-white"
      : "bg-white";

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`section-pad ${bgClass} ${className}`}
    >
      {children}
    </motion.section>
  );
}
