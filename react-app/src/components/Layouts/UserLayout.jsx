import Banner from "../User/Banner";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Outlet, useOutletContext } from "react-router-dom";
import ProfileInfoBox from "../../components/User/ProfileInfoBox";

const UserLayout = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const isProfilePage = location.pathname === `/user/${id}/videos`;

    const [pageTitle, setPageTitle] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        if(currentUser === null) navigate('/');
    }, [currentUser]);

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
