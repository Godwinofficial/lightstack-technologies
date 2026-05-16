import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Code2, Globe } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-48 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Narrative Content */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                The Collective Identity
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-foreground leading-[0.9] tracking-tighter uppercase mb-12">
              BEYOND CODE. <br />
              <span className="text-muted-foreground/30">ELITE RIGOR.</span>
            </h2>
            
            <div className="space-y-8">
              <p className="text-xl md:text-2xl text-foreground font-bold leading-tight max-w-xl">
                Lightstack is not a factory. We are a specialized engineering collective architecting the systems that power global enterprises.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl font-medium">
                We combine the disciplined reliability of traditional enterprise software development with the adaptive intelligence of agentic AI. Every line of code is governed, every model is grounded, and every outcome is measurable.
              </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-start gap-12">
              {[
                { label: "Founded", value: "2024", sub: "Global-First" },
                { label: "Collective", value: "Senior-Heavy", sub: "Elite Talent" },
                { label: "Focus", value: "Agentic AI", sub: "Next-Gen Ops" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">{stat.label}</span>
                  <span className="text-xl font-black tracking-tight">{stat.value}</span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Visual / Blueprint */}
          <div className="relative">
            <div className="aspect-square bg-muted border border-border relative overflow-hidden group">
              {/* Decorative Tech Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-2/3 h-2/3 border border-primary/20 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <Cpu className="w-8 h-8 text-primary opacity-50" />
                    <span className="text-[10px] font-black tracking-widest text-muted-foreground/40">LSTK-PROTO-01</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent"></div>
                    <div className="h-px w-2/3 bg-gradient-to-r from-primary/50 to-transparent"></div>
                    <div className="h-px w-1/2 bg-gradient-to-r from-primary/50 to-transparent"></div>
                  </div>

                  <div className="flex justify-between items-end">
                    <Code2 className="w-8 h-8 text-primary opacity-50" />
                    <div className="text-right">
                      <div className="text-[10px] font-black tracking-widest text-primary">CORE NODE</div>
                      <div className="text-[8px] font-bold text-muted-foreground/40 uppercase">Architecture Verified</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Labels */}
              <div className="absolute top-10 right-10 p-4 bg-white border border-border shadow-xl">
                <div className="text-[8px] font-black tracking-widest text-muted-foreground/40 mb-1 uppercase">Latency</div>
                <div className="text-xs font-black">{"< 120ms"}</div>
              </div>
              <div className="absolute bottom-10 left-10 p-4 bg-white border border-border shadow-xl">
                <div className="text-[8px] font-black tracking-widest text-muted-foreground/40 mb-1 uppercase">Accuracy</div>
                <div className="text-xs font-black">99.98%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Big CTA Bar */}
        <div className="mt-32 p-12 md:p-20 bg-foreground text-background relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tightest leading-none">
              READY TO <br />
              <span className="text-primary">ARCHITECT?</span>
            </h2>
            <button 
              onClick={(e) => e.preventDefault()}
              className="px-12 py-6 bg-primary text-white font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-4"
            >
              Get an Estimate <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
