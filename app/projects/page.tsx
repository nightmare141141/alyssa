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

// --- MOCK DATA ---
// Updated image to /p1.png and added a 'link' property for the hover state
const projectsData = [
  { id: "01", title: "Coffee Shop", category: "Commercial", image: "/p1.png", link: "/projects/1" },
  { id: "02", title: "Victorian Era", category: "Commercial", image: "/victorian_hero_grid.png", link: "/projects/2" },
  { id: "03", title: "Coffee Shop", category: "Commercial", image: "/p1.png", link: "/projects/3" },
  { id: "04", title: "Coffee Shop", category: "Commercial", image: "/p1.png", link: "/projects/4" },
];

export default function Projects() {
  const container = useRef(null);
  const navRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
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

      // 1. Nav Fade Down
      tl.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
      );

      // 2. Title Fade Up
      tl.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.6"
      );

      // 3. Staggered Cards Entry
      tl.fromTo(".project-card", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
        "-=0.8"
      );

      // BLOB ANIMATION (Wander)
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

      wander(blob1.current, 0, -50, 0, 80);
      wander(blob2.current, 0, 50, 0, -80);

    }, container);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  // --- GSAP BUTTERY SMOOTH CAROUSEL SCROLL ---
  const scrollLeft = () => {
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        scrollLeft: "-=600",
        duration: 1.5,
        ease: "power4.out" 
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        scrollLeft: "+=600",
        duration: 1.5,
        ease: "power4.out"
      });
    }
  };

  return (
    <main 
      ref={container}
      className="h-screen w-full flex flex-col relative overflow-hidden font-sans bg-white text-[#333333]"
    >
      
      {/* BACKGROUND BLOBS */}
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
        
        <div className="flex gap-10 text-sm tracking-[0.2em] uppercase font-bold text-gray-400 cursor-none">
          <Link href="/about" className="hover:text-black transition-colors cursor-none">About</Link>
          <Link href="#" className="hover:text-black transition-colors cursor-none">Contact</Link>
          <Link href="/projects" className="text-black transition-colors cursor-none">Projects</Link>
        </div>
      </nav>

      {/* PAGE TITLE */}
      <div ref={titleRef} className="w-full text-center mt-2 mb-8 opacity-0 z-10 relative cursor-none">
        <h1 className={`text-3xl md:text-5xl tracking-[0.3em] uppercase ${aboreto.className}`}>
          Projects
        </h1>
      </div>

      {/* CAROUSEL SECTION */}
      <div className="flex-1 w-full relative flex items-center justify-center pb-12 z-10 overflow-hidden">
        
        {/* LEFT ARROW */}
        <button 
          onClick={scrollLeft}
          className="absolute left-4 md:left-12 z-20 w-12 h-12 rounded-full bg-[#b29e92]/80 hover:bg-[#b29e92] backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg cursor-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* SCROLL TRACK */}
        <div 
          ref={carouselRef}
          className="w-full h-full flex gap-6 px-6 md:px-32 overflow-x-auto items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {projectsData.map((project, index) => (
            <div 
              key={index} 
              className="project-card flex-shrink-0 w-[85vw] md:w-[22vw] h-[65vh] md:h-[70vh] flex flex-col opacity-0"
            >
              {/* IMAGE LINK CONTAINER */}
              {/* Wrapped the entire image block in a Link so it is clickable */}
              <Link 
                href={project.link} 
                className="relative w-full flex-1 mb-4 overflow-hidden shadow-xl bg-gray-100 group cursor-none block"
              >
                 <Image 
                   src={project.image} 
                   alt={project.title} 
                   fill 
                   className="object-cover transition-transform duration-700 group-hover:scale-105 z-0" 
                 />
                 
                 {/* OVERLAY: Permanent 20% dark -> Transitions to 50% dark on hover */}
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-700 z-10" />
                 
                 {/* VIEW PROJECT HOVER TEXT */}
                 {/* Appears in the center of the image on hover */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
                    <span className={`text-white text-sm md:text-base tracking-[0.3em] uppercase border-b border-white/50 pb-1 ${inria.className}`}>
                      View Project
                    </span>
                 </div>

                 {/* Number */}
                 <span className={`absolute bottom-2 right-4 text-white text-5xl md:text-7xl drop-shadow-md z-30 ${aboreto.className}`}>
                   {project.id}
                 </span>
              </Link>

              {/* TEXT DATA */}
              {/* Changed from text-center to text-right */}
              <div className="text-right cursor-none">
                <h3 className={`text-xl font-bold tracking-wider uppercase text-[#333333] ${inria.className}`}>
                  {project.title}
                </h3>
                <p className={`text-sm tracking-widest text-gray-500 mt-1 ${inria.className}`}>
                  {project.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button 
          onClick={scrollRight}
          className="absolute right-4 md:right-12 z-20 w-12 h-12 rounded-full bg-[#b29e92]/80 hover:bg-[#b29e92] backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg cursor-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

      </div>
    </main>
  );
}