import React from "react";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
    const { currentUser } = useAuth();

    return (
        <>
            <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-8">
                    <img
                        className="w-40 h-40 rounded-full border-4 border-red-500 object-cover"
                        src={currentUser.avatar}
                        alt=""
                    />
                    <div>
                        <h2 className="text-4xl font-semibold text-[#232323] mb-2">
                            {currentUser.name}
                        </h2>
                        <p className="text-sm font-medium">
                            Update your photo and personal details{" "}
                        </p>
                    </div>
                </div>{" "}
                <div className="flex gap-6">
                    <button className="py-4 px-12 rounded-full bg-blue-800 text-white mt-5 mx-auto block text-lg">
                        Upload New Picture
                    </button>
                    <button className="py-4 px-14 rounded-full bg-[#C60C0D] text-white mt-5 mx-auto block text-lg">
                        Delete
                    </button>
                </div>
            </div>
            <div>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                        placeholder="James JFX"
                    />
                    <input
                        type="text"
                        className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                        placeholder="James John"
                    />
                </div>
                <div className="flex items-center gap-3 mt-5">
                    <input
                        type="email"
                        className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                        placeholder="Phone Number"
                    />
                </div>
                <div className="flex items-center gap-3 mt-5 mb-5">
                    <input
                        type="text"
                        className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                        placeholder="Education"
                    />
                    <input
                        type="text"
                        className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                        placeholder="Languages"
                    />
                </div>
                <input
                    type="text"
                    className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                    placeholder="Skills"
                />
                <textarea
                    name=""
                    id=""
                    rows="4"
                    className="w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none mt-5"
                    placeholder="Bio"
                ></textarea>
                <button className="py-4 px-12 rounded-full bg-[#C60C0D] text-white mt-5 mx-auto block text-lg">
                    Save Profile
                </button>
            </div>
        </>
    );
};

export default Settings;
