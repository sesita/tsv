import axios from "axios";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import NumberFormatter from "../Common/FormatNumber";
import { BiSolidCommentDetail } from "react-icons/bi";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const VideoInfo = ({ info }) => {
    const { currentUser } = useAuth();
    const [likesPercent, setLikesPercent] = useState(0);
    const [data, setData] = useState(0);

    const countInteractionPercent = (likes, dislikes) => {
        const totalVotes = likes + dislikes;
        return totalVotes === 0 ? 0 : (likes / totalVotes) * 100;
    };

    useEffect(() => {
        setData(info);
        setLikesPercent(countInteractionPercent(info.likes, info.dislikes));
    }, [info]);

    const Interaction = async (status) => {
        if (!currentUser) return toast.error("Require Authorizations");
        if(status === data.interaction) return;

        const res = await axios.post("Video/Interaction", {
            video_id: info.id,
            interaction: status,
        });
        if (res.data.status === "success") {
            const oldInteraction = {[data.interaction]: data[data.interaction+'s']-1}
            const upd = status === 'like' ? {likes: info.likes + 1, ...oldInteraction} : {dislikes: info.dislikes + 1, ...oldInteraction};
            setData({...info, ...upd, interaction: status});
            setLikesPercent(countInteractionPercent(data.likes, data.dislikes));
        } else {
            toast.error("Could not interacted");
        }
    };

    return (
        <>
            <h2 className="text-3xl font-semibold">{data.title}</h2>
            <div className="sm:flex grid grid-cols-4 gap-8 items-center my-4 mb-5">
                <div className="flex gap-2 items-center">
                    <BsEyeFill className="text-[#8B8B8B] text-3xl" />
                    <span className="text-md text-[#8B8B8B]">
                        <NumberFormatter value={data.views} />
                    </span>
                </div>
                <div className="flex gap-2 items-center">
                    <BiSolidCommentDetail className="text-[#8B8B8B] text-3xl" />
                    <span className="text-md text-[#8B8B8B]">
                        <NumberFormatter value={data.comments_count} />
                    </span>
                </div>

                <div className="flex gap-2 items-center cursor-pointer" onClick={() => Interaction('like')}>
                    <AiFillLike className={`${data?.interaction === "like" ? "text-[#0A2A8D]" : "text-[#8B8B8B]"} text-3xl`} />
                    <span className="text-md text-[#8B8B8B]">
                        <NumberFormatter value={data.likes} />
                    </span>
                </div>

                <div className="gap-2 items-center sm:w-[20%] w-0 h-[2px] bg-[#DBDBDB] rounded-full hidden sm:flex">
                    <span className="bg-[#0A2A8D] h-[3px] rounded-full transition-all duration-500" style={{ width: `${likesPercent}%` }}></span>
                </div>

                <div className="flex gap-2 items-center cursor-pointer" onClick={() => Interaction('dislike')}>
                    <AiFillDislike className={`${data?.interaction === "dislike" ? "text-[#0A2A8D]" : "text-[#8B8B8B]"} text-3xl`} />
                    <span className="text-md text-[#8B8B8B]">
                        <NumberFormatter value={data.dislikes} />
                    </span>
                </div>
            </div>

            <Link to={`/User/Profile/${data?.user?.id}`} className="flex items-center gap-3 mb-8">
                <img src={data?.user?.avatar} alt="user avatar" className="w-[40px] h-[40px] rounded-full" />
                <h4 className="text-2xl text-[#8B8B8B]">{data?.user?.name}</h4>
            </Link>
        </>
    );
};

export default VideoInfo;
