"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import type { StoredBooking } from "@/lib/mock/bookings-store";
import type { ApplicationRecord } from "@/lib/data";
import { SERVICE_LABELS } from "@/lib/data";
import { getAthleteById } from "@/lib/mock/athletes";

type Tab =
  | "athletes"
  | "organizations"
  | "bookings"
  | "content"
  | "applications"
  | "revenue"
  | "moderation";

const tabs: { id: Tab; label: string }[] = [
  { id: "athletes", label: "Athletes" },
  { id: "organizations", label: "Organizations" },
  { id: "bookings", label: "Bookings" },
  { id: "content", label: "Content" },
  { id: "applications", label: "Applications" },
  { id: "revenue", label: "Revenue" },
  { id: "moderation", label: "Moderation" },
];

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<Tab>("bookings");
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [bRes, aRes] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/applications"),
        ]);
        const bData = await bRes.json();
        const aData = await aRes.json();
        if (!cancelled && bRes.ok && Array.isArray(bData.bookings)) {
          setBookings(bData.bookings);
        }
        if (!cancelled && aRes.ok && Array.isArray(aData.applications)) {
          setApplications(aData.applications);
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute left-1/2 top-32 h-80 w-80 -translate-x-1/2 rounded-full bg-red-500/5 blur-[100px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-red-400/90">Admin</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Operations</h1>
            <p className="mt-2 text-sm text-white/60">
              Internal console mock—bookings and applications read from session APIs.
            </p>
          </div>
          <Button variant="secondary" href="/dashboard">
            Hub
          </Button>
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
              className="mt-8 space-y-4"
            >
              {bookings.map((b) => {
                const athlete = getAthleteById(b.athleteId);
                return (
                  <GlassCard key={b.id} hover={false} className="p-5">
                    <p className="font-mono text-xs text-accent">{b.id}</p>
                    <p className="mt-1 text-sm text-white">
                      {SERVICE_LABELS[b.serviceType]} · {athlete?.name}
                    </p>
                    <p className="text-xs text-white/45">{b.organizationName}</p>
                  </GlassCard>
                );
              })}
              {bookings.length === 0 && (
                <GlassCard hover={false} className="p-8 text-white/50">
                  No bookings in this server session.
                </GlassCard>
              )}
            </motion.div>
          )}

          {tab === "applications" && (
            <motion.div
              key="applications"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-4"
            >
              {applications.map((a) => (
                <GlassCard key={a.id} hover={false} className="p-5">
                  <p className="font-mono text-xs text-accent">{a.id}</p>
                  <p className="mt-1 font-medium text-white">{a.fullName}</p>
                  <p className="text-sm text-white/55">
                    {a.leagueSport} · {a.status}
                  </p>
                  <p className="mt-2 text-xs text-white/40">{a.email}</p>
                </GlassCard>
              ))}
            </motion.div>
          )}

          {tab !== "bookings" && tab !== "applications" && (
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <GlassCard hover={false} className="p-8 text-white/60">
                <span className="capitalize">{tab}</span> tools—connect CRM, billing, and moderation
                queues here.
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
