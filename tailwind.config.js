/** @type {import('tailwindcss').Config} */
export default {
    content: ["./react-app/src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#D83131",
            },
        },
        container: {
            center: true,
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
                md: "1.5rem",
                lg: "1rem",
                "2xl": "2rem",
            },
        },
    },
};
