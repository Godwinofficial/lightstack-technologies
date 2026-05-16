import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    id: "FAQ-01",
    question: "How long will development take?",
    answer: "Timeline depends on product complexity, quality compliance, and integration needs. Typically, MVP development for enterprise-grade systems ranges from 2 to 3 months under our accelerated ADLC framework."
  },
  {
    id: "FAQ-02",
    question: "How do you guarantee product quality?",
    answer: "We use a rigorous QA process, automated testing, and a governed ADLC (Agentic Development Lifecycle) that ensures every feature meets strict performance and security standards before deployment."
  },
  {
    id: "FAQ-03",
    question: "What is the difference between SDLC and ADLC?",
    answer: "Standard SDLC is deterministic and rule-based. Our ADLC (Agentic Development Lifecycle) is designed specifically for non-deterministic AI systems, adding layers for model evaluation, accuracy testing, and cost governance."
  },
  {
    id: "FAQ-04",
    question: "Do we have to use AI for every project?",
    answer: "Not at all. While we specialize in AI, we are an elite full-service software studio. We build high-performance web, mobile, and enterprise systems using traditional tech stacks when AI is not required."
  }
];

export function FaqSection() {
  const [active, setActive] = useState<string | null>("FAQ-01");

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Header */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Information Node
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-foreground leading-[0.9] tracking-tighter uppercase mb-8">
              FREQUENT <br />
              <span className="text-muted-foreground/30">QUESTIONS.</span>
            </h2>
            <p className="text-sm text-muted-foreground font-medium max-w-xs leading-relaxed mb-12">
              Everything you need to know about our engineering protocols and delivery models.
            </p>
            
            <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-primary group">
              Contact Support <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </button>
          </div>

          {/* Accordion List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {faqs.map((faq) => {
              const isOpen = active === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className={`group border border-border transition-all duration-500 ${isOpen ? 'bg-muted/50 border-primary/30' : 'bg-white hover:border-muted-foreground/30'}`}
                >
                  <button 
                    onClick={() => setActive(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-8 text-left"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-black tracking-widest text-primary/40">{faq.id}</span>
                      <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">{faq.question}</h3>
                    </div>
                    <div className={`p-2 transition-transform duration-500 ${isOpen ? 'rotate-180 bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
                        <div className="px-8 pb-8 pt-2 ml-14">
                          <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed max-w-3xl">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industrial Footer Detail */}
        <div className="mt-20 flex items-center justify-between opacity-10">
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">LSTK-FAQ-PROTOCOL</div>
          <div className="h-px flex-1 mx-12 bg-foreground"></div>
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">Update Verified 2026</div>
        </div>
      </div>
    </section>
  );
}
