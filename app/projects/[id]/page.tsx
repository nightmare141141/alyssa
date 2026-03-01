"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { Aboreto, Inria_Serif } from "next/font/google";

const aboreto = Aboreto({ subsets: ["latin"], weight: "400" });
const inria = Inria_Serif({ subsets: ["latin"], weight: ["300", "400", "700"] });

// --- MOCK DATABASE ---
const projectsDB: Record<string, any> = {
  "1": {
    id: "01",
    template: "coffee_shop", // Tells the page which layout to use
    title: "COFFEE SHOP",
    category: "Commercial",
    year: "2025",
    heroImage: "/p1.png",       
    moodboardImage: "/moodboard_collage.png", 
    floorPlanImage: "/floor_plan.png",
    renderComposite: "/p1.png", 
    summary1: "Rooted in modern beauty this coffee shop is in the heart of Minneapolis city full of residents who are coffee addicts. This shop serves as a public sanctuary within the urban landscape. Designed to evoke the tranquility of a secluded resort. Every space is useful and serves a purpose.",
    summary2: "Designed to evoke the tranquility of a secluded resort. Every space is useful and serves a purpose.",
    detailedDescription: "The design prioritized organic shapes and natural textures. A winding serpentine sofa serves as the central anchor, guiding the flow of traffic while providing ample collaborative seating. Acoustic considerations were paramount, leading to the use of sound-dampening ceiling baffles and soft-touch upholstery throughout.",
  },
  "2": {
    id: "02",
    template: "victorian", // Uses the new Victorian layout
    title: "VICTORIAN ERA",
    category: "Commercial",
    year: "2025",
    // Images needed for Victorian Layout (Single composites)
    heroImage: "/victorian_hero_grid.png",         // The 2x2 image grid
    processImage: "/victorian_process_plan.png",   // Empty floor plan next to process text
    doublePlanImage: "/victorian_double_plan.png", // The two plans side-by-side
    materialBoardImage: "/victorian_materials.png",// The digital material board grid
    furniturePlanImage: "/victorian_furniture_plan.png", // The final furniture floor plan
    
    // Texts transcribed from your design
    summary1: "Very extravagant and luxurious, lots of textile. Including couches to sit on in every surface is decorated. Incorporating highly decorated elements and lots of soft curves and fabric. Pulling from other furniture for inspiration.",
    summary2: "Discovering floor plans and deep descriptions of measurements. There was a variety of black and white images of houses. This primary source helped identify the style of houses and spacing in the floor plans during the Victorian era. Primary Source The primary source provided rich patterns using silk material and how furniture can affect the space in the Victorian Era. The placement of decorative objects describe elegance and symmetry expressed.",
    processText: "With research, careful considerations were made when developing the floor plan, material selections, fixtures and furnishings, and more. Each element that was developed into the floor plan was chosen for a reason to convict the Victorian Era. Developing research in the beginning helped with the planning process and understanding the why when choosing a material element or furnishing.",
  },
};

