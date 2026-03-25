import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Team | Athlete Speaking Network",
  description:
    "Meet the people behind Athlete Speaking Network — leadership and technology.",
};

const team = [
  {
    name: "Orson Prince-Charles",
    role: "Founder",
    image: "/orson-prince-charles.png",
    imageClassName: "object-cover object-[center_20%]",
    bio: "Former NFL athlete and entrepreneur building a premium marketplace where organizations book world-class athletes and fans learn from their stories.",
  },
  {
    name: "Chizz Cunningham",
    role: "Tech Advisor",
    image: "/team/chizz-cunningham.png",
    imageClassName: "object-cover object-top",
    bio: "Technology leader advising product, platform, and scale — helping ASN deliver a fast, reliable experience for athletes and bookers.",
  },
] as const;

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-navy pb-24 pt-[calc(7rem+env(safe-area-inset-top,0px))]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(124,92,255,0.15),transparent)]" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-accent">
          Athlete Speaking Network
        </p>
        <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Our team</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/70">
          The leadership and advisors shaping how we connect athletes, organizations, and
          audiences.
        </p>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2">
          {team.map((member) => (
            <li key={member.name}>
              <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-glow transition hover:border-accent/30">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={member.imageClassName}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {member.role}
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-white">{member.name}</h2>
                  </div>
                </div>
                <div className="border-t border-white/10 p-6">
                  <p className="text-sm leading-relaxed text-white/70">{member.bio}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
