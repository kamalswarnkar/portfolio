"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      <p className="mb-3 text-sm uppercase tracking-[0.45em] text-accent/70">{eyebrow}</p>
      <h2 className="font-display text-4xl uppercase tracking-[0.18em] text-white md:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-lg text-white/72">{description}</p> : null}
    </motion.div>
  );
}
