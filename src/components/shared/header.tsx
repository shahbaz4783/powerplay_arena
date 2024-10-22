"use client";

import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Header({ title, subtitle, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "p-6 rounded-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-lg text-gray-300">{subtitle}</p>}
      </motion.div>
    </header>
  );
}
