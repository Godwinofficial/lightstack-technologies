import { SplitHeading } from "../SplitHeading";

const clients = [
  "NORTHWIND",
  "CARGOFLOW",
  "MERIDIAN",
  "ATLAS",
  "ORBIT",
  "VAULTKEEP",
  "HELIO",
  "BLACKPINE",
];

export function ClientsSection() {
  return (
    <section
      id="clients"
      className="relative flex min-h-screen snap-start flex-col justify-center px-5 py-28 md:px-16"
    >
      <SplitHeading
        accent="Valued"
        rest="Clients"
        as="h2"
        className="text-5xl md:text-7xl"
      />
      <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-20 md:grid-cols-4">
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
