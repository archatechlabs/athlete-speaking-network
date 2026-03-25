"use client";

import {
  Users,
  CalendarCheck,
  Video,
  DollarSign,
  Megaphone,
  TrendingUp,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const orgBenefits = [
  {
    icon: Users,
    title: "Bring inspiring athletes in",
    description:
      "Keynotes, panels, and workshops from voices that have led in the highest-pressure environments.",
  },
  {
    icon: CalendarCheck,
    title: "Streamlined booking",
    description:
      "One request flow for speaking, training, mentoring, appearances, and sponsorship conversations.",
  },
  {
    icon: Video,
    title: "Content for programming",
    description:
      "License talks and series for classrooms, ERGs, and community events—aligned with who you book live.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship & training access",
    description:
      "Book virtual coaching blocks and mentor circles without a separate vendor maze.",
  },
];

const athleteBenefits = [
  {
    icon: DollarSign,
    title: "Get paid across formats",
    description:
      "Speaking, training, appearances, sponsorships, and subscriptions—structured offers, one profile.",
  },
  {
    icon: Megaphone,
    title: "Control your brand",
    description:
      "Verification, services, pricing ranges, and narrative—all in a premium athlete storefront.",
  },
  {
    icon: TrendingUp,
    title: "Build legacy & passive income",
    description:
      "Publish to Watch, run programs, and prepare for AI-powered archives that compound your reach.",
  },
  {
    icon: MessageCircle,
    title: "Platform-native comms",
    description:
      "Requests, contracts, and messages routed in one place—ready for real CRM and payments.",
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
                  <p className="mt-1 text-sm text-white/70">{benefit.description}</p>
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
        <BenefitColumn title="Benefits for organizations" items={orgBenefits} />
        <BenefitColumn title="Benefits for athletes" items={athleteBenefits} />
      </div>
    </Section>
  );
}
