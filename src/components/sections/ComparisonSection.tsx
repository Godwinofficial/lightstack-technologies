import { motion } from "framer-motion";
import { Check, X, Shield, Zap, Cpu, Code2, Database, Repeat } from "lucide-react";

const traditional = [
  { label: "Logic", value: "Rule-based (Deterministic)", icon: <Code2 className="w-4 h-4" /> },
  { label: "QA", value: "Manual controlled cycles", icon: <Shield className="w-4 h-4" /> },
  { label: "Cost", value: "Static infrastructure", icon: <Database className="w-4 h-4" /> },
  { label: "Release", value: "Versioned shipments", icon: <Repeat className="w-4 h-4" /> },
];

const agentic = [
  { label: "Logic", value: "Context-driven (Adaptive)", icon: <Cpu className="w-4 h-4" /> },
  { label: "QA", value: "AI-driven evaluation", icon: <Zap className="w-4 h-4" /> },
  { label: "Cost", value: "Token forecasting", icon: <Database className="w-4 h-4" /> },
  { label: "Stability", value: "Continuous tuning", icon: <Shield className="w-4 h-4" /> },
];

export function ComparisonSection() {
  return (
    <section id="comparison" className="py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Paradigm Shift
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-foreground leading-[0.9] tracking-tighter">
              TWO APPROACHES. <br />
              <span className="text-muted-foreground/30">ONE QUALITY STANDARD.</span>
            </h2>
          </div>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest max-w-[200px] leading-relaxed">
            From deterministic code to adaptive intelligence.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-stretch">
          
          {/* Traditional Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative p-8 md:p-16 bg-white border border-border lg:border-r-0 hover:bg-muted/30 transition-all duration-700"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Code2 className="w-32 h-32" />
            </div>
            
            <div className="relative z-10">
              <div className="text-[10px] font-black tracking-[0.5em] text-muted-foreground mb-8 uppercase">Traditional SDLC</div>
              <h3 className="text-3xl md:text-5xl font-black mb-12 tracking-tight">RIGID <br /> ENGINEERING.</h3>
              
              <div className="space-y-6">
                {traditional.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="text-muted-foreground">{item.icon}</div>
                      <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-16 flex items-center gap-4 text-[10px] font-black text-muted-foreground tracking-widest">
                <div className="w-10 h-px bg-border"></div>
                DETERMINISTIC
              </div>
            </div>
          </motion.div>

          {/* Agentic Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative p-8 md:p-16 bg-foreground text-background shadow-2xl overflow-hidden"
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/40 blur-[100px] rounded-full"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px] opacity-10"></div>
            </div>

            <div className="relative z-10">
              <div className="text-[10px] font-black tracking-[0.5em] text-primary mb-8 uppercase">Agentic ADLC</div>
              <h3 className="text-3xl md:text-5xl font-black mb-12 tracking-tight">ADAPTIVE <br /> INTELLIGENCE.</h3>
              
              <div className="space-y-6">
                {agentic.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-white/10 group-hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-primary">{item.icon}</div>
                      <span className="text-xs font-black uppercase tracking-widest text-white/40">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </div>

              <button className="mt-16 px-8 py-4 border border-primary text-primary font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300">
                Explore Autonomous Flow
              </button>
            </div>
          </motion.div>

        </div>

        {/* Bottom Industrial Line */}
        <div className="mt-20 flex items-center justify-between">
          <div className="text-[10px] font-black tracking-widest text-muted-foreground/30">LSTK-SYST-PRTC-02</div>
          <div className="h-px flex-1 mx-12 bg-border"></div>
          <div className="text-[10px] font-black tracking-widest text-muted-foreground/30">V.4.21.0</div>
        </div>
      </div>
    </section>
  );
}
