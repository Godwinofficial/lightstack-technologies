import { SplitHeading } from "../SplitHeading";

const clients = [
  "NORTHWIND",
  "VAULTKEEP",
  "BLACKPINE",
];

export function ClientsSection() {
  return (
    <section
      id="clients"
      className="relative flex min-h-screen snap-start flex-col justify-center px-6 py-32 md:px-20 bg-white"
    >
      <div className="flex flex-col gap-32">
        {/* Partners */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-center opacity-60">
             <div className="flex items-center gap-2 font-bold text-2xl text-[#001c4a]">
               <div className="h-8 w-8 border-2 border-current rounded-full flex items-center justify-center p-1">
                 <div className="h-full w-full border-t-2 border-current"></div>
               </div>
               TARTLE
             </div>
             <div className="text-3xl font-black tracking-tighter text-[#001c4a]">
               TLNIKA <span className="text-xs block font-normal tracking-normal uppercase opacity-50">Group</span>
             </div>
             <div className="text-2xl font-bold text-[#001c4a] tracking-tight">
               LPSOLUTIONS
             </div>
          </div>
        </div>

        {/* Compliance */}
        <div className="max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-40">
            {["PCI DSS", "OWASP", "ISO", "HIPAA", "GDPR", "SOC2"].map((name) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 border-2 border-[#001c4a] rounded-lg flex items-center justify-center font-bold text-[10px]">
                  {name === "GDPR" ? "★" : name}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
