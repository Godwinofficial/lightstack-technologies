import { motion, AnimatePresence } from "framer-motion";
import { Check, Brain, Shield, DollarSign, Lightbulb, Workflow, Target, Binary } from "lucide-react";
import { useState } from "react";

const principles = [
  {
    id: "zero",
    title: "Zero-hallucination architecture",
    icon: Brain,
    desc: "Rigid context grounding via private vector databases.",
    content: [
      "Strict retrieval-augmented generation (RAG) protocols.",
      "Deterministic fallback for insufficient context.",
      "Adversarial simulation for resilience testing."
    ]
  },
  {
    id: "financial",
    title: "Financial governance",
    icon: DollarSign,
    desc: "Built-in budget intelligence for AI operations.",
    content: [
      "Real-time token consumption forecasting.",
      "Automated cost-threshold alerts.",
      "Resource optimization per-transaction."
    ]
  },
  {
    id: "secure",
    title: "Security by Architecture",
    icon: Shield,
    desc: "Multi-tenant isolation and data encryption.",
    content: [
      "End-to-end encryption for private vector stores.",
      "Secure API gateway with audit logging.",
      "Zero-trust data access protocols."
    ]
  },
  {
    id: "innovation",
    title: "Innovation Control",
    icon: Lightbulb,
    desc: "Rapid prototyping with full lifecycle audit logs.",
    content: [
      "Version-controlled prompt engineering.",
      "A/B testing for model performance.",
      "Instant rollback for production agents."
    ]
  }
];

export function PrinciplesSection() {
  const [active, setActive] = useState<string | null>("zero");

  return (
    <section id="principles" className="py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Dual Engine Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                The Dual Engine
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-foreground leading-[0.9] tracking-tighter mb-8">
              ENGINEERING <br />
              <span className="text-primary">INTELLIGENCE.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-md font-medium leading-relaxed">
              We synchronize two distinct technical engines to deliver systems that are both mathematically sound and adaptively intelligent.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: "Core Infrastructure", 
                subtitle: "ENGINE 01", 
                desc: "Deterministic, high-performance architecture built for billion-scale transactions.",
                icon: <Binary className="w-6 h-6" />,
                color: "bg-muted"
              },
              { 
                title: "Adaptive Agents", 
                subtitle: "ENGINE 02", 
                desc: "Probabilistic AI models that reason, iterate, and solve complex business logic.",
                icon: <Workflow className="w-6 h-6" />,
                color: "bg-foreground text-background"
              }
            ].map((engine, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`p-10 border border-border group hover:border-primary transition-all duration-500 ${engine.color}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-4 ${idx === 1 ? 'bg-primary text-white' : 'bg-white border border-border'} transition-transform duration-500 group-hover:scale-110`}>
                    {engine.icon}
                  </div>
                  <span className={`text-[10px] font-black tracking-[0.5em] ${idx === 1 ? 'text-primary' : 'text-muted-foreground'}`}>{engine.subtitle}</span>
                </div>
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">{engine.title}</h4>
                <p className={`text-sm leading-relaxed ${idx === 1 ? 'text-white/60' : 'text-muted-foreground'}`}>{engine.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Principles Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-black uppercase tracking-tightest mb-4">Core Principles</h3>
            <p className="text-sm text-muted-foreground font-medium max-w-xs">
              Every system we deploy is governed by a strict set of architectural protocols.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {principles.map((p) => {
              const isOpen = active === p.id;
              const Icon = p.icon;
              
              return (
                <div 
                  key={p.id} 
                  className={`group border border-border overflow-hidden transition-all duration-500 ${isOpen ? 'bg-muted/50 border-primary/30' : 'bg-white hover:border-muted-foreground/30'}`}
                >
                  <button 
                    onClick={() => setActive(isOpen ? null : p.id)}
                    className="w-full flex items-center justify-between p-8 text-left"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`p-4 transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-xl font-black uppercase tracking-tight block">{p.title}</span>
                        <span className="text-xs text-muted-foreground font-medium mt-1">{p.desc}</span>
                      </div>
                    </div>
                    <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'}`}>
                      <Target className="h-5 w-5" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 pt-4 ml-20 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {p.content.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 group/item">
                              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm text-foreground/80 font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
