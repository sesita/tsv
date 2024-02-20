import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BsGoogle, BsTwitter } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
    const [userInfo, setUserInfo] = useState();
    const { currentUser } = useAuth();
    const params = useParams();

    useEffect(() => {
        const getUser = async () => {
            if (params.id) {
                try {
                    const res = await await axios.post("getUser", { id: params.id });
                    setUserInfo(res?.data);
                } catch (e) {
                    toast.error(e.response?.data?.message);
                }
            } else {
                setUserInfo(currentUser);
            }
        }
        
        getUser();
    }, [currentUser, params.id]);

    return (
        <>
            <div className="flex items-center gap-8 mb-6">
                <img className="w-40 h-40 rounded-full border-4 border-red-500 object-cover" src={userInfo?.avatar} alt="" />
                <div>
                    <h2 className="text-3xl font-semibold">{userInfo?.name}</h2>
                    <p className="text-sm font-medium mb-4">Content Creator</p>
                    <div className="flex items-center gap-4">
                        <BsGoogle className="text-[#C60C0D] text-3xl" />
                        <FaFacebookF className="text-[#C60C0D] text-3xl" />
                        <BsTwitter className="text-[#C60C0D] text-3xl" />
                        <AiFillInstagram className="text-[#C60C0D] text-3xl" />
                    </div>
                </div>
            </div>
            <div className="flex gap-5 mt-8">
                <div className="w-[250px] h-auto rounded-[32px] bg-[#F2F2F2] px-8 py-6">
                    <div className="mb-5">
                        <h4 className="font-semibold text-2xl text-[#232323] mb-1">Language</h4>
                        {userInfo?.additional_info?.languages.map((language, index) => (
                            <p key={index} className="text-md text-[#232323]">
                                {language}
                            </p>
                        ))}
                    </div>
                    <div className="mb-5">
                        <h4 className="font-semibold text-2xl text-[#232323] mb-1">Skills</h4>
                        {userInfo?.additional_info?.skills.map((skill, index) => (
                            <p key={index} className="text-md text-[#232323]">
                                {skill}
                            </p>
                        ))}
                    </div>
                    <div className="mb-5">
                        <h4 className="font-semibold text-2xl text-[#232323] mb-1">Educations</h4>
                        {userInfo?.additional_info?.educations.map((education, index) => (
                            <p key={index} className="text-md text-[#232323]">
                                {education}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between gap-5 px-8 mb-6">
                        <div className="text-center">
                            <h2 className="text-6xl font-bold text-[#C60C0D]">{userInfo?.following}</h2>
                            <p className="text-md text-[#232323]">Following</p>
                        </div>
                        <div className="text-center">
                            <h2 className="text-6xl font-bold text-[#C60C0D]">{userInfo?.followers}</h2>
                            <p className="text-md text-[#232323]">Followers</p>
                        </div>
                        <div className="text-center">
                            <h2 className="text-6xl font-bold text-[#C60C0D]">{userInfo?.views}</h2>
                            <p className="text-md text-[#232323]">Views</p>
                        </div>
                    </div>
                    <div className="bg-[#F2F2F2] py-6 px-8 rounded-[32px]">
                        <h2 className="text-2xl text-[#232323] font-semibold mb-2">About {userInfo?.full_name}</h2>
                        <div className="text-sm text-[#232323] whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: userInfo?.additional_info?.bio }}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
