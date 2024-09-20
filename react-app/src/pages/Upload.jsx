import axios from "axios";
import Select from "react-select";
import classNames from "classnames";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { BsMegaphone } from "react-icons/bs";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaInfoCircle, FaYoutube, FaUpload } from "react-icons/fa";

const Upload = () => {
    const { setPageTitle } = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        setPageTitle("Upload New Video 🥳");
    }, []);

    const [videoInfo, setVideoInfo] = useState({});
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
        axios.get("Main/getLocations").then((res) => {
            setCountryCityData(
                Object.keys(res.data).map((key) => ({
                    value: key,
                    label: res.data[key],
                }))
            );
        });
    }, []);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("video/")) return toast.error("Please upload a video");
        setSelectedFile(file);
    };

    const changeInput = (e) => {
        setVideoInfo({
            ...videoInfo,
            [e.target.name]: e.target.value,
        });
    };

    const uploadVideo = async (e) => {
        e.preventDefault();

        if (isPayable) {
            try {
                const res = await axios.get("Dashboard/Checkout", {
                    params: {
                        promoted: isPromoted,
                    },
                });
                window.location.href = res.data.url;
            } catch (error) {
                toast.error(error);
            }
        }

        try {
            await axios.post(
                "Dashboard/Upload",
                { ...videoInfo, video: selectedFile?.target?.files[0], thumbnail: thumbnail.target?.files[0] },
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

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [cityOptions, setCityOptions] = useState([]);

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        axios.get(`Main/getLocations/${selectedOption.value}`).then((res) => {
            setCityOptions(
                Object.keys(res.data).map((key) => ({
                    value: key,
                    label: res.data[key],
                }))
            );
        });
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
    const price = (isPromoted ? 99 : 0) + (uploadType == "file" ? 99 : 0);
    3;
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
                    <div className="relative w-full group rounded-2xl cursor-pointer mb-4" onDragOver={handleDragOver} onDrop={handleDrop}>
                        {uploadType === "file" ? (
                            selectedFile ? (
                                <ReactPlayer className="w-full h-full rounded-xl" url={URL.createObjectURL(selectedFile)} />
                            ) : (
                                <>
                                    <span className="text-gray-400 text-xs flex gap-3">
                                        <FaInfoCircle className="mt-1 text-3xl" />
                                        <span className="line-clamp-2 hover:line-clamp-none">Upon receiving your video, Our Expert editors cut and arrange the content. Color correction, enhance the visual and audio quality. Finally, the video is uploaded to our web, readily accessible for viewing and sharing.</span>
                                    </span>
                                    <label htmlFor="file-input" className="cursor-pointer flex flex-col py-10 mt-3 items-center justify-center w-full bg-white border rounded-lg">
                                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="mb-4 text-lg font-semibold text-gray-700">Choose a video file to upload</p>
                                        <label htmlFor="file-input" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md cursor-pointer hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                            Select File
                                            <input type="file" className="hidden" accept="video/*" onChange={handleDrop} />
                                        </label>
                                    </label>
                                </>
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
                            Promote for $99/month
                        </label>
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                        <label className="text-sm font-medium text-gray-500 ml-1">Location</label>
                        <Select
                            options={countryCityData}
                            onChange={handleCountryChange}
                            placeholder="State"
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
                        <label className="text-sm font-medium text-gray-500 ml-1">Average Price</label>
                        <div className="flex items-center gap-4">
                            <input type="radio" id="priceOne" name="price" value="1" className="hidden peer" onChange={(e) => changeInput(e)} checked={videoInfo?.price == 1} />
                            <label htmlFor="priceOne" className={classNames("flex items-center px-4 py-2 rounded-full cursor-pointer transition-all", videoInfo?.price == 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-700")}>
                                $
                            </label>

                            <input type="radio" id="priceTwo" name="price" value="2" className="hidden peer" onChange={(e) => changeInput(e)} checked={videoInfo?.price == 2} />
                            <label htmlFor="priceTwo" className={classNames("flex items-center px-4 py-2 rounded-full cursor-pointer transition-all", videoInfo?.price == 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-700")}>
                                $$
                            </label>

                            <input type="radio" id="priceThree" name="price" value="3" className="hidden peer" onChange={(e) => changeInput(e)} checked={videoInfo?.price == 3} />
                            <label htmlFor="priceThree" className={classNames("flex items-center px-4 py-2 rounded-full cursor-pointer transition-all", videoInfo?.price == 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-700")}>
                                $$$
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 ml-1 flex gap-1 cursor-pointer" data-tooltip-id="thumbnail">
                            Thumbnail
                            <FaInfoCircle className="mt-1" />
                            <ReactTooltip id="thumbnail" content="thumbnail that will appear on that video" />
                        </label>
                        <label htmlFor="thumbnail" className="justify-between rounded-2xl border py-3 px-4 outline-none flex items-center text-gray-500">
                            {thumbnail ? (
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
                            <ReactTooltip id="Description" content="Description about your video" />
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

export default Upload;
