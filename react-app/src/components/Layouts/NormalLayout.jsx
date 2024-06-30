import Header from "../Common/Header";
import { Footer } from "../Common/Footer";
import { ScrollRestoration, Outlet } from "react-router-dom";

const NormalLayout = ({ searchQuery }) => {
    return (
        <div className=" transition-all duration-500">
            <ScrollRestoration />
            <Header searchQuery={searchQuery} />
            <Outlet />
            <Footer />
        </div>
    );
};

export default NormalLayout;
