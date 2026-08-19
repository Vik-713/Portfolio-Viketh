import React from 'react';
import { Code2, Cpu, Database, Brain } from 'lucide-react';
import ScrambleText from './ScrambleText';

const SKILLS_DATA = [
  {
    category: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", level: 5, desc: "Primary language for ML, scripting, automation, and API backends." },
      { name: "JavaScript", level: 5, desc: "Interactive client-side web apps, ES6+, and Node.js backend development." },
      { name: "SQL", level: 4, desc: "Database querying, structured schema design, and query optimization." },
      { name: "HTML5 & CSS3", level: 4, desc: "Modern styling systems, layout design, and semantic markup." }
    ]
  },
  {
    category: "Frameworks & APIs",
    icon: Cpu,
    skills: [
      { name: "React", level: 5, desc: "Component architecture, hooks, state management, and responsive UIs." },
      { name: "FastAPI", level: 5, desc: "High-performance asynchronous backend services and REST APIs." },
      { name: "Flask", level: 4, desc: "Lightweight Python microframeworks for agile routing services." },
      { name: "Express", level: 4, desc: "Modular and scalable API backends built on top of Node.js." }
    ]
  },
  {
    category: "Data & DevOps",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 4, desc: "Relational database management, querying, and SQLAlchemy ORM design." },
      { name: "MongoDB", level: 4, desc: "NoSQL document stores, complex query structures, and aggregations." },
      { name: "Docker", level: 4, desc: "Containerizing services, environment isolation, and multi-container orchestration." },
      { name: "RabbitMQ", level: 3, desc: "Asynchronous event ingestion and message queue system architectures." }
    ]
  },
  {
    category: "AI & Machine Learning",
    icon: Brain,
    inProgress: true,
    skills: []
  }
];

const Skills = () => {
  return (
    <section 
      id="skills" 
      className="bg-white px-6 sm:px-12 md:px-24 py-24 md:py-32 flex flex-col justify-center select-none"
    >
      {/* Title */}
      <div className="mb-16">
        <h2 className="font-akira text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-black">
          <ScrambleText text="TECH STACK" />
        </h2>
        <p className="font-clash text-base sm:text-lg md:text-xl text-gray-500 font-medium mt-2 max-w-3xl">
          Technologies and tools I work with to build responsive frontends, scalable backends, database models, and intelligent systems.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SKILLS_DATA.map((item, idx) => {
          const CategoryIcon = item.icon;
          return (
            <div 
              key={idx}
              className="bg-white border-3 border-black rounded-3xl p-8 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-7"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center text-white shrink-0">
                  <CategoryIcon className="w-7 h-7" />
                </div>
                <h3 className="font-akira text-sm sm:text-base md:text-lg text-black uppercase leading-tight">
                  {item.category}
                </h3>
              </div>

              {/* Skills List / In Progress Placeholder */}
              {item.inProgress ? (
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center mt-2 min-h-[220px]">
                  <span className="font-akira text-xs text-gray-400 uppercase tracking-widest animate-pulse">
                    IN PROGRESS
                  </span>
                  <p className="font-google-sans text-xs text-gray-400 mt-2 leading-relaxed">
                    Currently learning ML fundamentals, neural networks, and applied AI systems.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {item.skills.map((skill, sIdx) => (
                    <div 
                      key={sIdx} 
                      className="group/item flex flex-col py-4 border-b border-gray-100 last:border-b-0 cursor-pointer overflow-hidden"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-clash font-bold text-sm sm:text-base text-black group-hover/item:text-black transition-colors duration-200">
                          {skill.name}
                        </span>
                        <div className="flex gap-1 shrink-0">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <span 
                              key={num} 
                              className={`w-2 h-4 rounded-[2px] transition-all duration-300 ${
                                num <= skill.level ? 'bg-black scale-y-100' : 'bg-gray-200 scale-y-75 opacity-40'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Collapsible description via grid-template-rows */}
                      <div className="grid grid-rows-[0fr] group-hover/item:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <div className="overflow-hidden">
                          <p className="font-google-sans text-xs sm:text-sm text-gray-500 leading-relaxed pt-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            {skill.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
