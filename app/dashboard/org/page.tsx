"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import type { StoredBooking } from "@/lib/mock/bookings-store";
import { getAthleteById } from "@/lib/mock/athletes";
import { content } from "@/lib/mock/content";
import { SERVICE_LABELS } from "@/lib/data";

type Tab = "overview" | "requests" | "bookings" | "saved" | "messages" | "content";

export default function OrgDashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");
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
    { id: "overview", label: "Overview" },
    { id: "requests", label: "Requests" },
    { id: "bookings", label: "Bookings" },
    { id: "saved", label: "Saved athletes" },
    { id: "messages", label: "Messages" },
    { id: "content", label: "Content access" },
  ];

  const pending = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute left-10 top-28 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Organization
            </p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Dashboard</h1>
            <p className="mt-2 text-sm text-white/60">
              Placeholder workspace—requests sync from the booking API mock.
            </p>
          </div>
          <Button variant="secondary" href="/dashboard">
            All dashboards
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <GlassCard hover={false} className="p-5">
            <p className="text-xs text-white/45">Open requests</p>
            <p className="mt-1 text-2xl font-bold text-white">{pending}</p>
          </GlassCard>
          <GlassCard hover={false} className="p-5">
            <p className="text-xs text-white/45">Total in session</p>
            <p className="mt-1 text-2xl font-bold text-white">{bookings.length}</p>
          </GlassCard>
          <GlassCard hover={false} className="p-5">
            <p className="text-xs text-white/45">Licensed titles (mock)</p>
            <p className="mt-1 text-2xl font-bold text-white">{content.length}</p>
          </GlassCard>
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
          {(tab === "bookings" || tab === "requests" || tab === "overview") && (
            <motion.div
              key="bookings-block"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-8 space-y-4"
            >
              {tab === "overview" && (
                <GlassCard hover={false} className="p-6">
                  <p className="text-sm text-white/70">
                    Use <strong className="text-white">Bookings</strong> for full request detail.
                    Messaging, saved rosters, and content licensing wire here next.
                  </p>
                  <Button variant="primary" href="/athletes" className="mt-4">
                    Browse athletes
                  </Button>
                </GlassCard>
              )}
              {loadError && <p className="text-sm text-red-400">{loadError}</p>}
              {(() => {
                const list =
                  tab === "requests"
                    ? bookings.filter((b) => b.status === "pending")
                    : tab === "overview"
                      ? bookings.slice(0, 3)
                      : bookings;
                if (list.length === 0 && !loadError && tab !== "overview") {
                  return (
                    <GlassCard hover={false} className="p-8 text-white/65">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <span>Nothing here yet.</span>
                        <Button variant="primary" href="/athletes" className="w-fit !px-4 !py-2">
                          Find an athlete
                        </Button>
                      </div>
                    </GlassCard>
                  );
                }
                return list.map((b) => {
                const athlete = getAthleteById(b.athleteId);
                return (
                  <GlassCard key={b.id} hover={false} className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-mono text-accent">{b.id}</p>
                        <p className="mt-1 font-semibold text-white">
                          {SERVICE_LABELS[b.serviceType]} · {athlete?.name ?? "Athlete"}
                        </p>
                        <p className="mt-1 text-sm text-white/55">
                          {b.organizationName} · {b.contactName} · {b.email}
                        </p>
                        <p className="mt-1 text-sm text-white/55">
                          {b.eventType} · {b.date} · {b.virtualOrInPerson} · {b.location}
                        </p>
                      </div>
                      <p className="text-xs text-white/40">
                        {new Date(b.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="mt-3 text-sm text-white/60">
                      Budget {b.budget} · Audience {b.audienceSize || "—"}
                    </p>
                    <p className="mt-2 text-sm text-white/50">{b.notes}</p>
                  </GlassCard>
                );
              });
              })()}
            </motion.div>
          )}

          {tab === "saved" && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <GlassCard hover={false} className="p-8 text-white/60">
                Saved athletes and shortlists will appear here—connected to marketplace IDs.
              </GlassCard>
            </motion.div>
          )}

          {tab === "messages" && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <GlassCard hover={false} className="p-8 text-white/60">
                Threaded messaging with athletes is mocked out. Notifications will route booking
                questions here.
              </GlassCard>
            </motion.div>
          )}

          {tab === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <GlassCard hover={false} className="p-8">
                <h2 className="text-lg font-semibold text-white">Licensed catalog</h2>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {content.slice(0, 6).map((c) => (
                    <li key={c.id}>{c.title}</li>
                  ))}
                </ul>
                <Button variant="secondary" href="/watch" className="mt-6">
                  Open Watch
                </Button>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
