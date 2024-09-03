import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5e1ed5",
        "primary-btn": "var(--primary-btn)",
        "primary-txt": "var(--primary-txt)",
      },
    },
  },
  plugins: [
    nextui({
      layout: {
        radius: {
          small: "1px",
          medium: "5px",
          large: "10px",
        },
      },
    }),
  ],
};
export default config;
