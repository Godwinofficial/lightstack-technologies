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
        className={`fixed inset-x-0 top-0 z-40 transition-colors ${
          solid ? "bg-header/95 backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <Link to="/" aria-label="Lightstack home">
            <Logo />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-md p-2 text-foreground transition-colors hover:bg-white/10"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </header>

      {/* Overlay menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-header p-8 shadow-2xl transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-md p-2 text-foreground hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-3 py-3 text-3xl font-bold text-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                <span className="text-sm font-mono text-primary opacity-60">
                  0{links.indexOf(l) + 1}
                </span>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-10 flex flex-col gap-3 text-sm text-muted-foreground">
            <a
              href="mailto:godwinbanda19@gmail.com"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" />
              <span className="font-semibold">Send Email</span>
            </a>
            <a
              href="tel:+260973848066"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span className="font-semibold">Call Us</span>
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
