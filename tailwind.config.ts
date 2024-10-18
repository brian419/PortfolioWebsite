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
                bounce2: "bounce2 1s infinite",
                rainbow: 'rainbow 5s linear infinite'
            },
            keyframes: {
                rotate: {
                    "0%": { transform: "rotate(0deg) scale(10)" },
                    "100%": { transform: "rotate(-360deg) scale(10)" },
                },
                rainbow: {
                    '0%, 100%': { color: '#FF0000' }, // r
                    '16%': { color: '#FF7F00' }, // o
                    '33%': { color: '#FFFF00' }, // y
                    '50%': { color: '#00FF00' }, // g
                    '66%': { color: '#0000FF' }, // b
                    '83%': { color: '#8B00FF' }, // p
                },
                bounce2: {
                    '0%, 100%': {
                        transform: 'translateY(0)',
                        animationTimingFunction: 'ease-in-out',
                    },
                    '50%': {
                        transform: 'translateY(-10px)',
                        animationTimingFunction: 'ease-in-out',
                    }
                }
            },
        },


    },
    plugins: [],
};
export default config;
