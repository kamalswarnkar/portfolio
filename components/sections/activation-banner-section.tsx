"use client";

import { forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import {
  activationBanner,
  certificates,
  contacts,
  education,
  projects,
  resumeFile,
  resumePreview,
  skillWatches,
  trainings,
} from "@/data/portfolio-data";

export const ActivationBannerSection = forwardRef<HTMLElement, { onExploreWork: () => void }>(
  function ActivationBannerSection({ onExploreWork }, ref) {
    const [showResumePreview, setShowResumePreview] = useState(false);
    const orderedProjects = [...projects].sort((a, b) => parsePeriodValue(b.period) - parsePeriodValue(a.period));

    return (
      <>
        <motion.section
          id="banner"
          ref={ref}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="scroll-mt-24 px-1 pt-1 md:px-4 md:pt-2"
        >
          <div className="relative overflow-hidden px-3 py-8 md:px-8 md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.28),transparent_42%),linear-gradient(135deg,rgba(57,255,20,0.16),transparent_55%,rgba(255,255,255,0.04))]" />
            <div className="absolute right-[-3rem] top-[-2rem] h-40 w-40 rounded-full border border-accent/20" />
            <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-accent/25 bg-accent/10 shadow-glow" />
            <div className="absolute bottom-[-4rem] left-[-2rem] h-48 w-48 rounded-full border border-white/10" />
            <div className="absolute inset-x-[8%] bottom-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-8">
              <div className="flex flex-col justify-end">
                <p className="text-sm uppercase tracking-[0.48em] text-accent/76">
                  {activationBanner.eyebrow}
                </p>
                <h2 className="mt-4 max-w-4xl font-display text-3xl uppercase tracking-[0.12em] text-white sm:text-4xl md:text-6xl md:tracking-[0.14em]">
                  {activationBanner.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base text-white/74 sm:text-lg md:mt-5 md:text-xl">
                  {activationBanner.description}
                </p>

                <div className="mt-8">
                  <button
                    onClick={onExploreWork}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-accent/36 bg-accent px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-black transition hover:shadow-[0_0_34px_rgba(57,255,20,0.38)] sm:w-auto"
                  >
                    <ArrowDown size={18} className="transition group-hover:translate-y-0.5" />
                    Explore Work
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowResumePreview(true)}
                className="panel-frame clip-corners relative ml-auto flex w-full max-w-xl flex-col justify-between overflow-hidden rounded-[1.8rem] p-5 text-left md:rounded-[2rem] md:p-6"
              >
                <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(57,255,20,0.16),transparent_52%,rgba(255,255,255,0.05))]" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.42em] text-accent/70">
                        {resumePreview.badge}
                      </p>
                      <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.12em] text-white md:text-3xl">
                        {resumePreview.title}
                      </h3>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/35 bg-accent/10">
                      <FileText size={22} className="text-accent" />
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.6rem] border border-accent/18 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.16),rgba(0,0,0,0.94)_72%)] p-5">
                    <div className="rounded-[1.25rem] border border-white/10 bg-black/35 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-accent/66">DNA Archive Ready</p>
                      <p className="mt-4 text-base uppercase tracking-[0.18em] text-white/84 md:text-lg md:tracking-[0.2em]">
                        Full career matrix loaded with mission logs, battle prep, skill cores, and academic intel.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap items-center gap-2">
                  {resumePreview.quickStats.map((stat) => (
                    <span
                      key={stat}
                      className="rounded-full border border-accent/24 bg-black/30 px-3 py-2 text-xs uppercase tracking-[0.2em] text-accent"
                    >
                      {stat}
                    </span>
                  ))}
                  <a
                    href={resumeFile.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="ml-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-accent/50 bg-accent text-[10px] font-bold uppercase leading-tight tracking-[0.12em] text-black shadow-[0_0_28px_rgba(57,255,20,0.55)] transition hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(57,255,20,0.75)]"
                  >
                    View CV
                  </a>
                </div>
              </button>
            </div>
          </div>
        </motion.section>

        <AnimatePresence>
          {showResumePreview ? (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 px-4 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResumePreview(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 170, damping: 20 }}
                onClick={(event) => event.stopPropagation()}
              className="panel-frame clip-corners relative max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-[2rem] p-3 md:rounded-[2.4rem] md:p-6"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.22),transparent_42%),linear-gradient(145deg,rgba(57,255,20,0.12),transparent_55%,rgba(255,255,255,0.04))]" />
                <div className="relative z-10 flex max-h-[calc(88vh-2rem)] flex-col">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.42em] text-accent/70">
                        {resumePreview.badge}
                      </p>
                      <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white md:text-3xl">
                        {resumePreview.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowResumePreview(false)}
                    className="rounded-full border border-accent/38 bg-accent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-black md:px-5 md:py-3 md:text-sm"
                    >
                      Close
                    </button>
                  </div>

                  <div className="hide-scrollbar overflow-y-auto rounded-[2rem] border border-accent/22 bg-black/42 p-5 md:p-7">
                    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                      <div className="space-y-6">
                        <div className="rounded-[1.6rem] border border-accent/18 bg-black/30 p-5">
                          <p className="text-sm uppercase tracking-[0.34em] text-accent/70">Contact</p>
                          <div className="mt-4 grid gap-3 text-lg text-white/82">
                            <p>{contacts.email}</p>
                            <p>{contacts.phone}</p>
                            <p>{contacts.social[0]?.href}</p>
                            <p>{contacts.social[1]?.href}</p>
                          </div>
                        </div>

                        <div className="rounded-[1.6rem] border border-accent/18 bg-black/30 p-5">
                          <p className="text-sm uppercase tracking-[0.34em] text-accent/70">Education</p>
                          <div className="mt-4 space-y-4">
                            {education.map((item) => (
                              <div key={`${item.institution}-${item.degree}`} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                <p className="text-lg text-white/86">{item.degree}</p>
                                <p className="mt-1 text-base text-white/64">{item.institution}</p>
                                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-accent/72">
                                  {item.score} • {item.period}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-[1.6rem] border border-accent/18 bg-black/30 p-5">
                          <p className="text-sm uppercase tracking-[0.34em] text-accent/70">Training</p>
                          <div className="mt-4 space-y-4">
                            {trainings.map((item) => (
                              <div key={item.id} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                <p className="text-lg text-white/86">{item.title}</p>
                                <p className="mt-1 text-base text-white/64">{item.provider}</p>
                                <p className="mt-2 text-sm text-white/62">{item.summary}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="rounded-[1.6rem] border border-accent/18 bg-black/30 p-5">
                          <p className="text-sm uppercase tracking-[0.34em] text-accent/70">Skills</p>
                          <div className="mt-4 space-y-4">
                            {skillWatches.map((watch) => (
                              <div key={watch.category}>
                                <p className="text-base uppercase tracking-[0.18em] text-white/82">
                                  {watch.category}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {watch.skills.map((skill) => (
                                    <span
                                      key={`${watch.category}-${skill}`}
                                      className="rounded-full border border-accent/24 bg-black/30 px-3 py-2 text-xs uppercase tracking-[0.18em] text-accent"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-[1.6rem] border border-accent/18 bg-black/30 p-5">
                          <p className="text-sm uppercase tracking-[0.34em] text-accent/70">Projects</p>
                          <div className="mt-4 space-y-4">
                            {orderedProjects.map((project) => (
                              <div key={project.id} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                <p className="text-lg text-white/86">{project.name}</p>
                                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-accent/72">
                                  {project.period}
                                </p>
                                <p className="mt-2 text-sm text-white/62">{project.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-[1.6rem] border border-accent/18 bg-black/30 p-5">
                          <p className="text-sm uppercase tracking-[0.34em] text-accent/70">Certificates</p>
                          <div className="mt-4 space-y-3">
                            {certificates.map((certificate) => (
                              <div key={certificate.title} className="flex items-center justify-between gap-4 rounded-[1rem] border border-white/10 bg-black/25 px-4 py-3">
                                <div>
                                  <p className="text-base text-white/84">{certificate.title}</p>
                                  <p className="mt-1 text-sm text-white/60">{certificate.issuer}</p>
                                </div>
                                <span className="text-xs uppercase tracking-[0.18em] text-accent/72">
                                  {certificate.period}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </>
    );
  },
);

function parsePeriodValue(period: string) {
  const monthMap: Record<string, number> = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  };

  const cleaned = period.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  const monthToken = Object.keys(monthMap).find((token) => cleaned.includes(token));
  const yearMatch = cleaned.match(/(20\d{2})/);
  const year = yearMatch ? Number(yearMatch[1]) : 0;
  const month = monthToken ? monthMap[monthToken] : 0;
  return year * 100 + month;
}
