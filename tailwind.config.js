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
            center: true
        },
    },
};
