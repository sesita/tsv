import axios from "axios";
import { useParams } from "react-router-dom";
import Banner from "../components/SingleVideo/Banner";
import MainBox from "../components/SingleVideo/MainBox";
import React, { useState, useEffect } from "react";

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
            <Banner text={video?.category?.title} />
            <MainBox info={video} />
        </>
    );
};

export default SingleVideo;
