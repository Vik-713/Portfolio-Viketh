import React from 'react';

const Ticker = ({ items, separator = "✧", reverse = false }) => {
  // Repeat the list enough times to ensure it fills the viewport and allows seamless wrapping
  const listItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-black py-4 border-y border-white/10 select-none flex">
      <div className="flex whitespace-nowrap min-w-full">
        <div 
          className={`inline-flex shrink-0 items-center justify-around min-w-full gap-16 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
        >
          {listItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-12 font-akira text-sm sm:text-base md:text-lg text-white">
              <span>{item}</span>
              <span className="text-white/40">{separator}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ticker;
