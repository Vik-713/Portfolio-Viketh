import React from 'react';
import ScrambleText from './ScrambleText';

const JOURNEY_STEPS = [
  {
    step: "STEP 01",
    title: "Web Foundations",
    desc: "Started with interfaces: rebuilt the 1mg website in Figma, then moved into coding responsive interfaces with React and Tailwind CSS.",
    tech: ["HTML/CSS/JS", "React", "Figma", "Tailwind CSS"]
  },
  {
    step: "STEP 02",
    title: "Backend & APIs",
    desc: "Moved into backend systems: built REST and GraphQL API services for a music streaming application, a property-management API, and a parking-management system.",
    tech: ["Node.js", "Express", "Flask", "FastAPI", "GraphQL", "REST APIs"]
  },
  {
    step: "STEP 03",
    title: "Databases & Systems",
    desc: "Worked with PostgreSQL and MongoDB databases, using ORMs like SQLAlchemy for schema-based data modeling, and containerizing database services with Docker.",
    tech: ["PostgreSQL", "MongoDB", "SQLAlchemy", "Docker"]
  },
  {
    step: "STEP 04",
    title: "Real-Time & Data Systems",
    desc: "Built a real-time URL analytics platform with a RabbitMQ event ingestion pipeline feeding click events into MongoDB, managed via FastAPI with Chart.js visualization.",
    tech: ["RabbitMQ", "Event-Driven Architecture", "FastAPI", "MongoDB", "Chart.js", "Docker"]
  },
  {
    step: "STEP 05",
    title: "AI & Machine Learning (Current)",
    desc: "Built a customer review sentiment analyzer using NLP (TF-IDF vectorization, logistic regression, and K-means clustering). Currently deep diving into multi-agent systems and applied AI.",
    tech: ["NLP", "Sentiment Analysis", "Clustering", "Multi-Agent Systems", "Python"]
  }
];

const Journey = () => {
  return (
    <div 
      id="experiences" 
      className="bg-slate-50 grid grid-cols-1 lg:grid-cols-3 items-start py-10 sm:py-14 px-6 sm:px-12 md:px-24 gap-8"
    >
      {/* Left Column: Sticky Title */}
      <div className="lg:sticky lg:top-8 flex flex-col gap-3 lg:col-span-1">
        <h2 className="font-akira text-2xl sm:text-3xl md:text-4xl text-black leading-none uppercase">
          <ScrambleText text="JOURNEY" />
        </h2>
        <p className="font-clash text-gray-500 font-medium text-xs sm:text-sm md:text-base leading-relaxed">
          My learning path as a Computer Science student. Moving from frontend interfaces to complex backend APIs, message pipelines, databases, and applied machine learning.
        </p>
      </div>

      {/* Right Column: Scrolling Cards */}
      <div className="w-full flex flex-col gap-4 lg:col-span-2">
        {JOURNEY_STEPS.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-white border-2 border-gray-100 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-sm hover:-translate-y-1 hover:border-black transition-all duration-300 flex flex-col gap-2.5 transform"
            style={{
              transitionDelay: `${idx * 100}ms`
            }}
          >
            {/* Card Header */}
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h3 className="font-clash font-bold text-base sm:text-lg md:text-xl text-black">
                {item.title}
              </h3>
              <span className="font-akira text-[9px] bg-black text-white px-2.5 py-0.5 rounded-full">
                {item.step}
              </span>
            </div>

            {/* Description */}
            <p className="font-google-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
              {item.desc}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tech.map((tag, tIdx) => (
                <span 
                  key={tIdx} 
                  className="bg-slate-50 text-slate-700 text-[9px] font-mono px-2 py-0.5 rounded-full border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
