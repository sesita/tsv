import axios from "axios";
import { Link } from "react-router-dom";
import VideoBox from "../Common/VideoBox";
import Skeleton from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Videos = ({ hideShadow }) => {
    const [videos, setVideos] = useState([]);
    const [videosRecommended, setVideosRecommended] = useState({ data: [], total: 0 });

    const fetchPopular = async (page) => {
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
                    tag: recommendedTags,
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

    const fetchNextData = async (e) => {
        await fetchRecommended(2);
        return videosRecommended;
    };

    useEffect(() => {
        fetchPopular(1);
        fetchRecommended(1);
    }, []);

    useEffect(() => {
        console.log(videosRecommended);
    }, [videosRecommended]);

    return (
        <>
            <section className="mb-16 relative z-10">
                <div className={`mx-auto md:w-[88%] ${hideShadow ? "" : "shadow-[0px_0px_14px_0px_rgba(0,0,0,0.25)]"} pt-8 md:px-12 md:rounded-[29px] -mt-24 z-20 bg-white pb-10`}>
                    <h2 className="md:text-[40px] md:text-3xl mb-8 px-4 md:px-0 flex justify-between md:block">
                        Most Popular
                        <Link to={""} className="text-sm ml-4 font-normal text-[#C60C0D]">
                            View All Videos
                        </Link>
                    </h2>
                    <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-12">
                        {videos.data?.length > 0 ? (
                            videos?.data?.map((video, key) => (
                                <VideoBox
                                    info={{
                                        slug: video.slug,
                                        thumbnail: video.thumbnail,
                                        title: video.title,
                                    }}
                                />
                            ))
                        ) : (
                            <>
                                {Array(4)
                                    .fill()
                                    .map((_, key) => (
                                        <Skeleton height={250} borderRadius={15} className="rounded-2xl" />
                                    ))}
                            </>
                        )}
                    </div>

                    <h2 className="md:text-[40px] md:text-3xl mb-8 px-4 md:px-0 flex justify-between md:block">
                        Recommended
                        <Link to={""} className="text-sm ml-4 font-normal text-[#C60C0D]">
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
                                        <Skeleton height={250} borderRadius={15} className="rounded-2xl" />
                                    ))}
                                refreshFunction={fetchRecommended}
                                className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-16"
                            >
                                {videosRecommended?.data?.map((video, key) => (
                                    <VideoBox
                                        info={{
                                            slug: video.slug,
                                            thumbnail: video.thumbnail,
                                            title: video.title,
                                        }}
                                    />
                                ))}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <>
                            <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mb-16">
                                {Array(4)
                                    .fill()
                                    .map((_, key) => (
                                        <Skeleton height={250} borderRadius={15} className="rounded-2xl" />
                                    ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Videos;
