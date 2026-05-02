import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { SplitHeading } from "../SplitHeading";
import { toast } from "sonner";

export function ContactSection() {
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent — we'll be in touch within 24h.");
    }, 700);
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-screen snap-start flex-col justify-center overflow-hidden px-5 py-28 md:px-16"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.5 0.04 250) 1px, transparent 1px), linear-gradient(90deg, oklch(0.5 0.04 250) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 md:block">
        <MapPin className="h-32 w-32 text-primary/30" strokeWidth={1.2} />
      </div>

      <div className="relative z-10 grid gap-14 md:grid-cols-2 md:gap-20">
        <div>
          <SplitHeading
            accent="Lightstack"
            rest="HQ"
            as="h2"
            className="text-5xl md:text-7xl"
          />
          <p className="mt-6 max-w-md text-sm uppercase tracking-widest text-muted-foreground">
            340 Beacon Street, Suite 500
            <br />
            Boston, MA 02116, United States
          </p>

          <div className="mt-10 space-y-4">
            <a
              href="mailto:hello@lightstack.io"
              className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-5 w-5 text-primary" />
              hello@lightstack.io
            </a>
            <a
              href="tel:+15550100420"
              className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-5 w-5 text-primary" />
              +1 (555) 010-0420
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-border bg-foreground/[0.04] p-6 backdrop-blur md:p-8"
        >
          <h3 className="text-xl font-bold text-foreground">Start a project</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell us about your idea — we reply within one business day.
          </p>
          <div className="mt-6 space-y-4">
            <input
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-md border border-border bg-background/40 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="w-full rounded-md border border-border bg-background/40 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <textarea
              name="message"
              required
              rows={4}
              placeholder="What are you building?"
              className="w-full resize-none rounded-md border border-border bg-background/40 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary-glow disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
