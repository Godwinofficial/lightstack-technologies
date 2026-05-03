import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen snap-start items-center overflow-hidden px-5 pt-28 md:px-16 md:pt-32"
      style={{ background: "var(--gradient-hero)" }}
    >

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-6xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
          <span className="text-primary">Welcome,</span>
          <br />
          <span className="text-foreground">to</span>
          <br />
          <span className="text-foreground">Lightstack</span>
        </h1>
        <p className="mt-8 max-w-md text-xl font-semibold text-foreground/90 md:text-2xl">
          Engineering Beyond Code
        </p>

        <button
          type="button"
          className="group mt-16 flex items-center gap-5 text-foreground"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground/80 transition-all group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/10">
            <Play className="h-6 w-6 fill-current" />
          </span>
          <span className="text-lg">Video Showcase</span>
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
