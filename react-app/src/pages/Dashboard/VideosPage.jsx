import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

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
                    <Link to={`/User/Video/${video.id}`} key={video.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                        <div className="aspect-w-16 aspect-h-9">
                            <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full" />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{video.title}</h2>
                            <p className="text-sm text-gray-600 mb-2">{moment(video.created_at).fromNow()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default VideosPage;
