"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useDeviceTier } from "@/hooks/use-device-tier";

type TrailPoint = {
  id: number;
  x: number;
  y: number;
};

export function CustomCursor() {
  const { isMobile, reduceMotion } = useDeviceTier();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    let nextId = 0;
    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });

      if (reduceMotion) {
        return;
      }

      setTrail((current) =>
        [...current, { id: nextId++, x: event.clientX, y: event.clientY }].slice(
          -siteConfig.cursorTrailCount.desktop,
        ),
      );
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isMobile, reduceMotion]);

  if (isMobile) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {trail.map((point) => (
        <motion.span
          key={point.id}
          className="absolute h-2.5 w-2.5 rounded-full bg-accent/70"
          initial={{ x: point.x - 5, y: point.y - 5, opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      <motion.div
        animate={{ x: position.x - 18, y: position.y - 18 }}
        transition={{ type: "spring", stiffness: 520, damping: 28, mass: 0.2 }}
        className="absolute h-9 w-9 rounded-full border border-accent/70 bg-accent/10 shadow-glow"
      />
      <motion.div
        animate={{ x: position.x - 4, y: position.y - 4 }}
        transition={{ type: "spring", stiffness: 720, damping: 38, mass: 0.12 }}
        className="absolute h-2 w-2 rounded-full bg-accent shadow-glow-strong"
      />
    </div>
  );
}
