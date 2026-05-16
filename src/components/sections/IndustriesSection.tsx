import { motion } from "framer-motion";
import { ChevronRight, Briefcase, Truck, HardHat, Target, ShoppingCart, Factory, Landmark, GraduationCap } from "lucide-react";

const industries = [
  {
    title: "Professional Services",
    subtitle: "IND-01",
    icon: Briefcase,
    description: "Knowledge-driven organizations rely on speed and precision. We build CRM and document management platforms enhanced by secure retrieval systems and AI copilots.",
  },
  {
    title: "Logistics & Supply",
    subtitle: "IND-02",
    icon: Truck,
    description: "We engineer transportation management systems and supply chain platforms extended with AI-driven forecasting and ERP-integrated agents.",
    linkText: "Logistics dev",
    linkHref: "#"
  },
  {
    title: "Engineering & Const.",
    subtitle: "IND-03",
    icon: HardHat,
    description: "Structural analysis and project management systems enhanced with multi-modal retrieval and document intelligence for job-site efficiency.",
  },
  {
    title: "Marketing & AdTech",
    subtitle: "IND-04",
    icon: Target,
    description: "Automation tools that optimize strategies, gather behavioral insights, and achieve goals through advanced analytics.",
    linkText: "AdTech dev",
    linkHref: "#"
  },
  {
    title: "Retail & eCommerce",
    subtitle: "IND-05",
    icon: ShoppingCart,
    description: "Scalable commerce platforms enhanced with AI-powered forecasting, customer service automation, and behavioral modeling.",
    linkText: "eCommerce dev",
    linkHref: "#"
  },
  {
    title: "Manufacturing & Energy",
    subtitle: "IND-06",
    icon: Factory,
    description: "IoT and predictive maintenance platforms that analyze sensor data, detect anomalies, and enable secure operational queries.",
  },
  {
    title: "Fintech & Insurance",
    subtitle: "IND-07",
    icon: Landmark,
    description: "Secure fintech systems with integrated governed AI for underwriting support, fraud analytics, and policy summarization.",
    linkText: "Fintech dev",
    linkHref: "#"
  },
  {
    title: "EdTech & Learning",
    subtitle: "IND-08",
    icon: GraduationCap,
    description: "Learning platforms with secure AI capabilities that support grading, institutional knowledge retrieval, and performance analytics.",
    linkText: "EdTech dev",
    linkHref: "#"
  }
];

export function IndustriesSection() {
  return (
    <section id="industries" className="py-32 bg-foreground text-background overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-end">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Global Deployment
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-4">
              INDUSTRIES <br />
              <span className="text-primary">WE TRANSFORM.</span>
            </h2>
          </div>
          <p className="text-lg text-white/40 font-medium max-w-xl leading-relaxed mb-4">
            Every vertical faces transformation. We help organizations modernize by combining disciplined software engineering with governed agentic AI systems.
          </p>
        </div>

        {/* Technical Dossier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div 
                key={industry.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-8 md:p-10 bg-foreground hover:bg-white/[0.02] transition-all duration-500 relative flex flex-col h-full border-r border-b border-white/5"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-white/5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.5em] text-white/20 group-hover:text-primary/40 transition-colors">{industry.subtitle}</span>
                </div>
                
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                  {industry.title}
                </h3>
                
                <p className="text-xs text-white/50 leading-relaxed font-medium mb-8">
                  {industry.description}
                </p>
                
                {industry.linkText && (
                  <div className="mt-auto">
                    <a 
                      href={industry.linkHref} 
                      onClick={(e) => industry.linkHref === "#" && e.preventDefault()}
                      className="group/link flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:text-white transition-all"
                    >
                      {industry.linkText} 
                      <ChevronRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                )}

                {/* Industrial Corner Detail */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/5 group-hover:border-primary/20 transition-colors"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Industrial Metadata Row */}
        <div className="mt-20 flex items-center justify-between opacity-20">
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">Sector Intelligence Protocol</div>
          <div className="h-px flex-1 mx-12 bg-white/10"></div>
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">LSTK-IND-RPT-2024</div>
        </div>

      </div>
    </section>
  );
}
