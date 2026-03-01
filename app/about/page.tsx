"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { Aboreto, Inria_Serif } from "next/font/google";

const aboreto = Aboreto({ 
  subsets: ["latin"], 
  weight: "400" 
});

const inria = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});

export default function About() {
  const container = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const navRef = useRef(null);

  // --- NEW: Refs for the Blobs ---
  const blob1 = useRef(null);
  const blob2 = useRef(null);

  useEffect(() => {
    // Smooth Scroll
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Image Slide In (From further left now)
      tl.fromTo(imageRef.current, 
        { x: -150, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
      );

      // 2. Text Fade Up
      tl.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=1.0"
      );

      tl.fromTo(textRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
        "-=1.2"
      );

      // --- NEW: BLOB ANIMATION (Wander) ---
      const wander = (element: any, xMin: number, xMax: number, yMin: number, yMax: number) => {
        if (!element) return;
        const randomX = gsap.utils.random(xMin, xMax);
        const randomY = gsap.utils.random(yMin, yMax);
        const randomDuration = gsap.utils.random(10, 15); 

        gsap.to(element, {
            x: randomX + "vw", 
            y: randomY + "vh", 
            duration: randomDuration,
            ease: "sine.inOut",
            onComplete: () => wander(element, xMin, xMax, yMin, yMax)
        });
      };

      // Start the blobs wandering
      wander(blob1.current, 0, -50, 0, 80);
      wander(blob2.current, 0, 50, 0, -80);

    }, container);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main 
      ref={container}
      className="h-screen w-full flex flex-col relative overflow-hidden font-sans bg-white text-[#333333]"
    >
      
      {/* --- NEW: BACKGROUND BLOBS --- */}
      <div 
        ref={blob1} 
        className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#82FFE2] opacity-30 blur-[120px] pointer-events-none z-0" 
      />
      <div 
        ref={blob2} 
        className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full bg-[#FFD7AF] opacity-30 blur-[120px] pointer-events-none z-0" 
      />

      {/* NAVIGATION */}
      <nav ref={navRef} className="flex-none flex justify-between items-center w-full z-50 h-24 px-6 md:px-12 opacity-0">
        <Link href="/" className={`text-2xl font-bold tracking-widest ${aboreto.className}`}>AS</Link>
        
        <div className="flex gap-10 text-sm tracking-[0.2em] uppercase font-bold text-gray-400">
          <Link href="/about" className="text-black transition-colors">About</Link>
          <Link href="#" className="hover:text-black transition-colors">Contact</Link>
          <Link href="#" className="hover:text-black transition-colors">Projects</Link>
        </div>
      </nav>

      {/* CONTENT GRID */}
      <div className="flex-1 w-full max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 px-6 md:px-12 pb-0 relative">
        
        {/* LEFT: IMAGE */}
        <div className="col-span-1 md:col-span-6 relative h-[110%] w-full -mt-20 -ml-20 md:-ml-32 z-0 pointer-events-none">
           <div ref={imageRef} className="relative w-full h-full opacity-0">
             <Image 
               src="/about1.png" 
               alt="Alyssa Smits" 
               fill 
               className="object-contain object-bottom drop-shadow-2xl" 
               priority 
             />
           </div>
        </div>

        {/* RIGHT: TEXT CONTENT */} 
        <div ref={textRef} className="col-span-1 md:col-start-7 md:col-span-6 flex flex-col justify-center opacity-0 pl-0 md:pl-10 self-center pb-20 z-10 relative">
            
            {/* Header */}
            <h1 className={`text-4xl md:text-6xl tracking-widest leading-tight mb-2 ${aboreto.className}`}>
              HI, I AM ALYSSA SMITS!
            </h1>
            <p className={`text-sm tracking-[0.2em] uppercase text-gray-500 mb-8 ${inria.className}`}>
              Rhinelander, WI
            </p>

            {/* Bio Text */}
            <div className={`text-base md:text-lg leading-relaxed text-justify md:text-left space-y-6 text-gray-600 ${inria.className}`}>
              <p>
                From the moment I entered my first interior design course, my passion has continued to grow. 
                I have a strong creativity mindset for cultivating design spaces that balance functionality, 
                sustainability, and aesthetic appeal. Design can have a significant influence on everyday 
                life while supporting sustainability practices.
              </p>
              <p>
                Through my academic work, I have developed problem-solving, space planning, and organizational skills. 
                I have expressed self-expression through design choices and a high level of knowledge when identifying materials. 
                Property management principles have helped me when it comes to design and material choices.
              </p>
              <p>
                When I am not designing, I enjoy spending time with friends and family, traveling, cooking, 
                going to the gym, and finding new things to create. I continue to learn and embrace every 
                new opportunity as a new learning experience.
              </p>
            </div>

            {/* Softwares Section */}
            <div className="mt-16">
              <h2 className={`text-2xl tracking-widest uppercase mb-6 ${aboreto.className}`}>Softwares</h2>
              
              <div className="flex flex-wrap gap-6 items-center">
                
                {/* 1. Photoshop (Ps) */}
                <div className="w-14 h-14 border-2 border-black text-black flex justify-center items-center text-xl font-bold">
                  Ps
                </div>

                {/* 2. InDesign (Id) */}
                <div className="w-14 h-14 border-2 border-black text-black flex justify-center items-center text-xl font-bold">
                  Id
                </div>

                {/* 3. Revit (R) */}
                <div className="w-14 h-14 bg-black text-white flex justify-center items-center text-2xl font-bold">
                  R
                </div>

                {/* 4. AutoCAD (A) */}
                <div className="w-14 h-14 bg-black text-white flex justify-center items-center text-2xl font-bold">
                  A
                </div>

                {/* 5. Enscape (Cube Icon) */}
                <div className="w-14 h-14 flex justify-center items-center">
                   <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                   </svg>
                </div>

              </div>
            </div>

        </div>

      </div>
    </main>
  );
}