import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ServicesSection } from "@/components/sections/ServicesSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Lightstack" },
      {
        name: "description",
        content:
          "Web development, mobile apps, custom software, and UI/UX design from Lightstack.",
      },
      { property: "og:title", content: "Services | Lightstack" },
      {
        property: "og:description",
        content:
          "From marketing sites to bespoke internal systems, explore what Lightstack builds.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background pb-16 text-foreground">
      <SiteHeader solid />
      <div className="pt-24">
        <ServicesSection />
      </div>
      <SiteFooter />
    </div>
  );
}
