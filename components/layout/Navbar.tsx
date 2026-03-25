"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { useRole } from "@/contexts/RoleContext";
import type { UserRole } from "@/lib/types";

const navLinks = [
  { href: "/athletes", label: "Athletes" },
  { href: "/watch", label: "Watch" },
  { href: "/training", label: "Training" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/appearances", label: "Brands" },
  { href: "/apply", label: "Apply" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#how-it-works", label: "How it works" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role, setRole } = useRole();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-navy/80 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="flex min-h-[44px] min-w-0 items-center text-xl font-bold leading-tight tracking-tight text-white transition hover:text-accent"
        >
          Athlete Network
        </Link>

        <div className="hidden items-center gap-4 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <label className="sr-only" htmlFor="nav-role">
            Role (mock)
          </label>
          <select
            id="nav-role"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="h-9 max-w-[9.5rem] rounded-lg border border-white/15 bg-navy-light/90 px-2 text-xs font-medium text-white outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/25"
          >
            <option value="subscriber">Subscriber</option>
            <option value="organization">Organization</option>
            <option value="athlete">Athlete</option>
            <option value="admin">Admin</option>
          </select>
          <Button variant="primary" href="/athletes">
            Book
          </Button>
        </div>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-white/80 hover:bg-white/10 xl:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-primary-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-primary-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-h-[min(80vh,calc(100dvh-5rem))] overflow-y-auto overscroll-contain border-t border-white/5 bg-navy/95 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="min-h-[48px] rounded-lg px-4 py-3 text-base text-white/90 active:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 py-2">
                <label className="text-xs text-white/45" htmlFor="nav-role-mobile">
                  Role (mock)
                </label>
                <select
                  id="nav-role-mobile"
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="mt-1 h-11 w-full rounded-xl border border-white/15 bg-navy-light px-3 text-sm text-white outline-none"
                >
                  <option value="subscriber">Subscriber</option>
                  <option value="organization">Organization</option>
                  <option value="athlete">Athlete</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="pt-2">
                <Link
                  href="/athletes"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-accent px-6 text-base font-semibold text-white active:bg-accent-hover"
                >
                  Book
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
