import { AiFillInstagram, AiOutlineStar } from "react-icons/ai";
import { BsGoogle, BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const ProfileInfoBox = () => {
  return (
    <>
      <div className="flex items-center gap-5">
        {true ? (
          <img
            className="w-32 h-32 rounded-full border-4 border-red-500"
            src={require("../../assets/img/Profile-img.png")}
            alt=""
          />
        ) : (
          <div className="flex items-center justify-center border-4 border-red-500 w-32 h-32 rounded-full bg-[#F2F2F2]">
            <span className="text-5xl font-semibold">M</span>
          </div>
        )}

        <div>
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-[#232323]">
            James John <AiOutlineStar className="text-2xl font-normal" />
          </h2>
          <p className="text-sm font-medium">Content Creator</p>
          <div className="flex items-center gap-4 mt-3">
            <BsGoogle className="text-[#C60C0D] text-3xl" />
            <FaFacebookF className="text-[#C60C0D] text-3xl" />
            <BsTwitter className="text-[#C60C0D] text-3xl" />
            <AiFillInstagram className="text-[#C60C0D] text-3xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfoBox;
