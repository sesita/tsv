import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { BsGoogle, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { usePrimary } from "../../context/PrimaryContext";

const UserLayout = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = usePrimary();
    const [pageTitle, setPageTitle] = useState();
    const isProfilePage = location.pathname === `/user/${id}/videos`;

    useEffect(() => {
        if (state.user === null) navigate("/");
    }, [state.user]);

    return (
        <>
            <div className="pt-12 pb-28 pattern bg-red-950">
                <div className="sm:container flex justify-between items-center">
                    {pageTitle && <h2 className="text-white md:text-6xl text-3xl font-medium mb-14 mt-6">{pageTitle}</h2>}
                    {isProfilePage && (
                        <div className="flex items-center gap-8 mb-6">
                            <img className="w-48 h-48 rounded-full border-4 border-red-500 object-cover" src={state.user.avatar} alt="" />
                            <div>
                                <h2 className="text-3xl font-semibold text-white">{state.user.name}</h2>
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
                </div>
            </div>
            <section className="sm:container -mt-28 mb-14">
                <div className="shadow-lg rounded-2xl py-10 px-12 bg-white">
                    <Outlet context={{ setPageTitle }} />
                </div>
            </section>
        </>
    );
};
export default UserLayout;
