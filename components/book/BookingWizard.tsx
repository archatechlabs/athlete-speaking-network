"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { athletes } from "@/lib/mock/athletes";
import type { Athlete } from "@/lib/types";

const eventTypes = [
  "School / University",
  "Corporate",
  "Nonprofit / Gala",
  "Conference / Summit",
  "Team / Locker room",
  "Other",
];

const steps = ["Select athlete", "Event details", "Review & submit"] as const;

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("athlete");

  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(preselect);
  const [form, setForm] = useState({
    organizationName: "",
    eventType: eventTypes[0],
    date: "",
    budget: "",
    location: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(
    () => athletes.find((a) => a.id === selectedId) ?? null,
    [selectedId]
  );

  const canLeaveAthleteStep = Boolean(selectedId);
  const canLeaveFormStep = Boolean(
    form.organizationName.trim() &&
      form.date &&
      form.budget.trim() &&
      form.location.trim()
  );

  async function submit() {
    if (!selectedId) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athleteId: selectedId,
          organizationName: form.organizationName.trim(),
          eventType: form.eventType,
          date: form.date,
          budget: form.budget.trim(),
          location: form.location.trim(),
          notes: form.notes.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setDoneId(data.booking?.id ?? "confirmed");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-wrap gap-2">
        {steps.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              if (doneId) return;
              if (i === 0) setStep(0);
              if (i === 1 && canLeaveAthleteStep) setStep(1);
              if (i === 2 && canLeaveAthleteStep && canLeaveFormStep) setStep(2);
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              i === step
                ? "bg-accent text-white shadow-glow"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      {doneId ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <GlassCard hover={false} className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white">Request received</h2>
            <p className="mt-3 text-white/70">
              Booking ID <span className="font-mono text-accent">{doneId}</span> saved to
              the mock API store.
            </p>
            <p className="mt-2 text-sm text-white/50">
              Visible under Bookings in your dashboard (GET /api/bookings).
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="primary" href="/dashboard">
                View dashboard
              </Button>
              {selected && (
                <Button variant="secondary" href={`/athletes/${selected.id}`}>
                  Back to profile
                </Button>
              )}
              <Link
                href="/watch"
                className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover"
              >
                Watch more talks →
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-semibold text-white">Select an athlete</h2>
              <p className="mt-2 text-sm text-white/60">
                Profiles include streamable talks—preview their voice before you request a
                date.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {athletes.map((a: Athlete) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedId(a.id)}
                    className={`flex gap-4 rounded-2xl border p-4 text-left transition ${
                      selectedId === a.id
                        ? "border-accent/60 bg-accent/10 shadow-glow"
                        : "border-white/10 bg-white/[0.04] hover:border-white/20"
                    }`}
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={a.image} alt="" fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white">{a.name}</p>
                      <p className="text-xs text-accent">{a.sport}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-white/50">{a.bio}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end gap-3">
                <Button variant="primary" disabled={!canLeaveAthleteStep} onClick={() => setStep(1)}>
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
            >
              <GlassCard hover={false} className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-white">Event details</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-white/50">Organization name</span>
                    <input
                      value={form.organizationName}
                      onChange={(e) => setForm((f) => ({ ...f, organizationName: e.target.value }))}
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-white/50">Event type</span>
                    <select
                      value={form.eventType}
                      onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-navy-light px-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    >
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-white/50">Date</span>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-white/50">Budget</span>
                    <input
                      value={form.budget}
                      onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                      placeholder="e.g. $15,000"
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none placeholder:text-white/35 focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-white/50">Location</span>
                    <input
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-white/50">Notes</span>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      rows={4}
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 py-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                      placeholder="Audience, run-of-show, goals…"
                    />
                  </label>
                </div>
              </GlassCard>
              {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
              <div className="mt-8 flex flex-wrap justify-between gap-3">
                <Button variant="secondary" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  disabled={!canLeaveFormStep}
                  onClick={() => setStep(2)}
                >
                  Continue to review
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
            >
              <GlassCard hover={false} className="p-8">
                <h2 className="text-xl font-semibold text-white">Review & submit</h2>
                <dl className="mt-6 space-y-3 text-sm text-white/75">
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Athlete</dt>
                    <dd className="text-right font-medium text-white">
                      {selected?.name ?? "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Organization</dt>
                    <dd className="text-right">{form.organizationName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Event</dt>
                    <dd className="text-right">{form.eventType}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Date</dt>
                    <dd className="text-right">{form.date}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Budget</dt>
                    <dd className="text-right">{form.budget}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Location</dt>
                    <dd className="text-right">{form.location}</dd>
                  </div>
                  <div>
                    <dt className="text-white/45">Notes</dt>
                    <dd className="mt-1 text-white/80">{form.notes || "—"}</dd>
                  </div>
                </dl>
                {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="secondary" onClick={() => setStep(1)}>
                    Edit details
                  </Button>
                  <Button variant="primary" disabled={submitting} onClick={() => void submit()}>
                    {submitting ? "Submitting…" : "Submit request"}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
