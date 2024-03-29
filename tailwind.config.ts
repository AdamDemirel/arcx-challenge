import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fadein': {
          '0': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        fadein: 'fadein 300ms ease-in forwards'
      },
    }
  },
  plugins: [],
};
export default config;
