"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,92,255,0.25),transparent)]" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
        >
          Turn Stories into Impact.
          <br />
          <span className="text-accent">Create Value Together.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-lg text-white/80"
        >
          Whether you're an athlete ready to share your story or an organization
          looking for inspiration—we're here to connect you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="primary" href="/dashboard">
            For athletes
          </Button>
          <Button variant="secondary" href="/athletes">
            For organizations
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
