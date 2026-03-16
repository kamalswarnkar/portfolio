"use client";

import { useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import type { SectionId } from "@/lib/site-config";

type NavItem = {
  id: SectionId;
  label: string;
};

const desktopSlots = [
  { x: 0, y: -122 },
  { x: 86, y: -86 },
  { x: 122, y: 0 },
  { x: 86, y: 86 },
  { x: 0, y: 122 },
  { x: -86, y: 86 },
  { x: -122, y: 0 },
  { x: -86, y: -86 },
];

export function OmnitrixNav({
  items,
  activeSection,
  onSelect,
}: {
  items: NavItem[];
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragEnd = () => {
    if (!anchorRef.current) {
      return;
    }

    const rect = anchorRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const safeRadius = isOpen ? 172 : 44;
    const withinBounds =
      centerX >= safeRadius &&
      centerX <= window.innerWidth - safeRadius &&
      centerY >= safeRadius &&
      centerY <= window.innerHeight - safeRadius;

    if (!withinBounds) {
      animate(x, 0, { type: "spring", stiffness: 280, damping: 24 });
      animate(y, 0, { type: "spring", stiffness: 280, damping: 24 });
    }
  };

  return (
    <>
      <motion.div
        ref={anchorRef}
        drag
        dragMomentum={false}
        dragElastic={0.08}
        style={{ x, y }}
        onDragEnd={handleDragEnd}
        className="fixed bottom-7 right-7 z-40 hidden h-20 w-20 overflow-visible xl:block"
      >
        <AnimatePresence>
          {isOpen ? (
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                key="dial"
                initial={{ opacity: 0, scale: 0.26 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.26 }}
                transition={{ duration: 0.26, ease: "easeOut" }}
                className="panel-frame relative h-full w-full rounded-full border-accent/30 bg-black/45 shadow-glow-strong"
                style={{ transformOrigin: "center center" }}
              >
                <div className="absolute inset-5 rounded-full border border-accent/25" />
                <div className="absolute inset-[4.5rem] rounded-full border border-accent/20" />

                {items.slice(0, desktopSlots.length).map((item, index) => {
                  const slot = desktopSlots[index];
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelect(item.id)}
                      className={`absolute left-1/2 top-1/2 flex h-[4.35rem] w-[4.35rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[9px] uppercase tracking-[0.2em] transition ${
                        isActive
                          ? "border-accent bg-accent text-black shadow-glow"
                          : "border-accent/30 bg-black/75 text-white/78 hover:bg-accent/15 hover:text-accent"
                      }`}
                      style={{
                        left: `calc(50% + ${slot.x}px)`,
                        top: `calc(50% + ${slot.y}px)`,
                      }}
                    >
                      <span className="max-w-[3.5rem] text-center leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen((current) => !current)}
          className={`absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-accent/40 bg-accent/10 transition ${
            isOpen ? "h-24 w-24 rounded-full" : "h-20 w-20 rounded-[1.8rem] shadow-[0_0_36px_rgba(57,255,20,0.22)]"
          }`}
        >
          {!isOpen ? (
            <div className="absolute inset-[-0.85rem] rounded-[2.4rem] bg-[radial-gradient(circle,rgba(57,255,20,0.24),transparent_60%)] blur-lg" />
          ) : null}
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 bg-black/60">
            <div className="h-6 w-6 rotate-45 border-x-[3px] border-y-[3px] border-accent shadow-[0_0_16px_rgba(57,255,20,0.45)]" />
          </div>
        </button>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100vw-1.25rem)] -translate-x-1/2 items-center gap-2 overflow-x-auto rounded-full border border-accent/30 bg-black/60 px-3 py-2 backdrop-blur-xl xl:hidden hide-scrollbar"
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`shrink-0 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.24em] ${
              activeSection === item.id
                ? "bg-accent text-black shadow-glow"
                : "bg-white/5 text-white/80"
            }`}
          >
            {item.label}
          </button>
        ))}
      </motion.nav>
    </>
  );
}
