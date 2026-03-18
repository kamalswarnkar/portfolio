"use client";

import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { OmnitrixCore } from "@/components/ui/omnitrix-core";

const bootMessages = [
  "Initializing Omnitrix...",
  "DNA Scan Complete",
  "Welcome Recruiter",
];

type HeroSectionProps = {
  isTransforming: boolean;
  onActivate: () => void;
};

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(function HeroSection(
  { isTransforming, onActivate },
  ref,
) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (isTransforming) return;

    const timer = window.setInterval(() => {
      setMessageIndex((current) => (current < bootMessages.length - 1 ? current + 1 : current));
    }, 1400);

    return () => window.clearInterval(timer);
  }, [isTransforming]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.18),transparent_32%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{
          opacity: isTransforming ? 0 : 1,
          scale: isTransforming ? 0.9 : 1,
          filter: isTransforming ? "brightness(2)" : "brightness(1)",
        }}
        transition={{ duration: isTransforming ? 0.45 : 1.2 }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-8"
      >
        <div className="relative flex flex-col items-center">
          {/* Omnitrix button — xs-safe sizing */}
          <motion.button
            whileHover={{ scale: 1.012 }}
            whileTap={{ scale: 0.982 }}
            onClick={onActivate}
            className="group relative h-[17rem] w-[17rem] rounded-full xs:h-[19rem] xs:w-[19rem] sm:h-[24rem] sm:w-[24rem] md:h-[31rem] md:w-[31rem]"
            aria-label="Activate portfolio"
            animate={{
              scale: isTransforming ? [1, 0.96, 1.08] : 1,
              rotate: isTransforming ? [0, -10, 0, 8, 0] : 0,
            }}
            transition={{ duration: 0.78, ease: "easeInOut" }}
          >
            <div className="absolute inset-[-1.6rem] rounded-full bg-[radial-gradient(circle,rgba(57,255,20,0.24),rgba(57,255,20,0.08)_38%,transparent_66%)] blur-xl" />
            <motion.div
              className="absolute inset-0 rounded-full border-[18px] border-[#111] bg-[radial-gradient(circle,rgba(26,48,22,0.9),#030303_58%)] shadow-[0_0_110px_rgba(57,255,20,0.14)]"
              animate={{
                boxShadow: isTransforming
                  ? "0 0 150px rgba(57,255,20,0.34)"
                  : "0 0 110px rgba(57,255,20,0.14)",
              }}
            />
            <div className="absolute inset-[1rem] rounded-full border-[14px] border-[#575757] bg-[#0a0a0a]" />
            <div className="absolute inset-[1.45rem] rounded-full border-[4px] border-black/80" />
            <div className="absolute inset-[2.7rem] rounded-full border-[10px] border-[#1d1d1d] bg-[radial-gradient(circle,rgba(57,255,20,0.14),rgba(2,2,2,0.96)_68%)]" />
            <div className="absolute inset-[3.55rem] rounded-full border border-accent/18" />
            <div className="absolute inset-[4.4rem] rounded-full border-[3px] border-accent/24" />
            <div className="absolute inset-[5.1rem] rounded-full border border-accent/14" />
            <div className="absolute inset-[6.25rem] rounded-full border-[2px] border-[#1b1b1b]" />
            <div className="absolute inset-[6.85rem] rounded-full border border-accent/12" />

            {[
              "left-1/2 top-[-0.8rem] h-28 w-24 -translate-x-1/2 rounded-b-[2rem] border-x-[10px] border-b-[14px]",
              "left-1/2 bottom-[-0.8rem] h-28 w-24 -translate-x-1/2 rounded-t-[2rem] border-x-[10px] border-t-[14px]",
              "left-[-0.8rem] top-1/2 h-24 w-28 -translate-y-1/2 rounded-r-[2rem] border-y-[10px] border-r-[14px]",
              "right-[-0.8rem] top-1/2 h-24 w-28 -translate-y-1/2 rounded-l-[2rem] border-y-[10px] border-l-[14px]",
            ].map((slot, index) => (
              <motion.div
                key={slot}
                className={`absolute border-[#8d8d8d] bg-[#181818] ${slot}`}
                animate={
                  index === 0 || index === 1
                    ? { y: isTransforming ? [0, index === 0 ? 12 : -12, 0] : 0 }
                    : { x: isTransforming ? [0, index === 2 ? 12 : -12, 0] : 0 }
                }
                transition={{ duration: 0.45 }}
              />
            ))}

            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={`dial-${index}`}
                className="absolute left-1/2 top-1/2 h-[0.9rem] w-[3.1rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2a2a2a]"
                style={{ transform: `translate(-50%, -50%) rotate(${index * 30}deg) translateY(-11.25rem)` }}
              />
            ))}

            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={`dial-inner-${index}`}
                className="absolute left-1/2 top-1/2 h-[0.35rem] w-[1.2rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/28"
                style={{ transform: `translate(-50%, -50%) rotate(${index * 30}deg) translateY(-9.35rem)` }}
              />
            ))}

            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={`micro-${index}`}
                className="absolute left-1/2 top-1/2 h-[0.26rem] w-[0.8rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/50"
                style={{ transform: `translate(-50%, -50%) rotate(${index * 15}deg) translateY(-8.1rem)` }}
              />
            ))}

            {Array.from({ length: 8 }).map((_, index) => {
              const angle = (Math.PI * 2 * index) / 8;
              const radius = 168;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={index}
                  className="absolute h-[1.15rem] w-[4.2rem] rounded-full bg-accent/85 blur-[1px]"
                  animate={{
                    opacity: isTransforming ? [0.9, 1, 0.36] : [0.48, 0.82, 0.48],
                    scale: isTransforming ? [1, 1.16, 0.9] : [0.96, 1.04, 0.96],
                  }}
                  transition={{
                    duration: isTransforming ? 0.5 : 2.8,
                    delay: isTransforming ? index * 0.02 : 0,
                    repeat: isTransforming ? 0 : Number.POSITIVE_INFINITY,
                  }}
                  style={{
                    left: `calc(50% + ${x}px - 2.1rem)`,
                    top: `calc(50% + ${y}px - 0.58rem)`,
                    transform: `rotate(${index * 45}deg)`,
                  }}
                />
              );
            })}

            <motion.div
              animate={{
                rotate: isTransforming ? [0, 40, 180] : [0, 12, 0],
                scale: isTransforming ? [1, 0.9, 0.84] : [1, 1.01, 1],
              }}
              transition={{
                duration: isTransforming ? 0.8 : 4.2,
                repeat: isTransforming ? 0 : Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-[5.7rem] rounded-full border-[8px] border-black/70 bg-[radial-gradient(circle,rgba(57,255,20,0.1),rgba(0,0,0,0)_72%)]"
            />

            <motion.div
              className="absolute left-1/2 top-1/2 h-[12.2rem] w-[12.2rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-[#0c0c0c] bg-[#111]"
              animate={{
                boxShadow: isTransforming
                  ? "0 0 74px rgba(57,255,20,0.5), inset 0 0 32px rgba(57,255,20,0.25)"
                  : "0 0 34px rgba(57,255,20,0.22), inset 0 0 16px rgba(57,255,20,0.12)",
              }}
            />
            <div className="absolute left-1/2 top-1/2 h-[10.3rem] w-[10.3rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] border-black/80 bg-[radial-gradient(circle,rgba(14,26,14,0.82),rgba(0,0,0,0.96)_76%)]" />
            <div className="absolute left-1/2 top-1/2 h-[8.65rem] w-[8.65rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-accent/35 bg-[radial-gradient(circle,rgba(57,255,20,0.28),rgba(0,0,0,0.9)_72%)]" />
            <div className="absolute left-1/2 top-1/2 h-[6.95rem] w-[6.95rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-black/85 bg-[#0c0c0c]" />
            <div className="absolute left-1/2 top-1/2 h-[5.55rem] w-[5.55rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 bg-accent/10" />

            <motion.div
              className="absolute left-1/2 top-1/2 h-[5.9rem] w-[1rem] -translate-x-1/2 -translate-y-1/2 bg-accent shadow-[0_0_28px_rgba(57,255,20,0.82)]"
              animate={{ scaleY: isTransforming ? [1, 1.22, 0.82] : [1, 1.06, 1] }}
              transition={{
                duration: isTransforming ? 0.5 : 2.6,
                repeat: isTransforming ? 0 : Number.POSITIVE_INFINITY,
              }}
            />
            <div
              className="absolute left-1/2 h-[2.3rem] w-[5.3rem] -translate-x-1/2 rotate-45 bg-black"
              style={{ top: "calc(50% - 2rem)" }}
            />
            <div
              className="absolute left-1/2 h-[2.3rem] w-[5.3rem] -translate-x-1/2 -rotate-45 bg-black"
              style={{ bottom: "calc(50% - 2rem)" }}
            />
            <div className="absolute left-1/2 top-1/2 h-[3.9rem] w-[0.9rem] -translate-x-1/2 -translate-y-1/2 bg-accent shadow-[0_0_24px_rgba(57,255,20,0.75)]" />
            <div className="absolute left-1/2 top-1/2 h-[1.1rem] w-[1.1rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_18px_rgba(57,255,20,0.75)]" />

            {[
              "top-[6.15rem] left-1/2 -translate-x-1/2",
              "bottom-[6.15rem] left-1/2 -translate-x-1/2",
              "left-[6.15rem] top-1/2 -translate-y-1/2",
              "right-[6.15rem] top-1/2 -translate-y-1/2",
            ].map((slot, index) => (
              <div
                key={`brace-${index}`}
                className={`absolute h-5 w-12 rounded-full border border-accent/30 bg-[#111] shadow-[0_0_16px_rgba(57,255,20,0.12)] ${slot}`}
              />
            ))}

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`core-node-${index}`}
                className="absolute left-1/2 top-1/2 h-4 w-4 rounded-full border border-accent/45 bg-accent/60 shadow-glow"
                style={{ transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-4.4rem)` }}
              />
            ))}

            <motion.div
              className="absolute inset-[6.7rem] rounded-full opacity-30 mix-blend-screen"
              animate={{ opacity: isTransforming ? 0.52 : 0.18 }}
            >
              <OmnitrixCore isTransforming={isTransforming} />
            </motion.div>
          </motion.button>

          <div className="mt-8 flex min-h-10 items-center justify-center">
            <motion.p
              key={bootMessages[messageIndex]}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm uppercase tracking-[0.46em] text-accent/88 md:text-base"
            >
              {bootMessages[messageIndex]}
            </motion.p>
          </div>

          <p className="mt-4 text-center text-xs uppercase tracking-[0.28em] text-white/45 sm:tracking-[0.38em] md:text-sm">
            Tap the core to trigger transformation
          </p>
        </div>
      </motion.div>
    </section>
  );
});
