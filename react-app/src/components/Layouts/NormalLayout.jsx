import Header from "../Common/Header";
import Categories from "../Common/Categories";
import { ScrollRestoration, Outlet } from "react-router-dom";

const NormalLayout = ({ searchQuery }) => {
    return (
        <>
            <ScrollRestoration />
            <Header searchQuery={searchQuery} />
            <Categories />
            <Outlet />
        </>
    );
};

export default NormalLayout;
