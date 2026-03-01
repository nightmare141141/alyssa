"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { Aboreto, Inria_Serif } from "next/font/google";
import Link from "next/link";
import ContactModal from "../components/ContactModal";

const aboreto = Aboreto({ 
  subsets: ["latin"], 
  weight: "400" 
});

const inria = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});

export default function Home() {
  const [isNight, setIsNight] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false); // <-- Added state for Contact Modal

  const titleLeft = useRef(null);
  const titleRight = useRef(null);
  const wrapper = useRef(null);
  
  const navRef = useRef(null);
  const imageRef = useRef(null);
  const footerRef = useRef(null);
  
  const socialRef = useRef(null);
  
  const blob1 = useRef(null); 
  const blob2 = useRef(null); 
  const introRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // --- 0. INTRO CURTAIN REVEAL ---
        tl.to(introRef.current, {
            y: "-100%",
            duration: 1.5,
            ease: "power4.inOut",
            delay: 0.5
        });

        // --- 1. LUXURY LANDING SEQUENCE ---
        
        // A. IMAGE ENTRANCE (NO BLUR)
        gsap.set(imageRef.current, { 
            opacity: 0, 
            scale: 1.05, 
        });

        tl.to(imageRef.current, { 
            opacity: 1, 
            duration: 2.0, 
            ease: "power1.out" 
        }, "-=0.5"); 

        tl.to(imageRef.current, { 
            scale: 1, 
            duration: 4.5, 
            ease: "power2.out" 
        }, "<");

        // B. TEXT ENTRANCE
        tl.fromTo(titleLeft.current,
          { x: 150, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 2.0, ease: "power3.out" },
          "-=3.0" 
        )
        .fromTo(titleRight.current,
          { x: -150, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 2.0, ease: "power3.out" },
          "<" 
        );

        // C. UI ENTRANCE
        tl.fromTo([navRef.current, footerRef.current, socialRef.current],
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: "power2.out" },
            "<" 
        );

        // --- 2. BACKGROUND ANIMATION ---
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

    }, wrapper);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main 
      ref={wrapper} 
      className={`h-screen max-h-screen w-full flex flex-col justify-between p-6 md:p-12 relative overflow-hidden font-sans transition-colors duration-1000 ease-in-out ${isNight ? 'bg-[#0F0F0F]' : 'bg-[#FAFAFA]'}`}
    >
      
      {/* INTRO CURTAIN */}
      <div 
        ref={introRef}
        className="fixed top-0 left-0 w-full h-screen z-[9990] flex justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{ 
            backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/marble.jpg')" 
        }}
      >
        <div className={`text-white text-6xl md:text-8xl tracking-widest font-bold drop-shadow-lg ${aboreto.className} backdrop-blur-none`}>
          AS
        </div>
      </div>

      {/* BLOBS */}
      <div 
        ref={blob1} 
        className={`absolute top-[-100px] right-[-100px] w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] pointer-events-none z-0 transition-colors duration-1000 ${isNight ? 'bg-[#4338ca]' : 'bg-[#82FFE2]'}`} 
      />
      <div 
        ref={blob2} 
        className={`absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] pointer-events-none z-0 transition-colors duration-1000 ${isNight ? 'bg-[#b45309]' : 'bg-[#FFD7AF]'}`} 
      />

      {/* NAVIGATION */}
      <nav ref={navRef} className={`opacity-0 flex justify-between items-center w-full z-50 h-16 flex-shrink-0 px-4 transition-colors duration-1000 ${isNight ? 'text-[#e5e5e5]' : 'text-[#333333]'}`}>
        <div className={`text-2xl font-bold tracking-widest ${aboreto.className}`}>AS</div>
        
        <button 
            onClick={() => setIsNight(!isNight)}
            className="absolute left-1/2 -translate-x-1/2 text-sm tracking-[0.2em] font-bold hover:scale-110 transition-transform duration-300"
        >
            {isNight ? '' : ''}{/* ///////////////////////////////////////////////Add text for night and day//////////////////////////////////*/}
        </button>

        <div className="flex gap-10 text-sm tracking-[0.2em] uppercase font-bold">
          <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
          {/* <-- Changed this to a button to trigger the Modal --> */}
          <button onClick={() => setIsContactOpen(true)} className="hover:opacity-60 transition-opacity uppercase tracking-widest">Contact</button>
          <a href="/projects" className="hover:opacity-60 transition-opacity">Projects</a>
        </div>
      </nav>

      {/* CENTER STAGE */}
      <div className="flex-1 flex items-center justify-center w-full relative z-10 min-h-0">
        <div className="grid grid-cols-1 grid-rows-1 place-items-center w-full">
          
          <div className="col-start-1 row-start-1 z-0 flex justify-center items-center w-full gap-[4vw] pointer-events-none select-none translate-y-[-5%]">
            <h1 ref={titleLeft} className={`text-[8vw] 2xl:text-[10vw] leading-none tracking-widest opacity-0 mb-40 md:mb-[200px] relative right-[2vw] transition-colors duration-1000 ${aboreto.className} ${isNight ? 'text-[#e5e5e5]' : 'text-[#333333]'}`}>
              ALYSSA
            </h1>
            <h1 ref={titleRight} className={`text-[8vw] 2xl:text-[10vw] leading-none tracking-widest opacity-0 mt-40 md:mt-[200px] relative left-[0vw] transition-colors duration-1000 ${aboreto.className} ${isNight ? 'text-[#e5e5e5]' : 'text-[#333333]'}`}>
              SMITS
            </h1>
          </div>

          <div ref={imageRef} className="opacity-0 col-start-1 row-start-1 z-10 h-[100vh] md:h-[100vh] aspect-[4/3] mt-40 relative pointer-events-none translate-y-[2%]">
               <Image src="/portrait.png" alt="Alyssa Smits" fill className="object-contain object-center drop-shadow-xl" priority />
          </div>

        </div>
      </div>

      {/* GROUPED SOCIAL ICONS */}
      <div 
        ref={socialRef}
        className={`opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-8 z-50 transition-colors duration-1000 ${isNight ? 'text-[#e5e5e5]' : 'text-[#333333]'}`}
      >
          {/* INSTAGRAM */}
          <a 
            href="https://www.instagram.com/alyssasmits_/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-60 hover:scale-110 transition-all duration-300"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
             </svg>
          </a>
          {/* LINKEDIN */}
          <a 
            href="https://www.linkedin.com/in/alyssa-smits-48395928a/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-60 hover:scale-110 transition-all duration-300"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
             </svg>
          </a>
      </div>

      {/* FOOTER */}
      <div ref={footerRef} className={`opacity-0 w-full flex justify-between items-end z-20 h-auto pb-6 px-4 flex-shrink-0 transition-colors duration-1000 ${isNight ? 'text-[#e5e5e5]' : 'text-[#333333]'}`}>
        <div className="flex flex-col ml-35 justify-end">
          <h2 className={`text-[3vw] leading-none font-light ${aboreto.className}`}>2029</h2>
          <p className={`text-[0.8vw] tracking-wider mt-3 uppercase font-bold transition-colors duration-1000 ${inria.className} ${isNight ? 'text-gray-400' : 'text-gray-500'}`}>University of Wisconsin-Stout</p>
          
          {/* RESUME LINK (Opens in New Tab) */}
          <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[0.8vw] mt-4 w-max border-b-2 uppercase tracking-widest pb-1 font-bold hover:opacity-60 transition-all duration-300 ${isNight ? 'border-[#e5e5e5]' : 'border-[#333333]'}`}
          >
            Resume
          </a>
        </div>
        
        <div className="text-left hidden md:block mr-[10vw]">
          <h3 className={`text-[2vw] tracking-widest uppercase mb-2 ${aboreto.className}`}>Interior Design</h3>
          <p className={`text-[0.8vw] mb-8 font-bold tracking-wide transition-colors duration-1000 ${inria.className} ${isNight ? 'text-gray-400' : 'text-gray-500'}`}>Adobe Software, AutoCAD, Revit, Enscape</p>
          <h3 className={`text-[2vw] tracking-widest uppercase mb-2 ${aboreto.className}`}>Real Estate</h3>
          <p
            className={`text-[0.8vw] font-bold tracking-wide transition-colors duration-1000 ${inria.className} ${isNight ? 'text-gray-400' : 'text-gray-500'}`}
          >
            Leveraging interior design expertise to enhance property value,
            <br />
            marketability, and spatial potential.
          </p>
        </div>
      </div>

      {/* <-- ADDED: The Contact Modal --> */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

    </main>
  );
}