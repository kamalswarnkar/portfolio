"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useDeviceTier } from "@/hooks/use-device-tier";

export function OmnitrixCore({ isTransforming = false }: { isTransforming?: boolean }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { isMobile, reduceMotion } = useDeviceTier();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    const size = isMobile ? 200 : 320;
    renderer.setPixelRatio(1); // Always 1 — this is a decorative overlay, no need for HiDPI
    renderer.setSize(size, size);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight("#61ff4c", 0.5);
    const point = new THREE.PointLight("#39ff14", 4, 18);
    point.position.set(0, 0, 6);
    scene.add(ambient, point);

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: "#0e0e0e",
      emissive: "#2fff2f",
      emissiveIntensity: 0.5,
      metalness: 0.85,
      roughness: 0.25,
    });

    // Simplified scene — only two rings + core disc (removed wedges, hourglass blades, clamps)
    const outerRing = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.22, 12, 48), ringMaterial);
    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.38, 0.12, 8, 48), ringMaterial);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: "#111111",
      emissive: "#5fff4c",
      emissiveIntensity: 1.2,
      metalness: 0.5,
      roughness: 0.2,
    });
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.2, 24), coreMaterial);
    core.rotation.x = Math.PI / 2;

    scene.add(outerRing, innerRing, core);

    let frameId = 0;
    // Cap at 20 FPS — this is a very faint overlay (opacity ~0.15), 20fps is imperceptible
    const TARGET_INTERVAL = 1000 / 20;
    let lastTime = 0;

    const render = (timestamp: number) => {
      frameId = requestAnimationFrame(render);
      if (timestamp - lastTime < TARGET_INTERVAL) return;
      lastTime = timestamp;

      if (!reduceMotion) {
        outerRing.rotation.z += isTransforming ? 0.04 : 0.005;
        innerRing.rotation.z -= isTransforming ? 0.05 : 0.007;
      }

      const t = Date.now();
      const scale = 1 + Math.sin(t * 0.002) * (isTransforming ? 0.08 : 0.02);
      core.scale.setScalar(scale);
      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      outerRing.geometry.dispose();
      innerRing.geometry.dispose();
      core.geometry.dispose();
      ringMaterial.dispose();
      coreMaterial.dispose();
      renderer.dispose();
    };
  }, [isMobile, reduceMotion, isTransforming]);

  return <div ref={mountRef} className="relative mx-auto h-[200px] w-[200px] md:h-[320px] md:w-[320px]" />;
}
