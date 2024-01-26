import React from "react";

const Settings = () => {
  return (
    <>
      <div>
        <div className="flex items-center gap-3 mt-12">
          <input
            type="text"
            className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-[#AAB6DB]"
            placeholder="James JFX"
          />
          <input
            type="text"
            className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-[#AAB6DB]"
            placeholder="James John"
          />
        </div>
        <div className="flex items-center gap-3 mt-5">
          <input
            type="email"
            className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-[#AAB6DB]"
            placeholder="Email"
          />
          <input
            type="text"
            className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-[#AAB6DB]"
            placeholder="Location"
          />
        </div>
        <div className="flex items-center gap-3 mt-5">
          <input
            type="text"
            className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-[#AAB6DB]"
            placeholder="Education"
          />
          <input
            type="text"
            className="flex-1 w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-[#AAB6DB]"
            placeholder="Language"
          />
        </div>
        <textarea
          name=""
          id=""
          rows="4"
          className="w-full rounded-lg py-3 pl-4 pr-1 border-2 border-[#0A2A8D52] bg-[#E3EAFF52] text-md text-[#AAB6DB] mt-5"
          placeholder="Bio"
        ></textarea>
        <button className="py-3 px-12 rounded-full bg-[#C60C0D] text-white mt-5 mx-auto block">
          Save Profile
        </button>
      </div>
    </>
  );
};

export default Settings;
