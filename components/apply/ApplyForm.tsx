"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  leagueSport: "",
  yearsPlayed: "",
  city: "",
  servicesOffered: "",
  topics: "",
  bio: "",
  socialLinks: "",
  videoIntroUrl: "",
  availability: "",
  pricingRange: "",
};

export default function ApplyForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setStatus("done");
      setMessage(data.application?.id ?? "Submitted");
      setForm(initial);
    } catch {
      setStatus("error");
      setMessage("Could not submit. Try again.");
    }
  }

  const field =
    "mt-1.5 h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 text-white outline-none placeholder:text-white/35 focus:border-accent/40 focus:ring-2 focus:ring-accent/25";
  const label = "text-xs font-medium text-white/50";

  return (
    <GlassCard hover={false} className="p-6 sm:p-10">
      <form onSubmit={(e) => void onSubmit(e)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={label}>Full name</span>
            <input
              required
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              className={field}
            />
          </label>
          <label className="block">
            <span className={label}>Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={field}
            />
          </label>
          <label className="block">
            <span className={label}>Phone</span>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className={field}
            />
          </label>
          <label className="block">
            <span className={label}>League / sport</span>
            <input
              required
              value={form.leagueSport}
              onChange={(e) => setForm((f) => ({ ...f, leagueSport: e.target.value }))}
              className={field}
              placeholder="e.g. NFL · CB"
            />
          </label>
          <label className="block">
            <span className={label}>Years played</span>
            <input
              required
              value={form.yearsPlayed}
              onChange={(e) => setForm((f) => ({ ...f, yearsPlayed: e.target.value }))}
              className={field}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className={label}>City</span>
            <input
              required
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className={field}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className={label}>Services offered</span>
            <textarea
              required
              rows={2}
              value={form.servicesOffered}
              onChange={(e) => setForm((f) => ({ ...f, servicesOffered: e.target.value }))}
              className={`${field} h-auto min-h-[3rem] py-3`}
              placeholder="Speaking, training, mentoring, appearances…"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className={label}>Topics</span>
            <textarea
              required
              rows={2}
              value={form.topics}
              onChange={(e) => setForm((f) => ({ ...f, topics: e.target.value }))}
              className={`${field} h-auto min-h-[3rem] py-3`}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className={label}>Bio</span>
            <textarea
              required
              rows={4}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className={`${field} h-auto py-3`}
            />
          </label>
          <label className="block">
            <span className={label}>Social links</span>
            <input
              value={form.socialLinks}
              onChange={(e) => setForm((f) => ({ ...f, socialLinks: e.target.value }))}
              className={field}
            />
          </label>
          <label className="block">
            <span className={label}>Video intro URL</span>
            <input
              value={form.videoIntroUrl}
              onChange={(e) => setForm((f) => ({ ...f, videoIntroUrl: e.target.value }))}
              className={field}
            />
          </label>
          <label className="block">
            <span className={label}>Availability</span>
            <input
              required
              value={form.availability}
              onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value }))}
              className={field}
            />
          </label>
          <label className="block">
            <span className={label}>Preferred pricing range</span>
            <input
              required
              value={form.pricingRange}
              onChange={(e) => setForm((f) => ({ ...f, pricingRange: e.target.value }))}
              className={field}
              placeholder="e.g. $5k–$12k"
            />
          </label>
        </div>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-sm ${status === "done" ? "text-emerald-400" : "text-red-400"}`}
          >
            {status === "done" ? `Application received: ${message}` : message}
          </motion.p>
        )}

        <Button type="submit" variant="primary" disabled={status === "loading"}>
          {status === "loading" ? "Submitting…" : "Submit application"}
        </Button>
      </form>
    </GlassCard>
  );
}
