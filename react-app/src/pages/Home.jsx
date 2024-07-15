import "swiper/css";
import axios from "axios";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import AdsRibon from "../components/Common/AdsRibon";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoBox from "../components/Common/VideoBox";
import { Autoplay, EffectFade, Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [videosRecommended, setVideosRecommended] = useState({ data: [], total: 0 });
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

    const fetchPopular = async () => {
        try {
            const response = await axios.get("Main/getVideos", {
                params: {
                    orderBy: "popular",
                    paginate: 4,
                },
            });
            setVideos(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchRecommended = async (page) => {
        const recommendedTags = JSON.parse(localStorage.getItem("recommendedTags"));
        try {
            const response = await axios.get("Main/getVideos", {
                params: {
                    tag: recommendedTags ?? [],
                    paginate: 4,
                    page,
                },
            });
            setVideosRecommended((videosRecommended) => ({
                data: [...videosRecommended.data, ...(response.data?.data || [])],
                total: response.data?.total || 0,
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchNextData = async () => {
        await fetchRecommended(2);
        return videosRecommended;
    };

    useEffect(() => {
        fetchPopular(1);
        fetchRecommended(1);
        fetchSliderVideos();
    }, []);

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
                    sliderVideos.data?.map((video) => (
                        <SwiperSlide key={video.id}>
                            <section className="md:pt-16 pt-8 md:pb-32 pb-28">
                                <img src={video?.thumbnail} className="absolute w-full h-full top-0 object-cover" alt="Cover" />
                                <div className="container text-white relative px-4">
                                    <div className="w-[100%] max-w-[450px]">
                                        <h4 className="md:text-3xl text-lg">
                                            <span className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{video?.category?.title}</span>
                                            <AdsRibon />
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
                    <Skeleton className="rounded-2xl h-[26rem] -top-2" />
                )}
            </Swiper>
            <div className="relative container shadow-[0px_0px_14px_0px_rgba(0,0,0,0.25)] sm:pt-8 pt-6 sm:rounded-3xl sm:px-10 -mt-24 mb-16 z-10 bg-white pb-10">
                <h2 className="sm:text-4xl sm:font-normal font-medium text-lg sm:mb-8 mb-6 px-4 sm:px-0 flex justify-between items-center sm:block">
                    Most Popular
                    <Link to={""} className="text-sm ml-4 font-normal text-primary">
                        View All Videos
                    </Link>
                </h2>

                <div className="mb-5">
                    <Swiper
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                        pagination={{
                            el: ".swip-pagination",
                        }}
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                    >
                        {videos.data?.length > 0 ? (
                            videos.data?.map((video) => (
                                <SwiperSlide key={video.id}>
                                    <VideoBox info={video} />
                                </SwiperSlide>
                            ))
                        ) : (
                            <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 mb-16">
                                {Array(4)
                                    .fill()
                                    .map((_, key) => (
                                        <div className="flex flex-col gap-2" key={key}>
                                            <Skeleton height={200} borderRadius={15} className="rounded-2xl" />
                                            <Skeleton height={40} borderRadius={15} className="rounded-2xl" />
                                        </div>
                                    ))}
                            </div>
                        )}
                    </Swiper>
                    <span className="swip-pagination flex justify-center mt-6 fill-primary"></span>
                </div>

                <h2 className="sm:text-4xl sm:font-normal font-medium text-lg sm:mb-8 mb-6 px-4 sm:px-0 flex justify-between items-center sm:block">
                    Recommended
                    <Link to={""} className="text-sm ml-4 font-normal text-primary">
                        View All Videos
                    </Link>
                </h2>
                {videosRecommended?.data?.length > 0 ? (
                    <>
                        <InfiniteScroll
                            dataLength={videosRecommended?.total}
                            next={fetchNextData}
                            hasMore={videosRecommended?.total !== videosRecommended?.data?.length}
                            loader={Array(4)
                                .fill()
                                .map((_, key) => (
                                    <div className="flex flex-col gap-2" key={key}>
                                        <Skeleton height={200} borderRadius={15} className="rounded-2xl" />
                                        <Skeleton height={40} borderRadius={15} className="rounded-2xl" />
                                    </div>
                                ))}
                            refreshFunction={fetchRecommended}
                            className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 mb-16"
                        >
                            {videosRecommended?.data?.map((video, key) => (
                                <VideoBox info={video} key={key} />
                            ))}
                        </InfiniteScroll>
                    </>
                ) : (
                    <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 mb-16">
                        {Array(8)
                            .fill()
                            .map((_, key) => (
                                <div className="flex flex-col gap-2" key={key}>
                                    <Skeleton height={200} borderRadius={15} className="rounded-2xl" />
                                    <Skeleton height={40} borderRadius={15} className="rounded-2xl" />
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
