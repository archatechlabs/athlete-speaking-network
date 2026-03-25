"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-white border-transparent hover:bg-accent-hover btn-glow transition-all duration-300",
  secondary:
    "bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30 backdrop-blur-sm",
  ghost:
    "bg-transparent text-white/90 hover:bg-white/5 hover:text-white border border-transparent",
};

const baseStyles = `
  inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3
  font-semibold text-sm sm:text-base
  focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-navy
  disabled:opacity-50 disabled:pointer-events-none
`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", children, className = "", href, ...props }, ref) => {
    const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

    if (href) {
      return (
        <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href={href} className={styles}>
            {children}
          </Link>
        </motion.span>
      );
    }

    return (
      <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <button ref={ref} className={styles} {...props}>
          {children}
        </button>
      </motion.span>
    );
  }
);

Button.displayName = "Button";

export default Button;
