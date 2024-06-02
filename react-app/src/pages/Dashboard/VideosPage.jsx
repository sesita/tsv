import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import VideoBox from "../../components/Common/VideoBox";
import UserLayout from "../../components/Layouts/UserLayout";
import FilterOptions from "../../components/Common/FilterOptions";
import { usePageTitle } from "../../components/Layouts/UserLayout";

const VideosPage = () => {
    const setPageTitle = usePageTitle();

    useEffect(() => {
        setPageTitle("My Videos");
    }, [setPageTitle]);

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
            <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-medium">Filter Your Videos</h1>
                <FilterOptions />
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
