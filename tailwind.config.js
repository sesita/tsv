/** @type {import('tailwindcss').Config} */
export default {
    content: ["./react-app/src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#D83131",
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "3%",
                    sm: "1rem",
                    xl: "2rem",
                    "2xl": "4rem",
                },
            },
        },
    },
};
