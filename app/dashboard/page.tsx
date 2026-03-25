"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { useRole } from "@/contexts/RoleContext";
import type { StoredBooking } from "@/lib/mock/bookings-store";
import { content } from "@/lib/mock/content";
import { getAthleteById } from "@/lib/mock/athletes";
import { ATHLETE_ONBOARDING_STEPS } from "@/lib/future/athlete-onboarding";

type Tab = "bookings" | "content" | "profile";

export default function DashboardPage() {
  const { role, setRole } = useRole();
  const [tab, setTab] = useState<Tab>("bookings");
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (!cancelled && res.ok && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        }
      } catch {
        if (!cancelled) setLoadError("Could not load bookings.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "bookings", label: "Bookings" },
    { id: "content", label: "Content" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute left-10 top-28 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Dashboard</h1>
            <p className="mt-2 text-sm text-white/60">
              Mock workspace until auth ships. Role drives copy only.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-xs font-medium text-white/45" htmlFor="dash-role">
              View as
            </label>
            <select
              id="dash-role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "organization" | "athlete" | "viewer")
              }
              className="h-11 rounded-xl border border-white/15 bg-navy-light px-3 text-sm text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
            >
              <option value="viewer">Viewer</option>
              <option value="organization">Organization</option>
              <option value="athlete">Athlete</option>
            </select>
            <Button variant="secondary" href="/athletes">
              Marketplace
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === t.id
                  ? "bg-accent text-white shadow-glow"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "bookings" && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-8 space-y-4"
            >
              {loadError && <p className="text-sm text-red-400">{loadError}</p>}
              {bookings.length === 0 && !loadError && (
                <GlassCard hover={false} className="p-8 text-white/65">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <span>No bookings yet.</span>
                    <Button variant="primary" href="/book" className="w-fit !px-4 !py-2">
                      Start a request
                    </Button>
                  </div>
                </GlassCard>
              )}
              {bookings.map((b) => {
                const athlete = getAthleteById(b.athleteId);
                return (
                  <GlassCard key={b.id} hover={false} className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-mono text-accent">{b.id}</p>
                        <p className="mt-1 font-semibold text-white">
                          {athlete?.name ?? "Athlete"} · {b.organizationName}
                        </p>
                        <p className="mt-1 text-sm text-white/55">
                          {b.eventType} · {b.date} · {b.location}
                        </p>
                      </div>
                      <p className="text-xs text-white/40">
                        {new Date(b.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="mt-3 text-sm text-white/60">
                      Budget {b.budget}
                      {b.notes ? ` · ${b.notes}` : ""}
                    </p>
                  </GlassCard>
                );
              })}
            </motion.div>
          )}

          {tab === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-8"
            >
              <GlassCard hover={false} className="p-8">
                <h2 className="text-lg font-semibold text-white">Library snapshot</h2>
                <p className="mt-2 text-sm text-white/60">
                  {role === "athlete"
                    ? "Placeholder: connect uploads + payouts. Browse the public catalog below."
                    : "Premium streaming placeholder—link entitlements when subscriptions go live."}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-white/75">
                  {content.slice(0, 5).map((c) => (
                    <li key={c.id} className="flex justify-between gap-4 border-b border-white/5 pb-3">
                      <span>{c.title}</span>
                      <span className="shrink-0 text-white/45">{c.isPremium ? "Pro" : "Free"}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button variant="secondary" href="/watch">
                    Open Watch
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {tab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-8"
            >
              <GlassCard hover={false} className="p-8">
                <h2 className="text-lg font-semibold text-white">Profile placeholder</h2>
                <p className="mt-2 text-sm text-white/60">
                  Signed-in orgs and athletes will manage bios, fees, and content here.
                </p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Role</dt>
                    <dd className="font-medium capitalize text-white">{role}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Athlete onboarding</dt>
                    <dd className="text-right text-white/70">
                      {ATHLETE_ONBOARDING_STEPS.join(" → ")}
                    </dd>
                  </div>
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="primary" href="/athletes">
                    Browse athletes
                  </Button>
                  <Button variant="secondary" href="/book">
                    New booking
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
