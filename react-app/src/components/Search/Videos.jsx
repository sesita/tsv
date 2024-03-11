import axios from "axios";
import { useEffect, useState } from "react";
import VideoBox from "../Common/VideoBox";
import FilterOptions from "../Common/FilterOptions";

const Videos = ({ searchQuery }) => {
    const [videos, setVideos] = useState([]);
    const [activeTag, setActiveTag] = useState(null);

    const getVideos = async () => {
        const res = await axios.get("Main/getVideos", {
            params: {
                search: searchQuery,
                tag: activeTag,
            },
        });
        setVideos(res.data);
    };

    const getTags = async () => {
        const res = await axios.get("Main/getVideos", {
            params: {
                search: searchQuery,
            },
        });
        setVideos(res.data);
    };


    useEffect(() => {
        getVideos();
    }, [searchQuery]);

    return (
        <>
            <section className="mb-16 md:px-0 px-3">
                <div className="mx-auto md:w-[88%] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.25)] pt-8 px-12 rounded-[29px] -mt-24 z-20 bg-white pb-10">
                    <FilterOptions searchQuery={searchQuery} getVideos={getVideos} activeTag={activeTag} setActiveTag={setActiveTag} />
                    <div className={videos.data?.length > 0 ? `grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2` : `flex`}>
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
                                <h1 className="text-center w-full mt-4 mb-4 items-center font-medium text-4xl">
                                    Videos not found 
                                </h1>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Videos;
