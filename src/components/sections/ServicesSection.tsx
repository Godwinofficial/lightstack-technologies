import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Code2, Layers, Zap, ChevronRight } from "lucide-react";
import { useState } from "react";

const services = [
  {
    id: "SRV-01",
    title: "Agentic AI Systems",
    desc: "We engineer governed AI systems that solve complex reasoning tasks. Using our ADLC framework, we deliver production-ready agents that transform operational speed.",
    icon: <Cpu className="w-8 h-8" />
  },
  {
    id: "SRV-02",
    title: "Enterprise Architecture",
    desc: "Robust, mission-critical software built for global scale. We modernize legacy systems and architect high-performance platforms that run core business logic.",
    icon: <Layers className="w-8 h-8" />
  },
  {
    id: "SRV-03",
    title: "High-Performance Web",
    desc: "Bespoke digital ecosystems engineered with precision. From complex CRMs to specialized industrial tools, we build software that delivers measurable ROI.",
    icon: <Code2 className="w-8 h-8" />
  },
  {
    id: "SRV-04",
    title: "IoT & Real-time Ops",
    desc: "Synchronizing hardware and software at scale. We develop secure IoT protocols and predictive maintenance systems for industrial and energy sectors.",
    icon: <Zap className="w-8 h-8" />
  }
];

export function ServicesSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="services" className="py-32 bg-foreground text-background overflow-hidden relative">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
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
                Technical Capabilities
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-4">
              SERVICES <br />
              <span className="text-primary">WE PROVIDE.</span>
            </h2>
          </div>
          <p className="text-lg text-white/40 font-medium max-w-xl leading-relaxed mb-4">
            We deliver stable, scalable software that runs mission-critical operations and governed AI systems that unlock new levels of intelligence.
          </p>
        </div>

        {/* Industrial Service List */}
        <div className="flex flex-col">
          {services.map((service, idx) => {
            const isOpen = active === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group border-t border-white/10 transition-all duration-700 ${isOpen ? 'bg-white/[0.03] py-16' : 'py-12 hover:bg-white/[0.01]'}`}
              >
                <div 
                  onClick={() => setActive(isOpen ? null : idx)}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 cursor-pointer"
                >
                  <div className="flex items-center gap-8 md:gap-16">
                    <span className={`text-[10px] font-black tracking-[0.5em] transition-colors ${isOpen ? 'text-primary' : 'text-white/20'}`}>
                      {service.id}
                    </span>
                    <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tight transition-colors ${isOpen ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-8">
                     <div className={`p-4 transition-all duration-500 ${isOpen ? 'bg-primary text-white scale-110' : 'bg-white/5 text-white/20'}`}>
                        {service.icon}
                     </div>
                     <div className={`transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>
                        <ArrowUpRight className={`w-8 h-8 ${isOpen ? 'text-primary' : 'text-white/10'}`} />
                     </div>
                  </div>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-12 md:pl-32 max-w-4xl">
                    <p className="text-xl text-white/60 font-medium leading-relaxed mb-8">
                      {service.desc}
                    </p>
                    <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-primary hover:text-white transition-colors group/btn">
                      Explore Technical Specs <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
          <div className="border-t border-white/10"></div>
        </div>

        {/* Industrial Detail Row */}
        <div className="mt-20 flex items-center justify-between opacity-10">
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">Architecture Capability Index</div>
          <div className="h-px flex-1 mx-12 bg-white/10"></div>
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">Est. 2024 Node-01</div>
        </div>
      </div>
    </section>
  );
}
