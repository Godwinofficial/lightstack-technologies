import { motion } from "framer-motion";
import { Check, ShieldCheck, BarChart3, Fingerprint, Activity, Lock, Target } from "lucide-react";

const governance = [
  {
    title: "Zero Data Leakage",
    subtitle: "SEC-PRT-01",
    icon: ShieldCheck,
    description: "Your proprietary data never trains public models. All processing occurs within isolated environments where strict access controls, encryption, and zero-retention policies ensure your IP remains fully protected.",
    bullets: [
      "VPC-isolated cloud deployments",
      "Private vector store indexing",
      "End-to-end data encryption",
      "Zero-retention API protocols"
    ]
  },
  {
    title: "Human-In-The-Loop",
    subtitle: "CTL-PRT-02",
    icon: Fingerprint,
    description: "Autonomous agents operate within defined governance structures. We embed strict guardrails and override mechanisms into every system we deploy to maintain full control.",
    bullets: [
      "Deterministic grounding logic",
      "Confidence score evaluation",
      "Human approval workflows",
      "Red-teaming & stress testing"
    ]
  },
  {
    title: "Predictable ROI",
    subtitle: "FIN-PRT-03",
    icon: BarChart3,
    description: "Eliminate blank-check spending. Before full-scale development, we run a structured AI pilot to model infrastructure costs and projected monthly token consumption.",
    bullets: [
      "Usage volume simulation",
      "Token forecasting models",
      "Architecture optimization",
      "Clear TCO projection"
    ]
  }
];

export function GovernanceSection() {
  return (
    <section id="governance" className="py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-end">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Controlled Intelligence
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-foreground leading-[0.9] tracking-tighter uppercase">
              HIGH ROI. <br />
              <span className="text-primary">ZERO RISK.</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-xl pb-2">
            Adopting AI should increase operational leverage without compromising security, accuracy, or cost predictability. We engineer systems that are secure by design and controllable in production.
          </p>
        </div>

        {/* Governance Protocol Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
          {governance.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-10 md:p-14 bg-white hover:bg-muted/30 transition-all duration-700"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-12">
                    <div className="p-5 bg-foreground text-background transition-transform duration-500 group-hover:bg-primary group-hover:scale-110">
                      <Icon className="h-8 w-8" />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.5em] text-muted-foreground/30">{item.subtitle}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-10">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-10 border-t border-border/50">
                    <ul className="space-y-4">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="h-1 w-1 bg-primary rounded-full"></div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-foreground/70">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Industrial Footer Details */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Deployment", value: "VPC ISOLATED", icon: <Lock className="w-4 h-4" /> },
            { label: "Grounding", value: "DETERMINISTIC", icon: <Target className="w-4 h-4" /> },
            { label: "Evaluation", value: "AI-COACHED", icon: <Activity className="w-4 h-4" /> },
            { label: "Scaling", value: "GOVERNED", icon: <ShieldCheck className="w-4 h-4" /> }
          ].map((spec, i) => (
            <div key={i} className="flex flex-col gap-2 p-6 border-l border-border">
              <div className="flex items-center gap-3 text-primary mb-1">
                {spec.icon}
                <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground/50">{spec.label}</span>
              </div>
              <span className="text-sm font-black tracking-tight">{spec.value}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
