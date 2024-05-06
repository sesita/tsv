import "swiper/css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdsRibon from "../Common/AdsRibon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

const Featured = () => {
    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
        try {
            const response = await axios.get("Main/getVideos", {
                params: {
                    orderBy: 'featured',
                    paginate: 3
                }
            });
            setVideos(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message ?? 'Caught error');
        }
    };

    useEffect(() => {
        fetchVideos();
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
                {videos?.data?.map((video, key) => (
                    <SwiperSlide>
                        <section className="pt-16 pb-32">
                            <img src={video?.thumbnail} className="absolute w-full h-full top-0 object-cover" alt="Cover" />
                            <div className="container mx-auto text-white relative px-4">
                                <div className="w-[100%] max-w-[450px]">
                                    <h4 className="md:text-3xl text-lg">
                                        <span className="drop-shadow">{video?.category?.title}</span>
                                        <AdsRibon />
                                    </h4>
                                    <h1 className="md:text-5xl text-2xl font-semibold md:font-bold my-3 md:leading-tight text-white opacity-95 drop-shadow">
                                        {video.title}
                                    </h1>
                                    <Link to={`/${video?.slug}`}>
                                        <img src={require("../../assets/img/PlayIcon.png")} alt="Play Icon" className="inline w-full md:max-w-[100px] max-w-[45px]" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Featured;
