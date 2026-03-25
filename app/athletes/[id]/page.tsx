import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import WatchVideoCard from "@/components/watch/WatchVideoCard";
import { getAthleteById } from "@/lib/mock/athletes";
import { getContentByAthleteId } from "@/lib/mock/content";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

type Props = { params: { id: string } };

export default function AthleteProfilePage({ params }: Props) {
  const athlete = getAthleteById(params.id);
  if (!athlete) notFound();

  const talks = getContentByAthleteId(athlete.id);

  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <GlassCard hover={false} className="overflow-hidden p-0 lg:grid lg:grid-cols-[minmax(0,340px)_1fr]">
          <div className="relative aspect-[3/4] w-full max-lg:max-h-[420px] lg:min-h-[420px]">
            <Image
              src={athlete.image}
              alt={athlete.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 340px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              {athlete.sport}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {athlete.name}
            </h1>
            <StarRating value={athlete.rating} className="mt-4" />
            <p className="mt-6 text-lg text-white/75">{athlete.bio}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {athlete.topics.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/90"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm text-white/50">
              Speaking fee range
            </p>
            <p className="text-2xl font-bold text-white">
              {money.format(athlete.priceMin)} – {money.format(athlete.priceMax)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" href={`/book?athlete=${athlete.id}`}>
                Request booking
              </Button>
              <Button variant="secondary" href="/watch">
                Watch talks
              </Button>
            </div>
          </div>
        </GlassCard>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-white">Preview</h2>
          <GlassCard hover={false} className="mt-6 overflow-hidden p-0">
            <div className="relative aspect-video w-full bg-navy-light">
              <iframe
                title={`${athlete.name} preview`}
                src={athlete.previewVideoUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex items-center gap-3 border-t border-white/10 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Play className="h-5 w-5" fill="currentColor" />
              </div>
              <p className="text-sm text-white/70">
                Watch a short preview, then explore full talks below or move straight to
                a booking request.
              </p>
            </div>
          </GlassCard>
        </section>

        <section className="mt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Watch talks</h2>
              <p className="mt-2 max-w-xl text-sm text-white/65">
                Streamable content is tied to each athlete—bookings and subscriptions
                help athletes invest in more stories.
              </p>
            </div>
            <Link
              href="/watch"
              className="text-sm font-medium text-accent transition hover:text-accent-hover"
            >
              Open full library →
            </Link>
          </div>
          {talks.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {talks.map((c) => (
                <WatchVideoCard key={c.id} item={c} />
              ))}
            </div>
          ) : (
            <GlassCard hover={false} className="mt-8 p-8 text-white/60">
              Talks coming soon for this athlete.
            </GlassCard>
          )}
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white">About</h2>
          <GlassCard hover={false} className="mt-6 p-8">
            <p className="text-base leading-relaxed text-white/80 whitespace-pre-line">
              {athlete.longBio}
            </p>
          </GlassCard>
        </section>

        <GlassCard className="mt-16 flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Ready for your stage?</h3>
            <p className="mt-1 text-sm text-white/65">
              Request a date and we&apos;ll route it to {athlete.name.split(" ")[0]}&apos;s team.
            </p>
          </div>
          <Button variant="primary" href={`/book?athlete=${athlete.id}`}>
            Book this athlete
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}
