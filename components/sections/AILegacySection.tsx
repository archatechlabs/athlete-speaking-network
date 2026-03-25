"use client";

import { Brain, Camera, MessageSquare, Library } from "lucide-react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const cards = [
  {
    icon: Camera,
    title: "Virtual skill analysis",
    text: "Camera-based movement breakdowns and drill prescriptions—human coaches augmented by models.",
  },
  {
    icon: MessageSquare,
    title: "Personalized athlete feedback",
    text: "Scaled Q&A that preserves tone and teaching style for camps, teams, and subscribers.",
  },
  {
    icon: Library,
    title: "On-demand knowledge archive",
    text: "Searchable playbooks, stories, and frameworks—licensed for schools and enterprises.",
  },
  {
    icon: Brain,
    title: "Legacy preservation",
    text: "Immortalize the player: structured content + AI layers so your voice compounds over decades.",
  },
];

export default function AILegacySection() {
  return (
    <Section id="ai-legacy">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          AI-powered athlete legacy
        </h2>
        <p className="mt-4 text-sm text-white/65 sm:text-base">
          Roadmapped premium layer—today we ship the content and booking rails; tomorrow we layer
          analysis, feedback, and archives athletes actually own.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="h-full p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20 text-accent">
                <c.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-white/65">{c.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
