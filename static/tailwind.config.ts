import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-green": {
          50: "#f4faf6",
          100: "#e3f2e8",
          200: "#c2e3ce",
          300: "#93cca7",
          400: "#12823b",
          500: "#0d602b",
          600: "#0a4f23",
          700: "#073b1a",
          800: "#052e14",
          900: "#021a0b",
        },
      },
    },
  },
  plugins: [],
  safelist: [
    "lg:absolute",
    "lg:inset-y-0",
    "lg:right-0",
    "lg:w-1/2",
    "lg:h-full",
    "lg:justify-end",
    "lg:items-center",
  ],
} satisfies Config;
