import { useState } from "react";
import TagsInput from "react-tagsinput";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";

const Upload = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState({});
    const [tags, setTags] = useState([]);

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
        console.log("est");
        const file = Array.from(e.target.files);
        if (!file[0]?.type.startsWith("video/")) return toast.error("Please Upload a video");

        setSelectedFile(file[0]);
    };

    const tagsInputChange = (value) => {
        setTags(value);
    };

    return (
        <>
            {selectedFile.name ? (
                <div className="animate__animated animate__fadeIn">
                    <div className="flex gap-10 mb-10">
                        <video className="w-1/2 rounded-xl shadow" controls>
                            <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                        </video>
                        <div className="flex flex-col gap-4 w-full mt-2">
                            <input type="text" name="name" className="rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Title..." />
                            <TagsInput
                                value={tags}
                                onChange={tagsInputChange}
                                onlyUnique={true}
                                inputProps={{
                                    placeholder: "Tags",
                                }}
                                className="rounded-lg pt-2 pb-1 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                            />
                            <textarea name="bio" rows="4" className="w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Description..."></textarea>
                            <div className="flex flex-col gap-2 mt-auto mb-2">
                                <label htmlFor="thumbnail" className="font-medium">
                                    Video Thumbnail*
                                </label>
                                <input type="file" id="thumbnail" name="name" className="rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Video Thumbnail..." />
                            </div>
                        </div>
                    </div>
                    <button className="cursor-pointer py-4 px-12 rounded-full bg-blue-800 text-white mt-5 mx-auto block font-medium">Publish Video</button>
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
