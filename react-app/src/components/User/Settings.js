import axios from "axios";
import { React, useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [user, setUser] = useState({});
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        setUser(currentUser);
        setSkills(currentUser.additional_info?.skills ?? []);
        setLanguages(currentUser.additional_info?.languages ?? []);
        setEducations(currentUser.additional_info?.educations ?? []);
        console.log("asdf");
    }, [currentUser]);

    const skillInput = (value) => {
        setSkills(value);
    };
    const languageInput = (value) => {
        setLanguages(value);
    };
    const educationInput = (value) => {
        setEducations(value);
    };
    const changeInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const avatarChange = async (e) => {
        const selectedImage = e.target.files?.[0];

        try {
            const res = await axios.post(
                "Dashboard/Settings",
                { ...user, avatar: selectedImage },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setUser(res.data);
            toast.success("Successfully updated.");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        const data = {
            additional_info: {
                skills,
                languages,
                educations,
                bio: user.additional_info?.bio,
            },
            name: user.name,
            full_name: user.full_name,
            email: user.email,
            avatar: user.avatar,
            phone_number: user.phone_number,
        };

        try {
            const res = await axios.post("Dashboard/Settings", data);
            setUser(res.data);
            toast.success("Successfully updated.");
            navigate('/User/Profile/' + res.data.id);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-8">
                    <img className="w-40 h-40 rounded-full border-4 border-red-500 object-cover" src={user.avatar} alt="" />
                    <div>
                        <h2 className="text-4xl font-semibold text-[#232323] mb-2">{user.name}</h2>
                        <p className="text-sm font-medium">Update your photo and personal details </p>
                    </div>
                </div>
                <div className="flex gap-6">
                    <label htmlFor="file-input" className="cursor-pointer py-4 px-12 rounded-full bg-blue-800 text-white mt-5 mx-auto block text-lg">
                        Upload New Picture
                        <input id="file-input" type="file" className="hidden" onChange={avatarChange} />
                    </label>
                    <button className="py-4 px-14 rounded-full bg-[#C60C0D] text-white mt-5 mx-auto block text-lg" onClick={avatarChange}>
                        Delete
                    </button>
                </div>
            </div>
            <form onSubmit={submit}>
                <div className="flex items-center gap-3">
                    <input type="text" name="name" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Channel Name" value={user?.name} onChange={(e) => changeInput(e)} />
                    <input type="text" name="full_name" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Full Name" value={user?.full_name} onChange={(e) => changeInput(e)} />
                </div>
                <div className="flex items-center gap-3 mt-5">
                    <input type="email" name="email" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Email" value={user?.email} onChange={(e) => changeInput(e)} />
                    <input type="text" name="phone_number" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Phone Number" value={user?.phone_number} onChange={(e) => changeInput(e)} />
                </div>
                <div className="flex items-center gap-3 mt-5 mb-5">
                    <TagsInput
                        value={educations}
                        onChange={educationInput}
                        onlyUnique={true}
                        inputProps={{
                            placeholder: "Education",
                        }}
                        className="flex-1 w-full rounded-lg pt-2 pb-1 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none"
                    />
                    <TagsInput
                        value={languages}
                        onChange={languageInput}
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
                <textarea name="bio" id="" rows="4" value={user.additional_info?.bio} className="w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none mt-5" placeholder="Bio" onChange={(e) => setUser({ ...user, additional_info: { ...user.additional_info, bio: e.target.value } })}></textarea>
                <button type="submit" className="py-4 px-12 rounded-full bg-[#C60C0D] text-white mt-5 mx-auto block text-lg">
                    Save Profile
                </button>
            </form>
        </>
    );
};

export default Settings;
