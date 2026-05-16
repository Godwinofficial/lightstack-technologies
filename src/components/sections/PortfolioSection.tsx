import { ChevronRight } from "lucide-react";

const caseStudies = [
  {
    title: "IoT- and ML-based predictive wind farm maintenance",
    description: "The wind farm operator was experiencing unexpected failures in gearboxes and generators. We developed a predictive maintenance system based on IoT and machine learning that helps identify issues early and reduce downtime.",
    tags: ["IoT", "AI inside", "Enterprise"],
    color: "#001c4a",
    badge: "AI-powered stack"
  },
  {
    title: "Graphical user interface for robot operation",
    description: "SumatoSoft developed a graphic user interface (GUI) that helps to communicate with the robot Alfred, an automated robotic arm.",
    tags: ["IoT", "Startups"],
    color: "#0056b3",
    badge: "Traditional tech stack"
  },
  {
    title: "Customer engagement platform for a leading retailer",
    description: "The client needed a scalable solution to handle millions of customer interactions and provide personalized recommendations in real-time.",
    tags: ["Retail", "AI-driven", "Cloud"],
    color: "#4e73df",
    badge: "AI-powered stack"
  }
];

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative flex flex-col justify-center px-6 py-48 md:px-20 bg-[#f8f9fa]"
    >
      <div className="flex overflow-x-auto gap-8 pb-10 no-scrollbar">
        {caseStudies.map((cs, i) => (
          <div 
            key={cs.title} 
            className="min-w-[320px] md:min-w-[600px] p-10 rounded-lg text-white flex flex-col gap-6 shadow-xl"
            style={{ backgroundColor: cs.color }}
          >
            <span className="px-4 py-1.5 rounded bg-white/10 text-xs font-bold uppercase tracking-widest self-start">
              {cs.badge}
            </span>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight">
              {cs.title}
            </h3>
            <p className="text-lg text-white/70 leading-relaxed">
              {cs.description}
            </p>
            <div className="flex gap-3 mt-auto">
              {cs.tags.map(tag => (
                <span key={tag} className="px-4 py-2 rounded bg-white/10 text-xs font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-10">
        {/* Slider dots simulation */}
        <div className="flex gap-2 h-1 w-48 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-[#007bff]"></div>
        </div>

        <a href="#" className="flex items-center gap-2 text-[#007bff] font-bold text-2xl hover:underline decoration-2 underline-offset-8">
          View all cases <ChevronRight className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
}
