import axios from "axios";
import { IoMdPlay } from "react-icons/io";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { AiOutlineLoading } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import VideoBox from "../components/Common/VideoBox";
import VideoInfo from "../components/SingleVideo/VideoInfo";
import Comments from "../components/SingleVideo/Comments";

const SingleVideo = () => {
    const { slug } = useParams();
    const [video, setVideo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [relatedVideos, setRelatedVideos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`Video/${slug}`);
                setVideo(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [slug]);

    useEffect(() => {
        if (video?.tags?.[0]) {
            let Tags = JSON.parse(localStorage.getItem("recommendedTags"));
            if (!Array.isArray(Tags)) Tags = [];
            if (!Tags.includes(video.tags[0].id)) Tags.push(video.tags[0].id);
            if (Tags.length >= 5) delete Tags[0];
            localStorage.setItem("recommendedTags", JSON.stringify(Tags));
        }

        axios
            .get("Main/getVideos", {
                params: {
                    tag: JSON.parse(localStorage.getItem("recommendedTags")),
                    paginate: 3,
                },
            })
            .then((res) => {
                setRelatedVideos(res.data.data);
            });

        if (video.video) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [video]);

    return (
        <>
            <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-black pt-10 pb-20">
                <div className="mx-auto sm:w-10/12 px-2 sm:px-0">
                    <h2 className="text-white sm:text-5xl text-3xl font-semibold">{video?.category?.title ?? <Skeleton baseColor="#475569" borderRadius={30} width={250} height={50} />}</h2>
                </div>
            </div>
            <div className="mx-auto sm:w-10/12 px-2 sm:px-0">
                <div className="md:rounded-3xl md:py-8 py-4 md:px-8 shadow-[box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.25)] bg-white -mt-10">
                    <div className="max-h-[800px] md:h-[500px] w-full flex justify-center items-center relative">
                        {loading ? (
                            <>
                                <img src={video.thumbnail} alt="" className="w-full h-full object-cover md:rounded-2xl" />
                                <button className="absolute bg-red-600 text-white text-[65px] p-5 rounded-full">{loading ? <AiOutlineLoading className="animate-spin" /> : <IoMdPlay className="pl-2" />}</button>
                            </>
                        ) : video.iframe ? (
                            <div dangerouslySetInnerHTML={{ __html: video.iframe }} className="w-full h-full"></div>
                        ) : (
                            <video className="w-full h-full object-cover md:rounded-2xl" controls autoPlay muted>
                                <source src={video.video} type="video/mp4" />
                            </video>
                        )}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6 mt-5">
                        <div className="flex-1">
                            <VideoInfo info={video} />
                            <Comments info={video} />
                        </div>
                        <div className="grid md:grid-cols-3 lg:grid-cols-1 grid-cols-1 w-full lg:max-w-[300px] gap-5 md:p-2 rounded">
                            {relatedVideos.map((video, key) => {
                                return <VideoBox info={video} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleVideo;
