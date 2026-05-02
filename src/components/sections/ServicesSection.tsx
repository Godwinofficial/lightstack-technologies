import { Code2, Smartphone, Cog, Palette } from "lucide-react";
import { SplitHeading } from "../SplitHeading";

const services = [
  {
    icon: Code2,
    title: "WEB DEVELOPMENT",
    body: "We design and build performant websites and web apps — from marketing sites to complex SaaS platforms — engineered to scale with your business.",
  },
  {
    icon: Smartphone,
    title: "MOBILE APP DEVELOPMENT",
    body: "Native and cross-platform mobile experiences for iOS and Android, crafted for speed, reliability, and delightful day-to-day usage.",
  },
  {
    icon: Cog,
    title: "CUSTOM SOFTWARE & SYSTEMS",
    body: "Bespoke internal tools, automation pipelines, and back-office systems tailored exactly to the way your team actually works.",
  },
  {
    icon: Palette,
    title: "UI / UX DESIGN & BRANDING",
    body: "Identity systems, product design, and prototypes that make complex software feel obvious and on-brand at every touchpoint.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative flex min-h-screen snap-start flex-col justify-center px-5 py-28 md:px-16"
    >
      <SplitHeading accent="What" rest="we do" as="h2" className="text-5xl md:text-7xl" />
      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <article key={s.title} className="max-w-md">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary text-primary">
                <Icon className="h-9 w-9" strokeWidth={1.6} />
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-wide text-foreground">
                {s.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
