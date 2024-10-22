import axios from "axios";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import Pagination from "../../../../components/Common/Pagination";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async (page = 1, search = "") => {
        setLoading(true);
        try {
            const response = await axios.get(`/Dashboard/Admin/Users`, {
                params: {
                    page,
                    search,
                }
            });
            setUsers(response.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            toast.error('Caught Error!');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers(currentPage, searchTerm);
    }, [currentPage, searchTerm]);


    const handlePagination = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center gap-10 rounded-xl mb-4 pb-4">
                <h1 className="text-3xl font-medium">Manage Users</h1>
                <div className="relative w-1/2">
                    <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                        type="text"
                        className="w-full rounded-2xl border py-3 pl-12 pr-4 outline-none focus:border-blue-500 transition-colors"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white rounded-2xl flex items-center gap-2 transition-colors">
                    <CiCirclePlus className="text-xl" />
                    Add New User
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">User</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Full Name</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center">Loading...</td>
                                </tr>
                            ) : (
                                users?.data?.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <span className="font-medium text-gray-900">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{user.full_name}</td>
                                        <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <Link to={`/Admin/Users/${user.id}`} className="py-2 px-4 w-fit flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-colors">
                                                <CiEdit className="text-xl" />
                                                Manage
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePagination} />
        </>
    );
};

export default Users;