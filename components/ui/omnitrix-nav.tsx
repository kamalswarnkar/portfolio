"use client";

import { motion } from "framer-motion";
import type { SectionId } from "@/lib/site-config";

type NavItem = {
  id: SectionId;
  label: string;
};

const desktopSlots = [
  { x: 0, y: -110 },
  { x: 95, y: -40 },
  { x: 95, y: 40 },
  { x: 0, y: 110 },
  { x: -95, y: 40 },
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
  return (
    <>
      <div className="fixed bottom-8 right-8 z-40 hidden md:block">
        <div className="panel-frame relative h-72 w-72 rounded-full border-accent/30 bg-black/45 shadow-glow-strong">
          <div className="absolute inset-5 rounded-full border border-accent/25" />
          <div className="absolute inset-[4.5rem] rounded-full border border-accent/20" />
          <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 bg-black/60">
              <div className="h-6 w-6 rotate-45 border-x-[3px] border-y-[3px] border-accent" />
            </div>
          </div>

          {items.slice(0, desktopSlots.length).map((item, index) => {
            const slot = desktopSlots[index];
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onSelect(item.id)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className={`absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[10px] uppercase tracking-[0.24em] transition ${
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
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.nav
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-2 overflow-x-auto rounded-full border border-accent/30 bg-black/60 px-3 py-2 backdrop-blur-xl md:hidden hide-scrollbar"
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
