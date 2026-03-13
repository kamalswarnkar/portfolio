"use client";

import { useCallback } from "react";

export function useActivationSound() {
  return useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const context = new AudioContext();
    const now = context.currentTime;
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-26, now);
    compressor.knee.setValueAtTime(20, now);
    compressor.ratio.setValueAtTime(8, now);
    compressor.attack.setValueAtTime(0.003, now);
    compressor.release.setValueAtTime(0.28, now);

    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.42, now + 0.06);
    master.gain.exponentialRampToValueAtTime(0.28, now + 1.9);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
    master.connect(compressor);
    compressor.connect(context.destination);

    const createSweep = ({
      type,
      start,
      peak,
      end,
      attack,
      release,
      detune = 0,
      volume = 0.12,
    }: {
      type: OscillatorType;
      start: number;
      peak: number;
      end: number;
      attack: number;
      release: number;
      detune?: number;
      volume?: number;
    }) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();

      oscillator.type = type;
      oscillator.detune.setValueAtTime(detune, now);
      oscillator.frequency.setValueAtTime(start, now);
      oscillator.frequency.exponentialRampToValueAtTime(peak, now + attack);
      oscillator.frequency.exponentialRampToValueAtTime(end, now + release);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(420, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + attack);
      filter.Q.value = 2.2;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(volume * 0.55, now + release * 0.68);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + release);

      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      oscillator.start(now);
      oscillator.stop(now + release + 0.02);
    };

    createSweep({
      type: "sawtooth",
      start: 120,
      peak: 640,
      end: 210,
      attack: 0.18,
      release: 1.7,
      volume: 0.19,
    });

    createSweep({
      type: "triangle",
      start: 220,
      peak: 1180,
      end: 280,
      attack: 0.2,
      release: 1.7,
      detune: 8,
      volume: 0.16,
    });

    createSweep({
      type: "sine",
      start: 310,
      peak: 540,
      end: 180,
      attack: 0.42,
      release: 2.8,
      detune: -6,
      volume: 0.12,
    });

    createSweep({
      type: "square",
      start: 160,
      peak: 420,
      end: 120,
      attack: 0.65,
      release: 2.6,
      detune: 4,
      volume: 0.07,
    });

    const sub = context.createOscillator();
    const subGain = context.createGain();
    const subFilter = context.createBiquadFilter();
    sub.type = "sine";
    sub.frequency.setValueAtTime(54, now);
    sub.frequency.exponentialRampToValueAtTime(88, now + 0.24);
    sub.frequency.exponentialRampToValueAtTime(46, now + 1.8);
    subFilter.type = "lowpass";
    subFilter.frequency.setValueAtTime(180, now);
    subGain.gain.setValueAtTime(0.0001, now);
    subGain.gain.exponentialRampToValueAtTime(0.28, now + 0.06);
    subGain.gain.exponentialRampToValueAtTime(0.11, now + 1.4);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.55);
    sub.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(master);
    sub.start(now);
    sub.stop(now + 2.6);

    const pulseOsc = context.createOscillator();
    const pulseGain = context.createGain();
    pulseOsc.type = "square";
    pulseOsc.frequency.setValueAtTime(440, now + 0.62);
    pulseOsc.frequency.exponentialRampToValueAtTime(145, now + 0.94);
    pulseGain.gain.setValueAtTime(0.0001, now);
    pulseGain.gain.exponentialRampToValueAtTime(0.22, now + 0.68);
    pulseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.02);
    pulseOsc.connect(pulseGain);
    pulseGain.connect(master);
    pulseOsc.start(now + 0.58);
    pulseOsc.stop(now + 1.04);

    const pulseOsc2 = context.createOscillator();
    const pulseGain2 = context.createGain();
    pulseOsc2.type = "sawtooth";
    pulseOsc2.frequency.setValueAtTime(390, now + 1.46);
    pulseOsc2.frequency.exponentialRampToValueAtTime(120, now + 1.92);
    pulseGain2.gain.setValueAtTime(0.0001, now);
    pulseGain2.gain.exponentialRampToValueAtTime(0.18, now + 1.5);
    pulseGain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.02);
    pulseOsc2.connect(pulseGain2);
    pulseGain2.connect(master);
    pulseOsc2.start(now + 1.42);
    pulseOsc2.stop(now + 2.04);

    const noiseBuffer = context.createBuffer(1, context.sampleRate * 2.4, context.sampleRate);
    const channel = noiseBuffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) {
      channel[index] = (Math.random() * 2 - 1) * (1 - index / channel.length);
    }

    const noise = context.createBufferSource();
    const noiseFilter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    noise.buffer = noiseBuffer;
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(720, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(4800, now + 1.4);
    noiseFilter.Q.value = 0.9;
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.08, now + 0.16);
    noiseGain.gain.exponentialRampToValueAtTime(0.034, now + 1.55);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start(now);

    window.setTimeout(() => {
      void context.close();
    }, 3400);
  }, []);
}
