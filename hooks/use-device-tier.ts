"use client";

import { useEffect, useState } from "react";

export function useDeviceTier() {
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);

    handleResize();
    syncMotion();

    window.addEventListener("resize", handleResize);
    media.addEventListener("change", syncMotion);

    return () => {
      window.removeEventListener("resize", handleResize);
      media.removeEventListener("change", syncMotion);
    };
  }, []);

  return { isMobile, reduceMotion };
}
