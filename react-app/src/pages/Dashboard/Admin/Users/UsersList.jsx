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
        });
        setIsEditMode(false);
    };

    const handleEdit = (user) => {
        setFormState(user);
        setIsEditMode(true);
        setViewingDetails(true);
    };

    return (
        <>
            {!viewingDetails ? (
                <>
                    <div className="flex justify-between items-center gap-10 rounded-xl mb-5 border-b border-gray-100 pb-4">
                        <h1 className="text-3xl font-medium">Manage Users</h1>
                        <input
                            type="text"
                            className="rounded-2xl border py-3 px-4 outline-none font-medium w-1/2"
                            placeholder="Search User..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={() => setViewingDetails(true)}
                            className="mb-5 py-3 px-6 bg-primary text-white rounded-2xl flex items-center gap-2">
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
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="mr-2 py-1 px-3 flex items-center gap-2 bg-yellow-500 text-white rounded-2xl">
                                                <CiEdit className="text-xl" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user)}
                                                className="mr-2 py-1 px-3 flex items-center gap-2 bg-primary text-white rounded-2xl">
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
                    <button
                        onClick={handleBackToList}
                        className="mb-10 py-3 px-6 bg-primary text-white rounded-2xl text-xl flex items-center gap-2">
                        <IoMdArrowRoundBack />
                        Back to List
                    </button>

                </>
            )}
        </>
    );
};

export default Users;
