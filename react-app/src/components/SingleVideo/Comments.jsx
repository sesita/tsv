import { BiLogoTelegram } from "react-icons/bi";

const Comments = () => {
    return (
        <>
            <div className="rounded-3xl bg-[#ECECEC] p-8 mt-5">
                <div className="flex items-center gap-5 mb-4">
                    <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center bg-[#0A2A8D]">
                        <span className="font-semibold text-white">H</span>
                    </div>
                    <input
                        type="text"
                        className="text-[#ACACAC] border-0 border-b-[1px] border-b-[#ACACAC] flex-1 bg-transparent outline-none py-1"
                        placeholder="Add Comment"
                    />
                    <BiLogoTelegram className="text-4xl cursor-pointer" />
                </div>

                <div className="bg-[#FFFFFF] rounded-2xl py-8 px-5">
                    <div className="">
                        <div className="flex items-center gap-3">
                            <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#ECECEC]">
                                <span className="text-[17px] font-semibold text-[#0A2A8D]">
                                    H
                                </span>
                            </div>
                            <div>
                                <h3 className="flex items-center gap-2 font-bold">
                                    Harry Henz
                                    <span className="text-[10px] text-[#BCBCBC]">
                                        3 months ago
                                    </span>
                                </h3>
                                <p className="text-[12px] text-[#000000]">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                </p>
                            </div>
                        </div>
                        <div className="pl-[25px] mt-[15px] mb-[30px]">
                            <div className="flex items-center gap-3">
                                <div className="w-[35px] h-[35px] rounded-full flex items-center justify-center bg-[#ECECEC]">
                                    <span className="text-[14px] font-semibold text-[#0A2A8D]">
                                        H
                                    </span>
                                </div>
                                <div>
                                    <h4 className="flex items-center gap-2 font-bold text-xs">
                                        Harry Henz
                                        <span className="text-[10px] text-[#BCBCBC]">
                                            3 months ago
                                        </span>
                                    </h4>
                                    <p className="text-[11px] text-[#000000]">
                                        Lorem Ipsum is simply dummy text of the
                                        printing
                                    </p>
                                </div>
                            </div>
                        </div>
                        <hr className="bg-[#000000] mt-2 mb-3" />
                    </div>
                    <div className="">
                        <div className="flex items-center gap-3">
                            <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#ECECEC]">
                                <span className="text-[17px] font-semibold text-[#0A2A8D]">
                                    H
                                </span>
                            </div>
                            <div>
                                <h3 className="flex items-center gap-2 font-bold">
                                    Harry Henz
                                    <span className="text-[10px] text-[#BCBCBC]">
                                        3 months ago
                                    </span>
                                </h3>
                                <p className="text-[12px] text-[#000000]">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                </p>
                            </div>
                        </div>
                        <hr className="bg-[#000000] mt-2 mb-3" />
                    </div>
                    <div className="">
                        <div className="flex items-center gap-3">
                            <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#ECECEC]">
                                <span className="text-[17px] font-semibold text-[#0A2A8D]">
                                    H
                                </span>
                            </div>
                            <div>
                                <h3 className="flex items-center gap-2 font-bold">
                                    Harry Henz
                                    <span className="text-[10px] text-[#BCBCBC]">
                                        3 months ago
                                    </span>
                                </h3>
                                <p className="text-[12px] text-[#000000]">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                </p>
                            </div>
                        </div>
                        <hr className="bg-[#000000] mt-2 mb-3" />
                    </div>
                    <div className="">
                        <div className="flex items-center gap-3">
                            <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#ECECEC]">
                                <span className="text-[17px] font-semibold text-[#0A2A8D]">
                                    H
                                </span>
                            </div>
                            <div>
                                <h3 className="flex items-center gap-2 font-bold">
                                    Harry Henz
                                    <span className="text-[10px] text-[#BCBCBC]">
                                        3 months ago
                                    </span>
                                </h3>
                                <p className="text-[12px] text-[#000000]">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                </p>
                            </div>
                        </div>
                        <hr className="bg-[#000000] mt-2 mb-3" />
                    </div>
                    <div className="">
                        <div className="flex items-center gap-3">
                            <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#ECECEC]">
                                <span className="text-[17px] font-semibold text-[#0A2A8D]">
                                    H
                                </span>
                            </div>
                            <div>
                                <h3 className="flex items-center gap-2 font-bold">
                                    Harry Henz
                                    <span className="text-[10px] text-[#BCBCBC]">
                                        3 months ago
                                    </span>
                                </h3>
                                <p className="text-[12px] text-[#000000]">
                                    Lorem Ipsum is simply dummy text of the
                                    printing
                                </p>
                            </div>
                        </div>
                        <hr className="bg-[#000000] mt-2 mb-3" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comments;
