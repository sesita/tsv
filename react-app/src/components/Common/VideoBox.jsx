import React from "react";
import { Link, useNavigate } from "react-router-dom";

const VideoBox = ({ info, hidePlayBtn, analytics }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="relative">
                {!hidePlayBtn && (
                    <Link to={`/${info.slug}`}>
                        <img
                            src={require("../../assets/img/PlayIcon2.png")}
                            alt="Play Icon White"
                            className="w-full max-w-[45px] absolute right-2 top-2"
                        />
                    </Link>
                )}
                <Link to={`/${info.slug}`}>
                    <div
                        style={{
                            background: `url(${info.thumbnail})`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            cursor: "pointer",
                        }}
                        className="sm:h-[250px] h-[160px] w-full shadow rounded-xl"
                        onClick={() => {
                            analytics && navigate(`/user/1234/singleAnalytic`);
                        }}
                    ></div>
                </Link>
                <h2 className="text-md text-[#232323] font-semibold mt-2">
                    {analytics ? (
                        <Link to={`/user/1234/singleAnalytic/${info._id}`}>
                            {info.title}
                        </Link>
                    ) : (
                        <Link to={`/video/${info._id}`}>{info.title}</Link>
                    )}
                </h2>
            </div>
        </>
    );
};

export default VideoBox;
