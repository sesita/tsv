import ProfileInfoBox from "./ProfileInfoBox";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
    const { currentUser } = useAuth();

    return (
        <>
            <ProfileInfoBox />
            <div className="flex gap-5 mt-7">
                <div className="w-[250px] h-auto rounded-[32px] bg-[#F2F2F2] px-8 py-6">
                    <div className="mb-5">
                        <h4 className="font-semibold text-2xl text-[#232323] mb-1">
                            Language
                        </h4>
                        <p className="text-md text-[#232323]">English</p>
                    </div>
                    <div className="mb-5">
                        <h4 className="font-semibold text-2xl text-[#232323] mt-5">
                            Skills
                        </h4>
                        <p className="text-md text-[#232323]">Video Editing</p>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between gap-5 px-8 mb-5">
                        <div className="text-center">
                            <h2 className="text-6xl font-bold text-[#C60C0D]">
                                3K
                            </h2>
                            <p className="text-md text-[#232323]">Following</p>
                        </div>
                        <div className="text-center">
                            <h2 className="text-6xl font-bold text-[#C60C0D]">
                                30.5M
                            </h2>
                            <p className="text-md text-[#232323]">Followers</p>
                        </div>
                        <div className="text-center">
                            <h2 className="text-6xl font-bold text-[#C60C0D]">
                                90.1M
                            </h2>
                            <p className="text-md text-[#232323]">Views</p>
                        </div>
                    </div>
                    <div className="bg-[#F2F2F2] py-6 px-8 rounded-[32px]">
                        <h2 className="text-2xl text-[#232323] font-semibold">
                            About James John
                        </h2>
                        <p className="text-sm text-[#232323]">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
