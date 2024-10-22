"use client";

import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Header({ title, subtitle, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center space-y-2"
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-slate-400" />
          <h1 className="text-xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
            {title}
          </h1>
          <Sparkles className="w-6 h-6 text-slate-400" />
        </div>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs text-gray-400 max-w-md text-center"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
      <motion.div
        className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </header>
  );
}
