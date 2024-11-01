import axios from "axios";
import { toast } from "react-toastify";
import { FaCheck, FaPlay, FaTimes, FaYoutube, FaUpload } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../../components/Common/Pagination";
import { CiEdit, CiSearch } from "react-icons/ci";
import { MdOutlineDelete, MdOutlineVideoSettings } from "react-icons/md";
import ReactPlayer from "react-player";
import SmartVideosList from "../../../../components/Dashboard/SmartVideoList";

const VideosList = () => {
    const [videos, setVideos] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [uploadType, setUploadType] = useState("youtube");
    const [selectedFile, setSelectedFile] = useState(null);
    const [iframeInput, setIframeInput] = useState(""); // For YouTube link or iframe

    const fetchVideos = async (page = 1, search = "") => {
        setLoading(true);
        try {
            const response = await axios.get("Dashboard/Videos", {
                params: { page, search },
            });
            setVideos(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Caught error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos(currentPage, search);
    }, [currentPage, search]);

    const handleSearch = (search) => {
        setSearch(search);
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
            fetchVideos(currentPage, search); // Refresh the videos listF
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
          <SmartVideosList userRole="admin" />
        </>
    );
};

export default VideosList;
