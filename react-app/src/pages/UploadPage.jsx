import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { BsMegaphone } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import CreatableSelect from "react-select/creatable";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { usePageTitle } from "../components/Layouts/UserLayout";
import { FaInfoCircle, FaYoutube, FaUpload } from "react-icons/fa";

const UploadPage = () => {
    const setPageTitle = usePageTitle();
    const navigate = useNavigate();

    useEffect(() => {
        setPageTitle("Upload New Video 🥳");
    }, [setPageTitle]);

    const [tags, setTags] = useState([]);
    const [videoInfo, setVideoInfo] = useState({});
    const [tagOptions, setTagOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [isPromoted, setIsPromoted] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadType, setUploadType] = useState("youtube");
    const [countryCityData, setCountryCityData] = useState([]);

    useEffect(() => {
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

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("video/")) return toast.error("Please upload a video");
        setSelectedFile(file);
    };

    const tagsInputChange = (selectedOptions) => {
        const selectedTags = selectedOptions.map((option) => option.value);
        setTags(selectedTags);
    };

    const changeInput = (e) => {
        setVideoInfo({
            ...videoInfo,
            [e.target.name]: e.target.value,
        });
    };

    const uploadVideo = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            Object.keys(videoInfo).forEach((key) => formData.append(key, videoInfo[key]));
            tags.forEach((tag) => formData.append("tags[]", tag));
            if (uploadType === "file") {
                formData.append("video", selectedFile);
            } else {
                formData.append("iframe", videoInfo.iframe);
            }
            if (thumbnail) {
                formData.append("thumbnail", thumbnail);
            }
            formData.append("isPromoted", isPromoted);

            await axios.post("Dashboard/Upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Video Uploaded");
            navigate("/User/Videos");
        } catch (e) {
            toast.error(e.response?.data?.message);
        }
    };
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

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (!file.type.startsWith("video/")) return toast.error("Please upload a video");
        setSelectedFile(file);
    };

    const isPayable = isPromoted || uploadType == "file";
    const price = (isPromoted ? 50 : 0) + (uploadType == "file" ? 99 : 0);

    return (
        <form onSubmit={uploadVideo}>
            <div className="md:flex justify-between gap-8 mb-10 rounded-2xl">
                <div className="w-full">
                    <div className="flex rounded-lg bg-gray-200 p-1 mb-4">
                        <button type="button" className={`flex-1 py-2 px-4 items-center flex justify-center gap-2 rounded-md ${uploadType === "youtube" && "bg-white shadow"}`} onClick={() => setUploadType("youtube")}>
                            <FaYoutube className="text-xl" />
                            YouTube Link (Free)
                        </button>
                        <button type="button" className={`flex-1 py-2 px-4 items-center flex justify-center gap-2 rounded-md ${uploadType === "file" && "bg-white shadow"}`} onClick={() => setUploadType("file")}>
                            <FaUpload className="text-xl" />
                            File Upload ($99)
                        </button>
                    </div>
                    <div className="relative w-full group flex items-center justify-center bg-red-950 pattern rounded-2xl cursor-pointer mb-4" onDragOver={handleDragOver} onDrop={handleDrop}>
                        {uploadType === "file" ? (
                            selectedFile ? (
                                <video className="w-full h-full rounded-xl" controls>
                                    <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                                </video>
                            ) : (
                                <label htmlFor="file-input" className="cursor-pointer rounded-full w-fit py-12 my-10 px-12 md:text-2xl bg-red-950 border-2 shadow border-red-950 pattern text-white font-bold flex gap-3 items-center">
                                    <MdOutlineFileUpload className="text-[70px]" />
                                </label>
                            )
                        ) : (
                            <input type="text" className="w-full rounded-xl p-4 border-2 border-gray-300 focus:border-blue-500 focus:outline-none" placeholder="Enter YouTube video link or iframe..." name="iframe" value={videoInfo?.iframe || ""} onChange={changeInput} />
                        )}
                        <input type="file" id="file-input" className="hidden" accept="video/*" onChange={handleFileInputChange} />
                    </div>

                    <div className="flex items-center mb-5">
                        <input type="checkbox" id="promote" checked={isPromoted} onChange={() => setIsPromoted(!isPromoted)} className="hidden" />
                        <label htmlFor="promote" className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-all ${isPromoted ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}>
                            <BsMegaphone className={`mr-2 ${isPromoted ? "animate-pulse" : ""}`} />
                            Promote for 1 Month
                        </label>
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                        <label className="text-sm font-medium text-gray-500 ml-1">Location</label>
                        <Select
                            options={countryOptions}
                            onChange={handleCountryChange}
                            placeholder="Country"
                            classNamePrefix="react-select"
                            styles={{
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
                                borderRadius: "1rem",
                                padding: "0.3rem 0.5rem",
                                outline: "none",
                                fontWeight: "500",
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: "#6b7280",
                            }),
                        }}
                    />
                </div>
                <div className="w-full flex flex-col gap-4 mt-5 md:mt-0">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 ml-1">Title</label>
                        <input type="text" name="title" className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none" placeholder="Title..." value={videoInfo?.title || ""} onChange={changeInput} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 ml-1">Category</label>
                        <Select
                            options={categories}
                            onChange={handleCategoryChange}
                            placeholder="Category"
                            classNamePrefix="react-select"
                            styles={{
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
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 ml-1">Tags</label>
                        <CreatableSelect
                            isMulti
                            value={tags.map((tag) => ({ label: tag, value: tag }))}
                            onChange={tagsInputChange}
                            options={tagOptions}
                            placeholder="Tags"
                            classNamePrefix="react-select"
                            styles={{
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
                                    padding: "0.4rem 0rem",
                                }),
                                multiValue: (provided) => ({
                                    ...provided,
                                    backgroundColor: "#e5e7eb",
                                    borderRadius: "0.375rem",
                                    padding: "0.2rem",
                                }),
                                multiValueLabel: (provided) => ({
                                    ...provided,
                                    fontWeight: "500",
                                }),
                                multiValueRemove: (provided) => ({
                                    ...provided,
                                    color: "#9ca3af",
                                    ":hover": {
                                        backgroundColor: "#d1d5db",
                                        color: "#374151",
                                    },
                                }),
                            }}
                        />
                    </div>
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
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 ml-1 flex gap-1 cursor-pointer" data-tooltip-id="Description">
                            Description
                            <FaInfoCircle className="mt-1" />
                            <ReactTooltip id="Description" content="This Description Field Is For Better SEO" />
                        </label>
                        <textarea name="description" rows="4" className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none" placeholder="Description..." value={videoInfo?.description || ""} onChange={changeInput}></textarea>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mb-4">
                <div className={`flex items-center gap-8 ${isPayable && "border-b pb-4"}`}>
                    <span className="text-gray-700 font-bold text-3xl">${price}</span>
                    <button type="submit" className="bg-red-500 py-4 px-12 text-white font-medium text-lg rounded-2xl">
                        {price > 0 ? "Pay Now" : "Publish Video"}
                    </button>
                </div>
            </div>
            {isPayable && (
                <div className="flex items-center justify-end gap-4 text-gray-600">
                    <FaInfoCircle />
                    <span className="text-sm">
                        After payment you will be return here <br /> immediately.
                    </span>
                </div>
            )}
        </form>
    );
};

export default UploadPage;
