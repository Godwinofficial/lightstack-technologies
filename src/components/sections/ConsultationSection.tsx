import { motion } from "framer-motion";
import { Calendar, Paperclip, Send, ArrowUpRight, Cpu } from "lucide-react";
import elizabeth from "../../assets/elizabeth.png";

export function ConsultationSection() {
  return (
    <section id="consultation" className="py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="relative p-12 md:p-24 bg-foreground text-background overflow-hidden group">
          {/* Abstract light effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors duration-1000" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Contact Info */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="h-[2px] w-12 bg-primary"></span>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  System Initialization
                </span>
              </motion.div>
              
              <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-12">
                READY TO <br />
                <span className="text-primary">START PROJECT?</span>
              </h2>

              <div className="flex items-center gap-8 p-6 bg-white/5 border border-white/10 backdrop-blur-sm max-w-fit">
                <div className="h-20 w-20 bg-muted overflow-hidden border border-white/10 shrink-0">
                  <img src={elizabeth} alt="Elizabeth" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div>
                  <p className="text-xl font-black uppercase tracking-tight">Elizabeth K.</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mt-1">Account Operations</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <button className="group relative w-full px-10 py-6 bg-primary text-white font-black uppercase tracking-widest text-sm overflow-hidden transition-all active:scale-95">
                <span className="relative z-10 flex items-center justify-center gap-4">
                  <Calendar className="h-5 w-5" />
                  Book Strategic Session
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 group-hover:translate-y-0 opacity-10"></div>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 p-5 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60 hover:bg-white/10 transition-colors">
                  <Paperclip className="h-4 w-4" />
                  Attach Spec
                </button>
                <button className="flex items-center justify-center gap-3 p-5 bg-foreground border border-white/20 text-[10px] font-black uppercase tracking-widest text-white hover:border-primary transition-all">
                  <Send className="h-4 w-4" />
                  Direct Brief
                </button>
              </div>

              <div className="mt-8 flex items-center gap-4 text-[8px] font-black tracking-[0.5em] text-white/20 uppercase">
                <Cpu className="w-4 h-4" />
                Architecture Verified Deployment
              </div>
            </div>

          </div>

          {/* Decorative Corner Details */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/20"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/20"></div>
        </div>
      </div>
    </section>
  );
}
