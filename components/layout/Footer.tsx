import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/athletes", label: "Athletes" },
  { href: "/watch", label: "Watch" },
  { href: "/book", label: "Book" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/team", label: "Team" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
];

const socials = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Instagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-light/50 py-12 pb-[max(3rem,calc(2.5rem+env(safe-area-inset-bottom,0px)))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-white/60 transition hover:text-accent"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Athlete Speaking Network
          </p>
        </div>
      </div>
    </footer>
  );
}
