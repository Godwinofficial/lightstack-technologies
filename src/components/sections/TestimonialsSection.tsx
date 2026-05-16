import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Quote, ArrowRight, ChevronLeft } from "lucide-react";
import { ReviewsSummary } from "./ReviewsSummary";
import { useState, useEffect } from "react";

const testimonials = [
  {
    initials: "KM",
    name: "Kondwani Mulenga",
    role: "Tech Lead, Lusaka Dynamics",
    quote: "Lightstack is the firm to work with if you want to keep up to high standards. The professional workflows they stick to result in exceptional quality. They help you think with the business logic of your application, not just follow orders."
  },
  {
    initials: "CK",
    name: "Chileshe Kapwepwe",
    role: "CEO, Copperbelt Logistics",
    quote: "Their dual-engine approach was the only thing that actually worked for our complex supply chain. We got the reliability of enterprise software with the intelligence of modern AI agents. Truly state-of-the-art."
  },
  {
    initials: "MM",
    name: "Mutale Mwansa",
    role: "Director, Horizon FinTech",
    quote: "Security was our biggest concern with GenAI. Lightstack built us a VPC-isolated RAG system that citied every source. We now have 100% confidence in our automated underwriting logic."
  },
  {
    initials: "BP",
    name: "Bwalya Phiri",
    role: "Founder, Sunstone Energy",
    quote: "The speed of delivery under their ADLC framework is unmatched. We moved from concept to a production-ready predictive maintenance system in under 12 weeks. High ROI, zero risk indeed."
  }
];

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-48 bg-white relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-muted/50 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="mb-24 flex flex-col items-center text-center">
          <ReviewsSummary />
          <h2 className="text-5xl md:text-8xl font-black text-foreground leading-[0.9] tracking-tighter uppercase max-w-4xl">
            TRUST FROM <br />
            <span className="text-muted-foreground/30">COMPANIES.</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "anticipate" }}
                className="relative p-12 md:p-20 bg-white border border-border shadow-2xl"
              >
                {/* Top Industrial Detail */}
                {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap">
                  Client Testimony PRTC-0{index + 1}
                </div> */}

                <Quote className="h-16 w-16 text-primary/10 mb-12" fill="currentColor" />

                <blockquote className="text-2xl md:text-4xl font-black text-foreground leading-[1.1] tracking-tight mb-16 h-auto md:h-[200px] flex items-center">
                  "{testimonials[index].quote}"
                </blockquote>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-12 border-t border-border">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 bg-primary text-white flex items-center justify-center font-black text-2xl">
                      {testimonials[index].initials}
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-black tracking-tight text-foreground">{testimonials[index].name}</p>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{testimonials[index].role}</p>
                    </div>
                  </div>

                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-primary"
                  >
                    View Full Showcase <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>



          <div className="mt-16 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-500 ${i === index ? 'bg-primary w-16' : 'bg-border w-10'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
