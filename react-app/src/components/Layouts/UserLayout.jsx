import React, { useState } from "react";
import Banner from "../User/Banner";
import { Outlet, useOutletContext } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import ProfileInfoBox from "../../components/User/ProfileInfoBox";

const UserLayout = () => {
    const { id } = useParams();
    const location = useLocation();
    const isProfilePage = location.pathname === `/user/${id}/videos`;

    const [pageTitle, setPageTitle] = useState(null);

    return (
        <>
            <Banner pageTitle={pageTitle}>{isProfilePage && <ProfileInfoBox />}</Banner>
            <section className="mx-auto sm:w-10/12 sm:px-0 px-2 -mt-28 mb-14">
                <div className="shadow-lg rounded-2xl py-10 px-12 bg-white">
                    <Outlet context={setPageTitle} />
                </div>
            </section>
        </>
    );
};

export function usePageTitle() {
    return useOutletContext();
}

export default UserLayout;
