"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type GlassCardProps = HTMLMotionProps<"div"> & {
  hover?: boolean;
};

export default function GlassCard({
  className,
  children,
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      initial={false}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "glass rounded-2xl p-6 shadow-glow/20 transition-shadow duration-300",
        hover && "hover:border-accent/30 hover:shadow-glow",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
