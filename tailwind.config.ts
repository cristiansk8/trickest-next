import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        watermelon: "#F35588",
        melon: "#FFBBB4",
        budGreen: "#71A95A",
        dartmouthGreen: "#007944",
        darkBg: "#131424",
        neonblue: "#00f7ff",
        neonred: "#ff073a",
        neonyellow: "#ffd700",
      },
      backgroundImage: {
        "gradient-cover":
          "linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) -5.91%, rgba(74, 47, 189, 0.5) 111.58%)",
      },
      darkMode: "class",
      plugins: [nextui()],
      spacing: {
        'unit-6': '1.5rem', // Define el valor de unit-6
      },
      borderRadius: {
        large: '1.5rem', // Define el valor de large
      },
    },
  },
  plugins: [],
};
export default config;

