import { useParams } from "react-router-dom";
import NormalLayout from "../../components/Layouts/NormalLayout";
import Banner from "../../components/SingleVideo/Banner";
import MainBox from "../../components/SingleVideo/MainBox";
import Categories from "../../components/Home/Categories";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleVideo = () => {
    const { slug } = useParams();
    const [video, setVideo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("getVideos", {
                    slug: slug,
                });
                setVideo(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <NormalLayout>
                <Categories />
                <Banner text={video?.category?.title} />
                <MainBox info={video} />
            </NormalLayout>
        </>
    );
};

export default SingleVideo;
