import "swiper/css";
import axios from "axios";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Select from "react-select";
import { FaBars } from "react-icons/fa6";
import { LuLogIn } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc";
import { FaInfoCircle } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { BiSolidVideoPlus } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { IoClose, IoHomeOutline, IoLocationOutline } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { BsChevronUp, BsGraphUpArrow } from "react-icons/bs";
import { IoMdClose, IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { AiFillPlayCircle, AiFillSetting } from "react-icons/ai";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";

const Header = ({ searchQuery }) => {
    const { query } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const prevScrollY = useRef(0);
    const { currentUser, logout } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [categories, setCategories] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [statesData, setStatesData] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedState, setSelectedState] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [locationModal, setLocationModal] = useState(false);
    const [showCategories, setShowCategories] = useState(true);
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const userRef = useDetectClickOutside({ onTriggered: () => setShowDropdown(false) });
    const notificationRef = useDetectClickOutside({ onTriggered: () => setNotificationDropdown(false) });
    const locationModalRef = useDetectClickOutside({ onTriggered: () => console.log('test') });

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get("Main/getCategories");
                setCategories(res.data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };
        getCategories();

        axios.get("Main/getLocations").then((res) => {
            setStatesData(
                Object.keys(res.data).map((key) => ({
                    value: key,
                    label: res.data[key],
                }))
            );
        });

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchText}`);
    };

    const renderCategoryLinks = () => {
        if (!Array.isArray(categories) || !categories.length) {
            return (
                <div className="flex gap-x-8">
                    {[...Array(6)].map((_, idx) => (
                        <Skeleton key={idx} borderRadius={150} width={Math.random() * (180 - 70) + 70} height={25} />
                    ))}
                </div>
            );
        }

        return (
            <>
                <div className={`bg-gray-100 py-1 px-4 rounded-md ${!query && "bg-gray-600 text-white"}`}>
                    <Link to={`/`}>All</Link>
                </div>

                <Swiper spaceBetween={10} slidesPerView="auto" freeMode={true}>
                    {categories.map((category) => (
                        <SwiperSlide key={category.id} style={{ width: "auto" }}>
                            <div className={`bg-gray-100 py-1 px-4 rounded-md ${query === `${category.title}` ? "bg-gray-600 text-white" : ""}`}>
                                <Link to={`/search/${category.title}`}>{category.title}</Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        );
    };

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (prevScrollY.current < currentScrollY && currentScrollY > 0) {
            setShowCategories(false);
        } else {
            setShowCategories(true);
        }
        prevScrollY.current = currentScrollY;
    };

    const stateChange = (selectedOption) => {
        setSelectedState(selectedOption);
        axios.get(`Main/getLocations/${selectedOption.value}`).then((res) => {
            setCitiesData(
                Object.keys(res.data).map((key) => ({
                    value: key,
                    label: res.data[key],
                }))
            );
        });
    };

    const cityChange = (selectedOption) => {
        console.log(selectedOption);
    };

    const isMobile = width <= 768;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const showUserDropdown = () => {
        if (isMobile) {
            setIsSidebarOpen(!isSidebarOpen);
        } else {
            setShowDropdown(!showDropdown);
        }
    };

    return (
        <>
            {/* Location Modal */}
            <div className={`flex items-center justify-center z-20 left-0 top-0 bottom-0 right-0 animate__animated ${locationModal ? "fixed animate__fadeIn" : "hidden"}`} ref={locationModalRef}>
                <div className="bg-white w-1/3 md:mt-32 p-6 rounded-3xl border mx-4 border-gray-200 shadow-[0px_0px_100px_1px_rgba(0,0,0,1)]">
                    <div className="flex flex-col text-center text-2xl">
                        <div className="px-6">
                            <div className="flex justify-between items-center mb-10">
                                <span className="font-medium flex items-center gap-2 text-2xl">
                                    <IoLocationOutline className="text-primary text-4xl" />
                                    <div className="flex flex-col items-start">
                                        <span>Choose Location</span>
                                        <span className="text-xs">For show related videos depended on location</span>
                                    </div>
                                </span>
                                <IoClose className="text-3xl cursor-pointer" onClick={() => setLocationModal(false)} />
                            </div>
                            <div className="flex gap-6 w-full mb-10">
                                <div className="flex-1">
                                    <Select
                                        options={statesData}
                                        onChange={stateChange}
                                        placeholder="State"
                                        classNamePrefix="react-select"
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                borderRadius: "1rem",
                                                padding: "0.3rem 0.5rem",
                                                outline: "none",
                                                fontWeight: "500",
                                                width: "100%",
                                                maxMenuHeight: "10px",
                                                boxSizing: "border-box",
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: "#6b7280",
                                            }),
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Select
                                        options={citiesData}
                                        isDisabled={!selectedState}
                                        onChange={cityChange}
                                        placeholder="City"
                                        classNamePrefix="react-select"
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                borderRadius: "1rem",
                                                padding: "0.3rem 0.5rem",
                                                outline: "none",
                                                fontWeight: "500",
                                                width: "100%", // Ensure full width
                                                boxSizing: "border-box",
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: "#6b7280",
                                            }),
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between text-base font-medium text-center gap-4">
                                <button className="bg-white border rounded-xl px-8 py-2" onClick={() => setLocationModal(false)}>
                                    Close
                                </button>
                                <button className="bg-primary text-white rounded-xl px-8 py-2">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Location Modal end */}

            <div className={`fixed top-0 left-0 w-full h-full bg-white z-30 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <Link to={"/"}>
                        <img src="/assets/logo.png" alt="Logo" className="max-w-[120px]" />
                    </Link>
                    <button onClick={toggleSidebar} className="text-red-700 text-2xl">
                        <IoMdClose className="text-3xl" />
                    </button>
                </div>
                <div className="p-4">
                    <div className="flex flex-col gap-2 mb-4">
                        {currentUser && (
                            <div className="flex justify-between items-center border-b mb-2 pb-4">
                                <div className="flex">
                                    <img src={currentUser?.avatar} className="w-12 h-12 rounded-full mr-3 object-cover" />
                                    <div className="block text-dark-white">
                                        <p className="text-sm text-gray-700"> Welcome, Back </p>
                                        <p className="text-lg font-medium">Test </p>
                                    </div>
                                </div>
                                <Link to={"/User/Profile"} className="h-full text-2xl">
                                    <BsChevronUp className="text-primary rotate-90" />
                                </Link>
                            </div>
                        )}
                        <label className="font-medium text-2xl text-gray-600 items-center mx-1 flex gap-2 cursor-pointer mb-2" data-tooltip-id="location">
                            <IoLocationOutline className="text-primary" />
                            Location
                            <FaInfoCircle className="mt-1 text-sm" />
                        </label>
                        <ReactTooltip id="location" content="For Show Related Videos" />
                        <div className="flex gap-4 w-full">
                            <div className="flex-1">
                                <Select
                                    options={statesData}
                                    onChange={stateChange}
                                    placeholder="State"
                                    classNamePrefix="react-select"
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            borderRadius: "1rem",
                                            padding: "0.3rem 0.5rem",
                                            outline: "none",
                                            fontWeight: "500",
                                            width: "100%", // Ensure full width
                                            boxSizing: "border-box",
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: "#6b7280",
                                        }),
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <Select
                                    options={citiesData}
                                    isDisabled={!selectedState}
                                    onChange={cityChange}
                                    placeholder="City"
                                    classNamePrefix="react-select"
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            borderRadius: "1rem",
                                            padding: "0.3rem 0.5rem",
                                            outline: "none",
                                            fontWeight: "500",
                                            width: "100%", // Ensure full width
                                            boxSizing: "border-box",
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: "#6b7280",
                                        }),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {currentUser && (
                        <div className="flex flex-col p-2 gap-6 text-2xl font-medium text-gray-600 border-t mt-6 pt-6">
                            <Link to={"/User/Profile"} className="flex items-center gap-3">
                                <CgProfile className="text-primary" />
                                Profile
                            </Link>
                            <Link to={"/User/Profile"} className="flex items-center gap-3">
                                <IoMdNotifications className="text-primary" />
                                Notifications
                            </Link>
                            <Link to={"/User/Videos"} className="flex items-center gap-3">
                                <AiFillPlayCircle className="text-primary" />
                                My Videos
                            </Link>
                            <Link to={"/User/Analytics"} className="flex items-center gap-3">
                                <BsGraphUpArrow className="text-primary" />
                                Analytics
                            </Link>
                            <Link to={"/User/Upload"} className="flex items-center gap-3">
                                <CgProfile className="text-primary" />
                                Promotion
                            </Link>
                            <Link to={"/User/Settings"} className="flex items-center gap-3 border-b pb-6">
                                <AiFillSetting className="text-primary" />
                                Settings
                            </Link>
                            <button className="flex items-center gap-3" onClick={() => logout({})}>
                                <VscSignOut className="text-primary" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="sticky top-0 z-20">
                <div className={`bg-white transition-all duration-300 ${!showCategories && "shadow-[0px_5px_10px_0px_rgba(0,0,0,0.1)]"}`}>
                    <header className="container flex justify-between items-center py-5">
                        {/* Logo Section */}
                        <Link to="/">
                            <img src="/assets/logo.png" alt="Logo" className="w-full hidden md:inline max-w-[150px]" />
                            <img src="/assets/short-logo.png" alt="Logo" className="w-full md:hidden max-w-[50px]" />
                        </Link>

                        {/* Search Bar Section */}
                        <div className="w-2/3 md:w-1/2 px-4">
                            <form className="w-full rounded-full border-[1px] border-[#CACACA] py-1 px-1 flex" onSubmit={handleSearch}>
                                <input type="text" className="outline-none border-none md:text-sm text-xs sm:pl-4 pl-2 flex-1 rounded-lg" placeholder="Search..." value={searchQuery || searchText} onChange={(e) => setSearchText(e.target.value)} />
                                <button className="md:w-9 md:h-9 w-6 h-6 bg-[#C60C0D] flex justify-center items-center rounded-full text-white" onClick={handleSearch}>
                                    <CiSearch className="md:text-xl text-sm" />
                                </button>
                            </form>
                        </div>

                        {/* User & Notification Section */}
                        {currentUser ? (
                            <div className="flex gap-4 items-center relative">
                                <div className="hidden md:flex gap-4 items-center relative">
                                    <Link to={`/User/Upload`}>
                                        <BiSolidVideoPlus className="md:text-3xl text-xl cursor-pointer" />
                                    </Link>
                                    <div className="relative cursor-pointer" ref={notificationRef} onClick={() => setNotificationDropdown(!notificationDropdown)}>
                                        <span className="absolute border-[2px] border-white rounded-full w-5 h-5 flex justify-center items-center bg-[#C60C0D] text-white text-[11px] -top-1.5 -right-1.5">0</span>
                                        <IoMdNotifications className="md:text-3xl text-xl" />
                                        {notificationDropdown && (
                                            <div className="shadow-[0px_0px_5px_0px_rgba(0,0,0,0.2)] rounded-xl py-4 px-4 absolute right-0 top-12 w-52 z-20 text-center bg-white">
                                                <span className="font-medium text-xl text-red-600 capitalize">Notifications</span>
                                                <hr className="my-2.5" />
                                                <h1>No New Notifications</h1>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div ref={userRef}>
                                    <div className="flex items-center cursor-pointer" onClick={showUserDropdown}>
                                        <span className="md:hidden absolute border-[2px] border-white rounded-full w-5 h-5 flex justify-center items-center bg-[#C60C0D] text-white text-[11px] -top-1.5 -right-1">0</span>
                                        <img src={currentUser.avatar} className="rounded-full w-8 h-8 mr-2" alt={currentUser.name} />
                                        <BsChevronUp className={!showDropdown && "rotate-180 hidden md:block"} />
                                    </div>
                                    <div className={`animate__animated animate__fadeIn shadow-[0px_0px_14px_0px_rgba(0,0,0,0.2)] rounded-xl py-4 px-5 absolute right-0 top-12 w-48 z-20 bg-white ${!showDropdown && "hidden"} `}>
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
                                        {currentUser?.admin === 1 && (
                                            <>
                                                <hr className="my-3" />
                                                <Link to={`/Admin`} className="flex items-center gap-3 text-blue-900 text-sm mb-1">
                                                    <CgProfile className="text-[#C60C0D] text-lg" />
                                                    Admin Panel
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {currentUser === false ? (
                                    <div className="md:block hidden">
                                        <Skeleton borderRadius={150} width={150} height={30} />
                                    </div>
                                ) : (
                                    <div className="md:gap-4 gap-1 items-center md:flex hidden">
                                        <IoLocationOutline className="md:text-3xl text-xl cursor-pointer" onClick={() => setLocationModal(!locationModal)} />
                                        <Link to={`/Auth/Login`} className="lg:block hidden">
                                            <BiSolidVideoPlus className="md:text-3xl text-xl cursor-pointer mr-6" />
                                        </Link>
                                        <div className="md:flex gap-4 hidden">
                                            <Link to="/Auth/Register" className="bg-[#C60C0D] text-white md:text-sm text-xs md:px-7 px-4 md:py-2 py-1 rounded-full">
                                                Sign Up
                                            </Link>
                                            <Link to="/Auth/Login" className="text-[#0A2A8D] md:text-sm text-xs md:px-7 px-4 md:py-2 py-1 rounded-full border-[1px] border-[#CACACA]">
                                                Sign In
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {!currentUser && (
                            <div className="md:hidden text-xl text-black flex gap-6 items-center">
                                <Link to={"/Auth/Login"}>
                                    <LuLogIn className="text-red-700" />
                                </Link>
                                <FaBars className="text-red-700" onClick={toggleSidebar} />
                            </div>
                        )}
                    </header>
                </div>

                {/* Mobile Icons Section */}
                <div className="md:hidden flex justify-around items-center py-3 bg-gray-100 border-t">
                    <Link to="/home">
                        <IoHomeOutline className="text-2xl text-primary" />
                    </Link>
                    <Link to="/search">
                        <CiSearch className="text-2xl text-primary" />
                    </Link>
                    <Link to="/notifications">
                        <IoMdNotificationsOutline className="text-2xl text-primary" />
                    </Link>
                    <Link to="/profile">
                        <CgProfile className="text-2xl text-primary" />
                    </Link>
                </div>

                {/* Categories Section */}
                <div className={`bg-white border-t shadow-[0px_5px_10px_0px_rgba(0,0,0,0.1)] z-30 md:rounded-b-2xl transition-all duration-300 ${showCategories ? "translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"}`}>
                    <div className="sm:container md:py-4 py-3 overflow-hidden">
                        <div className="flex md:gap-x-4 pl-2 sm:pl-0 gap-x-2 md:text-lg text-sm whitespace-nowrap">{renderCategoryLinks()}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
