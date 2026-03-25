"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const orgSteps = [
  { title: "Browse Speakers", text: "Explore our roster of athletes and filter by topic, sport, and budget." },
  { title: "Request Booking", text: "Submit your event details. We'll confirm availability within 24 hours." },
  { title: "Host Your Event", text: "Your speaker shows up. Your audience is inspired. It's that simple." },
];

const athleteSteps = [
  { title: "Apply & Get Listed", text: "Complete your profile and set your speaking topics and rates." },
  { title: "Accept Bookings", text: "Review incoming requests and accept events that fit your schedule." },
  { title: "Get Paid + Build Brand", text: "Get paid securely and grow your reach through every engagement." },
];

function StepBlock({
  steps,
  title,
}: {
  steps: Array<{ title: string; text: string }>;
  title: string;
}) {
  return (
    <Card className="p-8">
      <h3 className="text-xl font-semibold text-white md:text-2xl">{title}</h3>
      <div className="mt-8 space-y-8">
        {steps.map((step, i) => (
          <div key={step.title} className="flex gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent font-bold text-lg">
              {i + 1}
            </div>
            <div>
              <h4 className="font-semibold text-white">{step.title}</h4>
              <p className="mt-1 text-sm text-white/70">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <StepBlock title="For Organizations" steps={orgSteps} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <StepBlock title="For Athletes" steps={athleteSteps} />
        </motion.div>
      </div>
    </Section>
  );
}
