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

      <div className="panel-frame clip-corners relative mt-10 overflow-hidden rounded-[2rem] p-5 md:p-8">
        {/* Timeline line — left-side on mobile, center on md+ */}
        <div className="absolute inset-y-0 left-5 w-px bg-gradient-to-b from-accent/10 via-accent to-transparent md:left-1/2" />

        <div className="relative z-10 space-y-8">
          {education.map((item, index) => (
            <motion.article
              key={`${item.institution}-${item.degree}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              // Mobile: single column. md+: two-column timeline
              className={`relative pl-10 md:pl-0 md:grid md:gap-4 md:grid-cols-2 ${
                index % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"
              }`}
            >
              {/* Timeline dot — left-side on mobile, center on md+ */}
              <div className="absolute left-5 top-5 h-4 w-4 -translate-x-1/2 rounded-full border border-accent bg-black shadow-glow md:left-1/2" />

              <div className={index % 2 === 0 ? "md:text-right md:pr-6" : "md:pl-6"}>
                <p className="text-sm uppercase tracking-[0.3em] text-accent/72 sm:tracking-[0.35em]">{item.period}</p>
                <h3 className="mt-2 font-display text-xl uppercase tracking-[0.1em] text-white sm:text-2xl sm:tracking-[0.12em]">
                  {item.degree}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/58 sm:tracking-[0.18em]">{item.score}</p>
              </div>

              <div className={`mt-4 rounded-[1.6rem] border border-accent/18 bg-black/34 p-4 md:mt-0 ${index % 2 === 0 ? "md:pl-6" : "md:pr-6"}`}>
                <div className="flex items-center gap-3 text-accent">
                  <GraduationCap size={16} />
                  <p className="text-sm uppercase tracking-[0.28em]">Institution</p>
                </div>
                <p className="mt-3 text-lg text-white/82">{item.institution}</p>
                <div className="mt-3 flex items-center gap-3 text-white/60">
                  <MapPin size={15} />
                  <span className="text-sm sm:text-base">{item.location}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
});
