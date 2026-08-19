import React, { useEffect, useState } from 'react';

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState(1); // 1: PORTFOLIO, 2: VIKETH, 3: transition out, 4: complete

  useEffect(() => {
    // Lock scrolling on page load while preloader is active
    document.body.style.overflow = 'hidden';

    const timer1 = setTimeout(() => {
      setPhase(2);
    }, 1100);

    const timer2 = setTimeout(() => {
      setPhase(3);
    }, 2200);

    const timer3 = setTimeout(() => {
      setPhase(4);
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (phase === 4) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center select-none transition-transform duration-600 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        phase === 3 ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="relative w-full text-center px-4 overflow-hidden">
        {phase === 1 && (
          <h1 className="font-akira text-white text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-[0.2em] leading-none m-0 uppercase animate-reveal-up">
            PORTFOLIO
          </h1>
        )}

        {phase === 2 && (
          <h1 className="font-akira text-white text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-[0.2em] leading-none m-0 uppercase animate-reveal-up">
            {`{ VIKETH }`}
          </h1>
        )}
      </div>

      <style>{`
        @keyframes revealUp {
          0% { transform: translateY(110%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-reveal-up {
          animation: revealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
