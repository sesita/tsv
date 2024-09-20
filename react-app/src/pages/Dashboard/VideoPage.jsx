import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import classNames from "classnames";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import Skeleton from "react-loading-skeleton";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { CiDesktop, } from "react-icons/ci";
import { AiOutlineApple } from "react-icons/ai";
import { PiAndroidLogo } from "react-icons/pi";

import Graph from "../../components/Analytics/Graph";
import NumberFormatter from "../../components/Common/FormatNumber";
import { usePrimary } from "../../context/PrimaryContext";

const VideoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [videoInfo, setVideoInfo] = useState({});
    const [thumbnail, setThumbnail] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [cityOptions, setCityOptions] = useState([]);
    const { state } = usePrimary();

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const { data } = await axios.get(`/Dashboard/MyVideo/${id}`);
                setVideoInfo(data);

                if (data?.location?.parent) {
                    const defaultState = state.states.find((option) => option.value == data.location?.parent) || null;
                    if (defaultState) {
                        setSelectedState(defaultState);
                        fetchCities(defaultState);
                    }
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Error fetching video data");
            }
        };

        fetchVideo();
    }, [state, id]);

    const fetchCities = async (stateOption) => {
        try {
            const { data } = await axios.get(`/Main/getLocations/${stateOption.value}`);
            setCityOptions(Object.keys(data).map((key) => ({ value: key, label: data[key] })));
        } catch (error) {
            toast.error("Failed to fetch cities.");
        }
    };

    const updateVideo = async (e) => {
        e.preventDefault();
        try {
            await axios.post("Dashboard/Update", { ...videoInfo, thumbnail }, { headers: { "Content-Type": "multipart/form-data" } });
            toast.success("Video Updated");
            navigate("/User/Videos");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const handleInputChange = (e) => {
        setVideoInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption);
        setVideoInfo((prev) => ({ ...prev, location: { parent: selectedOption.value, children: null } }));
        fetchCities(selectedOption);
    };

    const handleCityChange = (selectedOption) => {
        setVideoInfo((prev) => ({
            ...prev,
            location_id: selectedOption.value,
            location: { ...prev.location, children: selectedOption.value },
        }));
    };

    const handleCategoryChange = (selectedOption) => {
        setVideoInfo((prev) => ({ ...prev, category_id: selectedOption.value }));
    };

    const categoryOptions = state.categories.map((category) => ({
        value: category.id,
        label: category.title,
    }));

    const selectStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: "1rem",
            padding: "0.3rem 0.5rem",
            outline: "none",
            fontWeight: "500",
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#6b7280",
        }),
    };

    return (
        <>
            <div className="flex justify-between gap-8 mb-10 border-b pb-10 rounded-2xl">
                <div className="w-full">
                    {videoInfo?.video ? <ReactPlayer className="w-full rounded-xl shadow h-fit md:h-[355px] mb-4" url={videoInfo.video} width="100%" controls /> : <Skeleton borderRadius={20} height={355} />}

                    <div className="flex flex-col gap-2 mb-5">
                        <label className="text-sm font-medium text-gray-500 ml-1">Location</label>
                        <Select options={state.states} onChange={handleStateChange} placeholder="State" value={selectedState} classNamePrefix="react-select" styles={selectStyles} />
                    </div>
                    <Select options={cityOptions} isDisabled={!selectedState} onChange={handleCityChange} placeholder="City" value={cityOptions.find((city) => city.value == videoInfo.location?.children) || null} classNamePrefix="react-select" styles={selectStyles} />
                </div>

                <form className="w-full" onSubmit={updateVideo}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500 ml-1">Title</label>
                            <input name="title" type="text" className="text-lg font-bold rounded-2xl border py-2 px-4 outline-none" value={videoInfo.title || ""} onChange={handleInputChange} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500 ml-1">Categories</label>
                            <Select options={categoryOptions} value={categoryOptions.find((option) => option.value === videoInfo.category_id)} onChange={handleCategoryChange} placeholder="Category" classNamePrefix="react-select" styles={selectStyles} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500 ml-1">Average Price</label>
                            <div className="flex items-center gap-4">
                                {["1", "2", "3"].map((val) => (
                                    <div key={val}>
                                        <input type="radio" id={`price${val}`} name="price" value={val} className="hidden peer" onChange={handleInputChange} checked={videoInfo.price == val} />
                                        <label htmlFor={`price${val}`} className={classNames("flex items-center px-4 py-2 rounded-full cursor-pointer transition-all", videoInfo.price == val ? "bg-primary text-white" : "bg-gray-200 text-gray-700")}>
                                            {"$".repeat(parseInt(val))}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500 ml-1 flex gap-1 cursor-pointer" data-tooltip-id="thumbnail">
                                Thumbnail
                                <FaInfoCircle className="mt-1" />
                                <ReactTooltip id="thumbnail" content="Thumbnail that will appear on the video" />
                            </label>
                            <label htmlFor="thumbnail" className="justify-between rounded-2xl border py-3 px-4 outline-none flex items-center text-gray-500">
                                {videoInfo.thumbnail ? (
                                    <img src={thumbnail ? URL.createObjectURL(thumbnail) : videoInfo.thumbnail} alt="Thumbnail" className="w-full h-full object-cover rounded-xl hover:opacity-50 cursor-pointer transition-all max-h-80" />
                                ) : (
                                    <div className="font-medium flex gap-2">
                                        Upload An Image
                                        <MdOutlineFileUpload className="text-2xl" />
                                    </div>
                                )}
                            </label>
                            <input id="thumbnail" type="file" className="hidden" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500 ml-1 flex gap-1 cursor-pointer" data-tooltip-id="description">
                                Description
                                <FaInfoCircle className="mt-1" />
                                <ReactTooltip id="description" content="Description about your video" />
                            </label>
                            <textarea name="description" rows="3" className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none" placeholder="Description..." value={videoInfo.description || ""} onChange={handleInputChange}></textarea>
                        </div>

                        <button type="submit" className="bg-red-500 py-3 text-white font-medium text-lg rounded-2xl flex items-center gap-3 justify-center mt-4">
                            Update <FaCheck />
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-3 gap-y-6 gap-x-8 rounded-2xl mb-12">
                {[
                    { label: "Total Views", value: videoInfo.views },
                    { label: "Total Comments", value: videoInfo.comments_count },
                    { label: "Total Likes", value: videoInfo.likes },
                    { label: "Total Dislikes", value: videoInfo.dislikes },
                ].map((stat) => (
                    <div key={stat.label} className="border rounded-xl px-6 py-4">
                        <h5 className="text-black font-medium text-[16px]">{stat.label}</h5>
                        <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                            <NumberFormatter value={stat.value} />
                        </h2>
                        <p className="text-[#071148] text-[14px] font-[400]">
                            {moment(videoInfo.created_at).format("MMM D, YYYY")}
                            <span className="mx-2">-</span>
                            {moment().format("MMM D, YYYY")}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-3 gap-y-6 gap-x-8">
                <div className="col-span-3">
                    <Graph videoId={videoInfo.id} />
                </div>
                <div className="border rounded-2xl p-6">
                    <h2 className="text-[22px] font-bold mb-12">Device Category</h2>
                    <div className="flex justify-between items-center gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-violet-50 text-primary w-12 h-12 rounded-lg flex items-center justify-center">
                                <CiDesktop className="text-3xl" />
                            </div>
                            <span className="text-[16px] text-[#000000] font-[400]">Web Application</span>
                        </div>
                        <span className="text-[18px] font-extrabold text-[#0A2A8D]">100%</span>
                    </div>
                    <div className="flex justify-between items-center gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-violet-50 text-primary w-12 h-12 rounded-lg flex items-center justify-center">
                                <PiAndroidLogo className="text-3xl" />
                            </div>
                            <span className="text-[16px] text-[#000000] font-[400]">Android</span>
                        </div>
                        <span className="text-[18px] font-extrabold text-[#0A2A8D]">0.0%</span>
                    </div>
                    <div className="flex justify-between items-center gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-violet-50 text-primary w-12 h-12 rounded-lg flex items-center justify-center">
                                <AiOutlineApple className="text-3xl" />
                            </div>
                            <span className="text-[16px] text-[#000000] font-[400]">Ios</span>
                        </div>
                        <span className="text-[18px] font-extrabold text-[#0A2A8D]">0.0%</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoPage;
