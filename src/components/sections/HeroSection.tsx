import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Zap, Shield, Cpu, Code2, Layers } from "lucide-react";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden bg-white pt-20"
    >
      {/* Structural Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Massive Decorative Text */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 -left-20 text-[20vw] font-black text-gray-100 select-none leading-none tracking-tighter"
        >
          LIGHTSTACK
        </motion.div>

        {/* Geometric Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#f3f4f6" strokeWidth="1" />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#f3f4f6" strokeWidth="1" />
          <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#f3f4f6" strokeWidth="1" />
          <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#f3f4f6" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Top Header Label */}
        <div className="lg:col-span-12 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="h-[2px] w-12 bg-primary"></span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Engineering Beyond Code
            </span>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-12 flex flex-col gap-8 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col text-[16vw] md:text-[8rem] font-black text-foreground leading-[0.8] tracking-tighter md:tracking-tightest uppercase"
          >
            <span className="block">WE BUILD</span>
            <span className="block text-primary">SOFTWARE</span>
            <span className="block">
              STACK<span className="text-primary">.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-medium"
          >
            Lightstack is an elite engineering collective specializing in high-performance AI systems,
            bespoke cloud architectures, and scalable digital ecosystems for enterprise leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mt-6"
          >
            <button
              onClick={(e) => e.preventDefault()}
              className="group relative px-10 py-5 bg-foreground text-background font-bold rounded-none overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                START A PROJECT
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-primary translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
            </button>

            <button
              onClick={(e) => e.preventDefault()}
              className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-foreground hover:text-primary transition-colors duration-300"
            >
              <span className="h-px w-12 bg-border group-hover:w-20 group-hover:bg-primary transition-all duration-500"></span>
              VIEW CASE STUDIES
            </button>
          </motion.div>
        </div>

        {/* Main grid closing removed to keep Bottom Row inside */}

        {/* Bottom Robust Features Row */}
        <div className="lg:col-span-12 mt-20 pt-12 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Code2 className="w-5 h-5" />, label: "Scalable Logic", desc: "Built for billion-scale" },
            { icon: <Zap className="w-5 h-5" />, label: "Peak Speed", desc: "Millisecond latency" },
            { icon: <Shield className="w-5 h-5" />, label: "Hardened Sec", desc: "Enterprise governance" },
            { icon: <Layers className="w-5 h-5" />, label: "Deep Stack", desc: "Full lifecycle dev" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="p-3 bg-muted text-primary">
                {item.icon}
              </div>
              <div>
                <h4 className="font-black text-[11px] md:text-sm uppercase tracking-tight whitespace-nowrap">{item.label}</h4>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 font-medium whitespace-nowrap">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side "Coordinates" Label */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-12 text-[10px] font-black tracking-[0.5em] text-muted-foreground rotate-90 origin-right">
        <span>EST. 2024</span>
        <span className="w-12 h-px bg-border"></span>
        <span>LSTK-HQ-NODE</span>
      </div>

    </section>
  );
}
