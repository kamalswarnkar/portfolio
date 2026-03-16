"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/data/portfolio-data";

export const EducationSection = forwardRef<HTMLElement, {}>(function EducationSection(_props, ref) {
  return (
    <section id="education" ref={ref} className="scroll-mt-24 pt-8">
      <SectionHeading eyebrow="Academic Sync" title="Education Archive" />

      <div className="panel-frame clip-corners relative mt-10 overflow-hidden rounded-[2rem] p-6 md:p-8">
        <div className="absolute inset-y-0 left-7 w-px bg-gradient-to-b from-accent/10 via-accent to-transparent md:left-1/2" />

        <div className="relative z-10 space-y-6">
          {education.map((item, index) => (
            <motion.article
              key={`${item.institution}-${item.degree}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative grid gap-4 md:grid-cols-2 ${index % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"}`}
            >
              <div className={index % 2 === 0 ? "md:text-right" : ""}>
                <p className="text-sm uppercase tracking-[0.35em] text-accent/72">{item.period}</p>
                <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white">
                  {item.degree}
                </h3>
                <p className="mt-3 text-base uppercase tracking-[0.18em] text-white/58">{item.score}</p>
              </div>

              <div className="rounded-[1.6rem] border border-accent/18 bg-black/34 p-5">
                <div className="flex items-center gap-3 text-accent">
                  <GraduationCap size={18} />
                  <p className="text-sm uppercase tracking-[0.28em]">Institution</p>
                </div>
                <p className="mt-4 text-xl text-white/82">{item.institution}</p>
                <div className="mt-4 flex items-center gap-3 text-white/60">
                  <MapPin size={16} />
                  <span className="text-base">{item.location}</span>
                </div>
              </div>

              <div className="absolute left-7 top-6 h-4 w-4 -translate-x-1/2 rounded-full border border-accent bg-black shadow-glow md:left-1/2" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
});
