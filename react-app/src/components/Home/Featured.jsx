import "swiper/css";
import React from "react";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import AdsRibon from "../Common/AdsRibon";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Featured = () => {
    return (
        <>
            <Swiper
                autoplay={{
                    delay: 1300,
                    disableOnInteraction: false,
                }}
                effect={"fade"}
                navigation={true}
                modules={[Autoplay, EffectFade, Navigation]}
            >
                <SwiperSlide>
                    <section className="pt-16 pb-32 md:px-0 px-6">
                        <img src={require("../../assets/img/Home-Featured.png")} className="absolute w-full h-full top-0 object-cover" alt="Cover" />
                        <div className="container mx-auto text-white relative">
                            <div className="w-[100%] max-w-[450px]">
                                <h4 className="md:text-3xl text-lg">
                                    <span className="drop-shadow">Lorem Ipsum</span>
                                    <AdsRibon />
                                </h4>
                                <h1 className="md:text-5xl text-2xl font-semibold md:font-bold my-3 md:leading-tight text-white opacity-95 drop-shadow">Lorem Ipsum is simply dummy text of the printing</h1>
                                <Link to={""}>
                                    <img src={require("../../assets/img/PlayIcon.png")} alt="Play Icon" className="inline w-full md:max-w-[100px] max-w-[45px]" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
                <SwiperSlide>
                    <section className="pt-16 pb-32 md:px-0 px-6">
                        <img src="https://picsum.photos/1200/400" className="absolute w-full h-full top-0 object-cover" alt="Cover" />
                        <div className="container mx-auto text-white relative">
                            <div className="w-[100%] max-w-[450px]">
                                <h4 className="md:text-3xl text-lg">
                                    <span className="drop-shadow">Lorem Ipsum</span>
                                    <AdsRibon />
                                </h4>
                                <h1 className="md:text-5xl text-2xl font-semibold md:font-bold my-3 md:leading-tight text-white opacity-95 drop-shadow">Lorem Ipsum is simply dummy text of the printing</h1>
                                <Link to={""}>
                                    <img src={require("../../assets/img/PlayIcon.png")} alt="Play Icon" className="inline w-full md:max-w-[100px] max-w-[45px]" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Featured;
