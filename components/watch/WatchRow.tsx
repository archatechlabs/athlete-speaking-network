"use client";

import { motion } from "framer-motion";
import WatchVideoCard from "@/components/watch/WatchVideoCard";
import type { ContentItem } from "@/lib/types";

export default function WatchRow({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: ContentItem[];
}) {
  if (items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="mb-14"
    >
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
        {subtitle && <p className="text-sm text-white/50">{subtitle}</p>}
      </div>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
        {items.map((item) => (
          <WatchVideoCard key={item.id} item={item} />
        ))}
      </div>
    </motion.section>
  );
}
