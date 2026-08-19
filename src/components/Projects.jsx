import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ScrambleText from './ScrambleText';

const PROJECTS = [
  {
    num: "01",
    title: "Real-Time URL Analytics System",
    desc: "An analytics platform for shortened URLs that captures click events (timestamp, device, browser, location) through a RabbitMQ ingestion pipeline and visualizes trends on live dashboards.",
    tags: ["Python", "FastAPI", "RabbitMQ", "MongoDB", "Docker", "Chart.js"],
    github: "https://github.com/Vik-713/URL-Analytics-Event-Ingestion-Pipeline-",
    view: "https://github.com/Vik-713",
    type: "analytics"
  },
  {
    num: "02",
    title: "DroneRoute Aerial Delivery Cloud",
    desc: "A cloud-native aerial routing system for drone-based delivery services, demonstrating AWS cloud deployments, secure API routing, and scalable production architecture.",
    tags: ["AWS", "Docker", "DevOps", "Cloud", "CI/CD"],
    github: "https://github.com/Vik-713/Drone-Route-Cloud",
    view: "https://github.com/Vik-713",
    type: "drone"
  },
  {
    num: "03",
    title: "SynapseGrid — Healthcare",
    desc: "A robust backend system for managing patients, admissions, and beds, with database routes and services built in Flask and PostgreSQL running in Docker.",
    tags: ["Python", "Flask", "PostgreSQL", "Docker"],
    github: "https://github.com/Vik-713/SynapseGrid-Healthcare-Management-System-Devops-",
    view: "https://github.com/Vik-713",
    type: "database"
  },
  {
    num: "04",
    title: "Real Estate Property Management API",
    desc: "A GraphQL backend for managing property-related data — schema design, resolvers, and a PostgreSQL data model via SQLAlchemy.",
    tags: ["GraphQL", "PostgreSQL", "SQLAlchemy"],
    github: "https://github.com/Vik-713/Real-Estate-Management-GraphQL",
    view: "https://github.com/Vik-713",
    type: "graphql"
  },
  {
    num: "05",
    title: "MUSICAa — Music Streaming App",
    desc: "A full-stack music streaming web app with a React frontend and Node/Express backend supporting live streaming features.",
    tags: ["React", "Node.js", "Express"],
    github: "https://github.com/Vik-713/MiMusicaa",
    view: "https://github.com/Vik-713",
    type: "player"
  },
  {
    num: "06",
    title: "Amazon Review Sentiment Analyzer",
    desc: "Classifies Amazon customer review sentiment using TF-IDF vectorization, logistic regression, and K-means clustering.",
    tags: ["Python", "TF-IDF", "Logistic Regression", "K-Means"],
    github: "https://github.com/Vik-713/Amazon-Review-Sentiment-Analyzing",
    view: "https://github.com/Vik-713",
    type: "ml"
  }
];

