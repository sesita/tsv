import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import Graph from "../../components/Analytics/Graph";
import Devices from "../../components/Analytics/Devices";
import UserLayout from "../../components/Layouts/UserLayout";
import TotalInfo from "../../components/Analytics/TotalInfo";
import { useParams } from "react-router-dom";

const VideoPage = () => {
    const [video, setVideo] = useState([]);

    const params = useParams();

    const fetchVideo = async () => {
        try {
            const response = await axios.get(`Dashboard/MyVideo/${params.id}`);
            setVideo(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message ?? 'Caught error');
        }
    };

    useEffect(() => {
        fetchVideo();
    }, []); return (
        <UserLayout pageTitle={"Analytics Single"}>
            <div className="md:flex gap-6 mb-6">
                <img
                    src={video.thumbnail}
                    alt="Play Icon White"
                    className="w-full max-w-[250px]"
                />
                <h2 className="text-2xl font-bold max-w-[400px] w-full">
                    {video.title}
                </h2>
            </div>
            <TotalInfo info={video} />
            <div className="flex justify-between gap-6 md:flex-row flex-col">
                <Graph />
                <Devices />
            </div>
        </UserLayout>
    );
};

export default VideoPage;
