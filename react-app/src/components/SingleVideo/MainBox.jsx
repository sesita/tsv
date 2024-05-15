import axios from "axios";
import Video from "./Video";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import VideoInfo from "./VideoInfo";
import VideoBox from "../Common/VideoBox";

const MainBox = ({ info }) => {
    const [relatedVideos, setRelatedVideos] = useState([]);

    useEffect(() => {
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
    }, [info?.id]);

    return (
        <>
            <div className="mx-auto sm:w-10/12 px-2 sm:px-0">
                <div className="md:rounded-3xl md:py-8 py-4 md:px-8 shadow-[box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.25)] bg-white -mt-10">
                    <Video info={info} />
                    <div className="flex flex-col lg:flex-row gap-6 mt-5">
                        <div className="flex-1">
                            <VideoInfo info={info} />
                            <Comments info={info} />
                        </div>
                        <div className="grid md:grid-cols-3 lg:grid-cols-1 grid-cols-1 w-full lg:max-w-[300px] gap-5 md:p-2 rounded">
                            {relatedVideos.map((video, key) => {
                                return (
                                    <VideoBox
                                        info={video}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainBox;
