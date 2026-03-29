"use client";

import { forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { achievements } from "@/data/portfolio-data";

export const AchievementsSection = forwardRef<HTMLElement, {}>(function AchievementsSection(
  _props,
  ref,
) {
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="achievements" ref={ref} className="scroll-mt-24 pt-8">
      <SectionHeading eyebrow="Wins Log" title="Achievements" />

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((achievement, index) => {
          const isOpen = activePreview === achievement.id;

          return (
            <motion.article
              key={achievement.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              onHoverStart={() => setActivePreview(achievement.id)}
              onHoverEnd={() => setActivePreview((current) => (current === achievement.id ? null : current))}
              onClick={() =>
                setActivePreview((current) => (current === achievement.id ? null : achievement.id))
              }
              className="group panel-frame clip-corners relative overflow-hidden rounded-[2rem] p-5"
            >
              <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(57,255,20,0.16),transparent_56%,rgba(255,255,255,0.05))]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-accent">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/32 bg-accent/10">
                    <Trophy size={16} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-accent/74">{achievement.period}</p>
                </div>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.12em] text-white">
                  {achievement.title}
                </h3>
                <p className="mt-3 text-base text-white/70">{achievement.detail}</p>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key={`${achievement.id}-preview`}
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 14 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ type: "spring", stiffness: 180, damping: 22 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-[1rem] border border-accent/24 bg-black/40 p-2">
                        <img
                          src={achievement.previewImage}
                          alt={achievement.previewAlt}
                          className={`h-44 w-full rounded-[0.8rem] border border-white/10 object-cover ${
                            achievement.id === "ACH-024-01" ? "cursor-zoom-in" : ""
                          }`}
                          onClick={(event) => {
                            if (achievement.id !== "ACH-024-01") return;
                            event.stopPropagation();
                            setExpandedImage({ src: achievement.previewImage, alt: achievement.previewAlt });
                          }}
                        />
                        {achievement.previewLink ? (
                          <a
                            href={achievement.previewLink}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-flex items-center gap-2 rounded-full border border-accent/35 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-accent hover:bg-accent/12"
                          >
                            Open Link
                            <ExternalLink size={12} />
                          </a>
                        ) : null}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </div>

      <AnimatePresence>
        {expandedImage ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/86 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="panel-frame clip-corners w-full max-w-5xl overflow-hidden rounded-[1.8rem] p-3"
            >
              <img
                src={expandedImage.src}
                alt={expandedImage.alt}
                className="h-auto max-h-[82vh] w-full rounded-[1.2rem] border border-white/10 object-contain"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
});
