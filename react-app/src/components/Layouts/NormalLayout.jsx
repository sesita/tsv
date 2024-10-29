import { useEffect, useContext } from "react";
import axios from "axios";
import Header from "../Partials/Header";
import { toast } from "react-toastify";
import { Footer } from "../Partials/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { PrimaryContext } from "../../context/PrimaryContext";

// Helper function to convert hex to HSL
const hexToHSL = (hex) => {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    // Find greatest and smallest channel values
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // Achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
};

// Generate lighter and darker shades
const adjustLightness = (h, s, l, adjustment) => {
    return `hsl(${h}, ${s}%, ${Math.max(0, Math.min(100, l + adjustment))}%)`;
};

const NormalLayout = () => {
    const { state, dispatch } = useContext(PrimaryContext);

    useEffect(() => {
        const getPrimary = async () => {
            try {
                const res = await axios.get("Main/primary");

                dispatch({ type: "SET_USER", payload: res.data?.user });
                dispatch({ type: "SET_VIDEOS", payload: res.data?.videos });
                dispatch({ type: "SET_LOCATION", payload: res.data?.location });
                dispatch({
                    type: "SET_STATES",
                    payload: Object.keys(res.data?.locations).map((key) => ({
                        value: key,
                        label: res.data?.locations[key],
                    })),
                });
                dispatch({ type: "SET_CATEGORIES", payload: res.data?.categories });

                // Set primary color CSS variable
                const primaryColor = res.data?.settings?.primary_color;
                if (primaryColor) {
                    const { h, s, l } = hexToHSL(primaryColor);
                    document.documentElement.style.setProperty("--color-primary-light", adjustLightness(h, s, l, 20));  // Light shade
                    document.documentElement.style.setProperty("--color-primary", adjustLightness(h, s, l, 0));         // Regular shade
                    document.documentElement.style.setProperty("--color-primary-dark", adjustLightness(h, s, l, -20)); // Dark shade
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred");
            }
        };
        getPrimary();
    }, [dispatch]);

    return (
        <>
            <ScrollRestoration />
            <Header states={state.states} locator={state.location} categories={state.categories} />
            <Outlet />
            <Footer />
        </>
    );
};

export default NormalLayout;
