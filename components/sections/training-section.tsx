"use client";

import { forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { trainings } from "@/data/portfolio-data";

const trainingThemeMap: Record<
  string,
  { core: string }
> = {
  XLR8: {
    core: "border-emerald-300/40 bg-emerald-300/12 shadow-[0_0_24px_rgba(52,211,153,0.2)]",
  },
  Jetray: {
    core: "border-sky-300/40 bg-sky-300/12 shadow-[0_0_24px_rgba(125,211,252,0.2)]",
  },
};

export const TrainingSection = forwardRef<HTMLElement, {}>(function TrainingSection(_props, ref) {
  const [openTraining, setOpenTraining] = useState<string | null>(null);
  const [selectedTraining, setSelectedTraining] = useState<(typeof trainings)[number] | null>(null);

  return (
    <section id="training" ref={ref} className="scroll-mt-24 pt-8">
      <SectionHeading eyebrow="Training Log" title="Battle Prep" />

      <div className="mt-10 space-y-5">
        {trainings.map((training, index) => {
          const isOpen = openTraining === training.id;
          const theme = trainingThemeMap[training.alien] ?? trainingThemeMap.XLR8;

          return (
            <motion.article
              key={training.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="panel-frame clip-corners relative overflow-hidden rounded-[2rem] p-5 md:p-6"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${training.accent} opacity-75`} />
              <div className="relative z-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${theme.core}`}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/35">
                        <div className="h-4 w-4 rotate-45 border-x-2 border-y-2 border-current" />
                      </div>
                    </div>
                    <div>
                    <p className="text-xs uppercase tracking-[0.36em] text-accent/62">{training.provider}</p>
                    <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white md:text-3xl">
                      {training.title}
                    </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setOpenTraining(isOpen ? null : training.id)}
                    className="inline-flex w-full items-center justify-center rounded-full border border-accent/36 bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black transition hover:shadow-[0_0_28px_rgba(57,255,20,0.28)] md:w-auto"
                  >
                    {isOpen ? "Collapse File" : "Scan Training"}
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key={`${training.id}-details`}
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-accent/16 pt-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-accent/24 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-accent">
                            {training.credential}
                          </span>
                          <span className="text-xs uppercase tracking-[0.28em] text-white/46">
                            {training.period}
                          </span>
                        </div>

                        <p className="mt-5 text-base text-white/74 md:text-lg">{training.summary}</p>

                        <div className="mt-6 grid gap-3">
                          {training.outcomes.map((outcome) => (
                            <div
                              key={outcome}
                              className="rounded-[1.25rem] border border-accent/14 bg-black/28 px-4 py-4 text-base text-white/70"
                            >
                              {outcome}
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                          <button
                            onClick={() => setSelectedTraining(training)}
                            className="inline-flex w-full items-center justify-center rounded-full border border-accent/36 bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black transition hover:shadow-[0_0_28px_rgba(57,255,20,0.28)] sm:w-auto"
                          >
                            {training.credential}
                          </button>
                        </div>
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
        {selectedTraining ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-3 backdrop-blur-md sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTraining(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 170, damping: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="panel-frame clip-corners relative max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-[2rem] p-3 md:rounded-[2.4rem] md:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.22),transparent_42%),linear-gradient(145deg,rgba(57,255,20,0.12),transparent_55%,rgba(255,255,255,0.04))]" />
              <div className="relative z-10 flex max-h-[calc(88vh-2rem)] flex-col">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-accent/70">
                      {selectedTraining.provider}
                    </p>
                    <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white md:text-3xl">
                      {selectedTraining.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedTraining(null)}
                    className="rounded-full border border-accent/38 bg-accent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-black md:px-5 md:py-3 md:text-sm"
                  >
                    Close
                  </button>
                </div>

                <div className="hide-scrollbar overflow-y-auto rounded-[2rem] border border-accent/22 bg-black/45 p-3 md:p-4">
                  <div className="rounded-[1.6rem] border border-accent/18 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.16),rgba(0,0,0,0.92)_78%)] p-2 md:p-3">
                    <img
                      src={selectedTraining.certificateImage}
                      alt={`${selectedTraining.title} certificate`}
                      className="mx-auto h-auto max-h-[68vh] w-auto max-w-full rounded-[1rem] border border-white/10 object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
});
