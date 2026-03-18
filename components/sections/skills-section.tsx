"use client";

import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillWatches } from "@/data/portfolio-data";

export const SkillsSection = forwardRef<HTMLElement, {}>(function SkillsSection(_props, ref) {
  const primaryWatches = skillWatches.slice(0, 3);
  const secondaryWatches = skillWatches.slice(3);

  return (
    <section id="skills" ref={ref} className="scroll-mt-24 pt-8">
      <SectionHeading eyebrow="Alien DNA Selection" title="Omnitrix Skill Vault" />

      <div className="mt-10 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {primaryWatches.map((watch, index) => (
            <SkillWatchCard
              key={watch.category}
              category={watch.category}
              style={watch.style}
              accent={watch.accent}
              ringClass={watch.ringClass}
              skills={watch.skills}
              delay={index * 0.08}
            />
          ))}
        </div>

        <div className="mx-auto grid max-w-[58rem] gap-6 md:grid-cols-2 xl:max-w-[44rem]">
          {secondaryWatches.map((watch, index) => (
            <SkillWatchCard
              key={watch.category}
              category={watch.category}
              style={watch.style}
              accent={watch.accent}
              ringClass={watch.ringClass}
              skills={watch.skills}
              delay={(primaryWatches.length + index) * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

function SkillWatchCard({
  category,
  style,
  accent,
  ringClass,
  skills,
  delay,
}: {
  category: string;
  style: string;
  accent: string;
  ringClass: string;
  skills: string[];
  delay: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % skills.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [skills.length]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
      className="panel-frame clip-corners relative overflow-hidden rounded-[2rem] p-5 sm:p-6"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-70`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-accent/66">{style}</p>
            {/* Reduced heading size on mobile to prevent overflow */}
            <h3 className="mt-3 font-display text-xl uppercase tracking-[0.1em] text-white sm:text-2xl sm:tracking-[0.12em]">
              {category}
            </h3>
          </div>
        </div>

        {/* Dial: smaller on mobile (h-40 w-40), larger on sm+ (h-52 w-52) */}
        <div className="mt-6 flex items-center justify-center">
          <div className={`relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] bg-black/55 sm:h-52 sm:w-52 ${ringClass}`}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-0 rounded-full"
            >
              <div className="absolute inset-[1rem] rounded-full border border-white/10" />
              <div className="absolute inset-[2rem] rounded-full border border-accent/25" />
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  key={`${category}-tick-${index}`}
                  className="absolute left-1/2 top-1/2 h-1 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/65 sm:w-6"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${index * 30}deg) translateY(-3.8rem)`,
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              key={`${category}-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-accent/35 bg-[radial-gradient(circle,rgba(57,255,20,0.28),rgba(0,0,0,0.92)_72%)] px-2 text-center shadow-[0_0_34px_rgba(57,255,20,0.2)] sm:h-28 sm:w-28 sm:px-4"
            >
              <span className="text-sm font-semibold uppercase leading-tight tracking-[0.14em] text-white sm:text-base sm:tracking-[0.18em]">
                {skills[activeIndex]}
              </span>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={`${category}-${skill}`}
              className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition sm:py-2 ${
                index === activeIndex
                  ? "border-accent bg-accent text-black shadow-glow"
                  : "border-accent/16 bg-black/30 text-white/62"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
