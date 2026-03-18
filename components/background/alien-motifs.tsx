"use client";

import { memo } from "react";
import { motion } from "framer-motion";

export const AlienMotifs = memo(function AlienMotifs({ active = true }: { active?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-95">
      <motion.div
        className="absolute left-[5%] top-[14%] h-64 w-48"
        animate={active ? { y: [-10, 14, -10], opacity: [0.45, 0.8, 0.45] } : { opacity: 0.18 }}
        transition={{ duration: 5.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="absolute inset-x-10 bottom-0 h-40 rounded-t-[999px] bg-[linear-gradient(180deg,rgba(255,214,64,0),rgba(255,128,0,0.34),rgba(255,62,0,0.68))] blur-md" />
        {/* Reduced from 5 → 3 flame elements */}
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute bottom-8 w-8 rounded-full bg-[radial-gradient(circle,rgba(255,235,120,0.9),rgba(255,108,0,0.72),transparent_72%)]"
            style={{ left: `${18 + index * 20}%`, height: `${70 + index * 20}px` }}
            animate={{ y: [0, -(18 + index * 8), 0], scaleY: [1, 1.16, 1] }}
            transition={{ duration: 2 + index * 0.2, repeat: Number.POSITIVE_INFINITY }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute right-[7%] top-[12%] h-64 w-64"
        animate={active ? { rotate: [0, 12, 0], opacity: [0.35, 0.72, 0.35] } : { opacity: 0.14 }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        {/* Reduced from 5 → 3 crystal shards */}
        {[
          "left-6 top-10",
          "right-10 top-20",
          "left-16 bottom-10",
        ].map((slot, index) => (
          <motion.div
            key={slot}
            className={`absolute ${slot} h-16 w-16 rotate-45 border border-cyan-100/35 bg-[linear-gradient(180deg,rgba(210,255,255,0.45),rgba(90,255,230,0.18),rgba(0,0,0,0))] shadow-[0_0_18px_rgba(150,255,255,0.18)]`}
            animate={{ y: [0, index % 2 === 0 ? -10 : 10, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 3.8 + index * 0.25, repeat: Number.POSITIVE_INFINITY }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute left-[6%] bottom-[20%] h-40 w-[32rem]"
        animate={active ? { x: [-20, 36, -20], opacity: [0.28, 0.72, 0.28] } : { opacity: 0.12 }}
        transition={{ duration: 3.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="absolute h-[0.42rem] rounded-full bg-[linear-gradient(90deg,transparent,rgba(120,255,120,0.05),rgba(120,255,120,0.95),transparent)] blur-[1px]"
            style={{
              left: `${index * 14}%`,
              top: `${18 + index * 11}%`,
              width: `${140 + index * 36}px`,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute right-[8%] bottom-[12%] h-72 w-56"
        animate={active ? { y: [16, -18, 16], opacity: [0.26, 0.58, 0.26] } : { opacity: 0.1 }}
        transition={{ duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),rgba(170,150,255,0.12)_28%,rgba(74,28,110,0.15)_48%,transparent_74%)] blur-xl" />
        {/* Reduced from 4 → 3 aurora beams */}
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2 h-28 w-10 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(163,132,255,0.12),transparent)] blur-md"
            style={{
              transform: `translate(-50%, -50%) rotate(${index * 28 - 28}deg) translateY(${30 + index * 10}px)`,
            }}
            animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.18, 0.5, 0.18] }}
            transition={{ duration: 3.8 + index * 0.35, repeat: Number.POSITIVE_INFINITY }}
          />
        ))}
      </motion.div>
    </div>
  );
});
