import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['selector'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'mobileMini': '360px',
      'mobileMedium': '510px',
      'tabletMini': '700px',
      'destkopMini': '1000px',
      'desktop': '1300px',
      'desktopMedium': '1600px',
      'desktopBig': '1800px'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fade: {
          'o%': {opacity: '0'},
          '50%': {opacity: '0.5'},
          '100%': {opacity: '1'}
        },
      },
      animation: {
        fade: 'fade 0.2s ease-in forwards',
      }
    },
  },
  plugins: [],
};
export default config;
