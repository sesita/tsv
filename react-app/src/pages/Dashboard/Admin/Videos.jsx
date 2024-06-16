import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import VideoBox from "../../../components/Common/VideoBox";

const VideosPage = () => {
    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        try {
            const response = await axios.get("Dashboard/MyVideos");
            setVideos(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Caught error");
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <>
            <div className="flex justify-between items-center gap-10 rounded-xl mb-5 border-b border-gray-100 pb-4 cursor-pointer">
                <h1 className="text-3xl font-medium">Manage Videos</h1>
                <input type="text" className="rounded-2xl border py-3 px-4 outline-none font-medium w-1/2" placeholder="Search Videos..." name="iframe" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos?.map((video, key) => (
                    <VideoBox info={video} hidePlayBtn={true} analytics={true} />
                ))}
            </div>
        </>
    );
};

export default VideosPage;
