"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { timelineEvents } from "@/data/portfolio-data";

export const TimelineSection = forwardRef<HTMLElement, {}>(function TimelineSection(_props, ref) {
  return (
    <section id="timeline" ref={ref} className="scroll-mt-24 pt-8">
      <SectionHeading
        eyebrow="Hero Journey"
        title="Evolution Timeline"
        description="A glowing milestone path showing how Kamal’s builder identity has evolved over time."
      />

      <div className="panel-frame clip-corners relative mt-10 rounded-[2rem] p-8 md:p-10">
        <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-accent/10 via-accent to-transparent md:left-1/2" />

        <div className="space-y-10">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative grid gap-4 md:grid-cols-2 ${index % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"}`}
            >
              <div className={index % 2 === 0 ? "md:text-right" : ""}>
                <p className="text-sm uppercase tracking-[0.4em] text-accent/70">{event.year}</p>
                <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.14em] text-white">
                  {event.title}
                </h3>
              </div>
              <div className="rounded-[1.5rem] border border-accent/18 bg-black/30 p-5">
                <p className="text-lg text-white/74">{event.description}</p>
              </div>

              <div className="absolute left-5 top-6 h-4 w-4 -translate-x-1/2 rounded-full border border-accent bg-black shadow-glow md:left-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
