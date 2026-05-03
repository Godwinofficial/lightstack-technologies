import { ArrowUpRight, Clock } from "lucide-react";
import { SplitHeading } from "../SplitHeading";

interface Project {
  name: string;
  category: string;
  description: string;
  color: string;
  live?: boolean;
  url?: string;
}

const projects: Project[] = [
  {
    name: "ZELLION HOMES",
    category: "Real Estate & Short Stays",
    description:
      "A premium platform for discovering and booking digital houses and short-stay accommodations nearby.",
    color: "oklch(0.68 0.19 45)",
    live: true,
    url: "https://zellionhomes.com",
  },
  {
    name: "SAVE ME A SEAT ZAMBIA",
    category: "Digital Invitations Platform",
    description:
      "Elegant digital invitation experiences for corporate events, weddings, birthdays, and every celebration in between.",
    color: "oklch(0.7 0.16 150)",
    live: true,
    url: "https://savemeaseatzambia.com",
  },
  {
    name: "SCHOOL MANAGEMENT SYSTEM",
    category: "EdTech / SaaS",
    description:
      "A comprehensive platform for managing students, staff, grades, timetables, and school operations end-to-end.",
    color: "oklch(0.65 0.18 200)",
    live: false,
  },
  {
    name: "CRYPTO SYSTEM",
    category: "Fintech / Web3",
    description:
      "A secure, full-featured crypto trading and asset management system built for modern digital finance.",
    color: "oklch(0.72 0.18 320)",
    live: false,
  },
];

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative flex min-h-screen snap-start flex-col justify-center px-5 py-28 md:px-16"
    >
      <SplitHeading
        accent="Past"
        rest="projects"
        as="h2"
        className="text-5xl md:text-7xl"
      />
      <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2">
        {projects.map((p) => {
          const Card = (
            <article
              key={p.name}
              className="group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-foreground/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
            >
              {/* colour bar */}
              <div
                className="mb-6 h-1.5 w-14 rounded-full"
                style={{ backgroundColor: p.color }}
              />

              {/* live / coming-soon badge */}
              {p.live ? (
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Live
                </span>
              ) : (
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-muted-foreground/20 bg-muted-foreground/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Coming Soon
                </span>
              )}

              <h3 className="mt-1 text-xl font-extrabold tracking-wide text-primary">
                {p.name}
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-widest text-primary/50">
                {p.category}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>

              {p.live && (
                <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-foreground/30 transition-all group-hover:text-primary" />
              )}
            </article>
          );

          return p.live && p.url ? (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {Card}
            </a>
          ) : (
            <div key={p.name}>{Card}</div>
          );
        })}
      </div>
    </section>
  );
}
