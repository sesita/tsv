import Header from "../Common/Header";
import { Footer } from "../Common/Footer";
import { ScrollRestoration, Outlet } from "react-router-dom";

const NormalLayout = ({ searchQuery }) => {
    return (
        <>
            <ScrollRestoration />
            <Header searchQuery={searchQuery} />
            <Outlet />
            <Footer/>
        </>
    );
};

export default NormalLayout;
