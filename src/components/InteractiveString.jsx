import React, { useRef, useState, useEffect } from 'react';

const InteractiveString = () => {
  const containerRef = useRef(null);
  const [pathD, setPathD] = useState("M 0 20 Q 50 20 100 20");
  
  // Animation/Physics state variables
  const animationRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const controlY = useRef(20);
  const targetY = useRef(20);
  const velocity = useRef(0);
  
  // Spring physics constants
  const stiffness = 0.08;
  const damping = 0.88;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Map mouse coordinates to SVG viewBox scale (100w x 40h)
      const pctX = (mouseX / rect.width) * 100;
      const pctY = (mouseY / rect.height) * 40;

      mousePos.current = { x: pctX, y: pctY };

      if (isHovered.current) {
        // Keep within reasonable bending range
        targetY.current = Math.max(5, Math.min(35, pctY));
      }
    };

    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      targetY.current = 20; // Release and snap back to middle
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Physics Animation Loop (runs on requestAnimationFrame)
    const updatePhysics = () => {
      if (isHovered.current) {
        // Follow the mouse directly with slight smoothing
        controlY.current += (targetY.current - controlY.current) * 0.25;
      } else {
        // Oscillation / Damped Spring physics: Force = -k * x
        const displacement = controlY.current - 20;
        const springForce = -stiffness * displacement;
        
        velocity.current += springForce;
        velocity.current *= damping;
        controlY.current += velocity.current;
      }

      // Curve using Quadratic Bezier (Q): Starts at (0,20), pulls to control point, ends at (100,20)
      // The pull point X follows the mouse's horizontal position for natural physical behavior
      const controlX = isHovered.current ? mousePos.current.x : 50;
      setPathD(`M 0 20 Q ${controlX} ${controlY.current} 100 20`);

      animationRef.current = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-8 flex items-center relative overflow-visible cursor-none"
      style={{ margin: '-16px 0' }} // Adjust negative margins to align with standard layouts
    >
      <svg 
        viewBox="0 0 100 40" 
        className="w-full h-full overflow-visible pointer-events-none" 
        preserveAspectRatio="none"
      >
        {/* Subtle background guide line */}
        <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(0, 0, 0, 0.03)" strokeWidth="1" />
        
        {/* Vibrating/Bending string line */}
        <path 
          d={pathD} 
          fill="none" 
          stroke="rgba(0, 0, 0, 0.08)" // Soft gray matching border-black/5
          strokeWidth="1.25"
        />
      </svg>
    </div>
  );
};

export default InteractiveString;
