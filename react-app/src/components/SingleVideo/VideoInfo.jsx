import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import NumberFormatter from "../Common/FormatNumber";
import { BiSolidCommentDetail } from "react-icons/bi";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const VideoInfo = ({ info }) => {
    const [likesPercent, setLikesPercent] = useState(0);

    useEffect(() => {
        const totalVotes = info.likes + info.dislikes;
        const likesPercentage = totalVotes === 0 ? 0 : (info.likes / totalVotes) * 100;

        setLikesPercent(likesPercentage);
    }, [info.likes, info.dislikes]);

    return (
        <>
            <h2 className="text-3xl font-semibold">{info.title}</h2>
            <div className="flex gap-8 items-center my-4">
                <div className="flex gap-2 items-center">
                    <BsEyeFill className="text-[#8B8B8B] text-3xl" />
                    <span className="text-md text-[#8B8B8B]">
                        <NumberFormatter value={info.views} />
                    </span>
                </div>
                <div className="flex gap-2 items-center">
                    <BiSolidCommentDetail className="text-[#8B8B8B] text-3xl" />
                    <span className="text-md text-[#8B8B8B]">
                        <NumberFormatter value={info.comments_count} />
                    </span>
                </div>

                <div className="flex gap-2 items-center">
                    <AiFillLike className={`${true ? "text-[#0A2A8D]" : "text-[#8B8B8B]"} text-3xl`} />
                    <span className="text-md text-[#8B8B8B]">
                        <NumberFormatter value={info.likes} />
                    </span>
                </div>

                <div className="flex gap-2 items-center w-[150px] h-[2px] bg-[#DBDBDB] rounded-full">
                    <span id="likesPercent" className="bg-[#0A2A8D] h-[3px] rounded-full transition-all duration-500" style={{ width: `${likesPercent}%` }}></span>
                </div>

                <div className="flex gap-2 items-center">
                    <AiFillDislike className="text-[#8B8B8B] text-3xl" />
                    <span className="text-md text-[#8B8B8B]">
                        <NumberFormatter value={info.dislikes} />
                    </span>
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
