import React from "react";
import Banner from "../User/Banner";
import NormalLayout from "./NormalLayout";
import { useParams, useLocation } from "react-router-dom";
import Categories from "../../components/Home/Categories";
import ProfileInfoBox from "../../components/User/ProfileInfoBox";

const UserLayout = ({ pageTitle, children }) => {
    const { id } = useParams();
    const location = useLocation();
    const isProfilePage = location.pathname === `/user/${id}/videos`;

    console.log(location)

    return (
        <>
            <NormalLayout>
                <Categories />
                <Banner pageTitle={pageTitle}>
                    {isProfilePage ? (
                        <ProfileInfoBox />
                    ) : null}
                </Banner>
                <section className="container mx-auto lg:px-0 px-2 -mt-28 mb-14">
                    <div className="shadow-lg rounded-2xl py-10 px-12 bg-white">
                        {children}
                    </div>
                </section>
            </NormalLayout>
        </>
    );
};

export default UserLayout;
