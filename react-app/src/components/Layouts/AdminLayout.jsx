import React from "react";
import Banner from "../Common/Banner";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
    return (
        <>
            <Banner pageTitle={"Admin Panel"} />
            <section className="mx-auto sm:w-10/12 sm:px-0 px-2 -mt-28 mb-14">
                <div className="shadow-lg rounded-2xl py-10 px-12 bg-white">
                    <Outlet />
                </div>
            </section>
        </>
    );
};

export default AdminLayout;
