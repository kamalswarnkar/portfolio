"use client";

import { forwardRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { introData } from "@/data/portfolio-data";

export const AboutSection = forwardRef<HTMLElement, { isActivated: boolean }>(function AboutSection(
  { isActivated },
  ref,
) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      className="scroll-mt-24 pt-8"
    >
      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <SectionHeading eyebrow={introData.badge} title="Brief Intro" />

        <motion.div
          animate={isActivated ? { boxShadow: "0 0 44px rgba(57,255,20,0.18)" } : {}}
          className="panel-frame clip-corners relative overflow-hidden rounded-[2rem] p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.15),transparent_44%)]" />
          <div className="relative z-10 grid gap-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.42em] text-accent/72">Core Transmission</p>
              <h3 className="max-w-3xl font-display text-3xl uppercase tracking-[0.12em] text-white md:text-4xl">
                {introData.title}
              </h3>
            </div>

            <div
              data-cursor-mode="omnitrix"
              onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setSpotlight({
                  x: ((event.clientX - rect.left) / rect.width) * 100,
                  y: ((event.clientY - rect.top) / rect.height) * 100,
                });
              }}
              className="omnitrix-spotlight panel-frame relative min-h-[19rem] rounded-[1.75rem] border border-accent/24 bg-black/35 p-6 md:p-7"
              style={
                {
                  "--spotlight-x": `${spotlight.x}%`,
                  "--spotlight-y": `${spotlight.y}%`,
                } as CSSProperties
              }
            >
              <p className="pointer-events-none absolute inset-0 z-[1] max-w-2xl p-6 text-xl leading-relaxed text-white/78 md:p-7 md:text-2xl">
                {introData.summary}
              </p>
              <div className="omnitrix-text-cover pointer-events-none absolute inset-0 z-[2]" />
              <p className="omnitrix-hidden-text pointer-events-none absolute inset-0 z-[3] max-w-2xl p-6 text-xl leading-relaxed md:p-7 md:text-2xl">
                {introData.hiddenText}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {introData.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-accent/28 bg-accent/10 px-4 py-2 text-sm uppercase tracking-[0.2em] text-accent"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});
