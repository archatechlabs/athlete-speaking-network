"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";

function carouselBtnClass(side: "left" | "right") {
  const pos = side === "left" ? "left-3" : "right-3";
  return `${pos} absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy/80 text-white shadow-lg backdrop-blur-md transition hover:border-white/35 hover:bg-navy focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy`;
}

type PhotoCarouselProps = {
  images: string[];
  altBase: string;
};

export function PhotoCarousel({ images, altBase }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const n = images.length;
  const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);

  if (n === 0) return null;

  return (
    <section aria-label="Photo highlights" className="w-full">
      <h2 className="text-lg font-semibold tracking-tight text-white">Photos</h2>
      <p className="mt-1 text-sm text-white/55">
        Moments from keynotes, panels, and appearances.
      </p>
      <div className="relative mt-5">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Image
            key={images[index]}
            src={images[index]!}
            alt={`${altBase} — gallery photo ${index + 1} of ${n}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, min(896px, 90vw)"
          />
        </div>
        {n > 1 && (
          <>
            <button
              type="button"
              className={carouselBtnClass("left")}
              onClick={prev}
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              className={carouselBtnClass("right")}
              onClick={next}
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          </>
        )}
        {n > 1 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-accent" : "w-2 bg-white/30 hover:bg-white/45"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

type VideoItem = { title: string; embedUrl: string };

type VideoCarouselProps = {
  videos: VideoItem[];
};

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [index, setIndex] = useState(0);
  const n = videos.length;
  const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);

  if (n === 0) return null;

  const current = videos[index]!;

  return (
    <section aria-label="Video highlights" className="w-full">
      <h2 className="text-lg font-semibold tracking-tight text-white">Videos</h2>
      <p className="mt-1 text-sm text-white/55">
        Clips and replays so you can see them on stage.
      </p>
      <div className="relative mt-5">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]">
          <iframe
            key={current.embedUrl}
            src={current.embedUrl}
            title={current.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="mt-3 text-center text-sm font-medium text-white/80">{current.title}</p>
        {n > 1 && (
          <>
            <button
              type="button"
              className={carouselBtnClass("left")}
              onClick={prev}
              aria-label="Previous video"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              className={carouselBtnClass("right")}
              onClick={next}
              aria-label="Next video"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {videos.map((v, i) => (
                <button
                  key={v.embedUrl}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show video: ${v.title}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-accent" : "w-2 bg-white/30 hover:bg-white/45"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

type SpeakerMediaSectionProps = {
  name: string;
  heroImageAlt: string;
  photos: string[];
  videos: VideoItem[];
};

export default function SpeakerMediaSection({
  name,
  heroImageAlt,
  photos,
  videos,
}: SpeakerMediaSectionProps) {
  const hasPhotos = photos.length > 0;
  const hasVideos = videos.length > 0;
  if (!hasPhotos && !hasVideos) return null;

  const altBase = `${name} — ${heroImageAlt}`;
  const both = hasPhotos && hasVideos;

  return (
    <div
      className={`mt-16 grid gap-14 border-t border-white/10 pt-16 ${both ? "lg:grid-cols-2 lg:gap-12" : ""}`}
    >
      {hasPhotos && <PhotoCarousel images={photos} altBase={altBase} />}
      {hasVideos && <VideoCarousel videos={videos} />}
    </div>
  );
}
