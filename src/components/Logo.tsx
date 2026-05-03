type Props = { className?: string };

export function Logo({ className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="ls-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.18 80)" />
            <stop offset="100%" stopColor="oklch(0.62 0.22 35)" />
          </linearGradient>
        </defs>
        <path
          d="M32 6 a26 26 0 1 1 -18.4 44.4"
          fill="none"
          stroke="url(#ls-grad)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="14" cy="50" r="4.5" fill="oklch(0.62 0.22 35)" />
      </svg>
      <div className="leading-none">
        <div className="text-2xl font-extrabold italic tracking-tight text-foreground">
          Lightstack
        </div>
        <div className="mt-0.5 text-[7.2px] font-semibold uppercase tracking-wider text-muted-foreground">
          Engineering Beyond Code
        </div>
      </div>
    </div>
  );
}
