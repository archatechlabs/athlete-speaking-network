"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import type { Athlete, ServiceKind } from "@/lib/types";
import { SERVICE_LABELS } from "@/lib/data";

const eventTypes = [
  "School / University",
  "Corporate",
  "Nonprofit / Gala",
  "Conference / Summit",
  "Team / Locker room",
  "Brand / Campaign",
  "Other",
];

const SERVICE_OPTIONS: { kind: ServiceKind; label: string; hint: string }[] = [
  { kind: "speaking", label: "Speaking engagement", hint: "Keynotes, panels, workshops" },
  { kind: "training", label: "Training session", hint: "Skills, drills, team sessions" },
  { kind: "mentoring", label: "Mentorship", hint: "1:1 or small group guidance" },
  { kind: "appearance", label: "Appearance", hint: "Events, meet-and-greets, media" },
  { kind: "sponsorship", label: "Sponsorship inquiry", hint: "Partnerships & campaigns" },
  { kind: "consultation", label: "Virtual consultation", hint: "Strategy and advisory blocks" },
];

const steps = ["Service", "Details", "Review"] as const;

export default function BookingWizard({ athlete }: { athlete: Athlete }) {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") as ServiceKind | null;

  const [step, setStep] = useState(0);
  const [serviceType, setServiceType] = useState<ServiceKind | null>(null);
  const [form, setForm] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    eventType: eventTypes[0],
    date: "",
    location: "",
    virtualOrInPerson: "in-person" as "virtual" | "in-person" | "hybrid",
    budget: "",
    audienceSize: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      serviceParam &&
      athlete.servicesOffered.includes(serviceParam) &&
      serviceType === null
    ) {
      setServiceType(serviceParam);
    }
  }, [serviceParam, athlete.servicesOffered, serviceType]);

  const canService = Boolean(serviceType && athlete.servicesOffered.includes(serviceType));
  const canDetails = Boolean(
    form.organizationName.trim() &&
      form.contactName.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.date &&
      form.location.trim() &&
      form.budget.trim()
  );

  async function submit() {
    if (!serviceType) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athleteId: athlete.id,
          athleteSlug: athlete.slug,
          serviceType,
          organizationName: form.organizationName.trim(),
          contactName: form.contactName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          eventType: form.eventType,
          date: form.date,
          location: form.location.trim(),
          virtualOrInPerson: form.virtualOrInPerson,
          budget: form.budget.trim(),
          audienceSize: form.audienceSize.trim(),
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

  const stepLabels = useMemo(() => steps, []);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <GlassCard hover={false} className="mb-8 p-5 sm:p-6">
        <p className="text-sm text-white/50">Booking for</p>
        <p className="text-xl font-bold text-white">{athlete.name}</p>
        <p className="text-sm text-accent">{athlete.league}</p>
      </GlassCard>

      <div className="mb-10 flex flex-wrap gap-2">
        {stepLabels.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => {
              if (doneId) return;
              if (i === 0) setStep(0);
              if (i === 1 && canService) setStep(1);
              if (i === 2 && canService && canDetails) setStep(2);
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
              Reference <span className="font-mono text-accent">{doneId}</span>
            </p>
            <p className="mt-2 text-sm text-white/50">
              We&apos;ll route this to {athlete.name.split(" ")[0]}&apos;s team. Track requests in your
              organization dashboard.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="primary" href="/dashboard/org">
                Organization dashboard
              </Button>
              <Button variant="secondary" href={`/athletes/${athlete.slug}`}>
                Back to profile
              </Button>
              <Link
                href="/watch"
                className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover"
              >
                Watch content →
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
              <h2 className="text-xl font-semibold text-white">Choose a service</h2>
              <p className="mt-2 text-sm text-white/60">
                Select how you want to work together. Pricing is confirmed after review.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {SERVICE_OPTIONS.filter((o) => athlete.servicesOffered.includes(o.kind)).map(
                  (o) => (
                    <button
                      key={o.kind}
                      type="button"
                      onClick={() => setServiceType(o.kind)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        serviceType === o.kind
                          ? "border-accent/60 bg-accent/10 shadow-glow"
                          : "border-white/10 bg-white/[0.04] hover:border-white/20"
                      }`}
                    >
                      <p className="font-semibold text-white">{o.label}</p>
                      <p className="mt-1 text-xs text-white/50">{o.hint}</p>
                    </button>
                  )
                )}
              </div>
              <div className="mt-8 flex justify-end">
                <Button variant="primary" disabled={!canService} onClick={() => setStep(1)}>
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
                <h2 className="text-xl font-semibold text-white">Event &amp; request details</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-white/50">Organization name</span>
                    <input
                      value={form.organizationName}
                      onChange={(e) => setForm((f) => ({ ...f, organizationName: e.target.value }))}
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-white/50">Contact name</span>
                    <input
                      value={form.contactName}
                      onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-white/50">Email</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-white/50">Phone</span>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-white/50">Event / request type</span>
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
                    <span className="text-xs font-medium text-white/50">Preferred date</span>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-white/50">Format</span>
                    <select
                      value={form.virtualOrInPerson}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          virtualOrInPerson: e.target.value as typeof f.virtualOrInPerson,
                        }))
                      }
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-navy-light px-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    >
                      <option value="in-person">In-person</option>
                      <option value="virtual">Virtual</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-white/50">Location</span>
                    <input
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      placeholder="City, venue, or remote"
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none placeholder:text-white/35 focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
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
                  <label className="block">
                    <span className="text-xs font-medium text-white/50">Audience size</span>
                    <input
                      value={form.audienceSize}
                      onChange={(e) => setForm((f) => ({ ...f, audienceSize: e.target.value }))}
                      placeholder="e.g. 250"
                      className="mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none placeholder:text-white/35 focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-medium text-white/50">Goals &amp; notes</span>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      rows={4}
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 py-3 text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
                      placeholder="Outcomes, run-of-show, compliance needs…"
                    />
                  </label>
                </div>
              </GlassCard>
              {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
              <div className="mt-8 flex flex-wrap justify-between gap-3">
                <Button variant="secondary" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button variant="primary" disabled={!canDetails} onClick={() => setStep(2)}>
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
                <h2 className="text-xl font-semibold text-white">Review request</h2>
                <dl className="mt-6 space-y-3 text-sm text-white/75">
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Service</dt>
                    <dd className="text-right font-medium text-white">
                      {serviceType ? SERVICE_LABELS[serviceType] : "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Athlete</dt>
                    <dd className="text-right text-white">{athlete.name}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Organization</dt>
                    <dd className="text-right">{form.organizationName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Contact</dt>
                    <dd className="text-right">
                      {form.contactName} · {form.email} · {form.phone}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Event type</dt>
                    <dd className="text-right">{form.eventType}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Date</dt>
                    <dd className="text-right">{form.date}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Format</dt>
                    <dd className="text-right capitalize">{form.virtualOrInPerson}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Location</dt>
                    <dd className="text-right">{form.location}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Budget</dt>
                    <dd className="text-right">{form.budget}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-white/45">Audience</dt>
                    <dd className="text-right">{form.audienceSize || "—"}</dd>
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
