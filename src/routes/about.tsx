import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Lightstack" },
      {
        name: "description",
        content:
          "Lightstack is a software engineering studio building production systems for teams across three continents.",
      },
      { property: "og:title", content: "About | Lightstack" },
      {
        property: "og:description",
        content:
          "Our vision, our reach, and the numbers behind Lightstack's work.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-16 text-foreground">
      <SiteHeader solid />
      <div className="pt-24">
        <AboutSection />
        <StatsSection />
      </div>
      <SiteFooter />
    </div>
  );
}
