import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";

const VideoInfo = () => {
    return (
        <>
            <h2 className="text-3xl font-semibold">
                Lorem Ipsum is simply dummy text of the printing.
            </h2>
            <div className="flex gap-8 items-center my-4">
                <div className="flex gap-2 items-center">
                    <BsEyeFill className="text-[#8B8B8B] text-3xl" />
                    <span className="text-md text-[#8B8B8B]">85k</span>
                </div>
                <div className="flex gap-2 items-center">
                    <BiSolidCommentDetail className="text-[#8B8B8B] text-3xl" />
                    <span className="text-md text-[#8B8B8B]">15k</span>
                </div>

                <div className="flex gap-2 items-center">
                    <AiFillLike
                        className={`${
                            true ? "text-[#0A2A8D]" : "text-[#8B8B8B]"
                        } text-3xl`}
                    />
                    <span className="text-md text-[#8B8B8B]">50k</span>
                </div>

                <div className="flex gap-2 items-center w-[150px] h-[2px] bg-[#DBDBDB] rounded-full">
                    <span
                        className={`bg-[#0A2A8D] w-[110px] h-[3px] rounded-full`}
                    ></span>
                </div>

                <div className="flex gap-2 items-center">
                    <AiFillDislike className="text-[#8B8B8B] text-3xl" />
                    <span className="text-md text-[#8B8B8B]">10k</span>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-[40px] h-[40px] bg-[#D9D9D9] rounded-full">
                    <span className="text-[#8B8B8B] font-semibold text-[18px]">
                        M
                    </span>
                </div>
                <h4 className="text-2xl text-[#8B8B8B]">Mehedi Hasan</h4>
            </div>
        </>
    );
};

export default VideoInfo;
