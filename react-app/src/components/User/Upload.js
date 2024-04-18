import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";

const Upload = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [videoPackage, setVideoPackage] = useState(null);
    const [videoInfo, setVideoInfo] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState({});
    const [thumbnail, setThumbnail] = useState({});

    useEffect(() => {
        axios.get("Main/getCategories").then((cat) => {
            setCategories(cat.data);
        });
    }, []);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = Array.from(e.dataTransfer.files);
        if (!file[0]?.type.startsWith("video/")) return toast.error("Please Upload a video");
        setSelectedFile(file[0]);
    };

    const handleFileInputChange = (e) => {
        const file = Array.from(e.target.files);
        if (!file[0]?.type.startsWith("video/")) return toast.error("Please Upload a video");

        setSelectedFile(file[0]);
    };

    const tagsInputChange = (value) => {
        setTags(value);
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
            await axios.post(
                "Dashboard/Upload",
                { ...videoInfo, video: selectedFile, thumbnail: thumbnail.target?.files[0] },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("Video Uploaded");
            navigate("/User/Profile");
        } catch (e) {
            toast.error(e.response?.data?.message);
        }
    };

    const uploadIframeVideo = async (e) => {
        e.preventDefault();

        try {
            await axios.post("Dashboard/Upload", { ...videoInfo, thumbnail: thumbnail.target?.files[0] },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            toast.success("Video Uploaded");
            navigate("/User/Profile");
        } catch (e) {
            toast.error(e.response?.data?.message);
        }
    };

    return (
        <>
            {selectedFile.name ? (
                <div className="animate__animated animate__fadeIn">
                    <form onSubmit={uploadVideo}>
                        <div className="flex gap-10 mb-10">
                            <video className="w-1/2 rounded-xl shadow h-fit" controls>
                                <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                            </video>
                            <div className="flex flex-col gap-4 w-full mt-2">
                                <input type="text" name="title" className="rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Title..." value={videoInfo?.title} onChange={(e) => changeInput(e)} />
                                <TagsInput
                                    value={tags}
                                    onChange={tagsInputChange}
                                    onlyUnique={true}
                                    inputProps={{
                                        placeholder: "Tags",
                                    }}
                                    className="rounded-lg pt-2 pb-1 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                                />
                                <select name="category" className="rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" onChange={(e) => changeInput(e)}>
                                    <option selected disabled>
                                        Please Select Category
                                    </option>
                                    {categories?.map((category) => (
                                        <option value={category?.id}>{category?.title}</option>
                                    ))}
                                </select>
                                <textarea name="description" rows="4" className="w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Description..." value={videoInfo?.description} onChange={(e) => changeInput(e)}></textarea>
                                <div className="flex flex-col gap-2 mt-auto mb-2">
                                    <label htmlFor="thumbnail" className="font-medium">
                                        Video Thumbnail*
                                    </label>
                                    <input type="file" id="thumbnail" name="thumbnail" className="rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Video Thumbnail..." onChange={(e) => setThumbnail(e)} />
                                </div>
                                {thumbnail?.target?.files[0] && <img src={URL.createObjectURL(thumbnail?.target?.files[0])} className="w-1/2 rounded-xl shadow" alt="thumbnail" />}
                            </div>
                        </div>
                        <button className="cursor-pointer py-4 px-12 rounded-full bg-blue-800 text-white mt-5 mx-auto block font-medium">Publish Video</button>
                    </form>
                </div>
            ) : !videoPackage ? (
                <div className="flex flex-col items-center gap-4 mb-6 mt-2">
                    <h1 className="text-4xl text-black font-medium">Video Package</h1>
                    <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400 mb-6">Choose a video package based on your requirements</p>
                    <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 items-center">
                        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow h-fit">
                            <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for small videos that uploaded on youtube.</p>
                            <div className="flex justify-center items-baseline mt-5 mb-12">
                                <span className="mr-2 text-5xl font-extrabold italic">free</span>
                            </div>
                            <ul className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <FaCheck className="text-green-500" />
                                    <span>Youtube Iframe</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <LiaTimesSolid className="text-red-600" />
                                    <span>Custom Editing</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <FaCheck className="text-green-500" />
                                    <span>
                                        Video Size: <span className="font-semibold">100/MB</span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <LiaTimesSolid className="text-red-600" />
                                    <span>Include Promoting</span>
                                </li>
                            </ul>
                            <button onClick={() => setVideoPackage("free")} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Continue
                            </button>
                        </div>
                        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border-2 border-blue-400 shadow">
                            <span className="bg-blue-200 text-blue-600 font-medium px-4 py-1 w-fit mx-auto rounded mb-4">Most Popular</span>
                            <h3 className="mb-4 text-2xl font-semibold">Standard</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for videos that need editing and custom support.</p>
                            <div className="flex justify-center items-baseline mt-5 mb-12">
                                <span className="mr-2 text-5xl font-extrabold">$99</span>
                                <span className="text-gray-500 dark:text-gray-400">/single</span>
                            </div>
                            <ul className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <FaCheck className="text-green-500" />
                                    <span>Youtube Iframe</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <FaCheck className="text-green-500" />
                                    <span>Custom Editing</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <FaCheck className="text-green-500" />
                                    <span>
                                        Video Size: <span className="font-semibold">500/MB</span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <FaCheck className="text-green-500" />
                                    <span>Upload on our server</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <LiaTimesSolid className="text-red-600" />
                                    <span>Include Promoting</span>
                                </li>
                            </ul>
                            <button onClick={() => setVideoPackage("standard")} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Continue
                            </button>
                        </div>
                        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border h-fit">
                            <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for promoting and custom editing your videos.</p>
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">$199</span>
                                <span className="text-gray-500 dark:text-gray-400">/single</span>
                            </div>
                            <ul className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">
                                    <FaCheck className="text-green-500" />
                                    <span>Youtube Iframe</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <FaCheck className="text-green-500" />
                                    <span>Custom Editing</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <FaCheck className="text-green-500" />
                                    <span>
                                        Video Size: <span className="font-semibold">500/MB</span>
                                    </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <FaCheck className="text-green-500" />
                                    <span>Upload on our server</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <FaCheck className="text-green-500" />
                                    <span>Include Promoting</span>
                                </li>
                            </ul>
                            <button onClick={() => setVideoPackage("premium")} className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            ) : videoPackage === "free" ? (
                <form onSubmit={uploadIframeVideo}>
                    <div className="flex justify-between gap-10 mb-10">
                        <div className="w-1/2">
                            <h1 className="text-xl font-medium mb-4">Video Iframe</h1>
                            <textarea className="w-full h-32 rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Iframe link..." name="iframe"  value={videoInfo?.iframe} onChange={(e) => changeInput(e)}></textarea>
                        </div>
                        <div className="flex flex-col gap-4 w-full mt-2">
                            <input type="text" name="title" className="rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Title..." value={videoInfo?.title} onChange={(e) => changeInput(e)} />
                            <TagsInput
                                value={tags}
                                onChange={tagsInputChange}
                                onlyUnique={true}
                                inputProps={{
                                    placeholder: "Tags",
                                }}
                                className="rounded-lg pt-2 pb-1 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                            />
                            <select name="category" className="rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" onChange={(e) => changeInput(e)}>
                                <option selected disabled>
                                    Please Select Category
                                </option>
                                {categories?.map((category) => (
                                    <option value={category?.id}>{category?.title}</option>
                                ))}
                            </select>
                            <textarea name="description" rows="4" className="w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Description..." value={videoInfo?.description} onChange={(e) => changeInput(e)}></textarea>
                            <div className="flex flex-col gap-2 mt-auto mb-2">
                                <label htmlFor="thumbnail" className="font-medium">
                                    Video Thumbnail*
                                </label>
                                <input type="file" id="thumbnail" name="thumbnail" className="rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Video Thumbnail..." onChange={(e) => setThumbnail(e)} />
                            </div>
                        </div>
                    </div>
                    <button className="cursor-pointer py-4 px-12 rounded-full bg-blue-800 text-white mt-5 mx-auto block font-medium">Publish Video</button>
                </form>
            ) : (
                <div className={`flex flex-col items-center gap-4 mb-6 animate__animated animate__pulse ${isDragging ? "border-2 border-blue-800" : ""}`} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <MdOutlineFileUpload className="text-[200px] text-gray-600" />
                    <p className="flex flex-col items-center gap-3">
                        <span className="text-3xl text-black font-medium">Drag and drop video files to upload</span>
                        <span className="text-lg">Your videos will be private until you publish them.</span>
                    </p>
                    <label htmlFor="file-input" className="cursor-pointer py-4 px-12 rounded-full bg-blue-800 text-white mt-5 mx-auto block font-medium">
                        Select Video
                        <input id="file-input" type="file" className="hidden" accept="video/*" onChange={handleFileInputChange} />
                    </label>
                </div>
            )}
        </>
    );
};

export default Upload;
