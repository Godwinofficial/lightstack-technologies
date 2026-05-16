import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ComplianceSection } from "@/components/sections/ComplianceSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Lightstack" },
      {
        name: "description",
        content:
          "Web development, mobile apps, custom software, and AI-driven solutions from Lightstack.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-[#001c4a] font-sans">
      <SiteHeader solid />
      <main className="flex flex-col">
        <ServicesSection />
        <PrinciplesSection />
        <ComplianceSection />
        <SiteFooter />
      </main>
    </div>
  );
}
