"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { ContactSection } from "@/components/sections/contact-section";
import { BackgroundSystem } from "@/components/background/background-system";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { TransformationSequence } from "@/components/ui/transformation-sequence";
import { type SectionId } from "@/lib/site-config";
import { useActivationSound } from "@/hooks/use-activation-sound";

export function PortfolioApp() {
  const [phase, setPhase] = useState<"idle" | "transforming" | "active">("idle");
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const [pulseKey, setPulseKey] = useState(0);
  const activationSound = useActivationSound();
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    hero: null,
    about: null,
    skills: null,
    projects: null,
    timeline: null,
    contact: null,
  });

  useEffect(() => {
    if (phase !== "active") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            setActiveSection(id);
            setPulseKey((current) => current + 1);
          }
        });
      },
      { threshold: 0.42, rootMargin: "-12% 0px -18% 0px" },
    );

    const elements = Object.values(sectionRefs.current).filter(Boolean);
    elements.forEach((element) => observer.observe(element as Element));

    return () => observer.disconnect();
  }, [phase]);

  const handleActivate = () => {
    if (phase !== "idle") {
      return;
    }

    activationSound();
    setPhase("transforming");
    setPulseKey((current) => current + 1);
    window.scrollTo({ top: 0, behavior: "auto" });

    window.setTimeout(() => {
      setPhase("active");
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }, 2650);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-white">
      <BackgroundSystem activeSection={activeSection} pulseKey={pulseKey} phase={phase} />
      <CustomCursor />

      <AnimatePresence>
        {phase === "transforming" ? <TransformationSequence key="transform" /> : null}
      </AnimatePresence>

      <div className="relative z-10">
        <AnimatePresence>
          {phase !== "active" ? (
            <motion.div
              key="hero"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <HeroSection
                ref={(node) => {
                  sectionRefs.current.hero = node;
                }}
                isTransforming={phase === "transforming"}
                onActivate={handleActivate}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "active" ? (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-20 pt-8 sm:px-6 lg:px-8"
            >
              <AboutSection
                ref={(node) => {
                  sectionRefs.current.about = node;
                }}
                isActivated
              />
              <SkillsSection
                ref={(node) => {
                  sectionRefs.current.skills = node;
                }}
              />
              <ProjectsSection
                ref={(node) => {
                  sectionRefs.current.projects = node;
                }}
              />
              <TimelineSection
                ref={(node) => {
                  sectionRefs.current.timeline = node;
                }}
              />
              <ContactSection
                ref={(node) => {
                  sectionRefs.current.contact = node;
                }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
