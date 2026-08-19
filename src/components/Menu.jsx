import React, { useState } from 'react';

const NAV_ITEMS = [
  { label: "HOME", href: "#hero", rotation: -8, hoverBg: "#000000", hoverColor: "#ffffff" },
  { label: "ABOUT", href: "#aboutme", rotation: 8, hoverBg: "#000000", hoverColor: "#ffffff" },
  { label: "PROJECTS", href: "#projects", rotation: 8, hoverBg: "#000000", hoverColor: "#ffffff" },
  { label: "CONTACT", href: "#contact", rotation: -8, hoverBg: "#000000", hoverColor: "#ffffff" }
];

const Menu = ({ isOpen, setIsOpen }) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, {
          offset: 0,
          duration: 1.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating Menu Toggle Button */}
      <button
        type="button"
        className="menu-btn bubble toggle-bubble inline-flex flex-col items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] pointer-events-auto w-12 h-12 md:w-14 md:h-14 border-0 cursor-pointer p-0 will-change-transform z-[1001] hover:scale-110 hover:rotate-12 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] active:scale-95 transition-all duration-300 ease-out"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-pressed={isOpen}
      >
        <span
          className="menu-line block mx-auto rounded-[2px] bg-black transition-all duration-300"
          style={{
            width: 24,
            height: 2,
            transform: isOpen ? "translateY(4px) rotate(45deg)" : "none"
          }}
        />
        <span
          className="menu-line short block mx-auto rounded-[2px] bg-black transition-all duration-300"
          style={{
            marginTop: "6px",
            width: 24,
            height: 2,
            transform: isOpen ? "translateY(-4px) rotate(-45deg)" : "none"
          }}
        />
      </button>

      {/* Full-Screen Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[1000] animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-[1200px] mx-auto px-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <ul className="list-none m-0 p-0 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 flex-wrap w-full">
              {NAV_ITEMS.map((item, idx) => (
                <li 
                  key={idx} 
                  className="w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] flex justify-center items-stretch"
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="pill-link w-full rounded-full no-underline bg-white text-black shadow-[0_4px_14px_rgba(0,0,0,0.10)] flex items-center justify-center relative transition-all duration-300 ease-in-out border-white border-2 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] animate-menu-pill"
                    style={{
                      '--item-rot': `${item.rotation}deg`,
                      '--hover-bg': item.hoverBg,
                      '--hover-color': item.hoverColor,
                      minHeight: '100px',
                      padding: '2rem 0',
                      animationDelay: `${idx * 100}ms`
                    }}
                  >
                    <span 
                      className="pill-label inline-block font-akira text-xl sm:text-2xl md:text-3xl tracking-wider select-none"
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
