import React from 'react';
import Ticker from './Ticker';

const Hero = ({ active }) => {
  const tickerSkills = ["PYTHON", "JAVASCRIPT", "SQL", "REACT", "TAILWIND CSS", "FASTAPI", "FLASK", "POSTGRESQL", "MONGODB", "DOCKER"];
  const tickerFocus = ["MACHINE LEARNING", "MULTI-AGENT SYSTEMS", "REAL-TIME SYSTEMS", "REST APIS", "GRAPHQL", "IOT"];

  return (
    <div id="hero" className="h-screen w-full flex flex-col select-none overflow-hidden relative">
      {/* Top Half: Dark Theme */}
      <div className="h-1/2 w-full bg-black flex flex-col justify-end items-center pb-8 md:pb-12 relative overflow-hidden">
        {/* Rotated Background Ticker */}
        <div className="absolute inset-0 flex items-center justify-center rotate-3 scale-110 opacity-10 pointer-events-none">
          <Ticker items={tickerSkills} separator="✧" />
        </div>
        
        {/* Main Header - White Text */}
        <h1 
          className={`z-10 font-akira text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-wider p-0 m-0 leading-none transition-opacity duration-300 ${
            active ? 'animate-slide-left' : 'opacity-0'
          }`}
        >
          {`{ VIKETH }`}
        </h1>
      </div>

      {/* Bottom Half: Light Theme */}
      <div className="h-1/2 w-full bg-gray-50 flex flex-col justify-start items-center pt-8 md:pt-12 relative overflow-hidden border-t border-black/5">
        {/* Rotated Background Ticker */}
        <div className="absolute inset-0 flex items-center justify-center -rotate-3 scale-110 opacity-10 pointer-events-none">
          <Ticker items={tickerFocus} separator="✦" reverse={true} />
        </div>
        
        {/* Main Header - Black Text */}
        <h1 
          className={`z-10 font-akira text-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-wider p-0 m-0 leading-none transition-opacity duration-300 ${
            active ? 'animate-slide-right' : 'opacity-0'
          }`}
        >
          PORTFOLIO
        </h1>
      </div>

      {/* Adding slide in animations to index.css if needed, or inline classes */}
      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(55px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideRight {
          from { transform: translateX(-55px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-left {
          animation: slideLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-right {
          animation: slideRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;
