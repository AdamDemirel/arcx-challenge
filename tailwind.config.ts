import type { Config } from "tailwindcss"

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
      colors: {
        arcx: {
          gray: {
            300: '#E6E6E6',
            400: '#E9E9E9',
            500: '#666666',
            600: '#070413',
          },
          purple: {
            100: '#F5EEFF',
            500: '#6514D7'
          }
        }
      }
    }
  },
  plugins: [],
}

export default config
