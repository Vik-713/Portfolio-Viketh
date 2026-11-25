import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ScrambleText from './ScrambleText';

const PROJECTS = [
  {
    num: "01",
    title: "Research Agent — Hybrid LLM Research System",
    desc: "An AI-powered research agent combining Groq API inference with a locally running quantized Gemma 4B model (Q4) to perform research tasks using both cloud and local LLM capabilities.",
    tags: ["Python", "Groq API", "Gemma 4B", "Local LLM", "AI Agents"],
    github: "https://github.com/Vik-713/LLM-Research-Agent",
    view: "https://github.com/Vik-713",
    type: "research-agent",
    image: "/projects/research-agent.svg"
  },
  {
    num: "02",
    title: "Real-Time URL Analytics System",
    desc: "An analytics platform for shortened URLs that captures click events through a RabbitMQ ingestion pipeline, stores analytics data in MongoDB, and visualizes trends on interactive dashboards.",
    tags: ["Python", "FastAPI", "RabbitMQ", "MongoDB", "Docker", "Chart.js"],
    github: "https://github.com/Vik-713/URL-Analytics-Event-Ingestion-Pipeline-",
    view: "https://github.com/Vik-713",
    type: "analytics",
    image: "/projects/url-analytics.svg"
  },
  {
    num: "03",
    title: "AI News Agent",
    desc: "An automated AI-powered news aggregation agent that collects articles from RSS feeds, analyzes and filters them using LLMs through a LangGraph workflow, and delivers personalized briefings via Telegram with persistent memory and scheduled execution.",
    tags: ["Python", "LangGraph", "LangChain", "MCP", "Groq", "Telegram"],
    github: "https://github.com/Vik-713/Viketh-Telegram-News-Bot",
    view: "https://github.com/Vik-713",
    type: "news-agent",
    image: "/projects/news-agent.svg"
  },
  {
    num: "04",
    title: "HomeFind — Real Estate Listing & Viewing Scheduler",
    desc: "A cross-platform real estate application connecting property buyers and agents through property listings, real-time availability, and appointment scheduling. Uses atomic Firestore transactions to prevent double-booking of viewing slots.",
    tags: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
    github: "https://github.com/Vik-713/HomeFind---Flutter",
    view: "https://github.com/Vik-713",
    type: "realestate",
    image: "/projects/homefind.svg"
  },
  {
    num: "05",
    title: "Bank Customer Segmentation",
    desc: "An unsupervised machine learning pipeline that segments banking customers using K-Means and Hierarchical Clustering, validated through Silhouette Analysis, the Elbow Method, PCA, and cluster stability analysis to derive actionable customer personas.",
    tags: ["Python", "Scikit-learn", "K-Means", "Hierarchical Clustering", "PCA"],
    github: "https://github.com/Vik-713/ML---Bank_Customer_Segmentation",
    view: "https://github.com/Vik-713",
    type: "ml-segmentation",
    image: "/projects/bank-segmentation.svg"
  }
];

const MockupVisual = ({ project }) => {
  const [imageError, setImageError] = useState(false);

  // If the project has an image and it loaded without error, render it
  if (project?.image && !imageError) {
    return (
      <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden border border-black/10 flex items-center justify-center relative shadow-sm group/img">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover select-none transition-transform duration-500 group-hover/img:scale-105"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Fallback interactive code/SVG mockups if image is missing or errors
  switch (project?.type) {
    case "research-agent":
    case "agent":
      return (
        <div className="w-full h-full bg-slate-950 p-3 rounded-xl border border-white/10 flex flex-col justify-between font-mono text-[9px] text-white overflow-hidden">
          <div className="flex justify-between items-center text-sky-400">
            <span>⚡ HYBRID INFERENCE</span>
            <span className="text-emerald-400">● DUAL ROUTE</span>
          </div>
          <div className="flex flex-col gap-1.5 my-auto">
            <div className="bg-orange-500/10 border border-orange-500/20 p-1.5 rounded flex justify-between items-center">
              <span className="text-orange-300 font-bold">GROQ (CLOUD)</span>
              <span className="text-gray-400 text-[8px]">540 tok/s</span>
            </div>
            <div className="bg-sky-500/10 border border-sky-500/20 p-1.5 rounded flex justify-between items-center">
              <span className="text-sky-300 font-bold">GEMMA 4B (Q4)</span>
              <span className="text-gray-400 text-[8px]">LOCAL METAL</span>
            </div>
          </div>
          <div className="text-[8px] text-gray-400 border-t border-white/5 pt-1 truncate">
            &gt; Context routing: Analysis ➔ Cloud, Extract ➔ Local
          </div>
        </div>
      );
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
    case "news-agent":
      return (
        <div className="w-full h-full bg-slate-950 p-3 rounded-xl border border-white/10 flex flex-col justify-between font-mono text-[9px] text-white overflow-hidden">
          <div className="flex justify-between items-center text-indigo-400">
            <span>LANGGRAPH WORKFLOW</span>
            <span className="text-green-400">● CRON 08:00</span>
          </div>
          <div className="flex items-center justify-between text-[8px] gap-1 my-auto">
            <span className="bg-white/5 p-1 rounded border border-white/10 text-center">RSS Ingest</span>
            <span>➔</span>
            <span className="bg-indigo-500/20 p-1 rounded border border-indigo-400/30 text-indigo-200">State Graph</span>
            <span>➔</span>
            <span className="bg-green-500/20 p-1 rounded border border-green-400/30 text-green-200">Telegram</span>
          </div>
          <div className="text-[8px] text-gray-400 border-t border-white/5 pt-1 truncate">
            &gt; SQLite Checkpoint • LLM Deduplication
          </div>
        </div>
      );
    case "realestate":
      return (
        <div className="w-full h-full bg-slate-900 p-3 rounded-xl border border-white/5 font-mono text-[9px] text-gray-300 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-center text-sky-400">
            <span>HOMEFIND • FLUTTER</span>
            <span className="text-emerald-400">ATOMIC LOCK</span>
          </div>
          <div className="flex flex-col gap-1 my-auto text-[8px]">
            <div className="flex justify-between bg-black/40 p-1 rounded border border-white/5">
              <span>Slot 10:00 AM</span>
              <span className="text-emerald-400">AVAILABLE</span>
            </div>
            <div className="flex justify-between bg-rose-500/10 p-1 rounded border border-rose-500/20">
              <span className="text-rose-300">Slot 04:30 PM</span>
              <span className="text-rose-400">🔒 RESERVED</span>
            </div>
          </div>
          <div className="text-[8px] text-sky-400/80 truncate">
            Firestore transaction prevents double-booking
          </div>
        </div>
      );
    case "ml-segmentation":
    case "ml":
      return (
        <div className="w-full h-full bg-slate-950 p-3 rounded-xl border border-white/10 flex flex-col justify-between font-mono text-[9px] text-white">
          <div className="flex justify-between items-center text-yellow-400 font-bold">
            <span>PCA &amp; K-MEANS</span>
            <span className="text-xs">k=4</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[8px] my-auto">
            <span className="text-sky-400">● High Net Worth (24%)</span>
            <span className="text-emerald-400">● Savers (36%)</span>
            <span className="text-purple-400">● Credit Active (22%)</span>
            <span className="text-amber-400">● Dormant (18%)</span>
          </div>
          <div className="text-[8px] text-gray-400 border-t border-white/5 pt-1">
            Silhouette: 0.684 • PCA Var: 82.4%
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
                height: isActive ? '330px' : '90px'
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
                  <MockupVisual project={project} />
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
