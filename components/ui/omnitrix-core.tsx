"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useDeviceTier } from "@/hooks/use-device-tier";

export function OmnitrixCore({ isTransforming = false }: { isTransforming?: boolean }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { isMobile, reduceMotion } = useDeviceTier();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    const size = isMobile ? 280 : 420;
    // Cap pixel ratio at 1.5 to reduce GPU fragment shader load
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(size, size);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight("#61ff4c", 0.55);
    const point = new THREE.PointLight("#39ff14", 5, 20);
    point.position.set(0, 0, 6);
    scene.add(ambient, point);

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: "#0e0e0e",
      emissive: "#2fff2f",
      emissiveIntensity: 0.55,
      metalness: 0.88,
      roughness: 0.22,
    });

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: "#111111",
      emissive: "#5fff4c",
      emissiveIntensity: 1.45,
      metalness: 0.6,
      roughness: 0.2,
    });

    const outerRing = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.24, 16, 64), ringMaterial);
    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.14, 12, 64), ringMaterial);
    const core = new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.02, 0.26, 32), coreMaterial);
    core.rotation.x = Math.PI / 2;

    scene.add(outerRing, innerRing, core);

    const wedges = new THREE.Group();
    const wedgeGeometry = new THREE.BoxGeometry(0.22, 0.58, 0.24);
    for (let index = 0; index < 8; index += 1) {
      const wedge = new THREE.Mesh(wedgeGeometry, coreMaterial);
      const angle = (Math.PI * 2 * index) / 8;
      wedge.position.set(Math.cos(angle) * 1.75, Math.sin(angle) * 1.75, 0);
      wedge.rotation.z = angle;
      wedges.add(wedge);
    }
    scene.add(wedges);

    const hourglassMaterial = new THREE.MeshStandardMaterial({
      color: "#39ff14",
      emissive: "#7bff5b",
      emissiveIntensity: 1.75,
      metalness: 0.25,
      roughness: 0.22,
    });

    const hourglass = new THREE.Group();
    const centerBar = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.55, 0.22), hourglassMaterial);
    const topBlade = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.48, 0.22), hourglassMaterial);
    const bottomBlade = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.48, 0.22), hourglassMaterial);
    topBlade.position.y = -0.5;
    bottomBlade.position.y = 0.5;
    topBlade.rotation.z = Math.PI / 4;
    bottomBlade.rotation.z = -Math.PI / 4;
    hourglass.add(centerBar, topBlade, bottomBlade);
    scene.add(hourglass);

    const clamps = new THREE.Group();
    const clampGeometry = new THREE.BoxGeometry(0.48, 1.1, 0.32);
    const clampOffsets = [
      [0, 2.32, 0],
      [0, -2.32, 0],
      [2.32, 0, 0],
      [-2.32, 0, 0],
    ] as const;
    clampOffsets.forEach(([x, y, z], index) => {
      const clamp = new THREE.Mesh(clampGeometry, ringMaterial);
      clamp.position.set(x, y, z);
      clamp.rotation.z = index > 1 ? Math.PI / 2 : 0;
      clamps.add(clamp);
    });
    scene.add(clamps);

    let frameId = 0;
    // Cap Three.js to 30 FPS — this is an ornamental element, 60 FPS is wasteful
    const TARGET_INTERVAL = 1000 / 30;
    let lastTime = 0;

    const render = (timestamp: number) => {
      frameId = requestAnimationFrame(render);
      if (timestamp - lastTime < TARGET_INTERVAL) return;
      lastTime = timestamp;

      outerRing.rotation.z += isTransforming ? 0.045 : 0.006;
      innerRing.rotation.z -= isTransforming ? 0.055 : 0.008;

      if (!reduceMotion) {
        wedges.rotation.z += isTransforming ? 0.05 : 0.004;
        hourglass.rotation.z += isTransforming ? 0.035 : 0.006;
      }

      const t = Date.now();
      const scale = 1 + Math.sin(t * 0.003) * (isTransforming ? 0.1 : 0.03);
      core.scale.setScalar(scale);
      hourglass.scale.setScalar(1 + Math.sin(t * 0.004) * 0.02);
      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeChild(renderer.domElement);
      outerRing.geometry.dispose();
      innerRing.geometry.dispose();
      core.geometry.dispose();
      wedgeGeometry.dispose();
      clampGeometry.dispose();
      ringMaterial.dispose();
      coreMaterial.dispose();
      hourglassMaterial.dispose();
      renderer.dispose();
    };
  }, [isMobile, reduceMotion, isTransforming]);

  return <div ref={mountRef} className="relative mx-auto h-[280px] w-[280px] md:h-[420px] md:w-[420px]" />;
}
