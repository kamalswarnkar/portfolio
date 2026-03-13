"use client";

import { motion } from "framer-motion";

export function OmnitrixPortal({
  phase,
}: {
  phase: "idle" | "transforming" | "active";
}) {
  const isIdle = phase === "idle";

  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/18"
        animate={{
          scale: isIdle ? [0.96, 1.02, 0.96] : [1, 1.08, 1],
          opacity: isIdle ? 0.3 : 0.15,
        }}
        transition={{ duration: isIdle ? 4 : 2.4, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[12px] border-black/60"
        animate={{ rotate: isIdle ? 360 : 90 }}
        transition={{ duration: isIdle ? 18 : 3.2, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(57,255,20,0) 0deg, rgba(57,255,20,0.55) 42deg, rgba(57,255,20,0) 72deg, rgba(57,255,20,0) 180deg, rgba(57,255,20,0.55) 222deg, rgba(57,255,20,0) 252deg)",
          boxShadow: "0 0 80px rgba(57,255,20,0.1)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.12),transparent_24%,transparent_55%,rgba(57,255,20,0.05)_72%,transparent_100%)]" />
    </div>
  );
}
