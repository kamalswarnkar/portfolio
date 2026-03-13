"use client";

import { AnimatePresence, motion } from "framer-motion";

type SkillItem = {
  alien: string;
  skill: string;
  summary: string;
  technologies: string[];
};

export function SkillModal({
  skill,
  onClose,
}: {
  skill: SkillItem | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {skill ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="panel-frame scan-overlay clip-corners relative w-full max-w-xl rounded-[2rem] p-8"
            initial={{ opacity: 0, scale: 0.85, rotateX: 12 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-sm uppercase tracking-[0.45em] text-accent/70">{skill.alien}</p>
            <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.16em] text-glow">
              {skill.skill}
            </h3>
            <p className="mt-4 text-lg text-white/80">{skill.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {skill.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm uppercase tracking-[0.18em] text-accent"
                >
                  {technology}
                </span>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mt-8 rounded-full border border-accent/45 bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black"
            >
              Close Transmission
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
