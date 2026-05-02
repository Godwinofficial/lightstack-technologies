import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DotNav } from "@/components/DotNav";
import { Toaster } from "@/components/ui/sonner";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lightstack — Engineering Beyond Code" },
      {
        name: "description",
        content:
          "Lightstack designs and engineers websites, mobile apps, and bespoke software systems for ambitious teams worldwide.",
      },
      { property: "og:title", content: "Lightstack — Engineering Beyond Code" },
      {
        property: "og:description",
        content:
          "Web, mobile, and custom software engineered with craft. Explore Lightstack's portfolio.",
      },
    ],
  }),
  component: Index,
});

const SECTIONS = [
  "Home",
  "Services",
  "About",
  "Statistics",
  "Portfolio",
  "Clients",
  "Contact",
];

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("section"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { root, threshold: 0.55 }
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => setScrolled((root.scrollTop ?? 0) > 40);
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      root.removeEventListener("scroll", onScroll);
    };
  }, []);

  function jump(i: number) {
    const root = containerRef.current;
    if (!root) return;
    const sections = root.querySelectorAll<HTMLElement>("section");
    sections[i]?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteHeader solid={scrolled} />
      <DotNav
        count={SECTIONS.length}
        active={active}
        onJump={jump}
        labels={SECTIONS}
      />
      <main
        ref={containerRef}
        className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth"
      >
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <StatsSection />
        <PortfolioSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}
