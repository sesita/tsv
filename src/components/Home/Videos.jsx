import React from "react";
import { Link } from "react-router-dom";
import VideoBox from "../Common/VideoBox";

const Videos = ({ hideShadow }) => {
    return (
        <>
            <section className="mb-16 md:px-0 px-3">
                <div className={`container mx-auto ${hideShadow ? "" : "shadow-lg"} pt-6 px-8 rounded-2xl -mt-20 z-20 bg-white pb-10`}>
                    <h2 className="text-3xl mb-6">
                        Songs{" "}
                        <Link to={""} className="text-sm text-[#C60C0D]">
                            View All Songs
                        </Link>
                    </h2>
                    <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-16">
                        <VideoBox
                            info={{
                                _id: 1,
                                thumbnail: require("../../assets/img/Video1.png"),
                                title: "Lorem Ipsum is simply dummy text of the printing.",
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 2,
                                thumbnail: require("../../assets/img/Video2.png"),
                                title: "Lorem Ipsum is simply dummy text of the printing.",
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 3,
                                thumbnail: require("../../assets/img/Video3.png"),
                                title: "Lorem Ipsum is simply dummy text of the printing.",
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 4,
                                thumbnail: require("../../assets/img/Video4.png"),
                                title: "Lorem Ipsum is simply dummy text of the printing.",
                            }}
                        />
                    </div>

                    <h2 className="text-3xl mb-6">
                        Movies{" "}
                        <Link to={""} className="text-sm text-[#C60C0D]">
                            View All Movies
                        </Link>
                    </h2>
                    <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-16">
                        <VideoBox
                            info={{
                                _id: 1,
                                thumbnail: require("../../assets/img/Video1.png"),
                                title: "Lorem Ipsum is simply dummy text of the printing.",
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 2,
                                thumbnail: require("../../assets/img/Video2.png"),
                                title: "Lorem Ipsum is simply dummy text of the printing.",
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 3,
                                thumbnail: require("../../assets/img/Video3.png"),
                                title: "Lorem Ipsum is simply dummy text of the printing.",
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 4,
                                thumbnail: require("../../assets/img/Video4.png"),
                                title: "Lorem Ipsum is simply dummy text of the printing.",
                            }}
                        />
                    </div>

                    <button className="bg-[#C60C0D] hover:bg-[#e22121] text-white font-semibold rounded-full py-2 px-8 mx-auto block transition-all">Load More</button>
                </div>
            </section>
        </>
    );
};

export default Videos;
