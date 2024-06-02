import Header from "../Common/Header";
import { ScrollRestoration, Outlet } from "react-router-dom";

const NormalLayout = ({ searchQuery }) => {
    return (
        <>
            <ScrollRestoration />
            <Header searchQuery={searchQuery} />
            <Outlet />
        </>
    );
};

export default NormalLayout;
