import { motion } from "framer-motion";

const stats = [
  { label: "Software Systems Developed", value: "35+", id: "STA-01" },
  { label: "Global Market Reach", value: "25+", id: "STA-02" },
  { label: "Average Retention Years", value: "3+", id: "STA-03" },
  { label: "Concentration of Seniors", value: "70%", id: "STA-04" },
  { label: "Client Satisfaction", value: "98%", id: "STA-05" },
];

export function StatsSection() {
  return (
    <section id="stats" className="py-32 bg-white overflow-hidden relative">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:30px_30px]"></div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Performance Metrics
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black text-foreground leading-[0.9] tracking-tighter uppercase">
              ENGINEERING <br />
              <span className="text-primary">YOU CAN AUDIT.</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-xl pb-2">
            Every metric is a testament to our rigorous engineering lifecycle. We don't just deliver code; we deliver auditable technical superiority.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border border border-border">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-10 md:p-12 hover:bg-muted/30 transition-all duration-500"
            >
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-black tracking-[0.5em] text-muted-foreground/30 group-hover:text-primary/50 transition-colors">
                  {s.id}
                </span>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl md:text-7xl font-black tracking-tightest text-foreground group-hover:text-primary transition-colors">
                    {s.value}
                  </span>
                </div>

                <div className="h-px w-12 bg-primary group-hover:w-full transition-all duration-700"></div>

                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-tight">
                  {s.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industrial Footer Label */}
        <div className="mt-20 flex items-center justify-between opacity-10">
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">LSTK-AUDIT-LOG-V2</div>
          <div className="h-px flex-1 mx-12 bg-foreground"></div>
          <div className="text-[8px] font-black tracking-[0.5em] uppercase">Metrics Verified 2026</div>
        </div>
      </div>
    </section>
  );
}
