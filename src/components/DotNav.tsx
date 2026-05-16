type Props = {
  count: number;
  active: number;
  onJump: (i: number) => void;
  labels?: string[];
};

export function DotNav({ count, active, onJump, labels }: Props) {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex"
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onJump(i)}
            aria-label={labels?.[i] ?? `Section ${i + 1}`}
            className="group relative flex h-3 w-3 items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-4 w-4 bg-[#007bff] shadow-[0_0_15px_rgba(0,123,255,0.4)] scale-110"
                  : "h-2 w-2 bg-[#001c4a]/20 group-hover:bg-[#001c4a]/40"
              }`}
            />
            {labels?.[i] && (
              <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md bg-header px-2 py-1 text-xs text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {labels[i]}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