export default function ProjectCaseStudy() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projectsDB[projectId] || projectsDB["1"];
  const container = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      // Generic fade up for hero elements on load
      tl.fromTo(".hero-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }, container);

    window.scrollTo(0, 0); 
    return () => { ctx.revert(); lenis.destroy(); };
  }, [projectId]);

  // ---------------------------------------------------------------------------
  // TEMPLATE 1: COFFEE SHOP
  // ---------------------------------------------------------------------------
  if (project.template === "coffee_shop") {
    return (
      <main ref={container} className="min-h-screen w-full relative overflow-y-auto overflow-x-hidden font-sans pb-24 text-[#333333] bg-white cursor-none">
        
        {/* HERO */}
        <div className="flex flex-col md:flex-row h-screen w-full relative z-10">
          <div className="relative w-full md:w-1/2 h-[60vh] md:h-full overflow-hidden z-10 hero-anim">
            <Image src={project.heroImage} alt={project.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <Link href="/" className={`absolute top-8 left-8 text-white text-2xl font-bold tracking-widest z-20 cursor-none hover:opacity-70 transition-opacity ${aboreto.className}`}>AS</Link>
            <div className={`absolute bottom-4 right-8 text-white text-[120px] md:text-[160px] leading-none drop-shadow-lg z-20 ${aboreto.className}`}>{project.id}</div>
          </div>

          <div className="relative w-full md:w-1/2 h-full flex flex-col px-8 md:px-16 xl:px-24 py-8 md:py-12 z-20">
            <nav className="flex justify-end gap-10 text-sm tracking-[0.2em] uppercase font-bold text-gray-400 hero-anim">
              <Link href="/about" className="hover:text-black transition-colors cursor-none">About</Link>
              <Link href="#" className="hover:text-black transition-colors cursor-none">Contact</Link>
              <Link href="/projects" className="text-black transition-colors cursor-none">Projects</Link>
            </nav>
            <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto md:mx-0 mt-12 md:mt-0">
              <h1 className={`hero-anim text-4xl md:text-5xl tracking-widest uppercase mb-4 ${aboreto.className}`}>{project.title}</h1>
              <p className={`hero-anim text-sm tracking-[0.2em] text-gray-500 mb-10 ${inria.className}`}>{project.category} | {project.year}</p>
              <div className={`space-y-6 text-gray-500 text-[15px] md:text-base leading-loose tracking-wide hero-anim ${inria.className}`}>
                <p>{project.summary1}</p>
                {project.summary2 && <p>{project.summary2}</p>}
              </div>
              <div className="mt-12 hero-anim">
                <Link href="/projects" className={`w-max text-sm tracking-widest uppercase text-gray-500 border-b border-gray-400 pb-1 hover:text-black hover:border-black transition-all duration-300 cursor-none ${inria.className}`}>View all projects</Link>
              </div>
            </div>
          </div>
        </div>

        {/* MOODBOARD */}
        <div className="relative w-full flex flex-col items-center px-8 md:px-16 xl:px-24 pt-24 pb-12 z-10 overflow-hidden">
          <h2 className={`text-center text-4xl tracking-[0.2em] uppercase mb-16 md:mb-20 z-10 ${aboreto.className}`}>Moodboard</h2>
          <div className="relative w-full max-w-[1600px] aspect-[16/10] bg-gray-50/50 shadow-lg border border-gray-100 z-10">
            <Image src={project.moodboardImage} alt="Project Moodboard Collage" fill className="object-contain" priority />
          </div>
          <div className={`absolute bottom-[-20px] left-[-30px] text-gray-50 text-[120px] md:text-[180px] leading-none select-none z-0 pointer-events-none ${aboreto.className}`}>Moodboard</div>
        </div>

        {/* FLOOR PLAN */}
        <div className="relative w-full flex flex-col items-center px-8 md:px-16 xl:px-24 pt-24 pb-12 z-10 overflow-hidden">
          <h2 className={`text-center text-4xl tracking-[0.2em] uppercase mb-16 md:mb-20 z-10 ${aboreto.className}`}>Rendered Floor Plan</h2>
          <div className="relative w-full max-w-[1600px] aspect-[16/10] bg-gray-50/50 shadow-lg border border-gray-100 z-10">
            <Image src={project.floorPlanImage} alt="Project Floor Plan and Legend" fill className="object-contain" />
          </div>
        </div>

        {/* RENDERS */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 px-8 md:px-16 xl:px-24 pt-20 pb-20 z-20 max-w-[1800px] mx-auto relative overflow-hidden">
          <div className="md:col-span-8 flex flex-col gap-10 z-10">
            <h2 className={`text-3xl tracking-widest uppercase ${aboreto.className}`}>Rendered 3D View 1</h2>
            <div className="relative w-full aspect-[4/3] md:aspect-[3/4] xl:aspect-[4/5] bg-gray-50 shadow-lg border border-gray-100">
                  <Image src={project.renderComposite} alt="Stacked 3D Render Views" fill className="object-contain" />
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col justify-start md:pt-20 z-10">
            <div className="w-12 h-12 bg-[#8f947b]/20 text-[#8f947b] rounded-lg flex justify-center items-center text-xl font-bold mb-6">{project.id}</div>
            <h3 className={`text-sm tracking-[0.2em] uppercase font-bold text-gray-500 mb-6 ${inria.className}`}>Material Selection & Specifications</h3>
            <p className={`mt-10 text-gray-500 text-[14px] leading-relaxed ${inria.className}`}>{project.detailedDescription}</p>
          </div>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------------------------
  // TEMPLATE 2: VICTORIAN ERA
  // ---------------------------------------------------------------------------
  if (project.template === "victorian") {
    return (
      <main ref={container} className="min-h-screen w-full relative overflow-y-auto overflow-x-hidden font-sans pb-24 text-[#333333] bg-white cursor-none">
        
        {/* NAV (Absolute at top) */}
        <nav className="absolute top-0 right-0 w-full flex justify-between px-8 md:px-16 xl:px-24 py-8 z-50 hero-anim">
            <Link href="/" className={`text-[#333333] text-2xl font-bold tracking-widest cursor-none hover:opacity-70 transition-opacity ${aboreto.className}`}>AS</Link>
            <div className="flex gap-10 text-sm tracking-[0.2em] uppercase font-bold text-gray-400">
              <Link href="/about" className="hover:text-black transition-colors cursor-none">About</Link>
              <Link href="#" className="hover:text-black transition-colors cursor-none">Contact</Link>
              <Link href="/projects" className="text-black transition-colors cursor-none">Projects</Link>
            </div>
        </nav>

        {/* SECTION 1: HERO GRID */}
        <div className="flex flex-col md:flex-row min-h-screen w-full relative pt-24 px-8 md:px-16 xl:px-24 gap-12 items-center">
          {/* Left: 2x2 Grid Image */}
          <div className="w-full md:w-1/2 relative aspect-square shadow-xl hero-anim border-2 border-blue-500/0">
             <Image src={project.heroImage} alt="Victorian Hero" fill className="object-contain" priority />
          </div>
          {/* Right: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col max-w-xl mx-auto md:mx-0">
             <h1 className={`hero-anim text-4xl md:text-5xl tracking-widest uppercase mb-4 ${aboreto.className}`}>{project.title}</h1>
             <p className={`hero-anim text-sm tracking-[0.2em] text-gray-500 mb-10 ${inria.className}`}>{project.category} | {project.year}</p>
             <div className={`space-y-6 text-gray-500 text-[15px] md:text-base leading-loose tracking-wide hero-anim ${inria.className}`}>
               <p>{project.summary1}</p>
               <p>{project.summary2}</p>
             </div>
             
             {/* Scroll Down + View All Projects */}
             <div className="mt-16 flex flex-col items-center md:items-start gap-4 hero-anim">
                <div className="w-12 h-12 rounded-full bg-[#8f947b] flex items-center justify-center text-white shadow-md">
                   <span className="text-sm">V</span> {/* Scroll icon placeholder */}
                </div>
                <span className={`text-sm tracking-widest text-gray-500 ${inria.className}`}>Scroll Down</span>
                <Link href="/projects" className={`mt-4 text-sm tracking-widest text-gray-500 border-b border-gray-400 pb-1 hover:text-black hover:border-black transition-all cursor-none ${inria.className}`}>View All Projects</Link>
             </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-200 my-16 mx-auto max-w-[1800px]"></div>

        {/* SECTION 2: PROCESS DESCRIPTION */}
        <div className="flex flex-col md:flex-row w-full px-8 md:px-16 xl:px-24 gap-12 items-center max-w-[1800px] mx-auto">
          <div className="w-full md:w-1/3 flex flex-col">
            <h2 className={`text-3xl tracking-widest uppercase mb-8 ${aboreto.className}`}>Process<br/>Description</h2>
            <p className={`text-gray-500 text-[15px] leading-loose tracking-wide ${inria.className}`}>{project.processText}</p>
          </div>
          <div className="w-full md:w-2/3 relative aspect-[4/3]">
            <Image src={project.processImage} alt="Process Floor Plan" fill className="object-contain" />
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-200 my-16 mx-auto max-w-[1800px]"></div>

        {/* SECTION 3: DOUBLE FLOOR PLAN */}
        <div className="w-full px-8 md:px-16 xl:px-24 max-w-[1800px] mx-auto">
          <div className="relative w-full aspect-[21/9]">
            <Image src={project.doublePlanImage} alt="Double Floor Plans" fill className="object-contain" />
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-200 my-16 mx-auto max-w-[1800px]"></div>

        {/* SECTION 4: DIGITAL MATERIAL BOARD */}
        <div className="w-full px-8 md:px-16 xl:px-24 max-w-[1800px] mx-auto flex flex-col items-center">
          <h2 className={`text-center text-3xl tracking-[0.2em] uppercase mb-16 ${aboreto.className}`}>Digital Material Board</h2>
          <div className="relative w-full aspect-[16/9]">
            <Image src={project.materialBoardImage} alt="Material Board" fill className="object-contain" />
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-200 my-16 mx-auto max-w-[1800px]"></div>

        {/* SECTION 5: FURNITURE FLOOR PLAN */}
        <div className="w-full px-8 md:px-16 xl:px-24 max-w-[1800px] mx-auto flex flex-col items-center pb-20">
          <h2 className={`text-center text-3xl tracking-[0.2em] uppercase mb-16 ${aboreto.className}`}>Furniture Floor Plan</h2>
          <div className="relative w-full max-w-5xl aspect-[4/3]">
            <Image src={project.furniturePlanImage} alt="Furniture Floor Plan" fill className="object-contain" />
          </div>
        </div>

      </main>
    );
  }

  // Fallback
  return null;
}