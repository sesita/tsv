import { AiFillInstagram } from "react-icons/ai";
import { BsGoogle, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import {  useAuth } from "../../context/AuthContext";

const ProfileInfoBox = () => {

    const { currentUser } = useAuth();

    return (
        <>
            <div className="flex items-center gap-8 mb-6">
                {true ? (
                    <img
                        className="w-40 h-40 rounded-full border-4 border-red-500 object-cover"
                        src={currentUser.avatar}
                        alt=""
                    />
                ) : (
                    <div className="flex items-center justify-center border-4 border-red-500 w-32 h-32 rounded-full bg-[#F2F2F2]">
                        <span className="text-5xl font-semibold">M</span>
                    </div>
                )}

                <div>
                    <h2 className="text-3xl font-semibold text-[#232323]">
                        {currentUser.name}
                    </h2>
                    <p className="text-sm font-medium">Content Creator</p>
                    <div className="flex items-center gap-4 mt-3">
                        <BsGoogle className="text-[#C60C0D] text-3xl" />
                        <FaFacebookF className="text-[#C60C0D] text-3xl" />
                        <BsTwitter className="text-[#C60C0D] text-3xl" />
                        <AiFillInstagram className="text-[#C60C0D] text-3xl" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileInfoBox;
