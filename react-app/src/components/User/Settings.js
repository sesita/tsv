import { React, useState } from "react";
import TagsInput from "react-tagsinput";
import { useAuth } from "../../context/AuthContext";

export const Settings = () => {
    const { currentUser } = useAuth();
    const [skills, setSkills] = useState([]);

    const skillInput = (skill) => {
        setSkills(skill);
    };

    const submit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-8">
                    <img className="w-40 h-40 rounded-full border-4 border-red-500 object-cover" src={currentUser.avatar} alt="" />
                    <div>
                        <h2 className="text-4xl font-semibold text-[#232323] mb-2">{currentUser.name}</h2>
                        <p className="text-sm font-medium">Update your photo and personal details </p>
                    </div>
                </div>{" "}
                <div className="flex gap-6">
                    <button className="py-4 px-12 rounded-full bg-blue-800 text-white mt-5 mx-auto block text-lg">Upload New Picture</button>
                    <button className="py-4 px-14 rounded-full bg-[#C60C0D] text-white mt-5 mx-auto block text-lg">Delete</button>
                </div>
            </div>
            <form onSubmit={submit}>
                <div className="flex items-center gap-3">
                    <input type="text" name="name" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Channel Name" />
                    <input type="text" name="full_name" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Full Name" />
                </div>
                <div className="flex items-center gap-3 mt-5">
                    <input type="email" name="email" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Email" />
                    <input type="text" name="phone_number" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Phone Number" />
                </div>
                <div className="flex items-center gap-3 mt-5 mb-5">
                    <TagsInput
                        value={skills}
                        onChange={skillInput}
                        onlyUnique={true}
                        inputProps={{
                            placeholder: "Education",
                        }}
                        className="flex-1 w-full rounded-lg pt-2 pb-1 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                    />
                    <TagsInput
                        value={skills}
                        onChange={skillInput}
                        onlyUnique={true}
                        inputProps={{
                            placeholder: "Language",
                        }}
                        className="flex-1 w-full rounded-lg pt-2 pb-1 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                    />
                </div>
                <TagsInput
                    value={skills}
                    onChange={skillInput}
                    onlyUnique={true}
                    inputProps={{
                        placeholder: "Add a skill",
                    }}
                    className="flex-1 w-full rounded-lg pt-2 pb-1 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                />
                <textarea name="" id="" rows="4" className="w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none mt-5" placeholder="Bio"></textarea>
                <button type="submit" className="py-4 px-12 rounded-full bg-[#C60C0D] text-white mt-5 mx-auto block text-lg">
                    Save Profile
                </button>
            </form>
        </>
    );
};

export default Settings;
