import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Graph from "../../components/Analytics/Graph";
import Devices from "../../components/Analytics/Devices";
import { usePageTitle } from "../../components/Layouts/UserLayout";
import NumberFormatter from "../../components/Common/FormatNumber";

const VideoPage = () => {
    const params = useParams();
    const setPageTitle = usePageTitle();
    const [tags, setTags] = useState([]);
    const [video, setVideo] = useState([]);
    const [hover, setHover] = useState(false);
    const [thumbnail, setThumbnail] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setPageTitle(video?.title);
    }, [video.title]);

    const fetchVideo = async () => {
        try {
            const response = await axios.get(`Dashboard/MyVideo/${params.id}`);
            setVideo(response.data);
            if (response.data?.tags) {
                setTags(response.data.tags.map((tag) => tag.title));
            }
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Caught error");
        }
    };

    const updateVideo = async () => {
        try {
            const response = await axios.get(`Dashboard/MyVideo/${params.id}`);
            setVideo(response.data);
            if (response.data?.tags) {
                setTags(response.data.tags.map((tag) => tag.title));
            }
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Caught error");
        }
    };

    const tagsInputChange = (value) => {
        setTags(value);
    };

    useEffect(() => {
        fetchVideo();
        axios.get("Main/getCategories").then((cat) => {
            setCategories(cat.data);
        });
    }, []);

    return (
        <>
            <div className="flex justify-between gap-8 mb-10 border-b pb-10 rounded-2xl">
                <div className="relative w-full group" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <img src={thumbnail?.target?.files[0] ? URL.createObjectURL(thumbnail?.target?.files[0]) : video.thumbnail} onError={(e) => (e.target.src = require("../../assets/img/not-found.png"))} alt="Thumbnail" className="w-full h-full object-cover rounded-xl" />
                    {hover && (
                        <>
                            <label htmlFor="thumbnail" className="absolute inset-0 rounded-2xl cursor-pointer flex items-center justify-center bg-black bg-opacity-50 text-white shadow-xl font-medium text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Change
                            </label>
                            <input type="file" id="thumbnail" name="thumbnail" className="hidden" accept="image/*" onChange={(e) => setThumbnail(e)} />
                        </>
                    )}
                </div>

                <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 ml-1">Title</label>
                        <input type="text" className="text-lg font-bold rounded-2xl border py-2 px-4 outline-none" value={video.title} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 ml-1">Categories</label>
                        <select name="category" className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none">
                            {categories?.map((category) => (
                                <option value={category?.id} selected={video.category_id === category.id}>
                                    {category?.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 ml-1">Tags</label>
                        <TagsInput
                            value={tags}
                            onChange={tagsInputChange}
                            onlyUnique={true}
                            inputProps={{
                                placeholder: "Tags",
                            }}
                            className="text-lg font-bold rounded-2xl border pt-1 px-4 outline-none"
                        />
                    </div>
                    {video.iframe && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500 ml-1">Iframe</label>
                            <input type="text" className="rounded-2xl border py-3 px-4 outline-none" value={video.iframe} />
                        </div>
                    )}
                    <button className="bg-red-500 py-3 text-white font-medium text-lg rounded-2xl flex items-center gap-3 justify-center mt-4">
                        Update <FaCheck />
                    </button>
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
