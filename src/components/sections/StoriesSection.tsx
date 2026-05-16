import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Play } from "lucide-react";

const stories = [
  {
    title: "What is ADLC (Agentic Development Lifecycle)?",
    category: "AI INSIDE",
    id: "STRY-01",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    desc: "A deep dive into the governing framework for engineering non-deterministic systems."
  },
  {
    title: "Guaranteeing Quality in Probabilistic Logic",
    category: "QA & TESTING",
    id: "STRY-02",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    desc: "How we use automated LLM-scoring and RAGAS to verify system response accuracy."
  }
];

export function StoriesSection() {
  return (
    <section id="stories" className="py-32 bg-muted relative overflow-hidden">
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
                Technical Knowledge
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-foreground leading-[0.9] tracking-tighter uppercase">
              STORIES FROM <br />
              <span className="text-muted-foreground/30">THE FRONT LINE.</span>
            </h2>
          </div>
          <button className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-foreground hover:text-primary transition-all">
            Explore All Journal <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {stories.map((story, i) => (
            <motion.div 
              key={story.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-8 md:p-12 relative overflow-hidden flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] overflow-hidden mb-10">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-6 left-6 px-4 py-2 bg-foreground text-background text-[10px] font-black uppercase tracking-widest">
                   {story.category}
                </div>
                <div className="absolute bottom-6 right-6 p-4 bg-white/90 backdrop-blur text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                   <Play className="w-4 h-4 fill-primary" />
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                 <span className="text-[10px] font-black tracking-[0.5em] text-muted-foreground/40">{story.id}</span>
                 <div className="h-px w-12 bg-border group-hover:w-20 transition-all"></div>
              </div>

              <h3 className="text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-[1.1] tracking-tight mb-6">
                {story.title}
              </h3>
              
              <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-10">
                {story.desc}
              </p>

              <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:text-primary transition-colors">
                Read Protocol <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industrial Detail Row */}
        <div className="mt-20 flex items-center justify-between opacity-10">
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">LSTK-JRNL-LOG-4.0</div>
          <div className="h-px flex-1 mx-12 bg-foreground"></div>
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">Archive Verified</div>
        </div>
      </div>
    </section>
  );
}
