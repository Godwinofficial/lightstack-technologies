import { motion } from "framer-motion";
import { ChevronRight, ArrowRight, Zap, Target, Layers, RefreshCw, Activity, ShieldCheck } from "lucide-react";

export function MoreAboutSection() {
  const sections = [
    {
      title: "Key AI Services",
      subtitle: "LOG-01",
      links: [
        { label: "Enterprise RAG Systems", icon: <Layers className="w-4 h-4" /> },
        { label: "Custom AI Copilots", icon: <Zap className="w-4 h-4" /> },
        { label: "Agentic Workflow Ops", icon: <Target className="w-4 h-4" /> }
      ]
    },
    {
      title: "Core Enterprise",
      subtitle: "LOG-02",
      links: [
        { label: "Legacy Modernization", icon: <RefreshCw className="w-4 h-4" /> },
        { label: "IoT Security & Ops", icon: <ShieldCheck className="w-4 h-4" /> },
        { label: "Predictive Maintenance", icon: <Activity className="w-4 h-4" /> }
      ]
    },
    {
      title: "The Lightstack Edge",
      subtitle: "LOG-03",
      links: [
        { label: "350+ Software Projects", icon: <ChevronRight className="w-4 h-4" /> },
        { label: "98% Client Retention", icon: <ChevronRight className="w-4 h-4" /> },
        { label: "Architecture Audit", icon: <ChevronRight className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <section className="py-32 bg-white border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                System Capabilities
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-foreground leading-[0.9] tracking-tighter uppercase">
              DEEP STACK <br />
              <span className="text-muted-foreground/30">INTEGRATIONS.</span>
            </h2>
          </div>
          <p className="text-[10px] font-black tracking-[0.5em] text-muted-foreground/30 uppercase pb-2">
            LSTK-NAV-PRTC-4.2
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-px md:bg-border md:border md:border-border">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white p-8 md:p-12 group transition-all duration-500">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-xl font-black uppercase tracking-tight">{section.title}</h3>
                <span className="text-[10px] font-black tracking-widest text-muted-foreground/40">{section.subtitle}</span>
              </div>
              
              <nav className="flex flex-col gap-2">
                {section.links.map((link, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="group/item flex items-center justify-between p-5 border border-border/50 hover:border-primary hover:bg-muted/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-muted-foreground group-hover/item:text-primary transition-colors">
                        {link.icon}
                      </div>
                      <span className="text-sm font-bold text-foreground/80 group-hover/item:text-foreground transition-colors">{link.label}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-primary transition-all group-hover/item:translate-x-1" />
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Industrial Detail Row */}
        <div className="mt-24 flex items-center justify-between opacity-10">
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-1 bg-foreground"></div>)}
          </div>
          <div className="h-px flex-1 mx-12 bg-foreground"></div>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-1 bg-foreground"></div>)}
          </div>
        </div>

      </div>
    </section>
  );
}
