import axios from "axios";
import Header from "../Common/Header";
import { toast } from "react-toastify";
import { Footer } from "../Common/Footer";
import { useEffect, useState } from "react";
import { ScrollRestoration, Outlet } from "react-router-dom";

const NormalLayout = ({ searchQuery }) => {
    const [videos, setVideos] = useState([]);
    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getPrimary = async () => {
            try {
                const res = await axios.get("Main/primary");
                setVideos(res.data?.videos);
                setStates(
                    Object.keys(res.data?.locations).map((key) => ({
                        value: key,
                        label: res.data?.locations[key],
                    }))
                );
                setCategories(res.data?.categories);
            } catch (error) {
                toast.error(error.respo);
            }
        };
        getPrimary();
    }, []);

    return (
        <>
            <ScrollRestoration />
            <Header searchQuery={searchQuery} states={states} categories={categories} />
            <Outlet context={[videos]} />
            <Footer />
        </>
    );
};

export default NormalLayout;
