import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUpload } from 'react-icons/fa';
import CreatableSelect from 'react-select/creatable';
import { usePrimary } from '../../context/PrimaryContext';
import { useNavigate, useOutletContext } from 'react-router-dom';

const SettingsPage = () => {
    const { setPageTitle } = useOutletContext();
    const navigate = useNavigate();
    const { state } = usePrimary();
    const [user, setUser] = useState({});
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        setPageTitle('Settings');

        setUser(state.user);
        setSkills(state.user.additional_info?.skills ?? []);
        setLanguages(state.user.additional_info?.languages ?? []);
        setEducations(state.user.additional_info?.educations ?? []);
    }, [state]);

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = async (e) => {
        const selectedImage = e.target.files?.[0];
        try {
            const res = await axios.post(
                'Dashboard/Settings',
                { ...user, avatar: selectedImage },
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setUser(res.data);
            toast.success('Successfully updated.');
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const handleSubmit = async (e) => {
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
            const res = await axios.post('Dashboard/Settings', data);
            setUser(res.data);
            toast.success('Successfully updated.');
            navigate('/User/Profile');
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '1rem',
            padding: '0.3rem 0.5rem',
            border: '2px solid #E5E7EB',
            boxShadow: 'none',
            '&:hover': {
                border: '2px solid #E5E7EB',
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#6B7280',
        }),
    };

    return (
        <div className="mx-auto p-3 max-w-8xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 md:mb-0">
                    <img
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-red-500 object-cover"
                        src={user.avatar}
                        alt=""
                    />
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-semibold text-[#232323] mb-2">{user.name}</h2>
                        <p className="text-sm font-medium">Update your photo and personal details</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <label htmlFor="file-input" className="cursor-pointer py-3 px-6 md:py-4 md:px-12 rounded-full bg-blue-800 text-white text-base md:text-lg flex items-center justify-center gap-2">
                        <FaUpload /> Upload New Picture
                        <input id="file-input" type="file" className="hidden" onChange={handleAvatarChange} />
                    </label>
                    <button className="py-3 px-8 md:py-4 md:px-14 rounded-full bg-red-500 text-white text-base md:text-lg">
                        Delete
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col md:flex-row gap-3">
                    <input
                        type="text"
                        name="name"
                        className="flex-1 w-full rounded-2xl py-3 px-4 border-2 border-gray-200 text-md text-gray-800 outline-none"
                        placeholder="Channel Name"
                        value={user?.name || ''}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="full_name"
                        className="flex-1 w-full rounded-2xl py-3 px-4 border-2 border-gray-200 text-md text-gray-800 outline-none"
                        placeholder="Full Name"
                        value={user?.full_name || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <input
                        type="email"
                        name="email"
                        className="flex-1 w-full rounded-2xl py-3 px-4 border-2 border-gray-200 text-md text-gray-800 outline-none"
                        placeholder="Email"
                        value={user?.email || ''}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="phone_number"
                        className="flex-1 w-full rounded-2xl py-3 px-4 border-2 border-gray-200 text-md text-gray-800 outline-none"
                        placeholder="Phone Number"
                        value={user?.phone_number || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <CreatableSelect
                    isMulti
                    isClearable
                    value={educations.map(edu => ({ value: edu, label: edu }))}
                    onChange={(selectedOptions) => setEducations(selectedOptions.map(option => option.value))}
                    placeholder="Education"
                    styles={customSelectStyles}
                />
                <CreatableSelect
                    isMulti
                    isClearable
                    value={languages.map(lang => ({ value: lang, label: lang }))}
                    onChange={(selectedOptions) => setLanguages(selectedOptions.map(option => option.value))}
                    placeholder="Languages"
                    styles={customSelectStyles}
                />
                <CreatableSelect
                    isMulti
                    isClearable
                    value={skills.map(skill => ({ value: skill, label: skill }))}
                    onChange={(selectedOptions) => setSkills(selectedOptions.map(option => option.value))}
                    placeholder="Skills"
                    styles={customSelectStyles}
                />
                <textarea
                    name="bio"
                    rows="4"
                    className="w-full rounded-2xl py-3 px-4 border-2 border-gray-200 text-md text-gray-800 outline-none"
                    placeholder="Bio"
                    value={user.additional_info?.bio || ''}
                    onChange={(e) => setUser({ ...user, additional_info: { ...user.additional_info, bio: e.target.value } })}
                ></textarea>
                <div className="flex justify-center">
                    <button type="submit" className="py-3 px-8 md:py-4 md:px-12 rounded-full bg-red-500 text-white text-base md:text-lg">
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingsPage;