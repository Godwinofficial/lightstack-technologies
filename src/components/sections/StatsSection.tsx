import { useEffect, useRef, useState } from "react";
import { SplitHeading } from "../SplitHeading";

const stats = [
  { label: "Projects Delivered", value: "15", pct: 85 },
  { label: "Lines of Code Shipped", value: "1M", pct: 92 },
  { label: "Active Users Served", value: "50K", pct: 78 },
  { label: "Uptime Maintained", value: "99.9%", pct: 99 },
];

function Bar({ pct, delay }: { pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="h-4 w-full overflow-hidden rounded-sm bg-foreground/10">
      <div
        className="h-full rounded-sm bg-primary transition-[width] duration-[1400ms] ease-out"
        style={{ width: seen ? `${pct}%` : "0%", transitionDelay: `${delay}ms` }}
      />
    </div>
  );
}

export function StatsSection() {
  return (
    <section
      id="stats"
      className="relative flex min-h-screen snap-start flex-col justify-center px-5 py-28 md:px-16"
    >
      <SplitHeading
        accent="Some of our"
        rest="statistics"
        as="h2"
        className="text-5xl md:text-7xl"
      />
      <p className="mt-4 text-sm uppercase tracking-widest text-muted-foreground">
        Here is some of our key statistics
      </p>

      <div className="mt-14 flex flex-col gap-10 md:mt-20">
        {stats.map((s, i) => (
          <div key={s.label}>
            <div className="mb-3 flex items-end justify-between">
              <span className="text-lg font-semibold text-foreground md:text-xl">
                {s.label}
              </span>
              <span className="text-2xl font-bold text-foreground md:text-3xl">
                {s.value}
              </span>
            </div>
            <Bar pct={s.pct} delay={i * 150} />
          </div>
        ))}
      </div>
    </section>
  );
}
