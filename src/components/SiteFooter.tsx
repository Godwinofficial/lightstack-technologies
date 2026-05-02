import { Facebook, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <span className="pointer-events-auto text-xs text-muted-foreground">
          © Lightstack 2026
        </span>
        <div className="pointer-events-auto flex items-center gap-4">
          <a
            href="#"
            aria-label="Facebook"
            className="text-foreground transition-colors hover:text-primary"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-foreground transition-colors hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
