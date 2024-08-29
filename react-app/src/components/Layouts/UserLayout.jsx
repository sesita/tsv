import Banner from "../Common/Banner";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Outlet, useOutletContext } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { BsGoogle, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const UserLayout = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [states] = useOutletContext();
    const [pageTitle, setPageTitle] = useState();
    const isProfilePage = location.pathname === `/user/${id}/videos`;

    useEffect(() => {
        if (currentUser === null) navigate("/");
    }, [currentUser]);

    return (
        <>
            <Banner pageTitle={pageTitle}>
                {isProfilePage && (
                    <div className="flex items-center gap-8 mb-6">
                        <img className="w-48 h-48 rounded-full border-4 border-red-500 object-cover" src={currentUser.avatar} alt="" />
                        <div>
                            <h2 className="text-3xl font-semibold text-white">{currentUser.name}</h2>
                            <p className="text-sm font-medium mb-4 text-white">Content Creator</p>
                            <div className="flex items-center gap-4">
                                <BsGoogle className="text-[#C60C0D] text-3xl" />
                                <FaFacebookF className="text-[#C60C0D] text-3xl" />
                                <BsTwitter className="text-[#C60C0D] text-3xl" />
                                <AiFillInstagram className="text-[#C60C0D] text-3xl" />
                            </div>
                        </div>
                    </div>
                )}
            </Banner>
            <section className="sm:container -mt-28 mb-14">
                <div className="shadow-lg rounded-2xl py-10 px-12 bg-white">
                    <Outlet context={{setPageTitle, states}} />
                </div>
            </section>
        </>
    );
};
export default UserLayout;
