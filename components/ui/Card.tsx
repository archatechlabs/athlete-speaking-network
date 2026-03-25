"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
  glass = true,
}: CardProps) {
  const baseStyles = glass
    ? "bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
    : "bg-navy-light/80 border border-white/5 rounded-2xl";

  if (hover) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${baseStyles} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={`${baseStyles} ${className}`}>{children}</div>;
}
