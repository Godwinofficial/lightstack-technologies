import { motion } from "framer-motion";
import { Check, Shield, Lock, Award, Globe, Zap, Cpu, BarChart3 } from "lucide-react";

const awards = [
  { id: 1, label: "Top Software Development Company", sub: "Massachusetts", icon: <Award className="w-6 h-6" /> },
  { id: 2, label: "Top Web Development Company", sub: "Global", icon: <Globe className="w-6 h-6" /> },
  { id: 3, label: "TDA Winner", sub: "Technical Design Award", icon: <Zap className="w-6 h-6" /> },
  { id: 4, label: "AWS Partner Network", sub: "Consulting Partner", icon: <Cpu className="w-6 h-6" /> },
  { id: 5, label: "High ROI Leader", sub: "Enterprise Tech", icon: <BarChart3 className="w-6 h-6" /> }
];

export function ComplianceSection() {
  const marqueeItems = [...awards, ...awards];

  return (
    <section id="compliance" className="py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
          {/* Text Content */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Governance Foundation
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-foreground leading-[0.9] tracking-tighter uppercase mb-12">
              BUILT FOR <br />
              <span className="text-muted-foreground/30">ENTERPRISE TRUST.</span>
            </h2>
            
            <div className="flex flex-col gap-10">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
                Security forms the foundation of every deployment. From data ingestion pipelines and PII masking layers to continuous monitoring, each system is built under the <span className="text-foreground font-black">Agentic Development Lifecycle (ADLC)</span>.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Controlled Innovation", desc: "Safe AI experimentation with full guardrails." },
                  { title: "Financial Predictability", desc: "Real-time token cost forecasting models." },
                  { title: "Compliance Alignment", desc: "GDPR, HIPAA, and ISO-ready architectures." },
                  { title: "Operational Oversight", desc: "Continuous model evaluation & scoring." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="shrink-0 p-3 bg-muted text-primary group-hover:bg-primary group-hover:text-white transition-colors h-fit">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-tight mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance Grid */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border">
              {["PCI DSS", "OWASP", "ISO", "HIPAA", "GDPR", "SOC2"].map((name) => (
                <div key={name} className="group p-8 bg-white hover:bg-muted/30 transition-all duration-500 flex flex-col items-center justify-center gap-4 aspect-square">
                  <div className="h-16 w-16 border border-border group-hover:border-primary transition-colors flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-5"></div>
                    <span className="text-[10px] font-black tracking-widest">{name === "GDPR" ? "EU-RL" : name}</span>
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 text-center">Verified Protocol</div>
                </div>
              ))}
            </div>
            
            {/* Background Shield Watermark */}
            <div className="absolute -top-20 -right-20 opacity-[0.03] pointer-events-none">
              <Shield className="w-96 h-96" />
            </div>
          </div>
        </div>

        {/* Awards Marquee */}
        <div className="pt-20 border-t border-border overflow-hidden relative">
          <div className="flex overflow-x-hidden relative">
            <motion.div
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 30,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex whitespace-nowrap gap-20 items-center"
            >
              {marqueeItems.map((a, idx) => (
                <div key={idx} className="flex items-center gap-6 group cursor-default">
                  <div className="p-4 bg-muted text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {a.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-widest text-foreground/60 group-hover:text-primary transition-colors">{a.label}</span>
                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-1">{a.sub}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
