import React, { useState, useEffect } from 'react';
import { Award, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrambleText from './ScrambleText';

const CERTIFICATES = [
  {
    title: "MSB Labs Certification",
    issuer: "Practical Network Penetration",
    link: "/msb certificate.png",
  },
  {
    title: "Intro To Machine Learning",
    issuer: "Kaggle",
    link: "/intro-to-ML.png",
  },
  {
    title: "Intermediate Machine Learning",
    issuer: "Kaggle",
    link: "/intermediate-ML.png",
  },
];

const Certifications = () => {
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);

  // Manage keyboard navigation and smooth scrolling
  useEffect(() => {
    if (selectedCertIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCertIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedCertIndex((prev) => (prev !== null ? (prev + 1) % CERTIFICATES.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedCertIndex((prev) => (prev !== null ? (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length : 0));
      }
    };

    // If user scrolls up or down, dismiss preview smoothly so scrolling is never blocked
    const handleScroll = () => {
      setSelectedCertIndex(null);
    };

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 15) {
        setSelectedCertIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [selectedCertIndex]);

  const activeCert = selectedCertIndex !== null ? CERTIFICATES[selectedCertIndex] : null;

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedCertIndex((prev) => (prev !== null ? (prev - 1 + CERTIFICATES.length) % CERTIFICATES.length : 0));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedCertIndex((prev) => (prev !== null ? (prev + 1) % CERTIFICATES.length : 0));
  };

  return (
    <section id="certification" className="min-h-[calc(50vh+100px)] bg-slate-50 px-6 sm:px-12 md:px-24 py-20 sm:py-28 md:py-32 flex flex-col justify-center select-none relative">
      {/* Title (Softly faded and blurred when preview is active) */}
      <div className={`mb-12 transition-all duration-300 ${activeCert ? 'opacity-30 blur-[2px]' : 'opacity-100 blur-0'}`}>
        <h2 className="font-akira text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-black">
          <ScrambleText text="CERTIFICATIONS" />
        </h2>
        <p className="font-clash text-sm sm:text-base md:text-lg text-gray-500 font-medium mt-2 max-w-3xl">
          Professional and technical certifications verifying my expertise in software systems.
        </p>
      </div>

      {/* Certifications Grid (Visible underneath with soft fade/blur when preview is active) */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 ${activeCert ? 'opacity-30 blur-[2px] pointer-events-none' : 'opacity-100 blur-0'}`}>
        {CERTIFICATES.map((cert, index) => (
          <button 
            key={index}
            type="button"
            onClick={() => setSelectedCertIndex(index)}
            className="group border-3 border-black p-6 rounded-2xl flex flex-col justify-between gap-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 text-left w-full cursor-pointer"
          >
            <div className="flex flex-col gap-4">
              {/* Badge Icon */}
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white shrink-0">
                <Award className="w-6 h-6" />
              </div>
              {/* Title & Issuer */}
              <div className="text-black">
                <h3 className="text-base sm:text-lg font-clash font-bold leading-tight group-hover:text-black">
                  {cert.title}
                </h3>
                <p className="text-sm font-clash font-medium text-gray-500 mt-1">
                  {cert.issuer}
                </p>
              </div>
            </div>
            
            {/* Call-to-action view link */}
            <div className="flex items-center gap-2 text-xs font-akira text-black mt-2">
              <span>VIEW CERTIFICATE</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </div>
          </button>
        ))}
      </div>

      {/* Floating Preview Over the Section (No opaque modal background, certificate section acts as backdrop) */}
      {activeCert && (
        <div
          onClick={() => setSelectedCertIndex(null)}
          className="fixed inset-0 z-[5000] bg-black/10 backdrop-blur-[1px] flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 select-none animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
        >
          {/* Top Floating Control Bar */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1000px] flex items-center justify-between gap-3 mb-3 animate-reveal"
          >
            {/* Title & Issuer Pill */}
            <div className="flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-md border-2 border-black rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] min-w-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-black shrink-0" />
              <div className="min-w-0 truncate">
                <span className="font-clash font-bold text-xs sm:text-base text-black mr-1.5 sm:mr-2">
                  {activeCert.title}
                </span>
                <span className="hidden sm:inline font-clash font-medium text-xs sm:text-sm text-gray-500">
                  • {activeCert.issuer}
                </span>
              </div>
            </div>

            {/* Navigation Counter & Close Button */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center bg-white/95 backdrop-blur-md border-2 border-black rounded-full p-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <button
                  type="button"
                  onClick={handlePrev}
                  title="Previous certificate (←)"
                  className="p-1 sm:p-1.5 hover:bg-black hover:text-white rounded-full transition cursor-pointer text-black"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-clash font-bold px-1.5 sm:px-2 text-black">
                  {selectedCertIndex + 1} / {CERTIFICATES.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  title="Next certificate (→)"
                  className="p-1 sm:p-1.5 hover:bg-black hover:text-white rounded-full transition cursor-pointer text-black"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCertIndex(null)}
                title="Close preview (ESC)"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-full flex items-center justify-center transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Certificate Image Frame (Float without modal box) */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center justify-center max-w-[1000px] w-full flex-1 max-h-[74vh] sm:max-h-[78vh] md:max-h-[80vh] animate-reveal"
          >
            {/* Side Navigation Arrow Left */}
            <button
              type="button"
              onClick={handlePrev}
              title="Previous certificate"
              className="absolute -left-2 sm:-left-5 md:-left-12 z-10 w-9 h-9 sm:w-11 sm:h-11 bg-white text-black hover:bg-black hover:text-white border-2 border-black rounded-full flex items-center justify-center transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Certificate Preview Card */}
            <div className="relative max-h-full max-w-full flex items-center justify-center p-2 sm:p-3 bg-white border-3 border-black rounded-2xl sm:rounded-3xl shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <img
                src={activeCert.link}
                alt={activeCert.title}
                className="max-h-[64vh] sm:max-h-[70vh] md:max-h-[74vh] max-w-[88vw] w-auto h-auto object-contain rounded-xl select-none block"
              />
            </div>

            {/* Side Navigation Arrow Right */}
            <button
              type="button"
              onClick={handleNext}
              title="Next certificate"
              className="absolute -right-2 sm:-right-5 md:-right-12 z-10 w-9 h-9 sm:w-11 sm:h-11 bg-white text-black hover:bg-black hover:text-white border-2 border-black rounded-full flex items-center justify-center transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Floating Hint */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="mt-3 text-center text-[11px] sm:text-xs font-clash font-medium text-black bg-white/95 border border-black/20 px-4 py-1 rounded-full shadow-sm backdrop-blur-sm"
          >
            Use <kbd className="px-1.5 py-0.5 bg-slate-100 border border-black/20 rounded text-black font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 border border-black/20 rounded text-black font-mono text-[10px]">→</kbd> to switch • Scroll, <kbd className="px-1.5 py-0.5 bg-slate-100 border border-black/20 rounded text-black font-mono text-[10px]">ESC</kbd>, or click outside to close
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
