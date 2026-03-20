"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

type HeroSectionProps = {
  isTransforming: boolean;
  onActivate: () => void;
};

// ── Pure-CSS animated dashed SVG ring (no re-renders) ───────────────────────
function DashedRing({
  radius,
  strokeWidth,
  dashArray,
  className,
  speedDeg,      // degrees/second, negative = CCW
  isTransforming,
}: {
  radius: number;
  strokeWidth: number;
  dashArray: string;
  className?: string;
  speedDeg: number;
  isTransforming: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const rot = useRef(0);

  useAnimationFrame((_, delta) => {
    if (!ref.current) return;
    const speed = isTransforming ? speedDeg * 5 : speedDeg;
    rot.current = (rot.current + speed * (delta / 1000)) % 360;
    ref.current.style.transform = `rotate(${rot.current}deg)`;
  });

  const size = (radius + strokeWidth) * 2;
  const cx = size / 2;

  return (
    <svg
      ref={ref}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible ${className ?? ""}`}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ willChange: "transform" }}
    >
      <circle
        cx={cx}
        cy={cx}
        r={radius}
        fill="none"
        stroke="rgba(57,255,20,0.72)"
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Metallic cardinal clamp ──────────────────────────────────────────────────
function Clamp({ position }: { position: "top" | "bottom" | "left" | "right" }) {
  const base =
    "absolute z-20 flex items-center justify-center rounded-[0.55rem] border-2 border-[#5a5a5a]/80 bg-gradient-to-b from-[#3a3a3a] to-[#1c1c1c] shadow-[0_2px_12px_rgba(0,0,0,0.7)]";
  const pos: Record<string, string> = {
    top:    "left-1/2 -translate-x-1/2 top-[-2.1rem] h-[4.2rem] w-[3.4rem]",
    bottom: "left-1/2 -translate-x-1/2 bottom-[-2.1rem] h-[4.2rem] w-[3.4rem]",
    left:   "top-1/2 -translate-y-1/2 left-[-2.1rem] h-[3.4rem] w-[4.2rem]",
    right:  "top-1/2 -translate-y-1/2 right-[-2.1rem] h-[3.4rem] w-[4.2rem]",
  };
  const isVertical = position === "top" || position === "bottom";
  const dotStyle: Record<string, React.CSSProperties> = {
    top:    { top: 4 },
    bottom: { bottom: 4 },
    left:   { left: 4 },
    right:  { right: 4 },
  };

  return (
    <div className={`${base} ${pos[position]}`}>
      <div className={`rounded-sm bg-[#2a2a2a] ${isVertical ? "h-[60%] w-[35%]" : "h-[35%] w-[60%]"}`} />
      <div
        className="absolute h-[5px] w-[5px] rounded-full bg-red-500/70 shadow-[0_0_6px_rgba(255,60,60,0.7)]"
        style={dotStyle[position]}
      />
    </div>
  );
}

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(function HeroSection(
  { isTransforming, onActivate },
  ref,
) {
  const [scanPhase, setScanPhase] = useState<"scanning" | "done">("scanning");

  useEffect(() => {
    if (isTransforming) return;
    const t = window.setTimeout(() => setScanPhase("done"), 2200);
    return () => window.clearTimeout(t);
  }, [isTransforming]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-6"
    >
      {/* ── Deep space background ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(10,30,10,0.95),#000_75%)]" />
      {/* subtle scanline bands */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(57,255,20,0.04) 3px,rgba(57,255,20,0.04) 4px)",
        }}
      />
      {/* Floating UI debris — CSS animation, GPU only */}
      <div className="hero-debris-1 pointer-events-none absolute top-[12%] right-[8%] h-[2.4rem] w-[2.4rem] rounded-sm border border-accent/30 bg-accent/5" />
      <div className="hero-debris-2 pointer-events-none absolute top-[22%] right-[13%] h-[1.5rem] w-[1.5rem] rounded-sm border border-accent/20 bg-accent/5" />
      <div className="hero-debris-3 pointer-events-none absolute top-[32%] right-[6%] h-[1.8rem] w-[1.8rem] rounded-sm border border-accent/15 bg-accent/5" />
      {/* Orange glyph bars (CSS animation) */}
      <div className="hero-glyph pointer-events-none absolute left-[5%] top-[35%] flex flex-col gap-[5px] opacity-35">
        {[28, 20, 14].map((h, i) => (
          <div key={i} className="rounded-full bg-orange-400" style={{ width: 6, height: h }} />
        ))}
      </div>

      {/* ── Main watch + text ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{
          opacity: isTransforming ? 0 : 1,
          scale: isTransforming ? 0.88 : 1,
          filter: isTransforming ? "brightness(2.4)" : "brightness(1)",
        }}
        transition={{ duration: isTransforming ? 0.38 : 1.1 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* ── Omnitrix clickable button ── */}
        <motion.button
          whileHover={{ scale: 1.018 }}
          whileTap={{ scale: 0.975 }}
          onClick={onActivate}
          disabled={isTransforming}
          aria-label="Activate portfolio"
          animate={{
            scale: isTransforming ? [1, 0.95, 1.1] : 1,
            rotate: isTransforming ? [0, -8, 0, 6, 0] : 0,
          }}
          transition={{ duration: 0.72, ease: "easeInOut" }}
          className="group relative"
          style={{ width: "clamp(16rem, 42vw, 30rem)", height: "clamp(16rem, 42vw, 30rem)" }}
        >
          {/* Conic scan glow — CSS animation, compositor-only */}
          <div
            className="scan-glow-ring pointer-events-none absolute inset-[-3rem] rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg,transparent 0%,rgba(57,255,20,0.06) 10%,rgba(57,255,20,0.18) 20%,transparent 30%,transparent 50%,rgba(57,255,20,0.10) 70%,transparent 80%)",
              willChange: "transform",
            }}
          />
          {/* soft glow halo */}
          <div className="absolute inset-[-1.5rem] rounded-full bg-[radial-gradient(circle,rgba(57,255,20,0.2),rgba(57,255,20,0.05)_40%,transparent_68%)] blur-xl" />

          {/* Outermost dark metallic bezel */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 40% 35%, #2c2c2c, #0f0f0f 55%, #050505)",
              boxShadow:
                "0 0 0 3px #383838, 0 0 0 5px #111, 0 8px 48px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.06)",
            }}
          />

          {/* 4 cardinal clamps */}
          {(["top", "bottom", "left", "right"] as const).map((pos) => (
            <Clamp key={pos} position={pos} />
          ))}

          {/* Outer thick dark ring */}
          <div
            className="absolute inset-[6%] rounded-full"
            style={{
              background: "radial-gradient(circle at 38% 32%, #222, #0c0c0c 62%, #060606)",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.8), 0 0 0 2px #1a1a1a",
            }}
          />

          {/* Animated dashed ring — outer */}
          <DashedRing
            radius={41}
            strokeWidth={2.5}
            dashArray="6 5"
            speedDeg={22}
            isTransforming={isTransforming}
            className="inset-[7%]"
          />

          {/* Inner accent band */}
          <div
            className="absolute inset-[13%] rounded-full border-[3px] border-accent/20"
            style={{ boxShadow: "0 0 18px rgba(57,255,20,0.12) inset" }}
          />

          {/* Animated dashed ring — inner, counter-rotate */}
          <DashedRing
            radius={34}
            strokeWidth={2}
            dashArray="4 4"
            speedDeg={-18}
            isTransforming={isTransforming}
            className="inset-[16%]"
          />

          {/* Middle dark zone */}
          <div
            className="absolute inset-[22%] rounded-full"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(16,36,16,0.9), #08080a 70%)",
              boxShadow: "inset 0 0 28px rgba(57,255,20,0.09)",
            }}
          />

          {/* Inner glowing green core — CSS pulse animation */}
          <div
            className="core-glow absolute inset-[28%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 44% 40%, rgba(140,255,90,0.82), rgba(57,255,20,0.9) 35%, rgba(20,100,10,0.7) 70%, rgba(4,16,4,0.95))",
              willChange: "box-shadow",
            }}
          />

          {/* Hourglass / X symbol — SVG for precise control */}
          <div className="absolute inset-[28%] flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {/* Hourglass shape: two triangles meeting at center */}
              <polygon
                points="28,18 72,18 50,50"
                fill="black"
              />
              <polygon
                points="28,82 72,82 50,50"
                fill="black"
              />
              {/* slim vertical spine */}
              <rect x="46" y="18" width="8" height="64" rx="2" fill="black" />
            </svg>
            {/* center white dot */}
            <div
              className="core-dot relative z-10 h-[12%] w-[12%] rounded-full bg-white"
              style={{ boxShadow: "0 0 8px rgba(255,255,255,0.9)", willChange: "opacity" }}
            />
          </div>

          {/* Hover ring */}
          <div className="absolute inset-0 rounded-full opacity-0 ring-2 ring-accent/40 ring-offset-4 ring-offset-black transition-opacity duration-300 group-hover:opacity-100" />
        </motion.button>

        {/* ── Bottom text ── */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <motion.p
            key={scanPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-center font-display text-sm uppercase tracking-[0.48em] text-accent sm:text-base md:text-lg"
          >
            {scanPhase === "scanning" ? "Initializing DNA Scan..." : "DNA Scan Complete"}
          </motion.p>

          {/* scanning bar */}
          <motion.div
            className="h-px w-44 overflow-hidden rounded-full bg-accent/20"
            animate={{ opacity: scanPhase === "done" ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="h-full w-1/3 bg-accent/80"
              animate={{ x: ["0%", "200%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: scanPhase === "done" ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center text-xs uppercase tracking-[0.32em] text-white/48 sm:tracking-[0.44em] md:text-sm"
          >
            Tap the core to trigger transformation
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
});
