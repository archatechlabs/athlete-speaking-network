"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getTrainingWithAthletes, getMentorshipOffers } from "@/lib/data";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function TrainingMentorshipPreview() {
  const training = getTrainingWithAthletes().slice(0, 3);
  const mentorship = getMentorshipOffers().slice(0, 3);

  return (
    <Section id="training-preview">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Training &amp; mentorship
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/60 sm:text-base">
            Beyond the keynote—virtual coaching, mentor circles, and structured programs tied to
            the same athlete profiles you book for stage.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" href="/training">
            Training marketplace
          </Button>
          <Button variant="primary" href="/mentorship">
            Find a mentor
          </Button>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-white">Athlete-led training</h3>
          <div className="mt-6 space-y-4">
            {training.map(({ program, athlete }, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="p-5">
                  <p className="text-xs font-medium text-accent">{athlete.name}</p>
                  <h4 className="mt-1 font-semibold text-white">{program.title}</h4>
                  <p className="mt-2 line-clamp-2 text-sm text-white/60">
                    {program.description}
                  </p>
                  <p className="mt-3 text-xs text-white/45">
                    {program.skillLevel} · {program.format} · {program.duration}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {money.format(program.price)}
                  </p>
                  <Link
                    href={`/book/${athlete.slug}?service=training`}
                    className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover"
                  >
                    Request session →
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Mentorship lanes</h3>
          <div className="mt-6 space-y-4">
            {mentorship.map((m, i) => (
              <motion.div
                key={`${m.athlete.id}-${m.area}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="p-5">
                  <p className="text-xs font-medium text-accent">{m.athlete.name}</p>
                  <h4 className="mt-1 font-semibold text-white">{m.area}</h4>
                  <p className="mt-2 text-sm text-white/55">Formats: {m.format}</p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    From {money.format(m.fromPrice)}
                  </p>
                  <Link
                    href={`/book/${m.athlete.slug}?service=mentoring`}
                    className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover"
                  >
                    Request mentorship →
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
