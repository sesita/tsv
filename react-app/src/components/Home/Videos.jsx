import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoBox from "../Common/VideoBox";
import axios from "axios";

const Videos = ({ hideShadow }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("getVideos", {
                    orderBy: "views",
                    paginate: 4,
                });
                setVideos(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <section className="mb-16 md:px-0 px-3">
                <div className={`mx-auto md:w-[88%] ${hideShadow ? "" : "shadow-[0px_0px_14px_0px_rgba(0,0,0,0.25)]"} pt-8 px-12 rounded-[29px] -mt-24 z-20 bg-white pb-10`}>
                    <h2 className="md:text-[40px] md:text-3xl sm:text-lg mb-8">
                        Most Popular{" "}
                        <Link to={""} className="md:text-sm text-xs font-normal text-[#C60C0D]">
                            View All Videos
                        </Link>
                    </h2>
                    <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-12">
                        {videos?.data?.map((video, key) => (
                            <VideoBox
                                info={{
                                    _id: video.id,
                                    thumbnail: video.thumbnail,
                                    title: video.title,
                                }}
                            />
                        ))}
                    </div>

                    <h2 className="md:text-[40px] md:text-3xl sm:text-lg mb-8">
                        Recommended{" "}
                        <Link to={""} className="md:text-sm text-xs font-normal text-[#C60C0D]">
                            View All Videos
                        </Link>
                    </h2>
                    <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-16">
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
