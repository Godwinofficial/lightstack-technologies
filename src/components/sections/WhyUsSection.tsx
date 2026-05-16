import { motion } from "framer-motion";
import { Eye, Settings, Zap, Target, Users, AlertTriangle, RefreshCw, ChevronRight } from "lucide-react";

const reasons = [
  {
    title: "Radical Transparency",
    icon: Eye,
    description: "The entire process is structured and visible. We define clear roadmaps and measurable KPIs before development starts."
  },
  {
    title: "Adaptive Governance",
    icon: Settings,
    description: "Our processes adapt to your preferred level of involvement while maintaining strict engineering discipline."
  },
  {
    title: "AI-Augmented Velocity",
    icon: Zap,
    description: "We use AI-optimized workflows to accelerate delivery without compromising the integrity of the code."
  },
  {
    title: "Precision Scoping",
    icon: Target,
    description: "Precise discover clarifying business objectives to ensure the final product delivers intended value."
  },
  {
    title: "Senior-Heavy Logic",
    icon: Users,
    description: "Project success depends on elite expertise. We match seniority to technical complexity at every stage."
  },
  {
    title: "Proactive Mitigation",
    icon: AlertTriangle,
    description: "Risk is managed deliberately. Potential threats are identified early and mitigation is documented."
  }
];

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-32 bg-foreground text-background overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Header with Industrial Lines */}
        <div className="relative mb-24">
          <div className="absolute -top-12 left-0 w-32 h-px bg-primary opacity-50"></div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 uppercase">
              WHY LEADERS <br />
              <span className="text-primary">CHOOSE LIGHTSTACK.</span>
            </h2>
            <p className="text-lg text-white/40 font-medium max-w-xl leading-relaxed">
              We don't just build software; we architect competitive advantages through rigorous engineering and adaptive intelligence.
            </p>
          </motion.div>
        </div>

        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div 
                key={reason.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 bg-foreground hover:bg-white/[0.02] transition-all duration-500 relative overflow-hidden border-r border-b border-white/5"
              >
                {/* Background Number Watermark */}
                <div className="absolute -bottom-4 -right-4 text-8xl font-black text-white/[0.02] select-none group-hover:text-primary/5 transition-colors">
                  0{i + 1}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-4 bg-white/5 border border-white/10 group-hover:border-primary transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-all group-hover:translate-x-1" />
                  </div>
                  
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  
                  <p className="text-sm text-white/50 leading-relaxed font-medium">
                    {reason.description}
                  </p>
                  
                  {/* Decorative Progress Bar */}
                  <div className="mt-8 h-[2px] w-12 bg-white/10 group-hover:w-full group-hover:bg-primary transition-all duration-700"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Industrial Footer Label */}
        <div className="mt-20 flex items-center gap-8">
          <div className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase">Operational Excellence</div>
          <div className="h-px flex-1 bg-white/5"></div>
          <div className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase">Est. 2024</div>
        </div>

      </div>
    </section>
  );
}
