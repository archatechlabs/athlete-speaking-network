"use client";

import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import type { Athlete } from "@/lib/types";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function AthleteMarketplaceCard({ athlete }: { athlete: Athlete }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={athlete.image}
          alt={athlete.name}
          fill
          className="object-cover transition duration-500 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            {athlete.sport}
          </p>
          <h3 className="mt-1 text-xl font-bold text-white">{athlete.name}</h3>
          <StarRating value={athlete.rating} className="mt-2" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="line-clamp-2 text-sm text-white/70">{athlete.bio}</p>
        <div className="flex flex-wrap gap-2">
          {athlete.topics.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/85"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-sm text-white/60">
          <span className="text-white/40">From </span>
          <span className="font-semibold text-white">
            {money.format(athlete.priceMin)} – {money.format(athlete.priceMax)}
          </span>
        </p>
        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <Button variant="secondary" href={`/athletes/${athlete.id}`} className="flex-1">
            View Profile
          </Button>
          <Button variant="primary" href={`/book?athlete=${athlete.id}`} className="flex-1">
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
