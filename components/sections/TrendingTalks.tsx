"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { content } from "@/lib/mock/content";
import { getAthleteById } from "@/lib/mock/athletes";

const trending = content.slice(0, 6);

export default function TrendingTalks() {
  return (
    <Section id="trending">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Trending talks</h2>
        <Link
          href="/watch"
          className="text-sm font-medium text-accent transition hover:text-accent-hover"
        >
          Open Watch →
        </Link>
      </div>
      <div className="mt-8 overflow-hidden">
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent md:mx-0 md:px-0">
          {trending.map((talk, i) => {
            const athlete = getAthleteById(talk.athleteId);
            return (
              <motion.div
                key={talk.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="w-72 shrink-0"
              >
                <Link
                  href={`/watch/${talk.id}`}
                  className="group relative block h-56 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-accent/30 hover:shadow-glow"
                >
                  <Image
                    src={talk.thumbnail}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                    sizes="288px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition group-hover:bg-accent group-hover:scale-110">
                      <Play
                        className="h-7 w-7 text-white ml-1"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-xs font-medium text-accent">{talk.category}</p>
                    <h3 className="mt-0.5 font-semibold text-white line-clamp-2">
                      {talk.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/55">
                      {athlete?.name ?? "ASN"} · {talk.duration}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
