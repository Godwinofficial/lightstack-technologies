import { ArrowUpRight } from "lucide-react";
import { SplitHeading } from "../SplitHeading";

const projects = [
  { name: "NORTHWIND PAY", category: "Fintech Dashboard", color: "oklch(0.68 0.19 45)" },
  { name: "CARGOFLOW", category: "Logistics Mobile App", color: "oklch(0.65 0.18 200)" },
  { name: "MERIDIAN HEALTH", category: "Telemedicine Platform", color: "oklch(0.7 0.16 150)" },
  { name: "STUDIO ATLAS", category: "Creative Agency Site", color: "oklch(0.72 0.18 320)" },
  { name: "ORBIT LMS", category: "Education SaaS", color: "oklch(0.75 0.16 90)" },
  { name: "VAULTKEEP", category: "Crypto Custody Tool", color: "oklch(0.68 0.19 45)" },
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
      <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.name}
            className="group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-foreground/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
          >
            <div
              className="mb-8 h-2 w-12 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            <h3 className="text-xl font-extrabold tracking-wide text-primary">
              {p.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.category}</p>
            <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-foreground/40 transition-all group-hover:text-primary" />
          </article>
        ))}
      </div>
    </section>
  );
}
