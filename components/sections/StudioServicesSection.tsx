"use client";

import { Clapperboard, Mic2, Share2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const items = [
  {
    icon: Clapperboard,
    title: "Capture & production",
    text: "Field producers, cinematic interviews, and live event capture tuned for athlete schedules.",
  },
  {
    icon: Mic2,
    title: "Edit & publishing",
    text: "Short-form, long-form, and course packaging—ready for Watch, social, and LMS drops.",
  },
  {
    icon: Share2,
    title: "Marketing support",
    text: "Launch kits, partner outreach, and org licensing so stories reach the right rooms.",
  },
  {
    icon: Sparkles,
    title: "Platform + people",
    text: "ASN is software plus a bench—athletes focus on performance; we handle the pipeline.",
  },
];

export default function StudioServicesSection() {
  return (
    <Section id="studio">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Production &amp; growth services
          </h2>
          <p className="mt-4 text-sm text-white/65 sm:text-base">
            We help athletes ship video, audio, and curriculum—not just host it. Think ecosystem,
            not upload button.
          </p>
          <Button variant="primary" href="/apply" className="mt-8">
            Apply to join ASN
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full p-5">
                <item.icon className="h-5 w-5 text-accent" aria-hidden />
                <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/60">{item.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
