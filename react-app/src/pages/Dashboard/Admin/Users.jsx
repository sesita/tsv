import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [formState, setFormState] = useState({
        id: null,
        name: "",
        full_name: "",
        email: "",
        phone_number: "",
        avatar: "",
        bio: "",
        educations: [],
        languages: [],
        skills: [],
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [viewingDetails, setViewingDetails] = useState(false);

    const fetchUsers = () => {
        axios
            .get("/Dashboard/Admin/getUsers")
            .then((response) => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the users!", error);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, users]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Handle file upload here, e.g., by using FormData
        console.log(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("/Dashboard/Admin/updateUser", formState)
            .then((response) => {
                if (isEditMode) {
                    setUsers((prevUsers) => prevUsers.map((user) => (user.id === formState.id ? response.data : user)));
                    toast.success("User updated successfully!");
                } else {
                    setUsers((prevUsers) => [...prevUsers, response.data]);
                    toast.success("User created successfully!");
                }
                setViewingDetails(false);
                setFormState({
                    id: null,
                    name: "",
                    full_name: "",
                    email: "",
                    phone_number: "",
                    avatar: "",
                    bio: "",
                    educations: [],
                    languages: [],
                    skills: [],
                });
                setIsEditMode(false);
            })
            .catch((error) => {
                toast.error("There was an error saving the user.");
                console.error(error);
            });
    };

    const handleEdit = (user) => {
        setFormState(user);
        setIsEditMode(true);
        setViewingDetails(true);
    };

    const handleDelete = (user) => {
        axios
            .post("/Dashboard/Admin/deleteUser", { id: user?.id })
            .then(() => {
                fetchUsers();
                toast.success("User Deleted!");
            })
            .catch((error) => {
                toast.error("There was an error deleting the user.");
                console.error(error);
            });
    };

    const handleBackToList = () => {
        setViewingDetails(false);
        setFormState({
            id: null,
            name: "",
            full_name: "",
            email: "",
            phone_number: "",
            avatar: "",
            bio: "",
            educations: [],
            languages: [],
            skills: [],
        });
        setIsEditMode(false);
    };

    return (
        <>
            {!viewingDetails ? (
                <>
                    <div className="flex justify-between items-center gap-10 rounded-xl mb-5 border-b border-gray-100 pb-4 cursor-pointer">
                        <h1 className="text-3xl font-medium">Manage Users</h1>
                        <input type="text" className="rounded-2xl border py-3 px-4 outline-none font-medium w-1/2" placeholder="Search User..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <button onClick={() => setViewingDetails(true)} className="mb-5 py-3 px-6 bg-primary text-white rounded-2xl flex items-center gap-2">
                            <CiCirclePlus className="text-xl" />
                            Add New User
                        </button>
                    </div>

                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="p-4 border">Name</th>
                                <th className="p-4 border">Email</th>
                                <th className="p-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} draggable className="bg-white hover:bg-gray-100">
                                    <td className="p-4 border">{user.name}</td>
                                    <td className="p-4 border">{user.email}</td>
                                    <td className="p-4 border w-60">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(user)} className="mr-2 py-1 px-3 flex items-center gap-2 bg-yellow-500 text-white rounded-2xl">
                                                <CiEdit className="text-xl" />
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(user)} className="mr-2 py-1 px-3 flex items-center gap-2 bg-primary text-white rounded-2xl">
                                                <MdOutlineDelete className="text-xl" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    <button onClick={handleBackToList} className="mb-10 py-3 px-6 bg-primary text-white rounded-2xl text-xl flex items-center gap-2">
                        <IoMdArrowRoundBack />
                        Back to List
                    </button>

                    <div className="flex justify-between items-center mb-12">
                        <div className="flex items-center gap-8">
                            <img className="w-40 h-40 rounded-full border-4 border-red-500 object-cover" src={formState.avatar || "/default-avatar.png"} alt="" />
                            <div>
                                <h2 className="text-4xl font-semibold text-[#232323] mb-2">{formState.name}</h2>
                                <p className="text-sm font-medium">Update your photo and personal details</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <label htmlFor="file-input" className="cursor-pointer py-4 px-12 rounded-full bg-blue-800 text-white mt-5 mx-auto block text-lg">
                                Upload Picture
                                <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
                            </label>
                            <button className="py-4 px-14 rounded-full bg-[#C60C0D] text-white mt-5 mx-auto block text-lg" onClick={() => setFormState((prevState) => ({ ...prevState, avatar: "" }))}>
                                Delete
                            </button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center gap-3">
                            <input type="text" name="name" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Channel Name" value={formState.name} onChange={handleInputChange} />
                            <input type="text" name="full_name" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Full Name" value={formState.full_name} onChange={handleInputChange} />
                        </div>
                        <div className="flex items-center gap-3 mt-5">
                            <input type="email" name="email" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Email" value={formState.email} onChange={handleInputChange} />
                            <input type="text" name="phone_number" className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none" placeholder="Phone Number" value={formState.phone_number} onChange={handleInputChange} />
                        </div>
                        <div className="flex items-center gap-3 mb-5"></div>
                        <textarea name="bio" rows="4" value={formState.bio} className="w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-gray-800 outline-none mt-5" placeholder="Bio" onChange={(e) => setFormState((prevState) => ({ ...prevState, bio: e.target.value }))}></textarea>
                        <button type="submit" className="py-4 px-12 rounded-full bg-[#C60C0D] text-white mt-5 mx-auto block text-lg">
                            Save Profile
                        </button>
                    </form>
                </>
            )}
        </>
    );
};

export default Users;
