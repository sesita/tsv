import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LiaTimesSolid } from "react-icons/lia";
import { MdOutlineFileUpload } from "react-icons/md";
import CreatableSelect from "react-select/creatable";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { usePageTitle } from "../components/Layouts/UserLayout";

const UploadPage = () => {
    const setPageTitle = usePageTitle();

    useEffect(() => {
        setPageTitle("Upload New Video 🥳");
    }, [setPageTitle]);

    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [videoPackage, setVideoPackage] = useState(null);
    const [videoInfo, setVideoInfo] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState({});
    const [thumbnail, setThumbnail] = useState({});
    const [hover, setHover] = useState(false);

    useEffect(() => {
        axios.get("Main/getCategories").then((cat) => {
            setCategories(cat.data);
        });
        axios.get("Main/getTags").then((res) => {
            const fetchedTags = res.data.map((tag) => ({ label: tag.title, value: tag.title }));
            setTagOptions(fetchedTags);
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
            await axios.post(
                "Dashboard/Upload",
                { ...videoInfo, tags: tags, video: selectedFile, thumbnail: thumbnail.target?.files[0] },
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

    const uploadIframeVideo = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "Dashboard/Upload",
                { ...videoInfo, tags: tags, thumbnail: thumbnail.target?.files[0] },
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

    const countryCityData = {
        USA: ["New York", "Los Angeles", "Chicago"],
        Canada: ["Toronto", "Vancouver", "Montreal"],
        Australia: ["Sydney", "Melbourne", "Brisbane"],
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
    };

    return (
        <>
            {selectedFile.name ? (
                <div className="animate__animated animate__fadeIn">
                    <form onSubmit={uploadVideo}>
                        <div className="md:flex justify-between gap-8 mb-10 rounded-2xl">
                            <div className="w-full">
                                <video className="w-full rounded-xl shadow h-fit md:h-[355px] mb-4" controls>
                                    <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                                </video>
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
                                <Select
                                    options={cityOptions}
                                    isDisabled={!selectedCountry}
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
                            <div className="w-full flex flex-col gap-4 mt-5 md:mt-0">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-500 ml-1">Title</label>
                                    <input type="text" name="title" className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none" placeholder="Title..." value={videoInfo?.title} onChange={(e) => changeInput(e)} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-500 ml-1">Categories</label>
                                    <select name="category" defaultValue={"DEFAULT"} className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none" onChange={(e) => changeInput(e)}>
                                        <option value="DEFAULT" disabled>
                                            Please Select Category
                                        </option>
                                        {categories?.map((category) => (
                                            <option value={category?.id}>{category?.title}</option>
                                        ))}
                                    </select>
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
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-500 ml-1 flex gap-1 cursor-pointer" data-tooltip-id="thumbnail">
                                        Thumbnail
                                        <FaInfoCircle className="mt-1" />
                                        <ReactTooltip id="thumbnail" content="thumbnail that will appear on that video" />
                                    </label>
                                    <label htmlFor="thumbnail" className="justify-between rounded-2xl border py-3 px-4 outline-none flex items-center text-gray-500">
                                        {thumbnail?.target?.files[0] ? (
                                            <>
                                                <img src={URL.createObjectURL(thumbnail?.target?.files[0])} alt="Thumbnail" className="w-full h-full object-cover rounded-xl hover:opacity-50 cursor-pointer transition-all max-h-80" />
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
                                        <ReactTooltip id="Description" content="This Description Field Is For Better Seo" />
                                    </label>
                                    <textarea name="description" rows="4" className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none" placeholder="Description..." value={videoInfo?.description} onChange={(e) => changeInput(e)}></textarea>
                                </div>
                            </div>
                        </div>
                        <button className="bg-red-500 py-4 px-12 text-white font-medium text-lg rounded-2xl block mx-auto gap-3 mt-4">Publish Video</button>
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
                    <div className="md:flex justify-between gap-8 mb-10 rounded-2xl">
                        <div className="w-full h-auto">
                            <div className="relative w-full group flex items-center justify-center border rounded-2xl cursor-pointer md:h-[355px] mb-4" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                {thumbnail?.target?.files[0] ? (
                                    <>
                                        <img src={URL.createObjectURL(thumbnail?.target?.files[0])} alt="Thumbnail" className="w-full h-full object-cover rounded-xl" />
                                        {hover && (
                                            <>
                                                <label htmlFor="thumbnail" className="cursor-pointer absolute inset-0 rounded-2xl flex items-center justify-center bg-black bg-opacity-50 text-white shadow-xl font-medium text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Change
                                                </label>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <label htmlFor="thumbnail" className="cursor-pointer bg-red-500 rounded-full w-fit md:py-20 py-12 md:px-5 px-2 md:text-2xl text-white font-bold flex gap-3 items-center">
                                            Thumbnail
                                            <MdOutlineFileUpload className="text-3xl" />
                                        </label>
                                    </>
                                )}
                                <input type="file" id="thumbnail" name="thumbnail" className="hidden" accept="image/*" onChange={(e) => setThumbnail(e)} />
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
                            <Select
                                options={cityOptions}
                                isDisabled={!selectedCountry}
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
                        <div className="w-full flex flex-col gap-4 mt-5 md:mt-0">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-500 ml-1">Title</label>
                                <input type="text" name="title" className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none" placeholder="Title..." value={videoInfo?.title} onChange={(e) => changeInput(e)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-500 ml-1">Categories</label>
                                <select name="category" defaultValue={"DEFAULT"} className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none" onChange={(e) => changeInput(e)}>
                                    <option value="DEFAULT" disabled>
                                        Please Select Category
                                    </option>
                                    {categories?.map((category) => (
                                        <option value={category?.id}>{category?.title}</option>
                                    ))}
                                </select>
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
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-500 ml-1 flex gap-1 cursor-pointer" data-tooltip-id="link">
                                    Video Link
                                    <FaInfoCircle className="mt-1" />
                                    <ReactTooltip id="link" content="Youtube Video Link or Iframe" />
                                </label>
                                <input type="text" className="rounded-2xl border py-3 px-4 outline-none font-medium" placeholder="Video Link..." name="iframe" value={videoInfo?.iframe} onChange={(e) => changeInput(e)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-500 ml-1 flex gap-1 cursor-pointer" data-tooltip-id="Description">
                                    Description
                                    <FaInfoCircle className="mt-1" />
                                    <ReactTooltip id="Description" content="This Description Field Is For Better Seo" />
                                </label>
                                <textarea name="description" rows="4" className="text-lg font-medium rounded-2xl border py-2 px-4 outline-none" placeholder="Description..." value={videoInfo?.description} onChange={(e) => changeInput(e)}></textarea>
                            </div>
                            <button className="bg-red-500 py-3 text-white font-medium text-lg rounded-2xl flex items-center gap-3 justify-center mt-4">Create</button>
                        </div>
                    </div>
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

export default UploadPage;
