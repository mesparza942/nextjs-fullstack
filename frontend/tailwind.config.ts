import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    backgroundSize: {
      "loading-pos": "60% 100%",
    },
    extend: {
      keyframes: {
        loading: {
          "0%": { "background-position": "-150% 0,-150% 0" },
          "66%": { "background-position": "250% 0,-150% 0" },
          "100%": { "background-position": "250% 0, 250% 0" },
        },
        logo: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      animation: {
        loading: "loading 3s infinite",
        logo: "logo 10s ease-in-out infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "nice-purple": "rgb(173, 91, 255)",
      },
      backgroundImage: {
        "logo-bg":
          "linear-gradient(45deg, rgba(34, 193, 195, 1) 0%, rgb(232, 209, 254) 100%)",
        "loading-img":
          "linear-gradient(rgb(173, 91, 255) 0px, rgb(173, 91, 255) 0px), linear-gradient(rgb(173, 91, 255) 0px, rgb(173, 91, 255) 0px);",
      },
    },
  },
  plugins: [],
};
export default config;
