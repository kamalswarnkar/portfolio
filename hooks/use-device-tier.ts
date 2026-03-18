"use client";

import { useEffect, useRef, useState } from "react";

export function useDeviceTier() {
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const syncMobile = () => setIsMobile(window.innerWidth < 768);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);

    syncMobile();
    syncMotion();

    // Debounced resize — prevents canvas re-initializations on every resize pixel
    const handleResize = () => {
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(syncMobile, 150);
    };

    window.addEventListener("resize", handleResize);
    media.addEventListener("change", syncMotion);

    return () => {
      window.removeEventListener("resize", handleResize);
      media.removeEventListener("change", syncMotion);
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
    };
  }, []);

  return { isMobile, reduceMotion };
}
