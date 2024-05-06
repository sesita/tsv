import { IoMdPlay } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { useEffect, useState } from "react";

const Video = ({ info }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (info.video) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [info]);

    return (
        <>
            <section className="max-h-[800px] md:h-[500px] w-full flex justify-center items-center relative">
                {loading ? (
                    <>
                        <img src={info.thumbnail} alt="" className="w-full h-full object-cover md:rounded-2xl" />
                        <button className="absolute bg-red-600 text-white text-[65px] p-5 rounded-full">{loading ? <AiOutlineLoading className="animate-spin" /> : <IoMdPlay className="pl-2" />}</button>
                    </>
                ) : info.iframe ? (
                    <div dangerouslySetInnerHTML={{ __html: info.iframe }} className="w-full h-full"></div>
                ) : (
                    <video className="w-full h-full object-cover md:rounded-2xl" controls autoPlay muted>
                        <source src={info.video} type="video/mp4" />
                    </video>
                )}
            </section>
        </>
    );
};

export default Video;
