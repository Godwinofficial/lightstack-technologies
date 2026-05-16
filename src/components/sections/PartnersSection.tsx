import { motion } from "framer-motion";

const companies = [
  { name: "TARTLE", type: "bold" },
  { name: "TLNIKA Group", type: "black" },
  { name: "LPSOLUTIONS", type: "serif" },
  { name: "VELOCITY", type: "italic" },
  { name: "SYNAPSE", type: "mono" },
];

export function PartnersSection() {
  // Triple the array to ensure seamless looping
  const marqueeItems = [...companies, ...companies, ...companies];

  return (
    <section className="py-20 bg-white border-b border-border overflow-hidden">
      <div className="mb-8 px-6 md:px-10 max-w-[1400px] mx-auto">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">Trusted by companies</p>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap gap-20 items-center"
        >
          {marqueeItems.map((company, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 text-2xl md:text-3xl font-black text-foreground/40 hover:text-primary transition-colors duration-300 cursor-default px-4"
            >
              {company.name === "TARTLE" && (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 border-2 border-current rounded-full flex items-center justify-center p-1">
                    <div className="h-full w-full border-t-2 border-current"></div>
                  </div>
                  <span>{company.name}</span>
                </div>
              )}
              {company.name === "TLNIKA Group" && (
                <span className="tracking-tighter italic">{company.name}</span>
              )}
              {company.name === "LPSOLUTIONS" && (
                <span className="tracking-widest font-light">{company.name}</span>
              )}
              {company.name !== "TARTLE" && company.name !== "TLNIKA Group" && company.name !== "LPSOLUTIONS" && (
                <span>{company.name}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
