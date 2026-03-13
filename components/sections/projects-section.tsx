"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/portfolio-data";

export const ProjectsSection = forwardRef<HTMLElement, {}>(function ProjectsSection(_props, ref) {
  return (
    <section id="projects" ref={ref} className="scroll-mt-24 pt-8">
      <SectionHeading
        eyebrow="Mission Logs"
        title="Active Deployments"
        description="Projects are framed as mission files, blending terminal aesthetics with recruiter-friendly clarity."
      />

      <div className="mt-10 grid gap-6 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className="panel-frame clip-corners rounded-[2rem] p-6"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-70`} />
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-accent/16 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-accent/60">Mission ID</p>
                <p className="mt-2 font-display text-xl uppercase tracking-[0.14em] text-white">
                  {project.id}
                </p>
              </div>
              <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-accent">
                {project.status}
              </span>
            </div>

            <p className="relative z-10 text-xs uppercase tracking-[0.34em] text-white/45">
              Alien Vibe // {project.alienVibe}
            </p>
            <h3 className="relative z-10 mt-3 font-display text-3xl uppercase tracking-[0.12em] text-white">
              {project.name}
            </h3>
            <p className="relative z-10 mt-4 text-lg text-white/74">{project.description}</p>
            <p className="relative z-10 mt-4 text-sm uppercase tracking-[0.18em] text-white/50">
              {project.aura}
            </p>

            <div className="relative z-10 mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-accent/20 bg-black/35 px-3 py-2 text-sm uppercase tracking-[0.18em] text-white/85"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/35 px-4 py-3 text-sm uppercase tracking-[0.2em] text-accent transition hover:bg-accent/12"
              >
                <Github size={16} />
                GitHub Link
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm uppercase tracking-[0.2em] text-black transition hover:shadow-glow"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
});
