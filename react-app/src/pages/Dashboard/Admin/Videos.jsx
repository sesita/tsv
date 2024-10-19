import axios from "axios";
import { toast } from "react-toastify";
import { FaCheck, FaSpinner, FaPlay, FaTimes, FaYoutube, FaUpload } from "react-icons/fa";
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
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [uploadType, setUploadType] = useState("youtube");
    const [selectedFile, setSelectedFile] = useState(null);
    const [iframeInput, setIframeInput] = useState(""); // For YouTube link or iframe

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
        setCurrentPage(1);
    };

    const handlePagination = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const videoStatus = async (id, status, videoFileOrLink = null) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("status", status);

        if (videoFileOrLink) {
            if (uploadType === "file") {
                formData.append("video", videoFileOrLink);
            } else if (uploadType === "youtube") {
                formData.append("iframe", videoFileOrLink);
            }
        }

        try {
            await axios.post(`/Dashboard/Admin/videoStatus`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSelectedVideo(null);
            fetchVideos(currentPage, searchQuery); // Refresh the videos listF
        } catch (error) {
            toast.error("Failed to update the video.");
        }
    };

    const handleReview = (video) => {
        setIframeInput(video?.video);
        setSelectedVideo(selectedVideo?.id === video.id ? null : video);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file.type.startsWith("video/")) return toast.error("Please upload a valid video.");
        setSelectedFile(file);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("video/")) return toast.error("Please upload a valid video.");
        setSelectedFile(file);
    };

    const handleVideoSubmission = (id, status) => {
        if (uploadType === "file" && selectedFile) {
            // Submit with the uploaded file
            videoStatus(id, status, selectedFile);
        } else if (uploadType === "youtube" && iframeInput) {
            // Submit with the iframe input
            videoStatus(id, status, iframeInput);
        } else {
            toast.error("Please provide a valid video to submit.");
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10 rounded-xl mb-5 border-b border-gray-100 pb-4">
                <h1 className="text-2xl md:text-3xl font-medium">Manage Videos</h1>
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                />
            </div>
            {loading ? (
                <div className="flex justify-center my-8">
                    <FaSpinner className="animate-spin text-6xl text-red-600" />
                </div>
            ) : (
                <div className="relative overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">Video</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Views</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos && videos.length > 0 ? (
                                videos.map((video) => (
                                    <>
                                        <tr className={`border-b border-gray-100 ${video.status === 'WAITING' ? 'bg-gray-100' : 'bg-white'}`} key={video.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900" width="25%">
                                                <Link className="hover:text-primary">
                                                    <img src={video.thumbnail} className="rounded-lg w-64 h-28 object-cover mb-2" alt={video.title} />
                                                    <p className="line-clamp-2">{video.title}</p>
                                                </Link>
                                            </th>
                                            <td className="px-6 py-4">{video.category?.title}</td>
                                            <td className="px-6 py-4"><NumberFormatter value={video.views} /></td>
                                            <th className="px-6 py-4 uppercase font">{video.status}</th>
                                            <td className="px-6 py-4">
                                                {video.status === 'WAITING' && (
                                                    <button onClick={() => handleReview(video)} className="mb-4 py-2 px-4 flex items-center gap-2 text-lg bg-blue-500 text-white rounded-2xl">
                                                        <FaPlay className="text-xl" />
                                                        Review
                                                    </button>
                                                )}
                                                <div className="flex gap-2">
                                                    <button className="mr-2 py-2 px-4 flex items-center gap-2 text-lg bg-yellow-500 text-white rounded-2xl">
                                                        <CiEdit className="text-xl" />
                                                        Edit
                                                    </button>
                                                    <button onClick={() => videoStatus(video.id, 'delete')} className="mr-2 py-2 px-4 flex items-center gap-2 text-lg bg-primary text-white rounded-2xl">
                                                        <MdOutlineDelete className="text-xl" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {selectedVideo?.id === video.id && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 bg-gray-100 rounded-b-xl">
                                                    <div className="flex items-center justify-center gap-10 mb-4">
                                                        <div className="w-full">
                                                            <ReactPlayer className="col-span-1 rounded-xl" url={video.video} height="18rem" controls />
                                                        </div>
                                                        <h3 className="text-4xl w-44 text-black font-medium flex flex-col text-center">
                                                            <span>OR</span>
                                                            <span className="text-xs">Upload your own</span>
                                                        </h3>
                                                        <div className="w-full">
                                                            <div className="flex rounded-lg bg-gray-200 p-1 mb-4">
                                                                <button
                                                                    type="button"
                                                                    className={`flex-1 py-2 px-4 items-center flex justify-center gap-2 rounded-md ${uploadType === "youtube" && "bg-white shadow"}`}
                                                                    onClick={() => setUploadType("youtube")}
                                                                >
                                                                    <FaYoutube className="text-xl" />
                                                                    YouTube Link
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className={`flex-1 py-2 px-4 items-center flex justify-center gap-2 rounded-md ${uploadType === "file" && "bg-white shadow"}`}
                                                                    onClick={() => setUploadType("file")}
                                                                >
                                                                    <FaUpload className="text-xl" />
                                                                    File Upload
                                                                </button>
                                                            </div>
                                                            {uploadType === "youtube" ? (
                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter YouTube iframe or link"
                                                                    value={iframeInput}
                                                                    onChange={(e) => setIframeInput(e.target.value)}
                                                                    className="w-full rounded-xl p-4 border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="relative w-full h-40 border-dashed border-4 border-gray-300 rounded-lg flex items-center justify-center bg-white"
                                                                    onDragOver={handleDragOver}
                                                                    onDrop={handleDrop}
                                                                >
                                                                    {selectedFile ? (
                                                                        <p>{selectedFile.name}</p>
                                                                    ) : (
                                                                        <p>Drag & Drop a video file here, or click to upload</p>
                                                                    )}
                                                                    <input
                                                                        type="file"
                                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                                        accept="video/*"
                                                                        onChange={handleFileInputChange}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-4 mb-4">
                                                        <button
                                                            onClick={() => videoStatus(video.id, "CANCELED")}
                                                            className="mt-4 py-2 px-4 flex items-center gap-2 text-lg bg-red-500 text-white rounded-2xl"
                                                        >
                                                            <FaTimes className="text-xl" />
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={() => handleVideoSubmission(video.id, "APPROVED")}
                                                            className="mt-4 py-2 px-4 flex items-center gap-2 text-lg bg-green-500 text-white rounded-2xl"
                                                        >
                                                            <FaCheck className="text-xl" />
                                                            Accept
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        No videos found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePagination}
            />
        </>
    );
};

export default VideosPage;
