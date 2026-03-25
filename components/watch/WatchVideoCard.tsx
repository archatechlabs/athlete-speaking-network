"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Lock } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { getAthleteById } from "@/lib/mock/athletes";
import { cn } from "@/lib/cn";

export default function WatchVideoCard({
  item,
  className = "",
}: {
  item: ContentItem;
  className?: string;
}) {
  const athlete = getAthleteById(item.athleteId);

  return (
    <Link
      href={`/watch/${item.id}`}
      className={cn(
        "group relative block w-72 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-glow",
        className
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={item.thumbnail}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 288px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/25 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-accent">
            <Play className="ml-0.5 h-7 w-7 text-white" fill="currentColor" />
          </div>
        </div>
        {item.isPremium && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-navy/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-md">
            <Lock className="h-3 w-3" aria-hidden />
            Pro
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-accent">{item.category}</p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-white">{item.title}</h3>
        <p className="mt-1 text-sm text-white/55">{athlete?.name ?? "ASN Athlete"}</p>
        <p className="mt-2 text-xs text-white/45">{item.duration}</p>
      </div>
    </Link>
  );
}
