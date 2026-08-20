import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Ticker from './components/Ticker';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Menu from './components/Menu';
import Assistant from './components/Assistant';
import CustomCursor from './components/CustomCursor';
import ScrollReveal from './components/ScrollReveal';
import NextSection from './components/NextSection';
import Preloader from './components/Preloader';
import InteractiveString from './components/InteractiveString';
import ScrambleText from './components/ScrambleText';
import Lenis from 'lenis';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Slightly slower scroll animation (default is 1.2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth ease-out expo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9, // Lower multiplier for a slightly slower and heavier gliding feel
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  const tickerSkills = ["PYTHON", "JAVASCRIPT", "SQL", "REACT", "TAILWIND CSS", "FASTAPI", "FLASK", "POSTGRESQL", "MONGODB", "DOCKER"];
  const tickerFocus = ["MACHINE LEARNING", "MULTI-AGENT SYSTEMS", "REAL-TIME SYSTEMS", "REST APIS", "GRAPHQL", "IOT"];


  return (
    <div className="w-full min-h-screen bg-white text-black relative font-sans overflow-x-hidden">
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Dynamic Inverted Custom Cursor */}
      <CustomCursor />

      {/* Floating Menu Stack */}
      <div className="fixed bottom-6 right-6 z-[1001] flex flex-col gap-3 items-center pointer-events-auto">
        <Assistant />
        <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />
      </div>

      {/* Hero Section */}
      <Hero active={isLoaded} />

      {/* About Section */}
      <ScrollReveal>
        <About />
      </ScrollReveal>

      {/* Skills Section */}
      <ScrollReveal>
        <InteractiveString />
        <Skills />
      </ScrollReveal>

      {/* Journey Section (Reordered before projects) */}
      <ScrollReveal>
        <InteractiveString />
        <Journey />
      </ScrollReveal>

      {/* Ticker Bar 1 (Skills) */}
      <Ticker items={tickerSkills} separator="✧" />

      {/* Quote Section */}
      <ScrollReveal>
        <InteractiveString />
        <div id="quote" className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16 bg-white">
          <div className="flex flex-col gap-2 font-akira text-2xl sm:text-4xl md:text-5xl lg:text-7xl leading-none text-black text-center uppercase tracking-wide">
            <div className="animate-reveal">I BUILD THINGS TO</div>
            <div className="animate-reveal [animation-delay:0.2s]">UNDERSTAND THEM,</div>
            <div className="text-black/30 animate-reveal [animation-delay:0.4s]">NOT JUST TO SHIP THEM.</div>
          </div>
        </div>
      </ScrollReveal>

      {/* Ticker Bar 2 (Focus Areas) */}
      <Ticker items={tickerFocus} separator="✦" reverse={true} />

      {/* Projects Section */}
      <ScrollReveal>
        <Projects />
      </ScrollReveal>

      {/* Exploring Next Section (New section after projects) */}
      <ScrollReveal>
        <NextSection />
      </ScrollReveal>

      {/* Certifications Section */}
      <ScrollReveal>
        <InteractiveString />
        <section id="certification" className="min-h-[50vh] bg-slate-50 px-6 sm:px-12 md:px-24 py-16 md:py-24 flex flex-col justify-center select-none">
          {/* Title */}
          <div className="mb-12">
            <h2 className="font-akira text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-black">
              <ScrambleText text="CERTIFICATIONS" />
            </h2>
            <p className="font-clash text-sm sm:text-base md:text-lg text-gray-500 font-medium mt-2 max-w-3xl">
              Professional and technical certifications verifying my expertise in software systems.
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a 
              href="/msb certificate.png" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group border-3 border-black p-6 rounded-2xl flex flex-col justify-between gap-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                {/* Badge Icon */}
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                {/* Title & Issuer */}
                <div className="text-black">
                  <h3 className="text-base sm:text-lg font-clash font-bold leading-tight group-hover:text-black">
                    MSB Labs Certification
                  </h3>
                  <p className="text-sm font-clash font-medium text-gray-500 mt-1">
                    Practical Network Penetration
                  </p>
                </div>
              </div>
              
              {/* Call-to-action view link */}
              <div className="flex items-center gap-2 text-xs font-akira text-black mt-2">
                <span>VIEW CERTIFICATE</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </a>
          </div>
        </section>
      </ScrollReveal>


      {/* Contact Section */}
      <ScrollReveal>
        <InteractiveString />
        <Contact />
      </ScrollReveal>

      {/* Footer Section */}
      <footer className="w-full bg-black overflow-hidden relative">
        {/* Staggered transition columns from white to black */}
        <div className="flex items-start h-12 w-full bg-transparent select-none">
          <div className="w-full bg-white h-[85%] opacity-100"></div>
          <div className="w-full bg-white h-[70%] opacity-100"></div>
          <div className="w-full bg-white h-[55%] opacity-100"></div>
          <div className="w-full bg-white h-[40%] opacity-100"></div>
          <div className="w-full bg-white h-[25%] opacity-100"></div>
          <div className="w-full bg-white h-[10%] opacity-100"></div>
        </div>

        {/* Footer Main */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 px-6 sm:px-12 md:px-24 py-12 md:py-16">
          {/* Wordmark */}
          <div className="text-white font-akira leading-none text-4xl sm:text-6xl md:text-8xl">
            <p>{`{ VIKETH }`}</p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-3 md:items-end font-clash">
            <a 
              href="https://github.com/Vik-713" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gray-300 font-akira text-sm sm:text-base md:text-lg transition-transform duration-200 hover:-translate-x-1"
            >
              GITHUB
            </a>
            <a 
              href="https://www.linkedin.com/in/viketh-hegde/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gray-300 font-akira text-sm sm:text-base md:text-lg transition-transform duration-200 hover:-translate-x-1"
            >
              LINKEDIN
            </a>
            <a 
              href="mailto:vikethhegde@gmail.com" 
              className="text-white hover:text-gray-300 font-akira text-sm sm:text-base md:text-lg transition-transform duration-200 hover:-translate-x-1"
            >
              EMAIL
            </a>
            <a 
              href="tel:+919769227615" 
              className="text-white hover:text-gray-300 font-akira text-sm sm:text-base md:text-lg transition-transform duration-200 hover:-translate-x-1"
            >
              Mobile No.
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-center items-center px-6 sm:px-12 md:px-24 py-6 border-t border-white/10 text-white/50 font-clash text-xs sm:text-sm">
          <div className="text-center font-medium tracking-wide">
            2026 Viketh Hegde | All Rights Reserved ©
          </div>
        </div>
      </footer>

      {/* Text reveal animation helper */}
      <style>{`
        @keyframes reveal {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-reveal {
          animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default App;
