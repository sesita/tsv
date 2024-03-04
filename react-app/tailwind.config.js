/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            container: {
                screens: {
                    sm: "100%",
                    md: "100%",
                    lg: "1024px",
                    xl: "1280px",
                    "2xl": "1536px",
                },
                padding: {
                    DEFAULT: "3%",
                    sm: "2rem",
                    lg: "4rem",
                    xl: "5rem",
                    "2xl": "0rem",
                },
            },
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#a3e635",

                    secondary: "#f87171",

                    accent: "#37CDBE",

                    neutral: "#3D4451",

                    "base-100": "#FFFFFF",

                    info: "#3ABFF8",

                    success: "#36D399",

                    warning: "#FBBD23",

                    error: "#F87272",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
