import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const VideoInfo = ({ info }) => {


    const likesPercentage = (info.dislikes / (info.likes + info.dislikes)) * 100;

    console.log(likesPercentage)
    return (
        <>
            <h2 className="text-3xl font-semibold">{info.title}</h2>
            <div className="flex gap-8 items-center my-4">
                <div className="flex gap-2 items-center">
                    <BsEyeFill className="text-[#8B8B8B] text-3xl" />
                    <span className="text-md text-[#8B8B8B]">{info.views}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <BiSolidCommentDetail className="text-[#8B8B8B] text-3xl" />
                    <span className="text-md text-[#8B8B8B]">{info.comments_count}</span>
                </div>

                <div className="flex gap-2 items-center">
                    <AiFillLike className={`${true ? "text-[#0A2A8D]" : "text-[#8B8B8B]"} text-3xl`} />
                    <span className="text-md text-[#8B8B8B]">{info.likes}</span>
                </div>

                <div className="flex gap-2 items-center w-[150px] h-[2px] bg-[#DBDBDB] rounded-full">
                    <span className={`bg-[#0A2A8D] w-[50%] h-[3px] rounded-full`}></span>
                </div>

                <div className="flex gap-2 items-center">
                    <AiFillDislike className="text-[#8B8B8B] text-3xl" />
                    <span className="text-md text-[#8B8B8B]">{info.dislikes}</span>
                </div>
            </div>

            <Link to={`/User/Profile/${info?.user?.id}`} className="flex items-center gap-3 mb-8">
                <img src={info?.user?.avatar} alt="user avatar" className="w-[40px] h-[40px] rounded-full" />
                <h4 className="text-2xl text-[#8B8B8B]">{info?.user?.name}</h4>
            </Link>
        </>
    );
};

export default VideoInfo;
