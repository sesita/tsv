import { Outlet, Link } from "react-router-dom";
import { BiSolidCategory } from "react-icons/bi";
import { FaCog, FaUserCog } from "react-icons/fa";
import { MdOutlineVideoSettings } from "react-icons/md";

const AdminLayout = () => {
    return (
        <>
            <div className="pt-12 pb-28 pattern bg-red-950">
                <div className="sm:container flex justify-between items-center">
                    <h2 className="text-white md:text-6xl text-3xl font-medium mb-14 mt-6">Admin Panel</h2>
                    <div>
                        <ul className="text-white text-2xl font-medium flex gap-10">
                            <li>
                                <Link to={"/Admin/Videos"} className="flex items-center gap-3">
                                    Videos
                                    <MdOutlineVideoSettings className="mt-1" />
                                </Link>
                            </li>
                            <li>
                                <Link to={"/Admin/Users"} className="flex items-center gap-3">
                                    Users
                                    <FaUserCog className="mt-1" />
                                </Link>
                            </li>
                            <li>
                                <Link to={"/Admin/Categories"} className="flex items-center gap-3">
                                    Categories
                                    <BiSolidCategory className="mt-1" />
                                </Link>
                            </li>
                            <li>
                                <Link to={"/Admin/Settings"} className="flex items-center gap-3">
                                    Settings
                                    <FaCog className="mt-1" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <section className="sm:container -mt-28 mb-14">
                <div className="shadow-lg rounded-2xl py-10 px-12 bg-white">
                    <Outlet />
                </div>
            </section>
        </>
    );
};

export default AdminLayout;
