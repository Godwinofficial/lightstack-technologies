import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen snap-start items-center justify-center overflow-hidden px-5 py-28 md:px-16"
      style={{ background: "var(--color-background)" }}
    >
      {/* Dynamic Animated Centered Glow */}
      {/* <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[150px] mix-blend-screen pointer-events-none"
      /> */}

      {/* Optional Noise/Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      ></div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">

        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-primary/80">
          Engineering beyond code
        </p>

        <h1 className="text-6xl font-black leading-[0.9] tracking-tighter md:text-8xl lg:text-[10rem] italic mix-blend-plus-lighter text-foreground">
          Light<span className="text-primary">stack</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg md:text-2xl text-foreground/70 font-medium tracking-wide">
          We craft scalable, high-performance digital solutions that elevate your business beyond standard software development.
        </p>

        <button
          type="button"
          className="group mt-16 flex flex-col items-center gap-4 text-foreground transition-transform hover:-translate-y-1"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/40 bg-primary/10 transition-all group-hover:bg-primary group-hover:shadow-[0_0_30px_0_var(--color-primary)] backdrop-blur-md">
            <Play className="h-8 w-8 fill-current translate-x-0.5 text-foreground" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80 group-hover:text-primary transition-colors">
            Play Video Reel
          </span>
        </button>

      </div>
    </section>
  );
}

// Animated counter helper used in stats
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}
