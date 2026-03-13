"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig, type SectionId } from "@/lib/site-config";

export function GridHologram({ activeSection }: { activeSection: SectionId }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, -120]);
  const opacity = activeSection === "hero" ? 0.2 : 0.28;

  return (
    <motion.div
      style={{ y, opacity, ["--grid-opacity" as string]: siteConfig.gridOpacity }}
      className="grid-mask absolute inset-0 [transform:perspective(1200px)_rotateX(70deg)_scale(1.6)]"
    />
  );
}
