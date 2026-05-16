import { ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const caseStudies = [
  {
    title: "AI-Driven Predictive Maintenance Architecture",
    description: "Lightstack engineered a mission-critical predictive maintenance system for a major industrial hub. By integrating agentic AI with real-time sensor logic, we reduced unexpected downtime by 42%.",
    tags: ["Agentic AI", "Enterprise", "Industrial"],
    color: "#001c4a",
    badge: "AI-powered stack"
  },
  {
    title: "Global Logistics Orchestration System",
    description: "Using our traditional high-performance stack, Lightstack developed a robust orchestration platform for a cross-border logistics provider, handling over 1M events daily with zero-latency.",
    tags: ["Cloud Native", "Traditional Stack", "Logistics"],
    color: "#0056b3",
    badge: "Traditional tech stack"
  },
  {
    title: "VPC-Isolated RAG for Financial Underwriting",
    description: "We built a secure, governed retrieval-augmented generation (RAG) system that automates credit analysis while ensuring 100% data privacy and verifiable sources.",
    tags: ["FinTech", "Governed AI", "Security"],
    color: "#4e73df",
    badge: "AI-powered stack"
  },
  {
    title: "Enterprise Web Ecosystem & Portal",
    description: "Lightstack developed a high-performance web ecosystem for a regional enterprise, integrating complex legacy databases into a modern, lightning-fast React interface.",
    tags: ["Web Dev", "React", "Enterprise"],
    color: "#2563eb",
    badge: "Traditional tech stack"
  },
  {
    title: "Secure Cross-Platform Mobile Suite",
    description: "Engineering a suite of secure mobile applications for field operations, featuring offline-first data synchronization and biometric governance protocols.",
    tags: ["Mobile", "React Native", "Security"],
    color: "#1e40af",
    badge: "Traditional tech stack"
  }
];

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative flex flex-col justify-center px-6 py-48 md:px-20 bg-white"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="mb-24 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-12 bg-primary"></span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Proven Delivery
            </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-foreground leading-[0.9] tracking-tighter uppercase">
            SELECTED <br />
            <span className="text-muted-foreground/30">WORKS.</span>
          </h2>
        </div>

        <div className="flex overflow-x-auto gap-8 pb-12 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {caseStudies.map((cs, i) => (
            <motion.div 
              key={cs.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[320px] md:min-w-[500px] p-8 md:p-12 text-white flex flex-col gap-6 group relative overflow-hidden h-auto"
              style={{ backgroundColor: cs.color }}
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-white/10 text-[9px] font-black uppercase tracking-[0.2em] border border-white/20">
                  {cs.badge}
                </span>
                <span className="text-white/20 font-black text-xs italic">0{i + 1}</span>
              </div>

              <h3 className="text-2xl md:text-4xl font-black leading-tight uppercase tracking-tightest">
                {cs.title}
              </h3>

              <p className="text-base text-white/70 leading-relaxed font-medium">
                {cs.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-auto">
                {cs.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-8 h-8 text-white/40" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-12 pt-12 border-t border-border">
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
            <span>Project Index</span>
            <div className="w-24 h-px bg-border"></div>
            <span>LSTK-PORT-2024</span>
          </div>

          <a 
            href="#" 
            onClick={(e) => e.preventDefault()}
            className="group flex items-center gap-4 text-primary font-black text-2xl uppercase tracking-tighter hover:text-foreground transition-colors"
          >
            View all cases <ChevronRight className="w-8 h-8 transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
