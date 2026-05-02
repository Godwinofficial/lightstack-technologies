type Props = {
  accent: string;
  rest: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SplitHeading({ accent, rest, className = "", as = "h2" }: Props) {
  const Tag = as;
  return (
    <Tag className={`font-extrabold tracking-tight ${className}`}>
      <span className="text-primary">{accent}</span>{" "}
      <span className="text-foreground">{rest}</span>
    </Tag>
  );
}
