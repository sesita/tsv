import React from "react";
import { Link, useNavigate } from "react-router-dom";

const VideoBox = ({ info, hidePlayBtn, analytics }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="relative">
                {!hidePlayBtn && (
                    <Link to={analytics ? `/User/Video/${info.id}` : `/${info.slug}`}>
                        <img src={require("../../assets/img/PlayIcon2.png")} alt="Play Icon White" className="w-full max-w-[45px] absolute right-2 top-2" />
                    </Link>
                )}
                <Link to={analytics ? `/User/Video/${info.id}` : `/${info.slug}`}>
                    <div
                        style={{
                            background: `url(${info.thumbnail})`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            cursor: "pointer",
                        }}
                        className="sm:h-[200px] h-[160px] w-full shadow md:rounded-xl mb-1"
                    ></div>
                </Link>
                <div className="flex items-center gap-3">
                    <img src={info.user?.avatar} className="rounded-full w-10 h-10 object-cover" alt="Avatar" />
                    <div>
                        <h2 className="text-md text-[#232323] font-semibold mt-2 px-1 md:px-0">{analytics ? <Link to={`/User/Video/${info.id}`}>{info.title}</Link> : <Link to={`/${info.slug}`}>{info.title}</Link>}</h2>
                        <span className="text-xs">{info.user?.name}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoBox;
