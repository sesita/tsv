import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import VideoBox from "../../components/Common/VideoBox";
import { useOutletContext } from "react-router-dom";

const VideosPage = () => {
    const { setPageTitle } = useOutletContext();

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
            <div className="flex justify-between items-center gap-10 rounded-xl mb-4 border-b border-gray-100 pb-4 cursor-pointer">
                <h1 className="text-3xl font-medium">Manage Your Videos</h1>
                <FaEdit className="text-5xl text-red-600" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos?.map((video) => (
                    <VideoBox key={video?.id} info={video} hidePlayBtn={true} analytics={true} />
                ))}
            </div>
        </>
    );
};

export default VideosPage;
