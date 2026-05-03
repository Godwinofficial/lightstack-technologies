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
      className="relative flex min-h-screen snap-start flex-col justify-start px-5 pt-28 pb-16 md:px-16 md:pt-32"
    >
      <SplitHeading
        accent="Valued"
        rest="Clients"
        as="h2"
        className="text-5xl md:text-7xl"
      />
      <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-10 md:grid-cols-4">
        {clients.map((name) => (
          <div
            key={name}
            className="flex h-20 items-center justify-center"
          >
            <span className="text-xl font-extrabold tracking-[0.2em] text-foreground/80 transition-colors hover:text-primary md:text-2xl">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
