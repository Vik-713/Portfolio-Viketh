import React, { useState, useEffect, useRef } from 'react';

const ScrambleText = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);
  const intervalRef = useRef(null);
  const chars = '!@#$%^&*()_+{}:"<>?,./;\'[]\\-=';

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    
    let iteration = 0;
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            
            // Gradually lock letters from left to right
            if (index < iteration) {
              return text[index];
            }
            
            // Random character scrambling
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        isScrambling.current = false;
      }
      
      iteration += 1 / 3; // Speed of resolving (resolves ~3 steps per frame)
    }, 25);
  };

  useEffect(() => {
    setDisplayText(text);
    // Initial scramble on component mount to wow the user immediately
    scramble();
    
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <span 
      onMouseEnter={scramble} 
      className={`${className} cursor-none select-none`}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;
