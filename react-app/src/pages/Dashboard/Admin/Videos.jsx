import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { IoIosPlay } from "react-icons/io";
import { FaEye, FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import NumberFormatter from "../../../components/Common/FormatNumber";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Common/Pagination";

const VideosPage = () => {
    const [videos, setVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const fetchVideos = async (page = 1, query = "") => {
        setLoading(true);
        try {
            const response = await axios.get("Dashboard/Admin/getVideos", {
                params: { page, query },
            });
            setVideos(response.data.videos);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Caught error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handlePagination = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const acceptVideo = async (id) => {
        try {
            await axios.post(`/Dashboard/Admin/acceptVideo`, { id });
            toast.success("Video accepted successfully!");
            fetchVideos(currentPage, searchQuery); // Refresh list after action
        } catch (error) {
            toast.error("Failed to accept the video.");
        }
    };

    return (
        <>
            <div className="flex justify-between items-center gap-10 rounded-xl mb-5 border-b border-gray-100 pb-4 cursor-pointer">
                <h1 className="text-3xl font-medium">Manage Videos</h1>
                <input type="text" placeholder="Search videos..." value={searchQuery} onChange={handleSearchChange} className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500" />
            </div>

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center my-8">
                    <FaSpinner className="animate-spin text-6xl text-red-600" />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videos && videos.length > 0 ? (
                        videos.map((video) => (
                            <div key={video.id} className="relative group border-b rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                                {/* Video Thumbnail */}
                                <div className="relative w-full h-48 overflow-hidden">
                                    <Link to={`/User/Video/${video.id}`}>
                                        <img src={video.thumbnail} alt={video.title} className="object-cover rounded-lg w-full h-full transition-transform duration-300 transform group-hover:scale-110" />
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="text-white text-5xl">
                                                <IoIosPlay className="bg-red-600 p-2 rounded-full" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {/* Video Info */}
                                <div className="relative z-10 bg-white py-4 px-2">
                                    <Link to={`/User/Video/${video.id}`} className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-950 truncate">{video.title}</Link>
                                    <div className="text-sm text-gray-600 flex items-center gap-2 mb-3">
                                        <span className="flex items-center gap-1">
                                            <FaEye className="text-gray-500 mr-1" />
                                            <NumberFormatter value={video?.views} /> views
                                        </span>
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                        <span>{moment(video.created_at).fromNow()}</span>
                                    </div>

                                    {/* Status and Moderation */}
                                    <div className="text-sm flex items-center justify-between">
                                        <span className={`px-2 py-1 rounded-lg uppercase ${video.status === "waiting" ? "bg-yellow-500 text-white" : video.status === "accepted" ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}>
                                            {video.status}
                                        </span>
                                        {video.status === "waiting" && (
                                            <button
                                                onClick={() => acceptVideo(video.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-gray-900 transition duration-200">
                                                Accept
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-700 py-4">
                            <p className="text-4xl capitalize">No videos found</p>
                        </div>
                    )}
                </div>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePagination} />
        </>
    );
};

export default VideosPage;
