import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactSection } from "@/components/sections/ContactSection";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lightstack" },
      {
        name: "description",
        content:
          "Get in touch with Lightstack to start your next web, mobile, or custom software project.",
      },
      { property: "og:title", content: "Contact — Lightstack" },
      {
        property: "og:description",
        content: "Reach the Lightstack team — we reply within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-16 text-foreground">
      <SiteHeader solid />
      <div className="pt-24">
        <ContactSection />
      </div>
      <SiteFooter />
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}
