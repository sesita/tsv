import moment from "moment";
import NumberFormatter from "./FormatNumber";
import { Link } from "react-router-dom";
import { LuDollarSign } from "react-icons/lu";

const VideoBox = ({ info }) => {
    return (
        <>
            <div className="relative">
                <Link to={`/${info.slug}`}>
                    <span className="py-4 w-12 flex items-center justify-center absolute right-2 top-2 bg-primary text-white rounded-full">
                        <LuDollarSign />
                        <LuDollarSign />
                        <LuDollarSign />
                    </span>
                </Link>
                <Link to={`/${info.slug}`}>
                    <div
                        style={{
                            background: `url(${info.thumbnail})`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            cursor: "pointer",
                        }}
                        className="md:h-52 sm:h-40 h-36 w-full shadow sm:rounded-xl mb-2"
                    ></div>
                </Link>
                <div className="flex items-center gap-3 mx-2 sm:mx-0">
                    <img src={info.user?.avatar} className="rounded-full w-10 h-10 object-cover" alt="Avatar" />
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-md text-[#232323] font-semibold line-clamp-2">
                            <Link to={`/${info.slug}`}>{info.title}</Link>
                        </h2>
                        <span className="text-xs">{info.user?.name}</span>
                        <span className="text-xs flex items-center gap-1">
                            <NumberFormatter value={info?.views} /> views
                            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-0.5 mx-1"></div>
                            {moment(info.created_at).fromNow()}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoBox;
