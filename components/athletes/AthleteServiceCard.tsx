"use client";

import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import type { PlatformService } from "@/lib/types";
import { SERVICE_LABELS } from "@/lib/data";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatLabel(f: PlatformService["format"]) {
  if (f === "both") return "Virtual · In-person";
  return f === "virtual" ? "Virtual" : "In-person";
}

export default function AthleteServiceCard({
  service,
  athleteSlug,
}: {
  service: PlatformService;
  athleteSlug: string;
}) {
  return (
    <GlassCard hover={false} className="flex h-full flex-col p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
        {SERVICE_LABELS[service.type]}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm text-white/65">{service.description}</p>
      <p className="mt-4 text-sm text-white/45">From {money.format(service.startingPrice)}</p>
      <p className="mt-1 text-xs text-white/40">{formatLabel(service.format)} · {service.duration}</p>
      <Button
        variant="primary"
        href={`/book/${athleteSlug}?service=${service.type}`}
        className="mt-5 w-full !py-2.5"
      >
        Request
      </Button>
    </GlassCard>
  );
}
