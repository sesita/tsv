import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Graph from "../../components/Analytics/Graph";
import Devices from "../../components/Analytics/Devices";
import { usePageTitle } from "../../components/Layouts/UserLayout";
import NumberFormatter from "../../components/Common/FormatNumber";

const VideoPage = () => {
    const setPageTitle = usePageTitle();

    useEffect(() => {
        setPageTitle("Video");
    }, [setPageTitle]);

    const [video, setVideo] = useState([]);

    const params = useParams();

    const fetchVideo = async () => {
        try {
            const response = await axios.get(`Dashboard/MyVideo/${params.id}`);
            setVideo(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Caught error");
        }
    };

    useEffect(() => {
        fetchVideo();
    }, []);
    return (
        <>
            <div className="flex justify-between gap-4 mb-10">
                <div className="w-full">
                    <img src={video.thumbnail} alt="Play Icon White" className="w-full h-auto object-cover rounded-xl" />
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div>
                        <span className="text-sm font-medium text-gray-500">Title</span>
                        <h2 className="text-2xl font-bold max-w-[400px] w-full">{video.title}</h2>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-gray-500">Description</span>
                        <h2 className="text-2xl font-bold max-w-[400px] w-full">{video.title}</h2>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-3 gap-y-6 gap-x-8 rounded-2xl mb-12">
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Views</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={video.views} />
                    </h2>
                    <p className="text-[#071148] text-[14px] font-[400]">
                        {moment(video.created_at).format("MMM D, YYYY")}
                        <span className="mx-2">-</span>
                        {moment().format("MMM D, YYYY")}
                    </p>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <div className="flex justify-between font-medium ">
                        <h5 className="text-black text-[16px]">Total Comments</h5>
                    </div>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={video.comments_count} />
                    </h2>
                    <p className="text-[#071148] text-[14px] font-[400]">
                        {moment(video.created_at).format("MMM D, YYYY")}
                        <span className="mx-2">-</span>
                        {moment().format("MMM D, YYYY")}
                    </p>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Likes</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={video.likes} />
                    </h2>
                    <p className="text-[#071148] text-[14px] font-[400]">
                        {moment(video.created_at).format("MMM D, YYYY")}
                        <span className="mx-2">-</span>
                        {moment().format("MMM D, YYYY")}
                    </p>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Dislikes</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={video.dislikes} />
                    </h2>
                    <p className="text-[#071148] text-[14px] font-[400]">
                        {moment(video.created_at).format("MMM D, YYYY")}
                        <span className="mx-2">-</span>
                        {moment().format("MMM D, YYYY")}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-3 gap-y-6 gap-x-8">
                <div className="col-span-3">
                    <Graph />
                </div>
                <Devices />
            </div>
        </>
    );
};

export default VideoPage;
