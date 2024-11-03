import { useState, useEffect } from 'react';
import Select from "react-select";
import classNames from "classnames";
import ReactPlayer from "react-player";
import { FaInfoCircle, FaYoutube, FaUpload } from "react-icons/fa";
import { BsMegaphone } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const VideoUploadForm = ({
    initialData = {},
    onSubmit,
    categories = [],
    locations = [],
    mode = 'create', // 'create', 'edit', 'admin'
    isLoading = false
}) => {
    const [videoInfo, setVideoInfo] = useState(initialData);
    const [thumbnail, setThumbnail] = useState(null);
    const [isPromoted, setIsPromoted] = useState(initialData.promoted || false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadType, setUploadType] = useState(initialData.iframe ? "youtube" : "file");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [cityOptions, setCityOptions] = useState([]);

    useEffect(() => {
        if (initialData.location) {
            const country = locations.find(loc =>
                Object.keys(loc).some(key => loc[key] === initialData.location)
            );
            if (country) {
                setSelectedCountry({
                    value: country.value,
                    label: country.label
                });
            }
        }
    }, [initialData, locations]);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("video/")) {
            alert("Please upload a video file");
            return;
        }
        setSelectedFile(file);
    };

    const changeInput = (e) => {
        setVideoInfo({
            ...videoInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setCityOptions([]);
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
        if (!file.type.startsWith("video/")) {
            alert("Please upload a video file");
            return;
        }
        setSelectedFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            ...videoInfo,
            promoted: isPromoted,
            video: selectedFile,
            thumbnail: thumbnail?.target?.files[0],
            uploadType
        };
        onSubmit(formData);
    };

    const isPayable = mode === 'create' && (isPromoted || uploadType === "file");
    const price = (isPromoted ? 99 : 0) + (uploadType === "file" ? 99 : 0);

    return (
        <form onSubmit={handleSubmit}>
            <div className="md:flex justify-between gap-8 mb-10 rounded-2xl">
                <div className="w-full">
                    {mode === 'create' && (
                        <div className="flex rounded-lg bg-gray-200 p-1 mb-4">
                            <button
                                type="button"
                                className={`flex-1 py-2 px-4 items-center flex justify-center gap-2 rounded-md ${uploadType === "youtube" && "bg-white shadow"
                                    }`}
                                onClick={() => setUploadType("youtube")}
                            >
                                <FaYoutube className="text-xl" />
                                YouTube Link (Free)
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2 px-4 items-center flex justify-center gap-2 rounded-md ${uploadType === "file" && "bg-white shadow"
                                    }`}
                                onClick={() => setUploadType("file")}
                            >
                                <FaUpload className="text-xl" />
                                File Upload ($99)
                            </button>
                        </div>
                    )}

                    <div
                        className="relative w-full group rounded-2xl cursor-pointer mb-4"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        {uploadType === "file" ? (
                            mode === 'create' ? (
                                selectedFile ? (
                                    <ReactPlayer
                                        className="w-full h-full rounded-xl"
                                        url={URL.createObjectURL(selectedFile)}
                                        controls
                                    />
                                ) : (
                                    <div className="flex flex-col items-center p-8 border-2 border-dashed rounded-xl">
                                        <FaUpload className="text-4xl mb-4 text-gray-400" />
                                        <p className="text-lg font-medium mb-2">Drag and drop your video here</p>
                                        <p className="text-sm text-gray-500 mb-4">or</p>
                                        <label className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="video/*"
                                                onChange={handleFileInputChange}
                                            />
                                        </label>
                                    </div>
                                )
                            ) : (
                                <div className="p-4 bg-gray-100 rounded-xl h-96">
                                    <ReactPlayer url={videoInfo.video} width="100%" height="100%" controls />
                                </div>
                            )
                        ) : (
                            <input
                                type="text"
                                className="w-full rounded-xl p-4 border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                                placeholder="Enter YouTube video link or iframe..."
                                name="iframe"
                                value={videoInfo?.iframe || ""}
                                onChange={changeInput}
                            />
                        )}
                    </div>

                    {mode === 'create' && (
                        <div className="flex items-center mb-5">
                            <input
                                type="checkbox"
                                id="promote"
                                checked={isPromoted}
                                onChange={() => setIsPromoted(!isPromoted)}
                                className="hidden"
                            />
                            <label
                                htmlFor="promote"
                                className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-all ${isPromoted ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                <BsMegaphone className={`mr-2 ${isPromoted ? "animate-pulse" : ""}`} />
                                Promote for $99/month
                            </label>
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        <Select
                            options={locations}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            placeholder="State"
                            className="mb-2"
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
                        <Select
                            options={cityOptions}
                            isDisabled={!selectedCountry}
                            onChange={handleCityChange}
                            placeholder="City"
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
                </div>

                <div className="w-full flex flex-col gap-4 mt-5 md:mt-0">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none"
                            placeholder="Title..."
                            value={videoInfo?.title || ""}
                            onChange={changeInput}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500">Category</label>
                        <Select
                            options={categories}
                            value={categories.find(cat => cat.value === videoInfo?.category)}
                            onChange={handleCategoryChange}
                            placeholder="Category"
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
                        <label className="text-sm font-medium text-gray-500">Average Price</label>
                        <div className="flex items-center gap-4">
                            {[1, 2, 3].map((price) => (
                                <div key={price}>
                                    <input
                                        type="radio"
                                        id={`price${price}`}
                                        name="price"
                                        value={price}
                                        className="hidden peer"
                                        onChange={changeInput}
                                        checked={Number(videoInfo?.price) === price}
                                    />
                                    <label
                                        htmlFor={`price${price}`}
                                        className={classNames(
                                            "flex items-center px-4 py-2 rounded-full cursor-pointer transition-all",
                                            Number(videoInfo?.price) === price
                                                ? "bg-primary text-white"
                                                : "bg-gray-200 text-gray-700"
                                        )}
                                    >
                                        {'$'.repeat(price)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 flex gap-1">
                            Thumbnail
                            <ReactTooltip id="thumbnail" content="Thumbnail that will appear on the video" />
                            <FaInfoCircle data-tooltip-id="thumbnail" />
                        </label>
                        <label
                            htmlFor="thumbnail"
                            className="justify-between rounded-2xl border py-3 px-4 outline-none flex items-center text-gray-500"
                        >
                            {thumbnail || initialData.thumbnail ? (
                                <img
                                    src={thumbnail?.target?.files[0]
                                        ? URL.createObjectURL(thumbnail.target.files[0])
                                        : initialData.thumbnail}
                                    alt="Thumbnail"
                                    className="w-full h-full object-cover rounded-xl hover:opacity-50 cursor-pointer transition-all max-h-80"
                                />
                            ) : (
                                <div className="flex justify-between w-full items-center">
                                    <span className="font-medium flex gap-2">
                                        Upload An Image
                                        <MdOutlineFileUpload className="text-2xl" />
                                    </span>
                                    <span className="text-xs">Allowed: JPG, PNG, WEBP</span>
                                </div>
                            )}
                        </label>
                        <input
                            id="thumbnail"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => setThumbnail(e)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500 flex gap-1">
                            Description
                            <ReactTooltip id="description" content="Description about your video" />
                            <FaInfoCircle data-tooltip-id="description" />
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none"
                            placeholder="Description..."
                            value={videoInfo?.description || ""}
                            onChange={changeInput}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end mb-4">
                <div className={`flex items-center gap-8 ${isPayable && "border-b pb-4"}`}>
                    {isPayable && (
                        <span className="text-gray-700 font-bold text-3xl">${price}</span>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary py-4 px-12 text-white font-medium text-lg rounded-2xl disabled:opacity-50"
                    >
                        {isLoading
                            ? "Processing..."
                            : mode === 'create'
                                ? (price > 0 ? "Pay Now" : "Publish Video")
                                : "Update Video"
                        }
                    </button>
                </div>
            </div>

            {isPayable && (
                <div className="flex items-center justify-end gap-4 text-gray-600">
                    <FaInfoCircle />
                    <span className="text-sm">
                        After payment you will be returned here immediately.
                    </span>
                </div>
            )}
        </form>
    );
};

export default VideoUploadForm;