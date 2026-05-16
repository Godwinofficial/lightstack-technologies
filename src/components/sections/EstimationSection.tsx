export function EstimationSection() {
  return (
    <section className="py-32 bg-[#001c4a] relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-[1400px] px-6 md:px-20 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">
            Get a Free Project Estimate
          </h2>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-12">
            Share as much details about your project as possible and get a detailed proposal.
          </p>
          <button 
            onClick={(e) => e.preventDefault()}
            className="px-12 py-5 bg-[#007bff] text-white font-bold uppercase tracking-widest text-sm transition-transform hover:scale-105 active:scale-95 shadow-xl"
          >
            Free estimation
          </button>
        </div>
      </div>
    </section>
  );
}
