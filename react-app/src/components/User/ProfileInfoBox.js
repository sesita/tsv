import { AiFillInstagram } from "react-icons/ai";
import { BsGoogle, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const ProfileInfoBox = () => {
    const { currentUser } = useAuth();

    return (
        <>
            <div className="flex items-center gap-8 mb-6">
                <img className="w-48 h-48 rounded-full border-4 border-red-500 object-cover" src={currentUser.avatar} alt=""/>
                <div>
                    <h2 className="text-3xl font-semibold text-white">
                        {currentUser.name}
                    </h2>
                    <p className="text-sm font-medium mb-4 text-white">Content Creator</p>
                    <div className="flex items-center gap-4">
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
