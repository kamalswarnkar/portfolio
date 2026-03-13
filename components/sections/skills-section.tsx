"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillModal } from "@/components/ui/skill-modal";
import { alienSkills } from "@/data/portfolio-data";

export const SkillsSection = forwardRef<HTMLElement, {}>(function SkillsSection(_props, ref) {
  const [selectedSkill, setSelectedSkill] = useState<(typeof alienSkills)[number] | null>(null);

  return (
    <section id="skills" ref={ref} className="scroll-mt-24 pt-8">
      <SectionHeading
        eyebrow="Alien DNA Selection"
        title="Ability Matrix"
        description="Each core skill is treated like an Omnitrix transformation, with a different engineering advantage ready to deploy."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {alienSkills.map((item, index) => (
          <motion.button
            key={item.alien}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -8, boxShadow: "0 0 30px rgba(57,255,20,0.25)" }}
            onClick={() => setSelectedSkill(item)}
            className="panel-frame clip-corners group relative flex aspect-square flex-col items-center justify-center rounded-[2rem] p-6 text-center"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-70`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_30%)]" />
            <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-full border border-accent/35 bg-black/45 shadow-glow transition group-hover:scale-105">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/50 bg-accent/10">
                <div className="h-8 w-8 rotate-45 border-x-4 border-y-4 border-accent shadow-glow" />
              </div>
            </div>
            <p className="relative z-10 text-sm uppercase tracking-[0.45em] text-accent/72">
              {item.alien}
            </p>
            <h3 className="relative z-10 mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white">
              {item.skill}
            </h3>
            <p className="relative z-10 mt-4 max-w-xs text-base text-white/70">{item.summary}</p>
            <p className="relative z-10 mt-4 max-w-[14rem] text-xs uppercase tracking-[0.22em] text-white/50">
              {item.signature}
            </p>
          </motion.button>
        ))}
      </div>

      <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
    </section>
  );
});
