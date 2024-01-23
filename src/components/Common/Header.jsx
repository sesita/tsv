import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { BiSolidVideoPlus } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { BsChevronDown, BsChevronUp, BsGraphUpArrow } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc";
import { AiFillPlayCircle, AiFillSetting } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ searchQuery }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${searchText}`);
  };

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      {mobileSearch && (
        <>
          <section className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-[#0000009a] z-40 flex justify-center items-center p-12">
            <button
              className="lg:hidden w-9 h-9 bg-[#C60C0D] flex justify-center items-center rounded-full text-white absolute top-5 right-5"
              onClick={() => setMobileSearch(!mobileSearch)}
            >
              <FaTimes className="text-xl" />
            </button>
            <div className="w-full max-w-[450px] bg-white rounded-full py-2 px-5 shadow-lg flex items-center">
              <input
                type="text"
                className="w-full outline-none border-none text-sm pl-2 flex-1"
                placeholder="Search..."
                value={searchQuery ? searchQuery : searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="lg:hidden w-9 h-9 bg-[#C60C0D] flex justify-center items-center rounded-full text-white"
                onClick={handleSearch}
              >
                <CiSearch className="text-xl" />
              </button>
            </div>
          </section>
        </>
      )}
      <section className="border-b border-[#e3e1e1] py-2 md:px-0 px-3">
        <header className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <img
              src={require("../../assets/img/logo.jpg")}
              alt="Logo"
              className="w-full md:max-w-[150px] max-w-[80px]"
            />
          </Link>

          <div>
            <div className="w-[400px] rounded-full border-[1px] border-[#CACACA] py-1 px-1 lg:flex hidden">
              <input
                type="text"
                className="outline-none border-none text-sm pl-2 flex-1 rounded-lg"
                placeholder="Search..."
                value={searchQuery ? searchQuery : searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="w-9 h-9 bg-[#C60C0D] flex justify-center items-center rounded-full text-white"
                onClick={handleSearch}
              >
                <CiSearch className="text-xl" />
              </button>
            </div>
            <button
              className="lg:hidden w-7 h-7 bg-[#C60C0D] flex justify-center items-center rounded-full text-white"
              onClick={() => setMobileSearch(!mobileSearch)}
            >
              <CiSearch className="text-md" />
            </button>
          </div>

          {currentUser ? (
            <>
              <div className="flex gap-4 items-center relative">
                <BiSolidVideoPlus className="md:text-3xl text-xl cursor-pointer" />
                <div className="relative">
                  <span className="absolute border-[2px] border-white rounded-full w-4 h-4 flex justify-center items-center bg-[#C60C0D] text-white text-[8px] -top-1 -right-1">
                    05
                  </span>
                  <IoMdNotifications className="md:text-3xl text-xl" />
                </div>

                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="rounded-full w-8 h-8 flex items-center justify-center bg-blue-900 mr-2">
                    <span className="text-white">U</span>
                  </div>
                  {showDropdown ? <BsChevronUp /> : <BsChevronDown />}
                </div>

                {showDropdown && (
                  <>
                    <div className="shadow rounded-lg py-3 px-2 absolute right-0 top-10 w-48 z-20 bg-white">
                      <span className="font-medium text-xl text-red-600">
                        {currentUser.name}
                      </span>
                      <hr className="my-2" />
                      <div className="mx-1">
                        <Link to={`/user/${currentUser?._id}/profile`} className="flex items-center gap-2 text-blue-900 text-sm mb-2">
                          <CgProfile className="text-[#C60C0D] text-lg" />
                          Profile
                        </Link>
                        <button className="flex items-center gap-2 text-blue-900 text-sm mb-2" onClick={() => logout({})}>
                          <VscSignOut className="text-[#C60C0D] text-lg" />
                          Sign Out
                        </button>
                        <hr className="my-3" />
                        <Link to={`/user/${currentUser?._id}/videos`} className="flex items-center gap-2 text-blue-900 text-sm mb-1">
                          <AiFillPlayCircle className="text-[#C60C0D] text-lg" />
                          My Videos
                        </Link>
                        <Link to={`/user/${currentUser?._id}/analytics`} className="flex items-center gap-4 text-blue-900 text-sm mb-1">
                          <BsGraphUpArrow className="text-[#C60C0D] text-md" />
                          Analytics
                        </Link>
                        <Link to={`/user/${currentUser?._id}/promotion`} className="flex items-center gap-4 text-blue-900 text-sm mb-1">
                          <CgProfile className="text-[#C60C0D] text-md" />
                          Promotion
                        </Link>
                        <Link to={`/user/${currentUser?._id}/settings`} className="flex items-center gap-4 text-blue-900 text-sm mb-1">
                          <AiFillSetting className="text-[#C60C0D] text-md" />
                          Settings
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex md:gap-4 gap-1 items-center">
                <Link
                  to="/signup"
                  className="bg-[#C60C0D] text-white md:text-sm text-xs md:px-7 px-4 md:py-2 py-1 rounded-full"
                >
                  Sign Up
                </Link>
                <Link
                  to="/signin"
                  className="text-[#0A2A8D] md:text-sm text-xs md:px-7 px-4 md:py-2 py-1 rounded-full border-[1px] border-[#CACACA]"
                >
                  Sign In
                </Link>
              </div>
            </>
          )}
        </header>
      </section>
    </>
  );
};

export default Header;
