"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursor = useRef(null);

  useEffect(() => {
    gsap.set(cursor.current, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto"
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div 
      ref={cursor} 
      className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-cover bg-center"
      style={{ 
        // 1. Rename your new light marble image to 'marble.png' and put in public folder
        backgroundImage: "url('/marble.jpg')",
        // 2. REMOVED "filter: invert(1)" because your image is already light!
      }}
    />
  );
}