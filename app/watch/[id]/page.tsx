import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import WatchVideoCard from "@/components/watch/WatchVideoCard";
import { getContentById, content } from "@/lib/mock/content";
import { getAthleteById } from "@/lib/mock/athletes";

type Props = { params: { id: string } };

export default function WatchDetailPage({ params }: Props) {
  const item = getContentById(params.id);
  if (!item) notFound();

  const athlete = getAthleteById(item.athleteId);
  const related = content
    .filter((c) => c.id !== item.id && c.category === item.category)
    .slice(0, 4);

  const fallbackRelated = content.filter((c) => c.id !== item.id).slice(0, 4);
  const sidebar = related.length > 0 ? related : fallbackRelated;

  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute right-0 top-32 h-72 w-72 rounded-full bg-accent/15 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div>
            <GlassCard hover={false} className="overflow-hidden p-0">
              <div className="relative aspect-video w-full bg-navy-light">
                {item.videoUrl ? (
                  <iframe
                    title={item.title}
                    src={item.videoUrl}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/50">
                    Video placeholder
                  </div>
                )}
              </div>
            </GlassCard>

            <div className="mt-8">
              <p className="text-sm font-medium text-accent">{item.category}</p>
              <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                {item.title}
              </h1>
              {athlete && (
                <Link
                  href={`/athletes/${athlete.slug}`}
                  className="mt-3 inline-flex text-lg text-white/75 transition hover:text-white"
                >
                  {athlete.name}
                </Link>
              )}
              <p className="mt-6 text-base leading-relaxed text-white/70">
                {item.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/50">
                <span>{item.duration}</span>
                {item.isPremium && (
                  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white/80">
                    Premium
                  </span>
                )}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {athlete && (
                  <Button variant="primary" href={`/book/${athlete.slug}`}>
                    Book this athlete
                  </Button>
                )}
                <Button variant="secondary" href="/training">
                  Explore training
                </Button>
                <Button variant="secondary" href="/dashboard">
                  Subscribe
                </Button>
                <Button variant="ghost" href="/watch">
                  Back to library
                </Button>
              </div>
            </div>
          </div>

          <aside className="mt-12 lg:mt-0">
            <h2 className="text-lg font-semibold text-white">Related talks</h2>
            <div className="mt-4 flex flex-col gap-4">
              {sidebar.map((c) => (
                <Link
                  key={c.id}
                  href={`/watch/${c.id}`}
                  className="group flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3 transition hover:border-accent/30 hover:shadow-glow"
                >
                  <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={c.thumbnail}
                      alt=""
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="112px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium text-white">
                      {c.title}
                    </p>
                    <p className="mt-1 text-xs text-white/45">{c.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
