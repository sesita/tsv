/** @type {import('tailwindcss').Config} */
export default {
    content: ["./react-app/src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1636px",
            },
            colors: {
                primary: "#D83131",
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    xl: "2rem",
                    "2xl": "4rem",
                },
            },
        },
    },
};
