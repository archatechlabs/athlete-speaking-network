"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { athletes } from "@/lib/mock/athletes";

const featured = athletes.slice(0, 4);

export default function FeaturedAthletes() {
  return (
    <Section id="athletes">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Featured athletes
        </h2>
        <Link
          href="/athletes"
          className="text-sm font-medium text-accent transition hover:text-accent-hover"
        >
          View marketplace →
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((athlete, i) => (
          <motion.div
            key={athlete.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              href={`/athletes/${athlete.slug}`}
              className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition hover:scale-[1.02] hover:border-accent/25 hover:shadow-glow">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={athlete.image}
                    alt={athlete.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent opacity-95" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-semibold text-white transition group-hover:text-accent">
                      {athlete.name}
                    </h3>
                    <p className="text-sm text-accent">
                      {athlete.league} · {athlete.topics[0]}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-white/55">
                      {athlete.bio}
                    </p>
                    <span className="mt-4 block w-full">
                      <span className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition group-hover:bg-accent-hover btn-glow">
                        Profile &amp; talks
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
