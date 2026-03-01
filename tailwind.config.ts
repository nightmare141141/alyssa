import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 3. UPDATE THIS LINE TO MATCH
        serif: ["var(--font-aboreto)", "serif"], 
        sans: ["var(--font-inria)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;