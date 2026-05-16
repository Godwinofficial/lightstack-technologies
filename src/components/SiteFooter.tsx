import { Linkedin, Twitter, Mail, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Logo } from "./Logo";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground pt-32 pb-16 px-6 md:px-10 border-t-4 border-primary text-white relative overflow-hidden">
      {/* High-Intensity Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>

      <div className="mx-auto max-w-[1400px] relative z-10">
        
        {/* Top Branding & Main Call-to-Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32 items-start">
          <div className="lg:col-span-7 flex flex-col gap-12">
            <Logo size="lg" className="brightness-0 invert mb-4" />
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tightest leading-[0.85] max-w-2xl">
              BUILDING FOR <br />
              <span className="text-primary">BILLION SCALE.</span>
            </h2>
            
            <div className="flex gap-6">
              {[
                { icon: <Linkedin className="h-6 w-6" />, href: "#", label: "LinkedIn" },
                { icon: <Twitter className="h-6 w-6" />, href: "#", label: "Twitter" },
                { icon: <Github className="h-6 w-6" />, href: "#", label: "GitHub" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  onClick={(e) => social.href === "#" && e.preventDefault()}
                  className="group flex items-center gap-4 px-6 py-4 border-2 border-white/20 hover:border-primary hover:bg-primary transition-all duration-500"
                >
                  {social.icon}
                  <span className="text-xs font-black uppercase tracking-widest hidden md:block">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="flex flex-col gap-6">
                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-primary">Headquarters</h4>
                <p className="text-2xl font-black tracking-tight leading-relaxed text-white">
                   Plot 123, Independence Avenue<br />
                   Lusaka, Zambia
                </p>
                <div className="flex flex-col gap-2">
                  <a href="tel:+260973848066" className="text-xl font-black hover:text-primary transition-colors text-white">+260 973 848 066</a>
                </div>
             </div>
             <div className="flex flex-col gap-6">
                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-primary">Operations</h4>
                <p className="text-2xl font-black tracking-tight text-white">Lusaka Node</p>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Direct Briefing</span>
                  <a href="mailto:godwinbanda19@gmail.com" className="text-xl font-black hover:text-primary transition-colors text-white">godwinbanda19@gmail.com</a>
                </div>
             </div>
          </div>
        </div>

        {/* Navigation Grid - High Contrast */}
        <div className="py-20 border-y-2 border-white/10 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { 
              title: "Capabilities", 
              links: ["AI Systems", "Enterprise Ops", "IoT Security", "Cloud Native"] 
            },
            { 
              title: "Sectors", 
              links: ["Fintech", "Logistics", "Energy", "eCommerce"] 
            },
            { 
              title: "Frameworks", 
              links: ["The ADLC", "RAG Pipeline", "Agentic Ops", "Governance"] 
            },
            { 
              title: "Company", 
              links: ["About Us", "Contact", "Case Studies", "Blog"] 
            }
          ].map((col, i) => (
            <div key={i} className="flex flex-col gap-8">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-primary">{col.title}</h4>
              <nav className="flex flex-col gap-4">
                {col.links.map(link => (
                  <a 
                    key={link} 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="text-sm font-bold text-white hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    {link} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom Bar - Robust & Solid */}
        <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <p className="text-[10px] font-black uppercase tracking-widest text-white">© {currentYear} Lightstack Group.</p>
            <div className="flex gap-10">
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">Privacy</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">Security</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
