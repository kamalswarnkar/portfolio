"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";
import { useDeviceTier } from "@/hooks/use-device-tier";

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  drift: number;
};

export function AlienXField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isMobile, reduceMotion } = useDeviceTier();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let frameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    let time = 0;

    const totalStars = reduceMotion
      ? Math.max(16, Math.floor(siteConfig.starCount.mobile / 2))
      : isMobile
        ? siteConfig.starCount.mobile
        : siteConfig.starCount.desktop;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      stars = Array.from({ length: totalStars }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        size: Math.random() * 1.8 + 0.4,
        drift: (Math.random() - 0.5) * 0.08,
      }));
    };

    const render = () => {
      time += 0.003;
      context.clearRect(0, 0, width, height);

      const nebulaA = context.createRadialGradient(
        width * 0.24,
        height * 0.28,
        0,
        width * 0.24,
        height * 0.28,
        width * 0.46,
      );
      nebulaA.addColorStop(0, `rgba(255,255,255,${siteConfig.nebulaOpacity * 0.22})`);
      nebulaA.addColorStop(0.28, `rgba(64,86,255,${siteConfig.nebulaOpacity * 0.32})`);
      nebulaA.addColorStop(0.6, `rgba(26,10,60,${siteConfig.nebulaOpacity * 0.24})`);
      nebulaA.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = nebulaA;
      context.fillRect(0, 0, width, height);

      const nebulaB = context.createRadialGradient(
        width * 0.76,
        height * 0.7,
        0,
        width * 0.76,
        height * 0.7,
        width * 0.52,
      );
      nebulaB.addColorStop(0, `rgba(255,255,255,${siteConfig.nebulaOpacity * 0.12})`);
      nebulaB.addColorStop(0.24, `rgba(88,255,176,${siteConfig.nebulaOpacity * 0.12})`);
      nebulaB.addColorStop(0.52, `rgba(32,9,58,${siteConfig.nebulaOpacity * 0.36})`);
      nebulaB.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = nebulaB;
      context.fillRect(0, 0, width, height);

      stars.forEach((star, index) => {
        star.y += star.drift + star.z * 0.03;
        if (star.y > height + 12) {
          star.y = -12;
          star.x = Math.random() * width;
        }
        if (star.y < -12) {
          star.y = height + 12;
          star.x = Math.random() * width;
        }

        const twinkle = 0.35 + Math.sin(time * 18 + index) * 0.3 + star.z * 0.25;
        const radius = star.size + twinkle * 0.9;

        context.beginPath();
        context.arc(star.x, star.y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(240,248,255,${0.25 + twinkle * 0.38})`;
        context.shadowColor = "rgba(175,210,255,0.5)";
        context.shadowBlur = 10;
        context.fill();

        if (!reduceMotion && index % 11 === 0) {
          context.beginPath();
          context.moveTo(star.x - radius * 2.4, star.y);
          context.lineTo(star.x + radius * 2.4, star.y);
          context.moveTo(star.x, star.y - radius * 2.4);
          context.lineTo(star.x, star.y + radius * 2.4);
          context.strokeStyle = `rgba(225,240,255,${0.08 + twinkle * 0.1})`;
          context.lineWidth = 1;
          context.stroke();
        }
      });

      frameId = window.requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
    };
  }, [isMobile, reduceMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-70" aria-hidden="true" />;
}
