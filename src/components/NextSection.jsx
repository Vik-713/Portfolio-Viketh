import React from 'react';

const NEXT_TOPICS = [
  {
    header: "AI & MULTI-AGENT SYSTEMS",
    title: "Agents that coordinate",
    desc: "Moving past single-model calls toward understanding how multiple AI agents can plan, delegate, and work together on a task."
  },
  {
    header: "REAL-TIME DATA",
    title: "Systems that react instantly",
    desc: "Digging deeper into event-driven architecture and streaming pipelines, building on what I learned from the URL analytics project."
  },
  {
    header: "APPLIED AI",
    title: "AI for real decisions",
    desc: "Interested in using AI on messy, real-world data — like the real-estate evaluation concept — rather than clean, pre-packaged datasets."
  }
];

const NextSection = () => {
  return (
    <section 
      id="exploring-next" 
      className="min-h-[70vh] bg-[#030303] text-white px-6 sm:px-12 md:px-24 py-20 flex flex-col justify-center select-none border-t border-white/5"
    >
      {/* Title */}
      <div className="mb-10">
        <h2 className="font-akira text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-white">
          EXPLORING NEXT
        </h2>
        <p className="font-clash text-sm sm:text-base md:text-lg text-zinc-500 font-medium mt-2 max-w-3xl">
          What I am currently researching and building to expand my knowledge boundary.
        </p>
      </div>

      {/* Grid of Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {NEXT_TOPICS.map((topic, idx) => (
          <div 
            key={idx} 
            className="bg-[#0d0d0f] border border-zinc-800/80 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between gap-6 hover:border-zinc-700 transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          >
            <div className="flex flex-col gap-2">
              {/* Tiny Blue Header */}
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest font-bold text-[#38bdf8] uppercase">
                {topic.header}
              </span>
              
              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-clash font-bold text-white leading-snug mt-1">
                {topic.title}
              </h3>
              
              {/* Description */}
              <p className="text-xs sm:text-sm font-google-sans text-zinc-400 leading-relaxed mt-2">
                {topic.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NextSection;
