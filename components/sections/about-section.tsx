"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { AlienSignature } from "@/components/ui/alien-signature";
import { aboutData } from "@/data/portfolio-data";

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
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Human Form"
          title="Kamal Swarnkar"
          description="The default identity behind the Omnitrix interface: a computer science student focused on practical software, machine learning, and polished product execution."
        />

        <motion.div
          animate={isActivated ? { boxShadow: "0 0 40px rgba(57,255,20,0.16)" } : {}}
          className="panel-frame scan-overlay clip-corners relative rounded-[2rem] p-8"
        >
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.45em] text-accent/70">Identity File</p>
              <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.14em] text-white">
                {aboutData.role}
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-white/76">{aboutData.bio}</p>
            </div>
            <div className="space-y-4">
              {[
                ["Name", aboutData.name],
                ["Role", aboutData.role],
                ["Status", "Scanning for opportunities"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-accent/20 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-accent/60">{label}</p>
                  <p className="mt-2 text-lg uppercase tracking-[0.12em] text-white/92">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {aboutData.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm uppercase tracking-[0.22em] text-accent"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {aboutData.traits.map((trait) => (
              <AlienSignature
                key={trait.alien}
                alien={trait.alien}
                vibe={trait.vibe}
                accent={trait.accent}
                compact
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
});
