"use client";

import {
  Users,
  CalendarCheck,
  Video,
  DollarSign,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const orgBenefits = [
  {
    icon: Users,
    title: "Motivate & Inspire Audiences",
    description:
      "Bring world-class athletes to your events and leave a lasting impact on your team or audience.",
  },
  {
    icon: CalendarCheck,
    title: "Simplified Booking Process",
    description:
      "One platform to discover, request, and confirm speakers. No back-and-forth or hidden fees.",
  },
  {
    icon: Video,
    title: "Stream Exclusive Content",
    description:
      "Access talks, workshops, and behind-the-scenes content from athletes on demand.",
  },
];

const athleteBenefits = [
  {
    icon: DollarSign,
    title: "Get Paid to Speak",
    description:
      "Set your rates and get paid securely. We handle contracts and payments so you can focus on delivering.",
  },
  {
    icon: Megaphone,
    title: "Build Your Brand",
    description:
      "Reach new audiences and grow your profile through events and streaming content.",
  },
  {
    icon: TrendingUp,
    title: "Earn Passive Income",
    description:
      "Your recorded talks and courses generate revenue long after the event.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function BenefitColumn({
  title,
  items,
}: {
  title: string;
  items: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }>;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white md:text-2xl">{title}</h3>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="space-y-4"
      >
        {items.map((benefit) => (
          <motion.div key={benefit.title} variants={item}>
            <Card className="p-5 transition hover:border-white/20">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{benefit.title}</h4>
                  <p className="mt-1 text-sm text-white/70">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Benefits() {
  return (
    <Section id="benefits">
      <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
        <BenefitColumn title="Benefits for Organizations" items={orgBenefits} />
        <BenefitColumn title="Benefits for Athletes" items={athleteBenefits} />
      </div>
    </Section>
  );
}
