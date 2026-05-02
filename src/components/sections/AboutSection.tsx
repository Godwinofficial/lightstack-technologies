export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen snap-start items-center justify-center overflow-hidden px-5 py-28 md:px-16"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, oklch(0.4 0.04 250) 0%, transparent 50%), radial-gradient(circle at 70% 70%, oklch(0.35 0.05 260) 0%, transparent 50%)",
        }}
      />
      <div className="relative z-10 w-full max-w-3xl">
        <h2 className="mb-10 text-5xl font-extrabold tracking-tight text-foreground/40 md:text-7xl">
          About Us
        </h2>
        <div className="rounded-lg bg-foreground/[0.04] p-8 backdrop-blur md:p-12">
          <h3 className="text-sm font-bold tracking-[0.25em] text-foreground">
            OUR VISION
          </h3>
          <p className="mt-4 text-lg italic leading-relaxed text-muted-foreground">
            To be the most trusted engineering partner for ambitious teams —
            relentless in our pursuit of craft, clarity, and outcomes that
            outlast the brief.
          </p>

          <div className="my-10 h-px w-full bg-primary/60" />

          <h3 className="text-sm font-bold tracking-[0.25em] text-foreground">
            OUR REACH
          </h3>
          <p className="mt-4 text-lg italic leading-relaxed text-muted-foreground">
            From fintech platforms to logistics systems, Lightstack has shipped
            production software for clients across North America, Europe, and
            Africa — with a growing roster of partners every quarter.
          </p>
        </div>
      </div>
    </section>
  );
}
