import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import React, { useState, useEffect } from "react";
import MainBox from "../components/SingleVideo/MainBox";

const SingleVideo = () => {
    const { slug } = useParams();
    const [video, setVideo] = useState([]);

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
    }, [video]);

    return (
        <>
            <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-black pt-10 pb-20">
                <div className="mx-auto sm:w-10/12 px-2 sm:px-0">
                    <h2 className="text-white sm:text-5xl text-3xl font-semibold">{video?.category?.title ?? <Skeleton baseColor="#475569" borderRadius={30} width={250} height={50} />}</h2>
                </div>
            </div>
            <MainBox info={video} />
        </>
    );
};

export default SingleVideo;
