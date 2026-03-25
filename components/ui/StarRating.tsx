import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export default function StarRating({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div
      className={cn("flex items-center gap-0.5 text-amber-400", className)}
      aria-label={`Rating ${value} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              filled ? "fill-current" : "fill-none text-white/25"
            )}
          />
        );
      })}
      <span className="ml-1.5 text-sm text-white/70">{value.toFixed(1)}</span>
    </div>
  );
}
