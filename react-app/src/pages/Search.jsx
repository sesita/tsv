import axios from "axios";
import { useEffect, useState } from "react";
import VideoBox from "../components/Common/VideoBox";
import FilterOptions from "../components/Common/FilterOptions";
import Skeleton from "react-loading-skeleton";

const Search = ({ searchQuery }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTag, setActiveTag] = useState(null);

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
    }, [searchQuery, activeTag]);

    return (
        <>
            <section className="mb-16 md:px-0 px-3 relative z-10">
                <div className="mx-auto md:w-[88%] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.25)] pt-8 px-12 rounded-[29px] -mt-24 z-20 bg-white pb-10">
                    <FilterOptions searchQuery={searchQuery} getVideos={getVideos} activeTag={activeTag} setActiveTag={setActiveTag} />
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                        {loading ? (
                            <>
                                {Array(4)
                                    .fill()
                                    .map((_, key) => (
                                        <Skeleton height={250} borderRadius={15} className="rounded-2xl" />
                                    ))}
                            </>
                        ) : videos.data?.length > 0 ? (
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
