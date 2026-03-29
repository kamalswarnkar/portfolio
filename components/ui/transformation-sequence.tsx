"use client";

import { motion } from "framer-motion";

export function TransformationSequence({ duration = 2.7 }: { duration?: number }) {
  // Detect mobile to reduce animation complexity
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const rayCount = isMobile ? 6 : 12;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.95),rgba(57,255,20,0.4)_18%,rgba(6,18,6,0.96)_44%,#000_70%)]"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.2, 0.72, 1.08, 1.52, 2.05, 2.7], opacity: [0, 0.28, 0.65, 1, 0.72, 0] }}
        transition={{ duration, ease: [0.22, 0.8, 0.2, 1] }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-accent/85"
        initial={{ scale: 0.25, opacity: 0.9 }}
        animate={{ scale: [0.18, 0.46, 0.92, 1.3, 2.05, 3.15], opacity: [0.35, 0.75, 1, 0.72, 0.38, 0] }}
        transition={{ duration: duration * 0.94, ease: "easeOut" }}
      />

      {/* Reduced ray count on mobile for performance */}
      {Array.from({ length: rayCount }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute left-1/2 top-1/2 h-[28rem] w-[0.4rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-accent to-transparent"
          initial={{ rotate: index * (360 / rayCount), scaleY: 0, opacity: 0 }}
          animate={{ rotate: index * (360 / rayCount) + 28, scaleY: [0, 0.5, 1.15, 1.35, 0], opacity: [0, 0.3, 0.82, 0.95, 0] }}
          transition={{ duration: duration * 0.7, delay: duration * 0.08, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 h-[10rem] w-[10rem] -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.4, rotate: 0, opacity: 0 }}
        animate={{ scale: [0.16, 0.48, 0.9, 1.08, 1.22, 1.52], rotate: [0, 42, 124, 188, 240, 300], opacity: [0, 0.7, 1, 1, 0.65, 0] }}
        transition={{ duration: duration * 0.94, ease: "easeInOut" }}
      >
        <div className="relative h-full w-full rounded-full border-[8px] border-black/70 bg-accent/18 shadow-[0_0_60px_rgba(57,255,20,0.5)]">
          <div className="absolute left-1/2 top-1/2 h-[72%] w-[18%] -translate-x-1/2 -translate-y-1/2 bg-accent" />
          <div className="absolute left-1/2 top-[16%] h-[30%] w-[52%] -translate-x-1/2 rotate-45 bg-black" />
          <div className="absolute bottom-[16%] left-1/2 h-[30%] w-[52%] -translate-x-1/2 -rotate-45 bg-black" />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.18, 0.42, 0.76, 0.4, 0] }}
        transition={{ duration: duration * 0.94 }}
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(57,255,20,0.25) 0 4px, transparent 4px 12px)",
        }}
      />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(170,255,155,1),rgba(117,255,82,0.82)_12%,rgba(57,255,20,0.46)_22%,transparent_42%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.06, 0.28, 0.95, 0.62, 0] }}
        transition={{ duration: duration * 0.9, times: [0, 0.16, 0.34, 0.52, 0.74, 1] }}
      />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.3),transparent_24%)]"
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: [0, 0.35, 0.92, 0.2, 0], scale: [0.14, 0.9, 1.75, 2.35, 3.1] }}
        transition={{ duration: duration * 0.72, delay: duration * 0.29, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(240,255,240,0.95),rgba(130,255,100,0.52)_8%,rgba(57,255,20,0)_24%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.32, 0.82, 0.18, 0] }}
        transition={{ duration: duration * 0.78, times: [0, 0.22, 0.38, 0.5, 0.72, 1] }}
      />
    </motion.div>
  );
}
