"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

type Tab =
  | "overview"
  | "bookings"
  | "services"
  | "content"
  | "profile"
  | "earnings"
  | "messages";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "bookings", label: "Bookings" },
  { id: "services", label: "Services" },
  { id: "content", label: "Content" },
  { id: "profile", label: "Profile" },
  { id: "earnings", label: "Earnings" },
  { id: "messages", label: "Messages" },
];

export default function AthleteDashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-accent">Athlete</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Dashboard</h1>
            <p className="mt-2 text-sm text-white/60">
              Manage services, inbound requests, and publishing—mock metrics below.
            </p>
          </div>
          <Button variant="secondary" href="/dashboard">
            All dashboards
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <GlassCard hover={false} className="p-5">
            <p className="text-xs text-white/45">Total bookings (mock)</p>
            <p className="mt-1 text-2xl font-bold text-white">12</p>
          </GlassCard>
          <GlassCard hover={false} className="p-5">
            <p className="text-xs text-white/45">Pending requests</p>
            <p className="mt-1 text-2xl font-bold text-white">3</p>
          </GlassCard>
          <GlassCard hover={false} className="p-5">
            <p className="text-xs text-white/45">Content views</p>
            <p className="mt-1 text-2xl font-bold text-white">18.4k</p>
          </GlassCard>
          <GlassCard hover={false} className="p-5">
            <p className="text-xs text-white/45">Est. earnings (MTD)</p>
            <p className="mt-1 text-2xl font-bold text-white">$42k</p>
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
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-8"
          >
            <GlassCard hover={false} className="p-8">
              <h2 className="text-lg font-semibold capitalize text-white">{tab}</h2>
              <p className="mt-3 text-sm text-white/60">
                {tab === "overview" &&
                  "Snapshot of bookings, training requests, and subscriber activity—wire to live analytics."}
                {tab === "bookings" && "Accept or decline inbound requests; syncs with the same mock API orgs use."}
                {tab === "services" && "Configure speaking, training, mentoring, appearances, and sponsorship packages."}
                {tab === "content" && "Upload drafts, schedule drops to Watch, and track completion rates."}
                {tab === "profile" && "Bio, league, topics, verification, and media—mirrors your public /athletes/[slug] page."}
                {tab === "earnings" && "Payout schedules, holds, and fee breakdowns—ready for Stripe Connect."}
                {tab === "messages" && "Secure threads with organizations and subscribers."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="primary" href="/apply">
                  Update application
                </Button>
                <Button variant="secondary" href="/watch">
                  Preview Watch
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