const MockupVisual = ({ type }) => {
  switch (type) {
    case "analytics":
      return (
        <div className="w-full h-full bg-slate-950 flex flex-col justify-end p-4 rounded-xl gap-2 overflow-hidden border border-white/10">
          <div className="flex justify-between items-center text-[10px] text-emerald-400 font-mono">
            <span>● LIVE EVENT INGESTION</span>
            <span>RABBITMQ: OK</span>
          </div>
          <div className="flex items-end gap-2 h-20">
            <div className="bg-emerald-500/20 hover:bg-emerald-500 w-full h-12 transition-all duration-300 rounded-t-sm" />
            <div className="bg-emerald-500/20 hover:bg-emerald-500 w-full h-16 transition-all duration-300 rounded-t-sm animate-pulse" />
            <div className="bg-emerald-500/20 hover:bg-emerald-500 w-full h-8 transition-all duration-300 rounded-t-sm" />
            <div className="bg-emerald-500/20 hover:bg-emerald-500 w-full h-20 transition-all duration-300 rounded-t-sm" />
            <div className="bg-emerald-500/20 hover:bg-emerald-500 w-full h-14 transition-all duration-300 rounded-t-sm" />
          </div>
        </div>
      );
    case "drone":
      return (
        <div className="w-full h-full bg-slate-900 p-3 rounded-xl border border-white/5 flex flex-col justify-between font-mono text-[9px] text-white overflow-hidden">
          <div className="flex justify-between items-center text-sky-400">
            <span>☁ AWS CLOUD ROUTING</span>
            <span className="animate-pulse">● ACTIVE RUN</span>
          </div>
          <div className="relative border border-white/10 w-full h-20 rounded bg-black/40 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full absolute inset-0">
              <polyline 
                points="10,50 50,15 110,35 150,8 190,45" 
                fill="none" 
                stroke="#38bdf8" 
                strokeWidth="1.5" 
                strokeDasharray="4 2"
              />
              <circle cx="110" cy="35" r="4" fill="#38bdf8" className="animate-ping" />
              <circle cx="110" cy="35" r="3" fill="#0ea5e9" />
              <circle cx="10" cy="50" r="2" fill="#ffffff" />
              <circle cx="50" cy="15" r="2" fill="#ffffff" />
              <circle cx="150" cy="8" r="2" fill="#ffffff" />
              <circle cx="190" cy="45" r="2" fill="#ffffff" />
            </svg>
            <div className="absolute top-1 right-2 text-[8px] text-gray-500">
              D_ID: #409
            </div>
          </div>
          <div className="flex justify-between text-[8px] text-sky-400/85">
            <span>LAT: 37.7749</span>
            <span>LNG: -122.4194</span>
          </div>
        </div>
      );
    case "database":
      return (
        <div className="w-full h-full bg-slate-900 p-3 rounded-xl border border-white/5 font-mono text-[9px] text-gray-400 flex flex-col gap-1.5 overflow-hidden">
          <div className="text-blue-400"># Patients Database Schema</div>
          <div className="border-b border-white/10 pb-1 text-gray-300">TABLE admissions (</div>
          <div className="pl-3">id SERIAL PRIMARY KEY,</div>
          <div className="pl-3">patient_id INT REFERENCES patients(id),</div>
          <div className="pl-3">bed_number VARCHAR(10) UNIQUE,</div>
          <div className="pl-3">admitted_at TIMESTAMP DEFAULT NOW()</div>
          <div className="text-gray-300">);</div>
        </div>
      );
    case "graphql":
      return (
        <div className="w-full h-full bg-slate-900 p-3 rounded-xl border border-white/5 font-mono text-[9px] text-purple-400 flex flex-col gap-1 overflow-hidden">
          <div>{"query GetProperty {"}</div>
          <div className="pl-3 text-pink-400">{"property(id: \"101\") {"}</div>
          <div className="pl-6 text-gray-300">address</div>
          <div className="pl-6 text-gray-300">price</div>
          <div className="pl-6 text-pink-400">{"resolvers {"}</div>
          <div className="pl-9 text-gray-300">agentName</div>
          <div className="pl-6">{"}"}</div>
          <div className="pl-3">{"}"}</div>
          <div>{"}"}</div>
        </div>
      );
    case "ml":
      return (
        <div className="w-full h-full bg-slate-950 p-3 rounded-xl border border-white/10 flex flex-col justify-center gap-3 font-mono text-[10px] text-white">
          <div className="text-center font-bold text-yellow-400">REVIEW SENTIMENT</div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between"><span>Positive:</span> <span className="text-emerald-400">87.5%</span></div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[87.5%]" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between"><span>Negative:</span> <span className="text-rose-400">12.5%</span></div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="bg-rose-400 h-full w-[12.5%]" />
            </div>
          </div>
        </div>
      );
    case "player":
      return (
        <div className="w-full h-full bg-slate-900 p-4 rounded-xl border border-white/5 flex flex-col justify-center items-center gap-3">
          <div className="text-center text-xs font-clash font-semibold text-white">MUSICAa Player</div>
          <div className="w-full h-1 bg-white/10 rounded-full relative">
            <div className="absolute left-0 top-0 bottom-0 bg-white w-1/3 rounded-full" />
            <div className="absolute left-[33%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow" />
          </div>
          <div className="flex gap-4 items-center text-white/80 text-xs">
            <span>⏮</span>
            <span className="text-lg">⏸</span>
            <span>⏭</span>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section 
      id="projects" 
      className="min-h-screen bg-black px-6 sm:px-12 md:px-24 py-16 flex flex-col gap-10 select-none"
    >
      {/* Title block */}
      <div className="border-b border-white/10 pb-6">
        <h2 className="font-akira text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-white">
          <ScrambleText text="PROJECTS" />
        </h2>
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
          <p className="font-clash text-sm sm:text-base md:text-lg text-gray-400 font-medium">
            Recent projects that solve real problems.
          </p>
        </div>
      </div>

      {/* Accordion Container */}
      <div className="flex flex-col w-full border-t border-white/10">
        {PROJECTS.map((project, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className="relative overflow-hidden border-b border-white/10 transition-all duration-300 ease-in-out cursor-pointer"
              style={{
                height: isActive ? '320px' : '90px'
              }}
            >
              {/* Inactive Header Row */}
              <div className="h-[90px] flex items-center px-4 justify-between select-none">
                <span className="relative flex flex-row items-center font-clash text-lg sm:text-xl md:text-2xl text-white/80 font-semibold uppercase gap-4">
                  <span className="font-akira text-white/30 text-xs sm:text-sm">{project.num}</span>
                  {project.title}
                </span>
                <span className="text-white/40">
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300" />
                </span>
              </div>

              {/* Active Detailed Card Panel */}
              <div
                className={`absolute inset-0 z-20 flex flex-col sm:flex-row justify-between items-stretch px-6 py-4 bg-white text-black transition-all duration-300 ease-in-out ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
                }`}
              >
                {/* Details side */}
                <div className="flex-1 flex flex-col justify-between pr-0 sm:pr-8 py-1">
                  <div>
                    {/* Index + Title */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm bg-black text-white px-2 py-0.5 font-akira leading-none">
                        {project.num}
                      </span>
                      <h3 className="font-clash font-bold text-lg sm:text-xl md:text-2xl leading-none">
                        {project.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="font-clash font-medium text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
                      {project.desc}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="bg-gray-100 text-gray-800 text-[10px] font-mono px-2 py-0.5 rounded-full border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex justify-start items-center gap-3 mt-4 sm:mt-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center p-1.5 px-4 gap-2 text-black text-xs font-clash font-bold border-2 border-black transition-all duration-150 hover:bg-black hover:text-white rounded-full"
                    >
                      <span className="relative overflow-hidden block h-4">
                        <span className="block transition-transform duration-200 group-hover:-translate-y-full">GITHUB</span>
                        <span className="absolute inset-0 block translate-y-full transition-transform duration-200 group-hover:translate-y-0">GITHUB</span>
                      </span>
                    </a>
                  </div>
                </div>

                {/* Mockup visual side */}
                <div className="w-full sm:w-1/3 h-32 sm:h-auto flex-shrink-0 flex items-stretch py-1 mt-4 sm:mt-0 select-none">
                  <MockupVisual type={project.type} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
