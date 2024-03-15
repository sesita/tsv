import React from "react";
import Banner from "../User/Banner";
import { useParams, useLocation } from "react-router-dom";
import ProfileInfoBox from "../../components/User/ProfileInfoBox";

const UserLayout = ({ pageTitle, children }) => {
    const { id } = useParams();
    const location = useLocation();
    const isProfilePage = location.pathname === `/user/${id}/videos`;

    return (
        <>
            <Banner pageTitle={pageTitle}>{isProfilePage ? <ProfileInfoBox /> : null}</Banner>
            <section className="container mx-auto lg:px-0 px-2 -mt-28 mb-14">
                <div className="shadow-lg rounded-2xl py-10 px-12 bg-white">{children}</div>
            </section>
        </>
    );
};

export default UserLayout;
