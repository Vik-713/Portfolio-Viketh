import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ScrambleText from './ScrambleText';

const About = () => {
  return (
    <div 
      id="aboutme" 
      className="bg-slate-50 flex flex-col items-center justify-center py-16 sm:py-24 px-6 sm:px-12 md:px-24"
    >
      {/* Title */}
      <h2 className="font-akira text-2xl md:text-4xl lg:text-5xl text-black text-center mb-8">
        <ScrambleText text="ABOUT ME" />
      </h2>

      {/* Bio Statement */}
      <p className="font-google-sans w-full leading-relaxed font-medium text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-5xl mx-auto text-gray-800 mb-8">
        I'm a Computer Science student who learns best by building. I've moved through frontend development, backend services, databases, APIs, and more recently machine learning and real-time analytics — usually by picking a problem and just trying to make it work. Right now I'm increasingly interested in AI, machine learning, and multi-agent systems.
      </p>

      {/* Social Links Row */}
      <div className="flex flex-row flex-wrap gap-4 text-xs sm:text-sm py-4 justify-center items-center font-clash font-medium tracking-wide text-gray-600 mb-8">
        <a 
          href="https://github.com/Vik-713" 
          target="_blank"   
          rel="noopener noreferrer"
          className="flex gap-1 items-center hover:text-black hover:rotate-2 transition-all"
        >
          GITHUB <ArrowUpRight className="w-4 h-4" />
        </a>
        <span className="text-gray-300">|</span>
        <a 
          href="https://www.linkedin.com/in/viketh-hegde/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex gap-1 items-center hover:text-black hover:-rotate-2 transition-all"
        >
          LINKEDIN <ArrowUpRight className="w-4 h-4" />
        </a>
        <span className="text-gray-300">|</span>
        <a 
          href="mailto:vikethhegde@gmail.com" 
          className="flex gap-1 items-center hover:text-black hover:rotate-2 transition-all"
        >
          EMAIL <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Resume Button */}
      <div className="flex items-center justify-center w-full">
        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center p-3 px-6 gap-2 cursor-none text-black text-sm font-clash font-medium tracking-wider border-3 border-black transition-all duration-150 hover:bg-black hover:text-white rounded-full"
        >
          <span className="relative overflow-hidden block h-5">
            <span className="block transition-transform duration-200 group-hover:-translate-y-full">
              VIEW RESUME
            </span>
            <span className="absolute inset-0 block translate-y-full transition-transform duration-200 group-hover:translate-y-0">
              VIEW RESUME
            </span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default About;
