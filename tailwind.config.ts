import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14313a",
        sea: "#0f766e",
        leaf: "#2f7d4f",
        mist: "#eef7f4",
        paper: "#fffdf8",
        coral: "#d96b4f"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(20, 49, 58, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
