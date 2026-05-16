import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DotNav } from "@/components/DotNav";
import { Toaster } from "@/components/ui/sonner";
import { HeroSection } from "@/components/sections/HeroSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { GovernanceSection } from "@/components/sections/GovernanceSection";
import { ComplianceSection } from "@/components/sections/ComplianceSection";
import { EstimationSection } from "@/components/sections/EstimationSection";

import { ServicesSection } from "@/components/sections/ServicesSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { StoriesSection } from "@/components/sections/StoriesSection";
import { BlogListSection } from "@/components/sections/BlogListSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { MoreAboutSection } from "@/components/sections/MoreAboutSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lightstack | AI-Powered Custom Software Development Company" },
      {
        name: "description",
        content:
          "Lightstack designs and engineers AI-powered custom software, mobile apps, and bespoke systems for ambitious teams worldwide.",
      },
    ],
  }),
  component: Index,
});

const SECTIONS = [
  "Home",
  "Partners",
  "Principles",
  "Differences",
  "Stats",
  "Why Us",
  "Values",
  "Governance",
  "Trust",
  "Estimate",

  "Services",
  "Industries",
  "Portfolio",
  "Stories",
  "Blog",
  "Reviews",
  "FAQ",
  "Contact",
  "Explore",
];

function Index() {
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((s) => io.observe(s));
    
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function jump(i: number) {
    const sections = document.querySelectorAll<HTMLElement>("section");
    sections[i]?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative min-h-screen bg-white text-[#001c4a] font-sans">
      <SiteHeader solid={scrolled} />
      <DotNav
        count={SECTIONS.length}
        active={active}
        onJump={jump}
        labels={SECTIONS}
      />
      <main className="flex flex-col">
        <HeroSection />
        <PartnersSection />
        <PrinciplesSection />
        <ComparisonSection />
        <StatsSection />
        <WhyUsSection />
        <ValuesSection />
        <GovernanceSection />
        <ComplianceSection />
        <EstimationSection />

        <ServicesSection />
        <IndustriesSection />
        <PortfolioSection />
        <StoriesSection />
        <BlogListSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
        <MoreAboutSection />
        <SiteFooter />
      </main>
      <Toaster theme="light" position="top-center" />
    </div>
  );
}
