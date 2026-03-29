"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ActivationBannerSection } from "@/components/sections/activation-banner-section";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { TrainingSection } from "@/components/sections/training-section";
import { EducationSection } from "@/components/sections/education-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { CertificatesSection } from "@/components/sections/certificates-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { ContactSection } from "@/components/sections/contact-section";
import { BackgroundSystem } from "@/components/background/background-system";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { OmnitrixNav } from "@/components/ui/omnitrix-nav";
import { TransformationSequence } from "@/components/ui/transformation-sequence";
import { type SectionId } from "@/lib/site-config";
import { ACTIVATION_SOUND_CLIP_MS, useActivationSound } from "@/hooks/use-activation-sound";

export function PortfolioApp() {
  const [phase, setPhase] = useState<"idle" | "transforming" | "active">("idle");
  const [activeSection, setActiveSection] = useState<SectionId>("banner");
  const [pulseKey, setPulseKey] = useState(0);
  const activationSound = useActivationSound();
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    hero: null,
    banner: null,
    about: null,
    training: null,
    achievements: null,
    education: null,
    skills: null,
    projects: null,
    certificates: null,
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
      setActiveSection("banner");
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }, ACTIVATION_SOUND_CLIP_MS);
  };

  const scrollToSection = (sectionId: SectionId) => {
    const target = sectionRefs.current[sectionId];
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-white">
      <BackgroundSystem activeSection={activeSection} pulseKey={pulseKey} phase={phase} />
      <CustomCursor />

      <AnimatePresence>
        {phase === "transforming" ? (
          <TransformationSequence key="transform" duration={ACTIVATION_SOUND_CLIP_MS / 1000} />
        ) : null}
      </AnimatePresence>

      <div className="relative z-10">
        {phase === "active" ? (
          <>
            <OmnitrixNav
              items={[
                { id: "banner", label: "Start" },
                { id: "about", label: "Intro" },
                { id: "education", label: "Edu" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Work" },
                { id: "certificates", label: "Proof" },
                { id: "achievements", label: "Wins" },
                { id: "training", label: "Train" },
                { id: "contact", label: "Contact" },
              ]}
              activeSection={activeSection}
              onSelect={scrollToSection}
            />
          </>
        ) : null}

        <AnimatePresence>
          {phase !== "active" ? (
            <motion.div
              key="hero"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
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
              transition={{ duration: 0.95, delay: 0.14, ease: "easeOut" }}
              className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-3 pb-20 pt-6 sm:gap-8 sm:px-6 sm:pt-8 lg:px-8"
            >
              <ActivationBannerSection
                ref={(node) => {
                  sectionRefs.current.banner = node;
                }}
                onExploreWork={() => scrollToSection("about")}
              />
              <AboutSection
                ref={(node) => {
                  sectionRefs.current.about = node;
                }}
                isActivated
              />
              <EducationSection
                ref={(node) => {
                  sectionRefs.current.education = node;
                }}
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
              <CertificatesSection
                ref={(node) => {
                  sectionRefs.current.certificates = node;
                }}
              />
              <AchievementsSection
                ref={(node) => {
                  sectionRefs.current.achievements = node;
                }}
              />
              <TrainingSection
                ref={(node) => {
                  sectionRefs.current.training = node;
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
