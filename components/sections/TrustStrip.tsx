"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";

const marks = [
  "NCAA",
  "NFLPA",
  "State U",
  "Summit ISD",
  "Northwind Brands",
  "Youth First",
  "Horizon Health",
  "Metro FC",
];

export default function TrustStrip() {
  return (
    <Section id="trust">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        Trusted by schools, brands, and organizations
      </p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        {marks.map((m) => (
          <span
            key={m}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/50"
          >
            {m}
          </span>
        ))}
      </motion.div>
    </Section>
  );
}
