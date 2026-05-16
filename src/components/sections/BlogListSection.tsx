import { motion } from "framer-motion";
import { Clock, Calendar, ArrowUpRight, ArrowRight } from "lucide-react";

const articles = [
  {
    title: "What Is ADLC? A 2026 Guide to Governing AI Systems",
    id: "PUB-01",
    time: "34 MIN READ",
    date: "MAY 12, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "AI Readiness: Moving from Pilots to Production",
    id: "PUB-02",
    time: "37 MIN READ",
    date: "APRIL 29, 2026",
  },
  {
    title: "What Affects AI Development Cost in 2026",
    id: "PUB-03",
    time: "40 MIN READ",
    date: "MARCH 11, 2026",
  },
  {
    title: "Complete Guide: IoT Development Cost Breakdown",
    id: "PUB-04",
    time: "34 MIN READ",
    date: "MARCH 07, 2026",
  }
];

export function BlogListSection() {
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
          {articles.map((article, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-12 transition-all duration-500 hover:bg-muted/30"
            >
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-black tracking-[0.5em] text-primary">{article.id}</span>
                  <div className="h-px w-8 bg-border"></div>
                  <div className="flex items-center gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {article.time}</span>
                    <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {article.date}</span>
                  </div>
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-foreground group-hover:text-primary transition-colors leading-[1.1] tracking-tight max-w-3xl">
                  {article.title}
                </h3>
              </div>
              
              <div className="shrink-0 p-4 border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </motion.div>
          ))}
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
