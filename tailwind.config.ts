import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#A27A60",
          100: "#EFEBE9",
          200: "#E2D8D2",
          300: "#D5C5BB",
          400: "#C8B2A4",
          500: "#BC9F8D",
          600: "#AF8D77",
          700: "#A27A60",
          800: "#976849",
          900: "#81451F",
        },
        black: "#121212",
      },
    },
    zIndex: {
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
      75: "75",
      100: "100",
      999: "999",
    },
  },
  plugins: [],
};
export default config;
