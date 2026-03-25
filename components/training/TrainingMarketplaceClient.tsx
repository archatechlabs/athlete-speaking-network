"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getTrainingWithAthletes } from "@/lib/data";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function TrainingMarketplaceClient() {
  const [q, setQ] = useState("");
  const [sport, setSport] = useState("all");
  const [age, setAge] = useState("all");
  const [type, setType] = useState("all");
  const [format, setFormat] = useState("all");
  const [maxPrice, setMaxPrice] = useState("any");

  const rows = useMemo(() => getTrainingWithAthletes(), []);

  const sports = useMemo(
    () => Array.from(new Set(rows.map((r) => r.program.sport))).sort(),
    [rows]
  );

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return rows.filter(({ program, athlete }) => {
      if (t) {
        const hay = `${program.title} ${program.description} ${athlete.name} ${program.sport}`.toLowerCase();
        if (!hay.includes(t)) return false;
      }
      if (sport !== "all" && program.sport !== sport) return false;
      if (format === "virtual" && program.format !== "virtual" && program.format !== "both")
        return false;
      if (format === "in-person" && program.format !== "in-person" && program.format !== "both")
        return false;
      if (type !== "all" && program.skillLevel !== type) return false;
      if (age !== "all" && !program.ageGroup.includes(age)) return false;
      if (maxPrice === "under2k" && program.price >= 2000) return false;
      if (maxPrice === "2to3k" && (program.price < 2000 || program.price > 3000)) return false;
      if (maxPrice === "over3k" && program.price <= 3000) return false;
      return true;
    });
  }, [rows, q, sport, age, type, format, maxPrice]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <GlassCard className="p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="relative lg:col-span-2">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search programs or athletes…"
              className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] py-3 pl-10 pr-4 text-white placeholder:text-white/40 outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50" htmlFor="ts">
              Sport
            </label>
            <select
              id="ts"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/15 bg-navy-light px-3 text-sm text-white outline-none"
            >
              <option value="all">All</option>
              {sports.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50" htmlFor="age">
              Age group
            </label>
            <select
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/15 bg-navy-light px-3 text-sm text-white outline-none"
            >
              <option value="all">Any</option>
              <option value="10">Youth (10+)</option>
              <option value="14">Teen (14+)</option>
              <option value="16">16+</option>
              <option value="18">18+</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50" htmlFor="sk">
              Skill level
            </label>
            <select
              id="sk"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/15 bg-navy-light px-3 text-sm text-white outline-none"
            >
              <option value="all">Any</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All levels">All levels</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50" htmlFor="fmt">
              Format
            </label>
            <select
              id="fmt"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/15 bg-navy-light px-3 text-sm text-white outline-none"
            >
              <option value="all">Any</option>
              <option value="virtual">Virtual</option>
              <option value="in-person">In-person</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50" htmlFor="pr">
              Price
            </label>
            <select
              id="pr"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/15 bg-navy-light px-3 text-sm text-white outline-none"
            >
              <option value="any">Any</option>
              <option value="under2k">Under $2k</option>
              <option value="2to3k">$2k – $3k</option>
              <option value="over3k">$3k+</option>
            </select>
          </div>
        </div>
      </GlassCard>

      <p className="mt-6 text-sm text-white/50">{filtered.length} programs</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(({ program, athlete }, i) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="flex h-full flex-col p-6">
              <p className="text-xs font-medium text-accent">{athlete.name}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{program.title}</h3>
              <p className="mt-2 flex-1 text-sm text-white/65">{program.description}</p>
              <p className="mt-4 text-xs text-white/45">
                {program.duration} · {program.skillLevel} · {program.ageGroup} · {program.format}
              </p>
              <p className="mt-2 text-lg font-bold text-white">{money.format(program.price)}</p>
              <Button
                variant="primary"
                href={`/book/${athlete.slug}?service=training`}
                className="mt-4 w-full !py-2.5"
              >
                Request program
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
