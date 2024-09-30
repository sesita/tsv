import axios from "axios";
import { toast } from "react-toastify";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import NumberFormatter from "../../../components/Common/FormatNumber";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Common/Pagination";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import ReactPlayer from "react-player";

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
                <div className="relative overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Video
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Play
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Views
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos && videos.length > 0 ? (
                                videos.map((video) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={video.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900" width="25%">
                                            <Link className="hover:text-primary">
                                                <img src={video.thumbnail} className="rounded-lg w-64 h-28 object-cover mb-2" />
                                                <p className="line-clamp-2">
                                                    {video.title}
                                                </p>
                                            </Link>
                                        </th>
                                        <td className="px-6"  width="25%">
                                            <ReactPlayer className="w-full rounded-xl" url={video.video} width="100%" height={"9rem"} controls />
                                        </td>
                                        <td className="px-6 py-4">
                                            {video.category?.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <NumberFormatter value={video.views} />
                                        </td>
                                        <th className="px-6 py-4 uppercase font">
                                            {video.status}
                                        </th>
                                        <td className="px-6 py-4">
                                            {video.status == 'waiting' && (
                                                <button onClick={() => acceptVideo(video.id)} className="mb-4 py-2 px-4 flex items-center gap-2 text-lg bg-primary text-white rounded-2xl">
                                                    <FaCheck className="text-xl" />
                                                    Accept
                                                </button>
                                            )}
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(user)} className="mr-2 py-2 px-4 flex items-center gap-2 text-lg bg-yellow-500 text-white rounded-2xl">
                                                    <CiEdit className="text-xl" />
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(user)} className="mr-2 py-2 px-4 flex items-center gap-2 text-lg bg-primary text-white rounded-2xl">
                                                    <MdOutlineDelete className="text-xl" />
                                                    Delete
                                                </button>
                                            </div>

                                        </td>
                                    </tr>
                                ))) : (
                                <div className="col-span-full text-center text-gray-700 py-4">
                                    <p className="text-4xl capitalize">No videos found</p>
                                </div>
                            )}
                        </tbody>
                    </table>
                </div>

            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePagination} />
        </>
    );
};

export default VideosPage;
