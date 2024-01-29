import Header from "../Common/Header";
import { ScrollRestoration } from "react-router-dom";

const NormalLayout = ({ children, searchQuery }) => {
    return (
        <>
            <ScrollRestoration />
            <Header searchQuery={searchQuery} />
            {children}
        </>
    );
};

export default NormalLayout;
