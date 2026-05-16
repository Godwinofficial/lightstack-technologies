import logo from "../assets/logo.png";

type Props = { className?: string };

export function Logo({ className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logo} alt="Lightstack Logo" className="h-10 w-auto shrink-0" />
    </div>
  );
}

