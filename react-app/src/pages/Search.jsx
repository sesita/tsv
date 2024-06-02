import "swiper/css";
import axios from "axios";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoBox from "../components/Common/VideoBox";
import AdsRibon from "../components/Common/AdsRibon";
import { Autoplay, EffectFade } from "swiper/modules";
import FilterOptions from "../components/Common/FilterOptions";

const Search = ({ searchQuery }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTag, setActiveTag] = useState(null);
    const [sliderVideos, setSliderVideos] = useState([]);

    const fetchSliderVideos = async () => {
        try {
            const response = await axios.get("Main/getVideos", {
                params: {
                    orderBy: "featured",
                    paginate: 3,
                },
            });
            setSliderVideos(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Caught error");
        }
    };

    useEffect(() => {
        fetchSliderVideos();
    }, []);

    const getVideos = async () => {
        setLoading(true);
        const res = await axios.get("Main/getVideos", {
            params: {
                search: searchQuery,
                tag: activeTag,
            },
        });
        setVideos(res.data);
        setLoading(false);
    };

    useEffect(() => {
        getVideos();
        fetchSliderVideos();
        console.log(searchQuery)
    }, [searchQuery, activeTag]);

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
                {sliderVideos?.data ? (
                    sliderVideos?.data?.map((video, key) => (
                        <SwiperSlide>
                            <section className="pt-16 pb-32">
                                <img src={video?.thumbnail} className="absolute w-full h-full top-0 object-cover" alt="Cover" />
                                <div className="md:w-10/12 mx-auto text-white relative px-4">
                                    <div className="w-[100%] max-w-[450px]">
                                        <h4 className="md:text-3xl text-lg">
                                            <span className="drop-shadow">{video?.category?.title}</span>
                                            <AdsRibon />
                                        </h4>
                                        <h1 className="md:text-5xl text-2xl font-semibold md:font-bold my-3 md:leading-tight text-white opacity-95 drop-shadow">{video.title}</h1>
                                        <Link to={`/${video?.slug}`}>
                                            <img src={require("../assets/img/PlayIcon.png")} alt="Play Icon" className="inline w-full md:max-w-[100px] max-w-[45px]" />
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </SwiperSlide>
                    ))
                ) : (
                    <Skeleton height={430} className="rounded-2xl" />
                )}
            </Swiper>
            <section className="mb-16 md:px-0 px-3 relative z-10">
                <div className="mx-auto md:w-[88%] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.25)] pt-8 px-12 rounded-[29px] -mt-24 z-20 bg-white pb-10">
                    <FilterOptions searchQuery={searchQuery} getVideos={getVideos} activeTag={activeTag} setActiveTag={setActiveTag} />
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                        {loading ? (
                            <>
                                {Array(4)
                                    .fill()
                                    .map((_, key) => (
                                        <div className="flex flex-col gap-2">
                                            <Skeleton height={200} borderRadius={15} className="rounded-2xl" />
                                            <Skeleton height={40} borderRadius={15} className="rounded-2xl" />
                                        </div>
                                    ))}
                            </>
                        ) : videos.data?.length > 0 ? (
                            videos?.data?.map((video, key) => <VideoBox info={video} />)
                        ) : (
                            <>
                                <h1 className="text-center mt-4 mb-4 items-center font-medium text-4xl col-span-8">Videos not found</h1>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Search;
