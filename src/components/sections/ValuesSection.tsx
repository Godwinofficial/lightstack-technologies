import { motion } from "framer-motion";
import { Leaf, UserCheck, ShieldCheck, ChevronRight } from "lucide-react";

const values = [
  {
    title: "Sustainability Commitment",
    subtitle: "VAL-01",
    icon: Leaf,
    description: "We are committed to supporting sustainable growth and contributing to a better future. As proud members of the Council for Inclusive Capitalism, we integrate sustainable practices into our projects and operations, prioritizing long-term solutions that positively impact the environment, society, and economy."
  },
  {
    title: "Client-Centric Logic",
    subtitle: "VAL-02",
    icon: UserCheck,
    description: "Our Clients are at the heart of everything we do. We work tirelessly to understand their needs, exceed their expectations, and deliver solutions that align with their business goals, ensuring long-lasting and mutually beneficial relationships."
  },
  {
    title: "Security and Confidentiality",
    subtitle: "VAL-03",
    icon: ShieldCheck,
    description: "As an ISO 9001 and ISO 27001-certified company, we adhere to the highest international standards for information security. From day one, we sign NDAs and implement industry best practices like multi-factor authentication and strict data access controls."
  }
];

export function ValuesSection() {
  return (
    <section id="values" className="py-32 bg-white relative overflow-hidden">
      {/* Background Subtle Text */}
      <div className="absolute top-1/4 -right-20 text-[15vw] font-black text-muted/20 select-none pointer-events-none rotate-90 origin-center opacity-10">
        CORE VALUES
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-24 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-[2px] w-12 bg-primary"></span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Ethical Foundation
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black text-foreground leading-[0.9] tracking-tighter uppercase">
            BUILDING ON <br />
            <span className="text-muted-foreground/30">STRONG VALUES.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div 
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group flex flex-col gap-8 p-10 border border-border hover:border-primary transition-all duration-500 bg-white shadow-sm hover:shadow-xl relative overflow-hidden"
              >
                {/* Asymmetric Header */}
                <div className="flex items-start justify-between">
                  <div className="p-5 bg-muted text-primary transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.5em] text-muted-foreground/40">{v.subtitle}</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">{v.title}</h3>
                  <div className="h-px w-12 bg-primary group-hover:w-full transition-all duration-700"></div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium mt-4">
                    {v.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="mt-auto pt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Verified Protocol</span>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Industrial Metadata Row */}
        <div className="mt-24 border-t border-border pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Certification</span>
              <span className="text-xs font-bold">ISO 9001 / ISO 27001</span>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Engagement</span>
              <span className="text-xs font-bold">Council for Inclusive Capitalism</span>
            </div>
          </div>
          <div className="text-[10px] font-black tracking-[0.5em] text-muted-foreground/20">LSTK-VAL-REG-2024</div>
        </div>
      </div>
    </section>
  );
}
