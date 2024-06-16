import axios from "axios";
import moment from "moment";
import Select from "react-select";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Graph from "../../components/Analytics/Graph";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Devices from "../../components/Analytics/Devices";
import { useParams, useNavigate } from "react-router-dom";
import NumberFormatter from "../../components/Common/FormatNumber";
import { usePageTitle } from "../../components/Layouts/UserLayout";

const VideoPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const setPageTitle = usePageTitle();
    const [tags, setTags] = useState([]);
    const [hover, setHover] = useState(false);
    const [videoInfo, setVideoInfo] = useState([]);
    const [thumbnail, setThumbnail] = useState({});
    const [categories, setCategories] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [countryCityData, setCountryCityData] = useState([]);

    useEffect(() => {
        setPageTitle(videoInfo?.title);
    }, [videoInfo.title]);

    const fetchVideo = async () => {
        try {
            const response = await axios.get(`Dashboard/MyVideo/${params.id}`);
            setVideoInfo(response.data);
            if (response.data?.tags) {
                setTags(response.data.tags.map((tag) => tag.title));
            }
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Caught error");
        }
    };

    const updateVideo = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "Dashboard/Update",
                { ...videoInfo, tags: tags, thumbnail: thumbnail.target?.files[0] },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("Video Uploaded");
            navigate("/User/Videos");
        } catch (e) {
            toast.error(e.response?.data?.message);
        }
    };

    const handleChange = (selectedOptions) => {
        const selectedTags = selectedOptions.map((option) => option.value);
        setTags(selectedTags);
    };

    const changeInput = (e) => {
        setVideoInfo({
            ...videoInfo,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        fetchVideo();
        axios.get("Main/getCategories").then((res) => {
            setCategories(res.data.map((val) => ({ label: val.title, value: val.id })));
        });
        axios.get("Main/getTags").then((res) => {
            setTagOptions(res.data.map((val) => ({ label: val.title, value: val.title })));
        });
        axios.get("Main/getLocations").then((res) => {
            setCountryCityData(res.data);
        });
    }, []);

    const countryOptions = Object.keys(countryCityData).map((country) => ({
        value: country,
        label: country,
    }));

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [cityOptions, setCityOptions] = useState([]);

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        const cities = countryCityData[selectedOption.value].map((city) => ({
            value: city,
            label: city,
        }));
        setCityOptions(cities);
        setVideoInfo({ ...videoInfo, location: selectedOption.value });
    };

    const handleCityChange = (selectedOption) => {
        setVideoInfo({ ...videoInfo, location: selectedOption.value });
    };

    const handleCategoryChange = (selectedOption) => {
        setVideoInfo({ ...videoInfo, category: selectedOption.value });
    };
    return (
        <>
            <div className="flex justify-between gap-8 mb-10 border-b pb-10 rounded-2xl">
                <div className="w-full">
                    {videoInfo?.package === "free" ? (
                        <div className="relative w-full group md:max-h-[355px] mb-4" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                            <img src={thumbnail?.target?.files[0] ? URL.createObjectURL(thumbnail?.target?.files[0]) : videoInfo.thumbnail} onError={(e) => (e.target.src = require("../../assets/img/not-found.png"))} alt="Thumbnail" className="w-full md:h-[350px] object-cover rounded-xl" />
                            {hover && (
                                <>
                                    <label htmlFor="thumbnail" className="absolute inset-0 rounded-2xl cursor-pointer flex items-center justify-center bg-black bg-opacity-50 text-white shadow-xl font-medium text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Change
                                    </label>
                                    <input type="file" id="thumbnail" name="thumbnail" className="hidden" accept="image/*" onChange={(e) => setThumbnail(e)} />
                                </>
                            )}
                        </div>
                    ) : videoInfo.video ? (
                        <video className="w-full rounded-xl shadow h-fit md:h-[355px] mb-4" controls>
                            <source src={videoInfo?.video} />
                        </video>
                    ) : (
                        <Skeleton borderRadius={20} height={355} />
                    )}
                    <div className="flex flex-col gap-2 mb-5">
                        <label className="text-sm font-medium text-gray-500 ml-1">Location</label>
                        <Select
                            options={countryOptions}
                            onChange={handleCountryChange}
                            placeholder="State"
                            classNamePrefix="react-select"
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    borderRadius: "1rem", // Rounded-2xl
                                    padding: "0.3rem 0.5rem", // Py-2 Px-4
                                    outline: "none",
                                    fontWeight: "500", // Font-medium
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    color: "#6b7280", // Text-gray-500
                                }),
                            }}
                        />
                    </div>
                    <Select
                        options={cityOptions}
                        isDisabled={!selectedCountry}
                        onChange={handleCityChange}
                        placeholder="City"
                        classNamePrefix="react-select"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                borderRadius: "1rem", // Rounded-2xl
                                padding: "0.3rem 0.5rem", // Py-2 Px-4
                                outline: "none",
                                fontWeight: "500", // Font-medium
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: "#6b7280", // Text-gray-500
                            }),
                        }}
                    />
                </div>

                <form className="w-full" onSubmit={updateVideo}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500 ml-1">Title</label>
                            <input name="title" type="text" className="text-lg font-bold rounded-2xl border py-2 px-4 outline-none" value={videoInfo.title} onChange={(e) => changeInput(e)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500 ml-1">Categories</label>
                            <Select
                                options={categories}
                                onChange={handleCategoryChange}
                                placeholder="Category"
                                classNamePrefix="react-select"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        borderRadius: "1rem", // Rounded-2xl
                                        padding: "0.3rem 0.5rem", // Py-2 Px-4
                                        outline: "none",
                                        fontWeight: "500", // Font-medium
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: "#6b7280", // Text-gray-500
                                    }),
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500 ml-1">Tags</label>
                            <CreatableSelect
                                isMulti
                                value={tags.map((tag) => ({ label: tag, value: tag }))}
                                onChange={handleChange}
                                options={tagOptions}
                                placeholder="Tags"
                                classNamePrefix="react-select"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        borderRadius: "1rem", // Rounded-2xl
                                        padding: "0.3rem 0.5rem", // Py-2 Px-4
                                        outline: "none",
                                        fontWeight: "500", // Font-medium
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: "#6b7280", // Text-gray-500
                                        padding: "0.4rem 0rem", // Py-2 Px-4
                                    }),
                                    multiValue: (provided) => ({
                                        ...provided,
                                        backgroundColor: "#e5e7eb", // Background gray-200
                                        borderRadius: "0.375rem", // Rounded-md
                                        padding: "0.2rem",
                                    }),
                                    multiValueLabel: (provided) => ({
                                        ...provided,
                                        fontWeight: "500", // Font-medium
                                    }),
                                    multiValueRemove: (provided) => ({
                                        ...provided,
                                        color: "#9ca3af", // Text-gray-400
                                        ":hover": {
                                            backgroundColor: "#d1d5db", // Hover:bg-gray-300
                                            color: "#374151", // Hover:text-gray-700
                                        },
                                    }),
                                }}
                            />
                        </div>
                        {videoInfo.package === "free" ? (
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-500 ml-1 flex gap-1 cursor-pointer" data-tooltip-id="link">
                                    Video Link
                                    <FaInfoCircle className="mt-1" />
                                    <ReactTooltip id="link" content="Youtube Video Link or Iframe" />
                                </label>
                                <input type="text" className="rounded-2xl border py-3 px-4 outline-none font-medium" placeholder="Video Link..." name="iframe" value={videoInfo?.video} onChange={(e) => changeInput(e)} />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-500 ml-1 flex gap-1 cursor-pointer" data-tooltip-id="thumbnail">
                                    Thumbnail
                                    <FaInfoCircle className="mt-1" />
                                    <ReactTooltip id="thumbnail" content="thumbnail that will appear on that video" />
                                </label>
                                <label htmlFor="thumbnail" className="justify-between rounded-2xl border py-3 px-4 outline-none flex items-center text-gray-500">
                                    {videoInfo.thumbnail ? (
                                        <>
                                            <img src={thumbnail?.target?.files[0] ? URL.createObjectURL(thumbnail?.target?.files[0]) : videoInfo.thumbnail} alt="Thumbnail" className="w-full h-full object-cover rounded-xl hover:opacity-50 cursor-pointer transition-all max-h-80" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="font-medium flex gap-2">
                                                Upload A Image
                                                <MdOutlineFileUpload className="text-2xl" />
                                            </div>
                                            <span className="text-xs">Allowed: JPG,PNG,WEBP</span>
                                        </>
                                    )}
                                </label>
                                <input id="thumbnail" type="file" className="hidden" name="thumbnail" accept="image/*" onChange={(e) => setThumbnail(e)} />
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500 ml-1 flex gap-1 cursor-pointer" data-tooltip-id="Description">
                                Description
                                <FaInfoCircle className="mt-1" />
                                <ReactTooltip id="Description" content="For Seo" />
                            </label>
                            <textarea name="description" rows="3" className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none" placeholder="Description..." value={videoInfo?.description} onChange={(e) => changeInput(e)}></textarea>
                        </div>
                        <button type="submit" className="bg-red-500 py-3 text-white font-medium text-lg rounded-2xl flex items-center gap-3 justify-center mt-4">
                            Update <FaCheck />
                        </button>
                    </div>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-3 gap-y-6 gap-x-8 rounded-2xl mb-12">
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Views</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={videoInfo.views} />
                    </h2>
                    <p className="text-[#071148] text-[14px] font-[400]">
                        {moment(videoInfo.created_at).format("MMM D, YYYY")}
                        <span className="mx-2">-</span>
                        {moment().format("MMM D, YYYY")}
                    </p>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <div className="flex justify-between font-medium ">
                        <h5 className="text-black text-[16px]">Total Comments</h5>
                    </div>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={videoInfo.comments_count} />
                    </h2>
                    <p className="text-[#071148] text-[14px] font-[400]">
                        {moment(videoInfo.created_at).format("MMM D, YYYY")}
                        <span className="mx-2">-</span>
                        {moment().format("MMM D, YYYY")}
                    </p>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Likes</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={videoInfo.likes} />
                    </h2>
                    <p className="text-[#071148] text-[14px] font-[400]">
                        {moment(videoInfo.created_at).format("MMM D, YYYY")}
                        <span className="mx-2">-</span>
                        {moment().format("MMM D, YYYY")}
                    </p>
                </div>
                <div className="border rounded-xl px-6 py-4">
                    <h5 className="text-black font-medium text-[16px]">Total Dislikes</h5>
                    <h2 className="text-[#0A2A8D] font-bold text-[28px]">
                        <NumberFormatter value={videoInfo.dislikes} />
                    </h2>
                    <p className="text-[#071148] text-[14px] font-[400]">
                        {moment(videoInfo.created_at).format("MMM D, YYYY")}
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
