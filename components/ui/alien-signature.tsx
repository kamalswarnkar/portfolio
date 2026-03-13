"use client";

import { motion } from "framer-motion";

export function AlienSignature({
  alien,
  vibe,
  accent,
  compact = false,
}: {
  alien: string;
  vibe: string;
  accent: string;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className={`relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/28 ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="relative z-10">
        <p className="text-[11px] uppercase tracking-[0.34em] text-accent/75">{alien}</p>
        <p className={`mt-2 ${compact ? "text-sm" : "text-base"} uppercase tracking-[0.14em] text-white/88`}>
          {vibe}
        </p>
      </div>
    </motion.div>
  );
}
