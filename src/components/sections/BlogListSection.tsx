import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, ArrowUpRight, ArrowRight } from "lucide-react";
import { useState } from "react";

const articles = [
  {
    title: "What Is ADLC? A 2026 Guide to Governing AI Systems",
    id: "PUB-01",
    time: "34 MIN READ",
    date: "MAY 12, 2026",
    desc: "A comprehensive breakdown of the Agentic Development Lifecycle. Learn how we enforce strict context grounding, deterministic fallbacks, and rigorous adversarial simulations to ensure zero-hallucination AI architectures in production."
  },
  {
    title: "AI Readiness: Moving from Pilots to Production",
    id: "PUB-02",
    time: "37 MIN READ",
    date: "APRIL 29, 2026",
    desc: "Many enterprises get stuck in the pilot phase. This publication covers the infrastructure, data governance, and financial forecasting necessary to confidently scale AI agents into mission-critical workflows."
  },
  {
    title: "What Affects AI Development Cost in 2026",
    id: "PUB-03",
    time: "40 MIN READ",
    date: "MARCH 11, 2026",
    desc: "A detailed analysis of the hidden costs in AI software development, from vector database hosting to token consumption and the required human-in-the-loop evaluation frameworks."
  },
  {
    title: "How much does it cost to build a mobile app",
    id: "PUB-04",
    time: "25 MIN READ",
    date: "FEBRUARY 12, 2026",
    desc: "An transparent look at the cost structures for native and cross-platform mobile development, including security compliance, offline-first architectures, and backend integrations."
  },
  {
    title: "Custom software development guide",
    id: "PUB-05",
    time: "30 MIN READ",
    date: "FEBRUARY 01, 2026",
    desc: "The ultimate guide to architecting high-performance enterprise systems. We explore modern stack selections, technical debt management, and strategies for achieving billion-scale readiness."
  },
  {
    title: "SaaS development process explained",
    id: "PUB-06",
    time: "40 MIN READ",
    date: "JANUARY 15, 2026",
    desc: "From multi-tenant architecture to subscription billing and advanced user governance. Learn the step-by-step process of building a scalable, profitable SaaS platform."
  },
  {
    title: "AI automation for businesses",
    id: "PUB-07",
    time: "34 MIN READ",
    date: "JANUARY 05, 2026",
    desc: "Practical use cases for integrating autonomous agents into daily operations. We highlight high-ROI opportunities in logistics, customer support, and financial underwriting."
  }
];

export function BlogListSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="blog" className="py-32 bg-white">
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
                Technical Publication
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-foreground leading-[0.9] tracking-tighter uppercase">
              LATEST <br />
              <span className="text-muted-foreground/30">PUBLICATIONS.</span>
            </h2>
          </div>
          <button className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-foreground hover:text-primary transition-all">
            Browse All Articles <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border border border-border">
          {articles.map((article, i) => {
            const isOpen = active === article.id;
            
            return (
              <motion.div 
                key={article.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group bg-white flex flex-col transition-all duration-500 hover:bg-muted/30 cursor-pointer ${isOpen ? 'bg-muted/10' : ''}`}
                onClick={() => setActive(isOpen ? null : article.id)}
              >
                <div className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-black tracking-[0.5em] text-primary">{article.id}</span>
                      <div className="h-px w-8 bg-border"></div>
                      <div className="flex items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {article.time}</span>
                        <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {article.date}</span>
                      </div>
                    </div>
                    <h3 className={`text-2xl md:text-4xl font-black transition-colors leading-[1.1] tracking-tight max-w-3xl ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                      {article.title}
                    </h3>
                  </div>
                  
                  <div className={`shrink-0 p-4 border transition-all duration-500 ${isOpen ? 'border-primary bg-primary text-white rotate-45' : 'border-border text-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-white'}`}>
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 md:px-12 pb-12 pt-0 max-w-4xl">
                        <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed mb-8">
                          {article.desc}
                        </p>
                        <button 
                          onClick={(e) => e.stopPropagation()} 
                          className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-primary hover:text-foreground transition-colors group/btn"
                        >
                          Read Full Publication <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Industrial Footer Label */}
        <div className="mt-20 flex items-center justify-between opacity-10">
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">LSTK-PUB-PROTO-2.0</div>
          <div className="h-px flex-1 mx-12 bg-foreground"></div>
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">Architecture Intelligence</div>
        </div>
      </div>
    </section>
  );
}
