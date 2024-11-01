import "swiper/css";
import axios from "axios";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoBox from "../components/Common/VideoBox";
import { Autoplay, EffectFade } from "swiper/modules";
import { IoLocationSharp } from "react-icons/io5";
import { BiInfoCircle } from "react-icons/bi";

const Search = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sliderVideos, setSliderVideos] = useState([]);

    const { query } = useParams();

    const getVideos = async (search) => {
        setLoading(true);
        const res = await axios.get("Main/getVideos", {
            params: {
                search: search,
            },
        });
        setVideos(res.data);
        setSliderVideos(res.data);
        setLoading(false);
    };

    useEffect(() => {
        getVideos(query);
    }, [query]);

    return (
        <>
            <Swiper
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                effect={"fade"}
                modules={[Autoplay, EffectFade]}
            >
                {sliderVideos?.total > 0 ? (
                    sliderVideos?.data?.map((video) => (
                        <SwiperSlide key={video.id}>
                            <section className="md:pt-16 pt-8 md:pb-32 pb-28">
                                <img src={video?.thumbnail} className="absolute w-full h-full top-0 object-cover" alt="Cover" />
                                <div className="container text-white relative">
                                    <div className="w-[100%] max-w-[450px]">
                                        <h4 className="md:text-3xl text-lg">
                                            <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{video?.category?.title}</span>
                                            <span className="text-[12px] bg-[#c70b0d] font-italic rounded-[4px] py-[4px] px-[12px] ml-5 font-semibold shadow-lg">Ads</span>{" "}
                                        </h4>
                                        <h1 className="md:text-5xl text-2xl font-semibold md:font-bold my-3 md:leading-tight opacity-95 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] line-clamp-2">{video.title}</h1>
                                        <Link to={`/${video?.slug}`}>
                                            <img src={"/assets/img/PlayIcon.png"} alt="Play Icon" className="inline w-full md:max-w-[100px] max-w-[45px]" />
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </SwiperSlide>
                    ))
                ) : (
                    <Skeleton className="rounded-2xl sm:h-[30rem] h-[19rem] -top-2" />
                )}
            </Swiper>
            <div className="sm:container">
                <div className="relative shadow-[0px_0px_14px_0px_rgba(0,0,0,0.25)] sm:pt-6 pt-4 sm:rounded-3xl sm:px-10 -mt-24 mb-16 z-10 bg-white pb-10">
                    <div className="flex flex-col items-end rounded-xl justify-center border-b pr-4 mb-6 pb-3">
                        <button className="font-medium text-lg flex items-center gap-2">
                            Chicago, Illinois
                            <IoLocationSharp />
                        </button>
                        <span className="text-sm text-gray-700 flex items-center gap-1">
                            <BiInfoCircle />
                            Only Chicago videos showing
                        </span>
                    </div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                        {loading ? (
                            <>
                                {Array(4)
                                    .fill()
                                    .map((_, key) => (
                                        <div className="flex flex-col gap-2" key={key}>
                                            <Skeleton height={200} borderRadius={15} className="rounded-2xl" />
                                            <Skeleton height={40} borderRadius={15} className="rounded-2xl" />
                                        </div>
                                    ))}
                            </>
                        ) : videos?.total > 0 ? (
                            videos?.data?.map((video, key) => <VideoBox info={video} key={key} />)
                        ) : (
                            <>
                                <h1 className="text-center mt-4 mb-4 items-center font-medium text-4xl col-span-8">Videos not found</h1>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
