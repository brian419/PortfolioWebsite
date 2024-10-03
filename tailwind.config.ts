import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                rotate: "rotate 10s linear infinite",
                pulse: "pulse 10s ease-in-out infinite", //pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite
                bounce: "bounce 5s infinite",
            },
            keyframes: {
                rotate: {
                    "0%": { transform: "rotate(0deg) scale(10)" },
                    "100%": { transform: "rotate(-360deg) scale(10)" },
                },
            },
        },


    },
    plugins: [],
};
export default config;
