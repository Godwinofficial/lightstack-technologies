import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${solid ? "bg-white shadow-md py-4" : "bg-transparent py-6"
          }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
          <Link to="/" aria-label="Lightstack home" className="flex items-center gap-2 group">
            <Logo className="transition-transform duration-300 group-hover:scale-105" />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link 
                key={l.to} 
                to={l.to} 
                className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-primary ${
                  solid ? "text-foreground" : "text-foreground/80"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={(e) => e.preventDefault()}
              className="hidden lg:flex items-center gap-2 px-6 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95"
            >
              Book a Call
            </button>

            <a
              href="mailto:godwinbanda19@gmail.com"
              className="flex h-12 w-12 items-center justify-center transition-all hover:scale-110 active:scale-95 text-primary"
            >
              <Mail className="h-6 w-6" />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex flex-col gap-1.5 p-2 transition-opacity hover:opacity-70 group"
            >
              <div className="h-0.5 w-8 bg-foreground"></div>
              <div className="h-0.5 w-6 self-end bg-foreground"></div>
              <div className="h-0.5 w-8 bg-foreground"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay menu */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        <div
          className="absolute inset-0 bg-[#001c4a]/90 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-10 shadow-2xl transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-full p-2 text-[#001c4a] hover:bg-[#001c4a]/5"
            >
              <X className="h-8 w-8" />
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-6">
            {links.map((l, idx) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-4 text-4xl font-bold text-[#001c4a] transition-all hover:translate-x-2"
              >
                <span className="text-sm font-medium text-[#007bff]">0{idx + 1}</span>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-[#001c4a]/40 mb-6">Connect with us</p>
            <div className="flex flex-col gap-4">
              <a href="mailto:godwinbanda19@gmail.com" className="text-xl font-bold text-[#001c4a] hover:text-[#007bff] transition-colors">
                godwinbanda19@gmail.com
              </a>
              <a href="tel:+260973848066" className="text-xl font-bold text-[#001c4a] hover:text-[#007bff] transition-colors">
                +260 973 848 066
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
