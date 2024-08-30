import axios from "axios";
import Header from "../Common/Header";
import { toast } from "react-toastify";
import { Footer } from "../Common/Footer";
import { useEffect, useState } from "react";
import { ScrollRestoration, Outlet } from "react-router-dom";

const NormalLayout = ({ searchQuery }) => {
    const [videos, setVideos] = useState([]);
    const [states, setStates] = useState([]);
    const [location, setLocation] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getPrimary = async () => {
            try {
                const res = await axios.get("Main/primary");
                setVideos(res.data?.videos);
                setLocation(res.data?.location);
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

    useEffect(() => {
        console.log(states)
    }, [states])

    return (
        <>
            <ScrollRestoration />
            <Header searchQuery={searchQuery} states={states} locator={location} categories={categories} />
            <Outlet context={[videos, states, categories]} />
            <Footer />
        </>
    );
};

export default NormalLayout;
