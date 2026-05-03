import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ClientsSection } from "@/components/sections/ClientsSection";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio | Lightstack" },
      {
        name: "description",
        content:
          "A selection of fintech, logistics, health, and SaaS products engineered by Lightstack.",
      },
      { property: "og:title", content: "Portfolio | Lightstack" },
      {
        property: "og:description",
        content: "Explore recent Lightstack projects and valued clients.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background pb-16 text-foreground">
      <SiteHeader solid />
      <div className="pt-24">
        <PortfolioSection />
        <ClientsSection />
      </div>
      <SiteFooter />
    </div>
  );
}
