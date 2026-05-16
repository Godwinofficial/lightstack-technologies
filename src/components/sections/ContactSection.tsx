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
      toast.success("Message sent, we'll be in touch within 24h.");
    }, 700);
  }

  return (
    <section
      id="contact"
      className="relative flex flex-col justify-center px-6 py-48 md:px-20 bg-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-[1400px] mx-auto w-full">
        <div>
          <h2 className="text-5xl md:text-8xl font-black leading-tight text-[#001c4a] mb-10 tracking-tighter uppercase">
            LET'S <span className="text-[#007bff]">TALK.</span>
          </h2>
          <p className="text-xl text-[#001c4a]/60 leading-relaxed max-w-md mb-12 font-medium">
            Have a project in mind? We'd love to hear about it. Our team in Lusaka is ready to help you scale.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-6">
              {/* <div className="h-16 w-16 bg-[#007bff]/5 flex items-center justify-center text-[#007bff] border border-[#007bff]/10">
                <Mail className="h-6 w-6" />
              </div> */}
              {/* <a href="mailto:godwinbanda19@gmail.com" className="text-2xl font-black text-[#001c4a] hover:text-[#007bff] transition-colors">
                godwinbanda19@gmail.com
              </a> */}
            </div>
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 bg-[#007bff]/5 flex items-center justify-center text-[#007bff] border border-[#007bff]/10">
                <Phone className="h-6 w-6" />
              </div>
              <a href="tel:+260973848066" className="text-2xl font-black text-[#001c4a] hover:text-[#007bff] transition-colors">
                +260 973 848 066
              </a>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 bg-[#007bff]/5 flex items-center justify-center text-[#007bff] border border-[#007bff]/10">
                <MapPin className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black text-[#001c4a]/40">
                Lusaka, Zambia
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-muted/30 p-8 md:p-12 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#001c4a]/40">Full Name</label>
              <input
                name="name"
                required
                placeholder="E.g. Chileshe Mulenga"
                className="w-full border-b border-[#001c4a]/20 bg-transparent py-4 text-lg font-bold text-[#001c4a] outline-none transition-colors focus:border-[#007bff] placeholder:text-[#001c4a]/20"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#001c4a]/40">Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@company.com"
                className="w-full border-b border-[#001c4a]/20 bg-transparent py-4 text-lg font-bold text-[#001c4a] outline-none transition-colors focus:border-[#007bff] placeholder:text-[#001c4a]/20"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#001c4a]/40">Project Brief</label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Tell us about your requirements..."
              className="w-full border-b border-[#001c4a]/20 bg-transparent py-4 text-lg font-bold text-[#001c4a] outline-none transition-colors focus:border-[#007bff] resize-none placeholder:text-[#001c4a]/20"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="group mt-4 flex items-center justify-center gap-4 w-full md:w-fit px-12 py-6 bg-primary text-white font-black uppercase tracking-widest text-xs transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-60"
          >
            {sending ? "Transmitting..." : "Send Brief"}
            <span className="w-2 h-2 bg-white rounded-full group-hover:animate-ping"></span>
          </button>
        </form>
      </div>
    </section>
  );
}
