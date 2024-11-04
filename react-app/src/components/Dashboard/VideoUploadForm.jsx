import { useState, useEffect, useCallback } from 'react';
import Select from "react-select";
import classNames from "classnames";
import ReactPlayer from "react-player";
import { FaInfoCircle, FaYoutube, FaUpload } from "react-icons/fa";
import { BsMegaphone } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";

const PRICE_OPTIONS = [1, 2, 3];
const ALLOWED_VIDEO_TYPE = "video/";
const UPLOAD_PRICE = 99;
const PROMOTION_PRICE = 99;

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

const VideoUploadForm = ({
    initialData = {},
    onSubmit,
    categories = [],
    locations = [],
    mode = 'create',
    isLoading = false
}) => {
    const [formState, setFormState] = useState({
        videoInfo: initialData,
        thumbnail: null,
        isPromoted: initialData.promoted || false,
        selectedFile: null,
        uploadType: initialData.iframe ? "youtube" : "file",
        selectedCountry: null,
        cityOptions: []
    });

    const {
        videoInfo,
        thumbnail,
        isPromoted,
        selectedFile,
        uploadType,
        selectedCountry,
        cityOptions
    } = formState;

    useEffect(() => {
        if (!initialData.location) return;

        const country = locations.find(loc =>
            Object.keys(loc).some(key => loc[key] === initialData.location)
        );

        if (country) {
            setFormState(prev => ({
                ...prev,
                videoInfo: initialData,
                selectedCountry: {
                    value: country.value,
                    label: country.label
                }
            }));
        }
    }, [initialData, locations]);

    const handleFileValidation = useCallback((file) => {
        if (!file.type.startsWith(ALLOWED_VIDEO_TYPE)) {
            alert("Please upload a video file");
            return false;
        }
        return true;
    }, []);

    const handleFileInputChange = useCallback((e) => {
        const file = e.target.files[0];
        if (handleFileValidation(file)) {
            setFormState(prev => ({ ...prev, selectedFile: file }));
        }
    }, [handleFileValidation]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            videoInfo: { ...prev.videoInfo, [name]: value }
        }));
    }, []);

    const handleCountryChange = useCallback((selectedOption) => {
        setFormState(prev => ({
            ...prev,
            selectedCountry: selectedOption,
            cityOptions: [],
            videoInfo: { ...prev.videoInfo, location: selectedOption.value }
        }));
    }, []);

    const handleCityChange = useCallback((selectedOption) => {
        setFormState(prev => ({
            ...prev,
            videoInfo: { ...prev.videoInfo, location: selectedOption.value }
        }));
    }, []);

    const handleCategoryChange = useCallback((selectedOption) => {
        setFormState(prev => ({
            ...prev,
            videoInfo: { ...prev.videoInfo, category: selectedOption.value }
        }));
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (handleFileValidation(file)) {
            setFormState(prev => ({ ...prev, selectedFile: file }));
        }
    }, [handleFileValidation]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const formData = {
            ...videoInfo,
            promoted: isPromoted,
            video: selectedFile,
            thumbnail: thumbnail?.target?.files[0],
            uploadType
        };
        onSubmit(formData);
    }, [videoInfo, isPromoted, selectedFile, thumbnail, uploadType, onSubmit]);

    const handleUploadTypeChange = useCallback((type) => {
        setFormState(prev => ({ ...prev, uploadType: type }));
    }, []);

    const handlePromotedChange = useCallback(() => {
        setFormState(prev => ({ ...prev, isPromoted: !prev.isPromoted }));
    }, []);

    const handleThumbnailChange = useCallback((e) => {
        setFormState(prev => ({ ...prev, thumbnail: e }));
    }, []);

    const isPayable = mode === 'create' && (isPromoted || uploadType === "file");
    const price = (isPromoted ? PROMOTION_PRICE : 0) + (uploadType === "file" ? UPLOAD_PRICE : 0);

    const renderVideoUpload = () => {
        if (uploadType !== "file") {
            return (
                <input
                    type="text"
                    className="w-full rounded-xl p-4 border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter YouTube video link or iframe..."
                    name="iframe"
                    value={videoInfo?.iframe || ""}
                    onChange={handleInputChange}
                />
            );
        }

        if (mode !== 'create') {
            return (
                <div className="p-4 bg-gray-100 rounded-xl h-96">
                    <ReactPlayer url={videoInfo.video} width="100%" height="100%" controls />
                </div>
            );
        }

        if (selectedFile) {
            return (
                <ReactPlayer
                    className="w-full h-full rounded-xl"
                    url={URL.createObjectURL(selectedFile)}
                    controls
                />
            );
        }

        return (
            <div className="flex flex-col items-center p-8 border-2 border-dashed rounded-3xl">
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
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="md:flex justify-between gap-8 mb-10 rounded-2xl">
                <div className="w-full">
                    {mode === 'create' && (
                        <div className="flex rounded-xl bg-gray-200 p-1 mb-4">
                            <button
                                type="button"
                                className={`flex-1 py-2 px-4 items-center flex justify-center gap-2 rounded-xl ${uploadType === "youtube" && "bg-white shadow"}`}
                                onClick={() => handleUploadTypeChange("youtube")}
                            >
                                <FaYoutube className="text-xl" />
                                YouTube Link (Free)
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2 px-4 items-center flex justify-center gap-2 rounded-xl ${uploadType === "file" && "bg-white shadow"}`}
                                onClick={() => handleUploadTypeChange("file")}
                            >
                                <FaUpload className="text-xl" />
                                File Upload (${UPLOAD_PRICE})
                            </button>
                        </div>
                    )}

                    <div
                        className="relative w-full group rounded-2xl cursor-pointer mb-4"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        {renderVideoUpload()}
                    </div>

                    {mode === 'create' && (
                        <div className="flex items-center mb-5">
                            <input
                                type="checkbox"
                                id="promote"
                                checked={isPromoted}
                                onChange={handlePromotedChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="promote"
                                className={classNames(
                                    "flex items-center px-4 py-2 rounded-full cursor-pointer transition-all",
                                    isPromoted ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
                                )}
                            >
                                <BsMegaphone className={classNames("mr-2", { "animate-pulse": isPromoted })} />
                                Promote for ${PROMOTION_PRICE}/month
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
                            styles={selectStyles}
                        />
                        <Select
                            options={cityOptions}
                            isDisabled={!selectedCountry}
                            onChange={handleCityChange}
                            placeholder="City"
                            styles={selectStyles}
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
                            onChange={handleInputChange}
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
                            styles={selectStyles}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500">Average Price</label>
                        <div className="flex items-center gap-4">
                            {PRICE_OPTIONS.map((priceOption) => (
                                <div key={priceOption}>
                                    <input
                                        type="radio"
                                        id={`price${priceOption}`}
                                        name="price"
                                        value={priceOption}
                                        className="hidden peer"
                                        onChange={handleInputChange}
                                        checked={Number(videoInfo?.price) === priceOption}
                                    />
                                    <label
                                        htmlFor={`price${priceOption}`}
                                        className={classNames(
                                            "flex items-center px-4 py-2 rounded-full cursor-pointer transition-all",
                                            Number(videoInfo?.price) === priceOption
                                                ? "bg-primary text-white"
                                                : "bg-gray-200 text-gray-700"
                                        )}
                                    >
                                        {'$'.repeat(priceOption)}
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
                            onChange={handleThumbnailChange}
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
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end mb-4">
                <div className={classNames("flex items-center gap-8", { "border-b pb-4": isPayable })}>
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