"use client";

import { motion } from "framer-motion";
import { ParticleField } from "@/components/background/particle-field";
import { GridHologram } from "@/components/background/grid-hologram";
import { EnergyWaves } from "@/components/background/energy-waves";
import { ScanningLines } from "@/components/background/scanning-lines";
import type { SectionId } from "@/lib/site-config";
import { OmnitrixPortal } from "@/components/background/omnitrix-portal";
import { AlienXField } from "@/components/background/alien-x-field";
import { AlienMotifs } from "@/components/background/alien-motifs";

export function BackgroundSystem({
  activeSection,
  pulseKey,
  phase,
}: {
  activeSection: SectionId;
  pulseKey: number;
  phase: "idle" | "transforming" | "active";
}) {
  const showLiveBackground = phase !== "transforming";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AlienXField />
      <AlienMotifs active={phase !== "transforming"} />
      <OmnitrixPortal phase={phase} />
      {showLiveBackground ? <ParticleField /> : null}
      {showLiveBackground ? <GridHologram activeSection={activeSection} /> : null}
      <EnergyWaves phase={phase} />
      <ScanningLines />
      <motion.div
        key={pulseKey}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.25),transparent_36%)]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: phase === "transforming" ? [0, 1, 0] : [0, 0.65, 0],
          scale: phase === "transforming" ? [0.35, 1.5, 2.2] : [0.5, 1.3, 1.85],
        }}
        transition={{ duration: phase === "transforming" ? 1.4 : 0.9, ease: "easeOut" }}
      />
    </div>
  );
}
