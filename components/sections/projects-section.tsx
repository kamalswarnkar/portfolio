"use client";

import { forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/portfolio-data";

const projectThemeMap: Record<string, { core: string }> = {
  "Grey Matter": {
    core: "border-lime-300/40 bg-lime-300/12 shadow-[0_0_24px_rgba(163,230,53,0.2)]",
  },
  Brainstorm: {
    core: "border-cyan-300/40 bg-cyan-300/12 shadow-[0_0_24px_rgba(34,211,238,0.2)]",
  },
  Upgrade: {
    core: "border-amber-300/40 bg-amber-300/12 shadow-[0_0_24px_rgba(251,191,36,0.2)]",
  },
};

export const ProjectsSection = forwardRef<HTMLElement, {}>(function ProjectsSection(_props, ref) {
  const [openProject, setOpenProject] = useState<string | null>(null);
  const orderedProjects = [...projects].sort((a, b) => parsePeriodValue(b.period) - parsePeriodValue(a.period));

  return (
    <section id="projects" ref={ref} className="scroll-mt-24 pt-8">
      <SectionHeading eyebrow="Mission Logs" title="Project Universe" />

      <div className="mt-10 space-y-5">
        {orderedProjects.map((project, index) => {
          const isOpen = openProject === project.id;
          const theme = projectThemeMap[project.alienVibe] ?? projectThemeMap.Upgrade;

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="panel-frame clip-corners relative overflow-hidden rounded-[2rem] p-5 md:p-6"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-70`} />
              <div className="relative z-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${theme.core}`}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/35">
                        <div className="h-4 w-4 rotate-45 border-x-2 border-y-2 border-current" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.36em] text-accent/62">{project.id}</p>
                      <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white md:text-3xl">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setOpenProject(isOpen ? null : project.id)}
                    className="inline-flex w-full items-center justify-center rounded-full border border-accent/36 bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black transition hover:shadow-[0_0_28px_rgba(57,255,20,0.28)] md:w-auto"
                  >
                    {isOpen ? "Collapse File" : "Scan Mission"}
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key={`${project.id}-details`}
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-accent/16 pt-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-accent/24 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-accent">
                            {project.status}
                          </span>
                          <span className="text-xs uppercase tracking-[0.28em] text-white/46">{project.period}</span>
                        </div>

                        <ProjectPreviewCard projectId={project.id} />

                        <p className="mt-5 text-base text-white/74 md:text-lg">{project.description}</p>

                        <div className="mt-6 grid gap-3">
                          {project.details.map((detail) => (
                            <div
                              key={detail}
                              className="rounded-[1.25rem] border border-accent/14 bg-black/28 px-4 py-4 text-base text-white/70"
                            >
                              {detail}
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-accent/20 bg-black/35 px-3 py-2 text-sm uppercase tracking-[0.18em] text-white/85"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-accent/35 px-4 py-3 text-sm uppercase tracking-[0.2em] text-accent transition hover:bg-accent/12"
                          >
                            <Github size={16} />
                            Source DNA
                          </a>
                          {project.demo ? (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm uppercase tracking-[0.2em] text-black transition hover:shadow-glow"
                            >
                              <ExternalLink size={16} />
                              Launch Portal
                            </a>
                          ) : null}
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
    </section>
  );
});

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

function ProjectPreviewCard({ projectId }: { projectId: string }) {
  if (projectId === "RSX-026") {
    return (
      <div className="mt-6 rounded-[1.75rem] border border-lime-300/18 bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.16),rgba(0,0,0,0.92)_72%)] p-4">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.34em] text-lime-200/80">Scanner Intelligence Card</p>
            <h4 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white">
              Resume Scan Matrix
            </h4>
            <p className="mt-3 text-base text-white/68">
              Floating resume analysis surface with role-fit logic, ATS scoring, and skill-gap signals.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["ATS Score", "92%"],
                ["Role Match", "ML Engineer"],
                ["Gap Signals", "3 tracked"],
                ["Confidence", "High"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.1rem] border border-lime-300/18 bg-black/24 p-3">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-lime-200/72">{label}</p>
                  <p className="mt-2 text-lg text-white/86">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[18rem] items-center justify-center rounded-[1.5rem] border border-lime-300/18 bg-black/30 p-4">
            <div className="absolute h-60 w-60 rounded-full border border-lime-300/22" />
            <div className="absolute h-44 w-44 rounded-full border border-lime-300/16" />
            <div className="absolute h-28 w-28 rounded-full border border-lime-300/22" />
            <div className="relative w-full max-w-[18rem] rounded-[1.35rem] border border-white/12 bg-white/[0.06] p-4 shadow-[0_0_40px_rgba(163,230,53,0.12)] backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.28em] text-lime-200/76">Resume File</span>
                <span className="rounded-full bg-lime-300/18 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-lime-200">
                  Live Scan
                </span>
              </div>
              <div className="mt-4 rounded-[1rem] border border-white/10 bg-black/24 p-4">
                <div className="space-y-2">
                  <div className="h-2 w-3/4 rounded-full bg-white/70" />
                  <div className="h-2 w-full rounded-full bg-white/30" />
                  <div className="h-2 w-5/6 rounded-full bg-white/30" />
                </div>
                <div className="mt-5 grid gap-3">
                  <div className="rounded-[0.9rem] border border-lime-300/16 bg-lime-300/10 px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-lime-200/76">Keyword Relevance</p>
                    <div className="mt-2 h-2 rounded-full bg-black/30">
                      <div className="h-2 w-[82%] rounded-full bg-lime-300" />
                    </div>
                  </div>
                  <div className="rounded-[0.9rem] border border-emerald-300/16 bg-emerald-300/10 px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-200/76">Skill Overlap</p>
                    <div className="mt-2 h-2 rounded-full bg-black/30">
                      <div className="h-2 w-[74%] rounded-full bg-emerald-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === "AIC-026") {
    return (
      <div className="mt-6 rounded-[1.75rem] border border-cyan-300/18 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),rgba(0,0,0,0.92)_72%)] p-4">
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-black/28 p-5">
            <p className="text-xs uppercase tracking-[0.34em] text-cyan-200/80">Concept Preview</p>
            <h4 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white">
              Predictive Guidance Hub
            </h4>
            <div className="mt-5 space-y-3">
              {[
                ["Student Profile", "Skills + academics + interest vectors"],
                ["Career Match Wheel", "Confidence-scored domain mapping"],
                ["Path Prediction", "Data-backed role and growth routes"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[1rem] border border-cyan-300/16 bg-cyan-300/8 p-3">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/84">{title}</p>
                  <p className="mt-2 text-sm text-white/62">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-black/28 p-4">
            <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[1.2rem] border border-cyan-300/18 bg-black/24 p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/74">Student Profile</p>
                <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/24 bg-cyan-300/12 text-lg text-white">
                  KS
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Python", "ML", "Analytics", "Logic"].map((item) => (
                    <span key={item} className="rounded-full border border-cyan-300/16 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.2rem] border border-cyan-300/18 bg-black/24 p-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/74">Career Match Wheel</p>
                <div className="relative mx-auto mt-4 flex h-48 w-48 items-center justify-center rounded-full border border-cyan-300/18">
                  <div className="absolute h-36 w-36 rounded-full border border-cyan-300/18" />
                  <div className="absolute h-24 w-24 rounded-full border border-cyan-300/18" />
                  {[
                    { label: "AI/ML", x: "50%", y: "10%" },
                    { label: "Data", x: "82%", y: "42%" },
                    { label: "Backend", x: "68%", y: "78%" },
                    { label: "Product", x: "26%", y: "76%" },
                    { label: "Research", x: "12%", y: "38%" },
                  ].map((node) => (
                    <div
                      key={node.label}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/24 bg-cyan-300/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-cyan-100"
                      style={{ left: node.x, top: node.y }}
                    >
                      {node.label}
                    </div>
                  ))}
                  <div className="h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.7)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-[1.75rem] border border-amber-300/18 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),rgba(0,0,0,0.92)_72%)] p-4">
      <div className="grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/28 p-5">
          <p className="text-xs uppercase tracking-[0.34em] text-amber-200/78">Upgrade-Style Finance Hologram</p>
          <h4 className="mt-3 font-display text-2xl uppercase tracking-[0.12em] text-white">
            Adaptive Money Command
          </h4>
          <p className="mt-3 text-base text-white/68">
            A glowing finance command center with AI categorization, monthly overview, and live savings signals.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["AI Sorted", "126 txns"],
              ["Savings Trend", "+12.5%"],
              ["Budget Health", "Stable"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1rem] border border-amber-300/14 bg-amber-300/8 p-3">
                <p className="text-[10px] uppercase tracking-[0.24em] text-amber-200/76">{label}</p>
                <p className="mt-2 text-lg text-white/86">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-black/28 p-4">
          <div className="rounded-[1.2rem] border border-amber-300/18 bg-[linear-gradient(135deg,rgba(29,78,216,0.55),rgba(124,58,237,0.7),rgba(217,70,239,0.55))] p-4">
            <div className="flex items-center justify-between text-white">
              <p className="text-sm font-semibold">Monthly Overview</p>
              <p className="text-sm text-emerald-200">+12.5%</p>
            </div>
            <div className="mt-4 rounded-[1rem] bg-white/85 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
              <div className="grid grid-cols-[1fr_auto] gap-4">
                <div className="rounded-[0.9rem] bg-[linear-gradient(90deg,rgba(191,219,254,0.7),rgba(220,252,231,0.75))] p-4">
                  <div className="flex h-28 items-end justify-center gap-3">
                    {[
                      ["h-16", "bg-blue-600"],
                      ["h-20", "bg-emerald-500"],
                      ["h-12", "bg-violet-500"],
                      ["h-24", "bg-amber-400"],
                    ].map(([height, color], index) => (
                      <div key={index} className={`w-5 rounded-t-xl ${height} ${color}`} />
                    ))}
                  </div>
                </div>
                <div className="space-y-2 rounded-[0.9rem] bg-slate-900/92 p-3 text-white">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-amber-200/80">AI Feed</p>
                  {["Food -> auto-tagged", "Travel alert", "Savings suggestion"].map((item) => (
                    <div key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
