"use client";

import { forwardRef, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { introData } from "@/data/portfolio-data";

export const AboutSection = forwardRef<HTMLElement, { isActivated: boolean }>(function AboutSection(
  { isActivated },
  ref,
) {
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
          className="panel-frame clip-corners relative overflow-hidden rounded-[2rem] p-6 sm:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.15),transparent_44%)]" />
          <div className="relative z-10 grid gap-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.42em] text-accent/72">Core Transmission</p>
              <h3 className="max-w-3xl font-display text-2xl uppercase tracking-[0.1em] text-white sm:text-3xl sm:tracking-[0.12em] md:text-4xl">
                {introData.title}
              </h3>
            </div>

            {/* 
              Desktop: omnitrix spotlight (hover reveals hidden text via CSS).
              Mobile: show text directly — hover/pointer effects don't work on touch.
            */}
            <div className="relative">
              {/* Mobile-only: always-visible text */}
              <div className="block sm:hidden rounded-[1.75rem] border border-accent/24 bg-black/35 p-5 min-h-[14rem]">
                <p className="text-base leading-relaxed text-white/80">
                  {introData.summary}
                </p>
                <p className="mt-4 text-base leading-relaxed text-accent/80">
                  {introData.hiddenText}
                </p>
              </div>

              {/* Desktop-only: spotlight hover effect */}
              <div
                data-cursor-mode="omnitrix"
                onPointerMove={(event) => {
                  const el = event.currentTarget as HTMLElement;
                  const rect = el.getBoundingClientRect();
                  el.style.setProperty("--spotlight-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
                  el.style.setProperty("--spotlight-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
                }}
                className="omnitrix-spotlight panel-frame relative hidden min-h-[19rem] rounded-[1.75rem] border border-accent/24 bg-black/35 p-6 sm:block md:p-7"
                style={{ "--spotlight-x": "50%", "--spotlight-y": "50%" } as CSSProperties}
              >
                <p className="pointer-events-none absolute inset-0 z-[1] max-w-2xl p-6 text-xl leading-relaxed text-white/78 md:p-7 md:text-2xl">
                  {introData.summary}
                </p>
                <div className="omnitrix-text-cover pointer-events-none absolute inset-0 z-[2]" />
                <p className="omnitrix-hidden-text pointer-events-none absolute inset-0 z-[3] max-w-2xl p-6 text-xl leading-relaxed md:p-7 md:text-2xl">
                  {introData.hiddenText}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {introData.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-accent/28 bg-accent/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-accent sm:px-4 sm:py-2 sm:tracking-[0.2em]"
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
