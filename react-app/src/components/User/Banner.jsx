import React from "react";
import { FaUserCog } from "react-icons/fa";
import { FaAdversal } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { MdOutlineVideoSettings } from "react-icons/md";
import { Link, useLocation, matchPath } from "react-router-dom";

const Banner = ({ pageTitle, children }) => {
    const location = useLocation();
    const isAdminRoute = matchPath("/Admin/*", location.pathname);

    return (
        <>
            <div
                className="pt-12 pb-32"
                style={{
                    background: `url(${require("../../assets/img/User-page-banner.png")})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    aspectRatio: "16:9",
                }}
            >
                <div className="mx-auto sm:w-10/12 sm:px-0 px-2 flex justify-between items-center">
                    {pageTitle && <h2 className="text-white md:text-6xl text-3xl font-medium mb-14 mt-6">{pageTitle}</h2>}
                    {children}
                    {isAdminRoute && (
                        <div>
                            <ul className="text-white text-2xl font-medium flex gap-10">
                                <li>
                                    <Link to={"/Admin/Videos"} className="flex items-center gap-3">
                                        Videos
                                        <MdOutlineVideoSettings className="mt-1" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="flex items-center gap-3">
                                        Users
                                        <FaUserCog className="mt-1" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="flex items-center gap-3">
                                        Categories
                                        <BiSolidCategory className="mt-1" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="flex items-center gap-3">
                                        Sales
                                        <RiMoneyDollarBoxFill className="mt-1" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="flex items-center gap-3">
                                        Ads
                                        <FaAdversal className="mt-1" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Banner;
