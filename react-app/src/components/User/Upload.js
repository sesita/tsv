import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Upload = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
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
                                    <option selected disabled>Please Select Category</option>
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
            ) : (
                <div className={`flex flex-col items-center gap-4 mb-6 animate__animated animate__pulse ${isDragging ? "border-2 border-blue-800" : ""}`} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <MdOutlineFileUpload className="text-[200px] text-gray-600 animate__animated animate__shakeY" />
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
