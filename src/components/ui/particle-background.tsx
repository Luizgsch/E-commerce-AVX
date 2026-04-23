"use client";

import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export type ParticleBackgroundProps = {
  variant?: "fullscreen" | "section";
  /** Unique id per instance (section must differ from global `tsparticles`). */
  id?: string;
  className?: string;
};

export default function ParticleBackground({
  variant = "fullscreen",
  id = "tsparticles",
  className = "",
}: ParticleBackgroundProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (): Promise<void> => {};

  const options: ISourceOptions = useMemo(() => {
    const isSection = variant === "section";
    return {
      fullScreen: {
        enable: !isSection,
        zIndex: 0,
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        detect_on: "window",
        events: {
          onHover: {
            enable: false,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 150,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#00E5FF",
        },
        links: {
          enable: false,
        },
        move: {
          direction: "top",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: { min: isSection ? 0.15 : 0.3, max: isSection ? 0.45 : 1 },
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: isSection ? 55 : 300,
        },
        opacity: {
          value: { min: isSection ? 0.08 : 0.2, max: isSection ? 0.28 : 0.6 },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: isSection ? 2 : 3 },
        },
      },
      detectRetina: true,
    };
  }, [variant]);

  if (!init) return null;

  if (variant === "section") {
    return (
      <div
        className={`pointer-events-none absolute inset-0 z-[1] ${className}`.trim()}
        aria-hidden
      >
        <Particles
          id={id}
          particlesLoaded={particlesLoaded}
          options={options}
          className="size-full"
        />
      </div>
    );
  }

  return (
    <Particles id={id} particlesLoaded={particlesLoaded} options={options} />
  );
}
