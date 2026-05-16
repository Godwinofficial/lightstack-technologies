import { Star } from "lucide-react";

export function ReviewsSummary() {
  return (
    <div className="flex items-center gap-6 mb-8">
      <div className="flex -space-x-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      <div className="h-4 w-px bg-border"></div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-black tracking-tight">4.9/5.0</span>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Aggregate Rating</span>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <div className="h-4 w-px bg-border"></div>
        <span className="text-[10px] font-black uppercase tracking-widest text-primary">35+ Projects Verified</span>
      </div>
    </div>
  );
}
