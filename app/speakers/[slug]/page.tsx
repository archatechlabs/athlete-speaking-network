import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import {
  getSpeakerBySlug,
  getAllSpeakerSlugs,
  type Speaker,
} from "@/lib/speakers";
import Button from "@/components/ui/Button";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSpeakerSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const speaker = getSpeakerBySlug(params.slug);
  if (!speaker) return { title: "Speaker not found" };
  return {
    title: `${speaker.name} | Athlete Speaking Network`,
    description: speaker.highlight,
  };
}

function ProfileContent({ speaker }: { speaker: Speaker }) {
  return (
    <>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:aspect-[3/4] lg:sticky lg:top-28">
        <Image
          src={speaker.image}
          alt={speaker.heroImageAlt}
          fill
          className={`object-cover ${speaker.imageClassName ?? ""}`}
          sizes="(max-width: 1024px) 100vw, 42vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-sm font-medium text-accent">{speaker.league}</p>
          <p className="mt-1 text-2xl font-bold text-white">{speaker.name}</p>
          <p className="mt-1 text-white/75">{speaker.tagline}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Link
          href="/#athletes"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to speakers
        </Link>

        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Featured speaker
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {speaker.name}
        </h1>
        <p className="mt-2 text-xl text-white/80">{speaker.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {speaker.topicsList.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/90"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-8 text-lg leading-relaxed text-white/75">{speaker.bio}</p>

        <ul className="mt-8 space-y-3 text-white/80">
          <li className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
            <span>Keynotes, fireside chats, and moderated Q&amp;A</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
            <span>Virtual or in-person availability (subject to schedule)</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
            <span>Dedicated booking support through ASN</span>
          </li>
        </ul>

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white/60">Starting from</p>
            <p className="text-3xl font-bold text-white">{speaker.priceLabel}</p>
            <p className="text-sm text-white/50">+ travel where applicable</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" href="mailto:bookings@athletespeakingnetwork.com">
              Request booking
            </Button>
            <Button variant="secondary" href="/#trending">
              Watch content
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SpeakerProfilePage({ params }: Props) {
  const speaker = getSpeakerBySlug(params.slug);
  if (!speaker) notFound();

  return (
    <div className="min-h-screen bg-navy pt-24 pb-20">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,92,255,0.12),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <ProfileContent speaker={speaker} />
        </div>
      </div>
    </div>
  );
}
