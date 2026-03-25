"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { useRole } from "@/contexts/RoleContext";
import Button from "@/components/ui/Button";

const dashboards = [
  {
    href: "/dashboard/athlete",
    title: "Athlete",
    desc: "Bookings, services, content, earnings, and messages.",
    roles: "athlete · admin",
  },
  {
    href: "/dashboard/org",
    title: "Organization",
    desc: "Requests, bookings, saved athletes, and licensed content.",
    roles: "organization · admin",
  },
  {
    href: "/dashboard/admin",
    title: "Admin",
    desc: "Athletes, orgs, applications, revenue, and moderation.",
    roles: "admin",
  },
];

export default function DashboardHubPage() {
  const { role } = useRole();

  return (
    <div className="relative min-h-screen overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-24">
      <div className="pointer-events-none absolute right-10 top-28 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Dashboard</h1>
        <p className="mt-2 text-sm text-white/60">
          Mock session role: <span className="capitalize text-white/80">{role}</span>. Open the view
          that matches your workflow—auth will route these automatically later.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {dashboards.map((d, i) => (
            <motion.div
              key={d.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={d.href} className="block h-full">
                <GlassCard className="flex h-full flex-col p-6 transition hover:border-accent/35">
                  <h2 className="text-lg font-semibold text-white">{d.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-white/60">{d.desc}</p>
                  <p className="mt-4 text-xs text-white/35">{d.roles}</p>
                  <span className="mt-4 text-sm font-medium text-accent">Open →</span>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="secondary" href="/athletes">
            Marketplace
          </Button>
          <Button variant="primary" href="/apply">
            Apply as athlete
          </Button>
        </div>
      </div>
    </div>
  );
}
