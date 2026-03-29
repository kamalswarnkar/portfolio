"use client";

import { forwardRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type HeroSectionProps = {
  isTransforming: boolean;
  onActivate: () => void;
};

function roundSvg(value: number) {
  return Number(value.toFixed(3));
}

function OmnitrixDial({ boosted }: { boosted: boolean }) {
  return (
    <div className={`omx-dial ${boosted ? "boost" : ""}`}>
      <div className="omx-core-bloom" />

      <svg viewBox="0 0 600 600" className="omx-svg" aria-hidden="true">
        <defs>
          <radialGradient id="omxShell" cx="42%" cy="34%" r="66%">
            <stop offset="0%" stopColor="#3f464b" />
            <stop offset="48%" stopColor="#191d21" />
            <stop offset="74%" stopColor="#0b0d0f" />
            <stop offset="100%" stopColor="#020304" />
          </radialGradient>
          <radialGradient id="omxInnerDark" cx="50%" cy="50%" r="64%">
            <stop offset="0%" stopColor="#081009" />
            <stop offset="64%" stopColor="#020302" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          <radialGradient id="omxCenterGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#c7ff74" />
            <stop offset="28%" stopColor="#85ff48" />
            <stop offset="72%" stopColor="#58f129" />
            <stop offset="100%" stopColor="#2d7d12" />
          </radialGradient>
          <filter id="omxSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="omxNeonGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="9" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="omx-outer-ccw">
          <circle cx="300" cy="300" r="246" fill="url(#omxShell)" />
          <circle cx="300" cy="300" r="233" fill="none" stroke="rgba(173,181,185,0.55)" strokeWidth="5" />
          <circle cx="300" cy="300" r="220" fill="none" stroke="rgba(82,90,96,0.82)" strokeWidth="8" />
          <circle cx="300" cy="300" r="207" fill="none" stroke="rgba(30,36,39,0.98)" strokeWidth="10" />
        </g>

        <g className="omx-detail-ccw">
          <circle cx="300" cy="300" r="194" fill="none" stroke="rgba(28,33,36,0.9)" strokeWidth="22" />
          {Array.from({ length: 12 }).map((_, index) => {
            const angle = (index * 30 * Math.PI) / 180;
            const x = roundSvg(300 + Math.cos(angle) * 182);
            const y = roundSvg(300 + Math.sin(angle) * 182);
            return (
              <rect
                key={`outer-pill-${index}`}
                x={x - 18}
                y={y - 6}
                width="36"
                height="12"
                rx="6"
                fill="rgba(54,58,62,0.88)"
                stroke="rgba(111,118,123,0.4)"
                strokeWidth="1"
                transform={`rotate(${index * 30} ${x} ${y})`}
              />
            );
          })}
        </g>

        <circle cx="300" cy="300" r="174" fill="none" stroke="rgba(29,40,31,0.95)" strokeWidth="9" />

        <g className="omx-green-cw" filter="url(#omxSoftGlow)">
          <circle
            cx="300"
            cy="300"
            r="164"
            fill="none"
            stroke="#69ff35"
            strokeWidth="11"
            strokeDasharray="38 17"
            strokeLinecap="round"
          />
        </g>

        <circle cx="300" cy="300" r="148" fill="none" stroke="rgba(13,22,14,0.98)" strokeWidth="16" />

        <g className="omx-ticks">
          {Array.from({ length: 48 }).map((_, index) => {
            const angle = (index * 7.5 * Math.PI) / 180;
            const inner = 136;
            const outer = index % 2 === 0 ? 146 : 142;
            const x1 = roundSvg(300 + Math.cos(angle) * inner);
            const y1 = roundSvg(300 + Math.sin(angle) * inner);
            const x2 = roundSvg(300 + Math.cos(angle) * outer);
            const y2 = roundSvg(300 + Math.sin(angle) * outer);
            return (
              <line
                key={`tick-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(82,113,78,0.52)"
                strokeWidth={index % 2 === 0 ? 2 : 1}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        <g className="omx-green-inner-cw" filter="url(#omxSoftGlow)">
          <circle
            cx="300"
            cy="300"
            r="118"
            fill="none"
            stroke="#69ff35"
            strokeWidth="8"
            strokeDasharray="18 13"
            strokeLinecap="round"
          />
        </g>

        <circle cx="300" cy="300" r="98" fill="url(#omxInnerDark)" />
        <circle
          cx="300"
          cy="300"
          r="102"
          fill="none"
          stroke="rgba(94,255,72,0.18)"
          strokeWidth="6"
          filter="url(#omxSoftGlow)"
        />

        <g className="omx-core-pulse" filter="url(#omxNeonGlow)">
          <circle cx="300" cy="300" r="16" fill="rgba(133,255,80,0.2)" />
          <path d="M220 156H380L323 300H277L220 156Z" fill="url(#omxCenterGlow)" />
          <path d="M277 300H323L380 444H220L277 300Z" fill="url(#omxCenterGlow)" />
        </g>

        <g className="omx-nodes">
          <rect x="262" y="8" width="76" height="150" rx="20" fill="#0e1215" stroke="#7f878d" strokeWidth="6" />
          <rect x="274" y="10" width="52" height="145" rx="12" fill="#1d1d1d" />
          <rect x="442" y="262" width="150" height="76" rx="20" fill="#0e1215" stroke="#7f878d" strokeWidth="6" />
          <rect x="445" y="274" width="144" height="52" rx="12" fill="#1d1d1d" />
          <rect x="262" y="442" width="76" height="150" rx="20" fill="#0e1215" stroke="#7f878d" strokeWidth="6" />
          <rect x="274" y="445" width="52" height="144" rx="12" fill="#1d1d1d" />
          <rect x="8" y="262" width="150" height="76" rx="20" fill="#0e1215" stroke="#7f878d" strokeWidth="6" />
          <rect x="11" y="274" width="144" height="52" rx="12" fill="#1d1d1d" />

          <circle cx="315" cy="160" r="7" fill="rgba(64,255,87,0.75)" className="omx-blink-green" />
          <circle cx="442" cy="316" r="7" fill="rgba(255,70,70,0.8)" className="omx-blink-red" />
          <circle cx="286" cy="442" r="7" fill="rgba(64,255,87,0.75)" className="omx-blink-green" />
          <circle cx="158" cy="284" r="7" fill="rgba(255,70,70,0.8)" className="omx-blink-red" />
        </g>
      </svg>
    </div>
  );
}

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(function HeroSection(
  { isTransforming, onActivate },
  ref,
) {
  const reduceMotion = useReducedMotion();
  const [boosted, setBoosted] = useState(false);

  const triggerBoost = () => {
    setBoosted(true);
    window.setTimeout(() => setBoosted(false), 1300);
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isTransforming ? 0 : 1,
          scale: isTransforming ? 0.92 : 1,
          filter: isTransforming ? "brightness(2.2)" : "brightness(1)",
        }}
        transition={{ duration: isTransforming ? 0.35 : 0.85 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.button
          onHoverStart={() => triggerBoost()}
          whileHover={reduceMotion ? undefined : { scale: 1.018 }}
          whileTap={{ scale: 0.985 }}
          onClick={() => {
            triggerBoost();
            onActivate();
          }}
          disabled={isTransforming}
          aria-label="Activate portfolio"
          className={`omx-button ${boosted ? "boost" : ""}`}
          style={{ width: "clamp(18rem, 46vw, 33rem)", height: "clamp(18rem, 46vw, 33rem)" }}
        >
          <OmnitrixDial boosted={boosted} />
        </motion.button>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="omx-status-main">DNA SCAN COMPLETE</p>
          <p className="omx-status-sub">TAP THE CORE TO TRIGGER TRANSFORMATION</p>
        </div>
      </motion.div>
    </section>
  );
});
