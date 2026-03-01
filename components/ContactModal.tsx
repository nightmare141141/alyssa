"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Aboreto, Inria_Serif } from "next/font/google";

const aboreto = Aboreto({ subsets: ["latin"], weight: "400" });
const inria = Inria_Serif({ subsets: ["latin"], weight: ["300", "400", "700"] });

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Elegant fade-in and slide-up animation
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo(modalRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // --- CHANGE THIS TO YOUR ACTUAL EMAIL ---
    const targetEmail = "smitsa0878@my.uwstout.edu"; 
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Formats the email layout so it looks clean when their mail app opens
    const subject = encodeURIComponent(`New Inquiry from ${name}`);
    const body = encodeURIComponent(`${message}`);
    
    // Triggers the device's default mail client (Apple Mail, Outlook, Gmail, etc.)
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    
    onClose();
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/70 backdrop-blur-md px-4 cursor-none"
    >
      {/* Click outside to close */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* Modal Box */}
      <div 
        ref={modalRef}
        className="relative z-10 w-full max-w-lg bg-white p-10 md:p-14 shadow-2xl border border-gray-100"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors cursor-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className={`text-3xl tracking-[0.2em] uppercase mb-10 text-[#333333] ${aboreto.className}`}>
          Contact
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* Name Field */}
          <div className="relative group">
            <input 
              type="text" 
              name="name"
              required
              placeholder="Name"
              className={`w-full bg-transparent border-b border-gray-300 py-2 outline-none focus:border-[#333333] transition-colors text-sm tracking-widest text-[#333333] placeholder:text-gray-400 cursor-none ${inria.className}`}
            />
          </div>

          {/* Email Field */}
          <div className="relative group">
            <input 
              type="email" 
              name="email"
              required
              placeholder="Email"
              className={`w-full bg-transparent border-b border-gray-300 py-2 outline-none focus:border-[#333333] transition-colors text-sm tracking-widest text-[#333333] placeholder:text-gray-400 cursor-none ${inria.className}`}
            />
          </div>

          {/* Message Field */}
          <div className="relative group">
            <textarea 
              name="message"
              required
              placeholder="Message"
              rows={4}
              className={`w-full bg-transparent border-b border-gray-300 py-2 outline-none focus:border-[#333333] transition-colors text-sm tracking-widest text-[#333333] placeholder:text-gray-400 resize-none cursor-none ${inria.className}`}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className={`mt-4 w-full bg-[#333333] hover:bg-black text-white py-4 text-sm tracking-[0.2em] uppercase transition-colors cursor-none ${inria.className}`}
          >
            Send Message
          </button>

        </form>
      </div>
    </div>
  );
}