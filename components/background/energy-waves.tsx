"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export function EnergyWaves({
  phase,
}: {
  phase: "idle" | "transforming" | "active";
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{
            scale: phase === "transforming" ? [0.2, 1.5, 2.4] : [0.4, 1.2, 1.85],
            opacity: phase === "idle" ? [0, 0.12, 0] : [0, 0.22, 0],
          }}
          transition={{
            duration: phase === "transforming" ? 1.8 : siteConfig.pulseFrequencyMs / 1000,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 1.6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
