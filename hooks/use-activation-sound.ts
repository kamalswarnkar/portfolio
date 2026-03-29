"use client";

import { useCallback, useEffect } from "react";

const ACTIVATION_SOUND_SRC = "/assets/ben_10_classic.mp3";
const ACTIVATION_SOUND_START_SECONDS = 1;
export const ACTIVATION_SOUND_CLIP_MS = 4000;

let activationAudio: HTMLAudioElement | null = null;
let stopTimer: number | null = null;

function ensureActivationAudio() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!activationAudio) {
    activationAudio = new Audio(ACTIVATION_SOUND_SRC);
    activationAudio.preload = "auto";
  }

  return activationAudio;
}

export function useActivationSound() {
  useEffect(() => {
    const audio = ensureActivationAudio();
    if (!audio) {
      return;
    }

    audio.load();
  }, []);

  return useCallback(() => {
    const audio = ensureActivationAudio();
    if (!audio) {
      return;
    }

    if (stopTimer) {
      window.clearTimeout(stopTimer);
      stopTimer = null;
    }

    const startPlayback = () => {
      audio.pause();
      audio.currentTime = ACTIVATION_SOUND_START_SECONDS;
      audio.volume = 0.82;

      void audio.play().catch(() => {
        // Ignore playback errors from rapid repeated clicks.
      });

      stopTimer = window.setTimeout(() => {
        audio.pause();
        audio.currentTime = ACTIVATION_SOUND_START_SECONDS;
        stopTimer = null;
      }, ACTIVATION_SOUND_CLIP_MS);
    };

    if (audio.readyState >= 1 && Number.isFinite(audio.duration) && audio.duration > ACTIVATION_SOUND_START_SECONDS) {
      startPlayback();
      return;
    }

    const handleReady = () => {
      audio.removeEventListener("loadedmetadata", handleReady);
      startPlayback();
    };

    audio.addEventListener("loadedmetadata", handleReady, { once: true });
    audio.load();
  }, []);
}
