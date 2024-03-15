import Header from "../Common/Header";
import Featured from "../../components/Home/Featured";
import Categories from "../../components/Home/Categories";
import { ScrollRestoration, Outlet, useLocation } from "react-router-dom";

const NormalLayout = ({ searchQuery }) => {
    const location = useLocation();
    const showFeature = location.pathname === "/" || location.pathname === "/search";

    return (
        <>
            <ScrollRestoration />
            <Header searchQuery={searchQuery} />
            <Categories />
            {showFeature && <Featured />}
            <Outlet />
        </>
    );
};

export default NormalLayout;
