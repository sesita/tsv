import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
import { BiSolidVideoPlus } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { AiFillPlayCircle, AiFillSetting } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";
import { BsChevronDown, BsChevronUp, BsGraphUpArrow } from "react-icons/bs";

const Header = ({ searchQuery }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileSearch, setMobileSearch] = useState(false);
    const [notificationDropdown, setNotificationDropdown] = useState(false);

    const closeUserDropdown = () => {
        setShowDropdown(false);
    };
    const closeNotificationDropdown = () => {
        setNotificationDropdown(false);
    };
    const closeSearchDropdown = (e) => {
        if (!searchButton.current.contains(e.target)) {
            setMobileSearch(false);
        }
    };
    const handleSearch = () => {
        navigate(`/search?q=${searchText}`);
    };

    const { currentUser, logout } = useAuth();
    const userRef = useDetectClickOutside({ onTriggered: closeUserDropdown });
    const searchRef = useDetectClickOutside({
        onTriggered: closeSearchDropdown,
    });
    const searchButton = useRef();
    const notificationRef = useDetectClickOutside({ onTriggered: closeNotificationDropdown });

    const [categories, setCategories] = useState();

    const getCategories = async () => {
        axios.get("Main/getCategories").then((res) => {
            setCategories(res.data);
        });
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            {mobileSearch && (
                <>
                    <section className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-[#0000009a] z-40 flex justify-center items-center p-12 px-4">
                        <button className="lg:hidden w-9 h-9 bg-[#C60C0D] flex justify-center items-center rounded-full text-white absolute top-5 right-5" onClick={() => setMobileSearch(!mobileSearch)}>
                            <FaTimes className="text-xl" />
                        </button>

                        <div className="w-full max-w-[450px] bg-white rounded-full py-2 px-5 shadow-lg flex items-center" ref={searchRef}>
                            <input type="text" className="w-full outline-none border-none text-sm pl-2 flex-1" placeholder="Search..." value={searchQuery ? searchQuery : searchText} onChange={(e) => setSearchText(e.target.value)} />
                            <button className="lg:hidden w-9 h-9 bg-[#C60C0D] flex justify-center items-center rounded-full text-white" onClick={handleSearch}>
                                <CiSearch className="text-xl" />
                            </button>
                        </div>
                    </section>
                </>
            )}
            <div className="border-b border-[#e4e1e1] py-5 px-2 md:px-12">
                <header className="container mx-auto flex justify-between items-center">
                    <Link to="/">
                        <img src="/logo.png" alt="Logo" className="w-full md:max-w-[150px] max-w-[80px]" />
                    </Link>

                    <div className="md:w-1/2 px-4">
                        <div className="w-full rounded-full border-[1px] border-[#CACACA] py-1 px-1 md:flex hidden">
                            <input type="text" className="outline-none border-none text-sm pl-4 flex-1 rounded-lg" placeholder="Search..." value={searchQuery ? searchQuery : searchText} onChange={(e) => setSearchText(e.target.value)} />
                            <button className="w-9 h-9 bg-[#C60C0D] flex justify-center items-center rounded-full text-white" onClick={handleSearch}>
                                <CiSearch className="text-xl" />
                            </button>
                        </div>
                        <button className="md:hidden w-7 h-7 bg-[#C60C0D] flex justify-center items-center rounded-full text-white" ref={searchButton} onClick={() => setMobileSearch(!mobileSearch)} name="searchButton">
                            <CiSearch className="text-md" />
                        </button>
                    </div>

                    {currentUser ? (
                        <>
                            <div className="flex gap-4 items-center relative">
                                <Link to={`/User/Upload`}>
                                    <BiSolidVideoPlus className="md:text-3xl text-xl cursor-pointer" />
                                </Link>
                                <div className="relative cursor-pointer" ref={notificationRef} onClick={() => setNotificationDropdown(!notificationDropdown)}>
                                    <span className="absolute border-[2px] border-white rounded-full w-5 h-5 flex justify-center items-center bg-[#C60C0D] text-white text-[11px] -top-1.5 -right-1.5">0</span>
                                    <IoMdNotifications className="md:text-3xl text-xl" />

                                    {notificationDropdown && (
                                        <>
                                            <div className="shadow-[0px_0px_5px_0px_rgba(0,0,0,0.2)] rounded-xl py-4 px-4 absolute right-0 top-12 w-52 z-20 text-center bg-white">
                                                <span className="font-medium text-xl text-red-600 capitalize">Notifications</span>
                                                <hr className="my-2.5" />
                                                <h1>No New Notifications</h1>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div ref={userRef}>
                                    <div className="flex items-center cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                                        <img src={currentUser.avatar} className="rounded-full w-8 h-8 mr-2" alt={currentUser.name} />
                                        {showDropdown ? <BsChevronUp /> : <BsChevronDown />}
                                    </div>

                                    {showDropdown && (
                                        <>
                                            <div className="shadow-[0px_0px_14px_0px_rgba(0,0,0,0.2)] rounded-xl py-4 px-5 absolute right-0 top-12 w-48 z-20 bg-white">
                                                <span className="font-medium text-xl text-red-600 capitalize">{currentUser.name}</span>
                                                <hr className="my-2.5" />
                                                <Link to={`/User/Profile`} className="flex items-center gap-3 text-blue-900 text-sm mb-2">
                                                    <CgProfile className="text-[#C60C0D] text-lg" />
                                                    Profile
                                                </Link>
                                                <button className="flex items-center gap-3 text-blue-900 text-sm mb-2" onClick={() => logout({})}>
                                                    <VscSignOut className="text-[#C60C0D] text-lg" />
                                                    Sign Out
                                                </button>
                                                <hr className="my-3" />
                                                <Link to={`/User/Videos`} className="flex items-center gap-3 text-blue-900 text-sm mb-1">
                                                    <AiFillPlayCircle className="text-[#C60C0D] text-lg" />
                                                    My Videos
                                                </Link>
                                                <Link to={`/User/Analytics`} className="flex items-center gap-3 text-blue-900 text-sm mb-1">
                                                    <BsGraphUpArrow className="text-[#C60C0D] text-lg" />
                                                    Analytics
                                                </Link>
                                                <Link to={`/User/Upload`} className="flex items-center gap-3 text-blue-900 text-sm mb-1">
                                                    <CgProfile className="text-[#C60C0D] text-lg" />
                                                    Promotion
                                                </Link>
                                                <Link to={`/User/Settings`} className="flex items-center gap-3 text-blue-900 text-sm mb-1">
                                                    <AiFillSetting className="text-[#C60C0D] text-lg" />
                                                    Settings
                                                </Link>
                                                <hr className="my-3" />
                                                <Link to={`/Admin`} className="flex items-center gap-3 text-blue-900 text-sm mb-1">
                                                    <CgProfile className="text-[#C60C0D] text-lg" />
                                                    Admin Panel
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {currentUser === false ? (
                                <div>
                                    <Skeleton borderRadius={150} width={150} height={30} />
                                </div>
                            ) : (
                                <div className="flex md:gap-4 gap-1 items-center">
                                    <Link to={`/Auth/Login`} className="sm:block hidden">
                                        <BiSolidVideoPlus className="md:text-3xl text-xl cursor-pointer mr-6" />
                                    </Link>
                                    <Link to="/Auth/Register" className="bg-[#C60C0D] text-white md:text-sm text-xs md:px-7 px-4 md:py-2 py-1 rounded-full">
                                        Sign Up
                                    </Link>
                                    <Link to="/Auth/Login" className="text-[#0A2A8D] md:text-sm text-xs md:px-7 px-4 md:py-2 py-1 rounded-full border-[1px] border-[#CACACA]">
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </header>
            </div>
            <div className="p-4">
                <div className="md:w-10/12 mx-auto">
                    <div className="flex md:gap-x-8 gap-x-4 md:text-lg">
                        {categories?.length > 0 ? (
                            categories?.map((category, key) => (
                                <>
                                    <div className={location.search === `?q=${category?.title}` ? "font-medium" : ""}>
                                        <Link to={`/search?q=${category?.title}`}>{category?.title}</Link>
                                    </div>
                                </>
                            ))
                        ) : (
                            <div className="flex gap-x-8">
                                <Skeleton borderRadius={150} width={120} height={25} />
                                <Skeleton borderRadius={150} width={80} height={25} />
                                <Skeleton borderRadius={150} width={150} height={25} />
                                <Skeleton borderRadius={150} width={180} height={25} />
                                <Skeleton borderRadius={150} width={100} height={25} />
                                <Skeleton borderRadius={150} width={70} height={25} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
