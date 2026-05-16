import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Lightstack" },
      {
        name: "description",
        content:
          "Lightstack is a software engineering studio building production systems for teams across three continents.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#001c4a] font-sans">
      <SiteHeader solid />
      <main className="flex flex-col">
        <WhyUsSection />
        <IndustriesSection />
        <StatsSection />
        <TestimonialsSection />
        <SiteFooter />
      </main>
    </div>
  );
}
