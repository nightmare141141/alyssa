import type { Metadata } from "next";
import { Aboreto, Inria_Serif } from "next/font/google"; 
import "./globals.css";
import CustomCursor from "../app/CustomCursor";

// 1. Configure Aboreto
const aboreto = Aboreto({ 
  subsets: ["latin"],
  // We name the variable exactly this:
  variable: "--font-aboreto", 
  weight: "400", 
});

const inria = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria",
});

export const metadata: Metadata = {
  title: "Alyssa Smits | Portfolio",
  description: "Interior Design & Real Estate Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 2. Pass the variable to the body */}
      <body className={`${aboreto.variable} ${inria.variable} font-sans`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}