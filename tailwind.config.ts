import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#2F3B41", soft: "#647781" },
        line: "#DCE7EC",
        paper: "#FCFDFD",
        sora: { soft: "#E9F3F8", DEFAULT: "#4A8AB0", deep: "#2F6485" },
        wakaba: { soft: "#EAF4EE", DEFAULT: "#5AA383", deep: "#41785F" },
        kinari: { soft: "#F8F4EA", DEFAULT: "#EDE4CF", deep: "#A78F5F" },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(74, 138, 176, 0.10)",
        card: "0 2px 12px rgba(74, 138, 176, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
