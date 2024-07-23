import axios from "axios";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import { IoMdPlay } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../context/AuthContext";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import VideoBox from "../components/Common/VideoBox";
import NumberFormatter from "../components/Common/FormatNumber";
import { AiOutlineLoading, AiFillLike, AiFillDislike } from "react-icons/ai";
import { BiLogoTelegram, BiSolidCommentDetail } from "react-icons/bi";

const SingleVideo = () => {
    const { slug } = useParams();
    const [video, setVideo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const { currentUser } = useAuth();
    const [comment, setComment] = useState();
    const [reply, setReply] = useState();
    const [comments, setComments] = useState({});
    const commentInput = useRef();
    const [likesPercent, setLikesPercent] = useState(0);
    const [data, setData] = useState(0);

    const countInteractionPercent = (likes, dislikes) => {
        const totalVotes = likes + dislikes;
        return totalVotes === 0 ? 0 : (likes / totalVotes) * 100;
    };

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

    useEffect(() => {
        setComments(video?.comments);
        setData(video);
        setLikesPercent(countInteractionPercent(video.likes, video.dislikes));
    }, [video]);

    useEffect(() => {
        setLikesPercent(countInteractionPercent(data.likes, data.dislikes));
    }, [data.likes, data.dislikes]);

    const displayComments = (comments) => {
        return comments.map((comment, key) => (
            <div className="mt-5" key={key}>
                <div className="flex items-center gap-3">
                    <img src={comment.user.avatar} className="w-[50px] h-[50px] rounded-full" alt="User Avatar" />
                    <div>
                        <h3 className="flex items-center gap-2 font-bold">
                            {comment.user.name}
                            <span className="text-[10px] text-[#BCBCBC]">{comment.created_at}</span>
                        </h3>
                        <p className="text-[12px] text-[#000000]">{comment.comment}</p>
                    </div>
                    <span className="ml-auto mr-4 text-sm cursor-pointer" onClick={() => setReply(comment)}>
                        Reply
                    </span>
                </div>
                <div className="pl-[25px] mt-[20px] mb-[20px]">{comment.replies.length > 0 && displayComments(comment.replies)}</div>
                {key !== comments.length - 1 && comment.replies?.length > 0 && <hr className="bg-[#000000] mt-2 mb-3" />}
            </div>
        ));
    };

    const addComment = (e) => {
        e.preventDefault();
        commentInput.current.value = "";
        axios
            .post("Video/addComment", {
                comment: comment,
                video_id: video.id,
                reply: reply?.id,
            })
            .then((res) => {
                if (res.data.status === "success") {
                    setComments(res.data.comments);
                } else {
                    toast.error("Could not add comment");
                }
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message);
            });
    };

    const Interaction = async (status) => {
        if (!currentUser) return toast.error("Require Authorization");
        if (status === data.interaction) return;

        const res = await axios.post("Video/Interaction", {
            video_id: video.id,
            interaction: status,
        });
        if (res.data.status === "success") {
            const oldInteraction = { [data.interaction + "s"]: data[data.interaction + "s"] - 1 };
            const upd = status === "like" ? { likes: data.likes + 1, ...oldInteraction } : { dislikes: data.dislikes + 1, ...oldInteraction };
            setData({ ...video, ...upd, interaction: status });
        } else {
            toast.error("Could not interact");
        }
    };

    return (
        <>
            <div className="bg-gray-800 sm:pt-10 sm:pb-20 pattern">
                <div className="sm:container">
                    <h2 className="text-white sm:text-5xl text-3xl font-semibold px-2">{video?.category?.title ?? <Skeleton baseColor="#475569" borderRadius={30} width={250} height={50} />}</h2>
                </div>
            </div>
            <div className="sm:container">
                <div className="md:rounded-3xl md:py-8 py-4 md:px-8 bg-white -mt-10">
                    <div className="max-h-[800px] md:h-[500px] w-full flex justify-center items-center relative">
                        {loading ? (
                            <>
                                <img src={video.thumbnail} alt="" className="w-full h-full object-cover md:rounded-2xl" />
                                <button className="absolute bg-red-600 text-white text-[65px] p-5 rounded-full">{loading ? <AiOutlineLoading className="animate-spin" /> : <IoMdPlay className="pl-2" />}</button>
                            </>
                        ) : (
                            <ReactPlayer className="object-cover md:rounded-2xl" url={video.video} width='100%' height='100%' controls />
                        )}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6 mt-5">
                        <div className="flex-1">
                            <h2 className="text-3xl font-semibold mx-1.5 md:mx-0">{data.title}</h2>
                            <div className="sm:flex grid grid-cols-4 gap-8 items-center my-4 mb-5 mx-1.5 md:mx-0">
                                <div className="flex gap-2 items-center">
                                    <BsEyeFill className="text-[#8B8B8B] text-3xl" />
                                    <span className="text-md text-[#8B8B8B]">
                                        <NumberFormatter value={data.views} />
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <BiSolidCommentDetail className="text-[#8B8B8B] text-3xl" />
                                    <span className="text-md text-[#8B8B8B]">
                                        <NumberFormatter value={data.comments_count} />
                                    </span>
                                </div>

                                <div className="flex gap-2 items-center cursor-pointer" onClick={() => Interaction("like")}>
                                    <AiFillLike className={`${data?.interaction === "like" ? "text-[#0A2A8D]" : "text-[#8B8B8B]"} text-3xl`} />
                                    <span className="text-md text-[#8B8B8B]">
                                        <NumberFormatter value={data.likes} />
                                    </span>
                                </div>

                                <div className="gap-2 items-center sm:w-[20%] w-0 h-[2px] bg-[#DBDBDB] rounded-full hidden sm:flex">
                                    <span className="bg-[#0A2A8D] h-[3px] rounded-full transition-all duration-500" style={{ width: `${likesPercent}%` }}></span>
                                </div>

                                <div className="flex gap-2 items-center cursor-pointer" onClick={() => Interaction("dislike")}>
                                    <AiFillDislike className={`${data?.interaction === "dislike" ? "text-[#0A2A8D]" : "text-[#8B8B8B]"} text-3xl`} />
                                    <span className="text-md text-[#8B8B8B]">
                                        <NumberFormatter value={data.dislikes} />
                                    </span>
                                </div>
                            </div>

                            <Link to={`/User/Profile/${data?.user?.id}`} className="flex items-center gap-3 mb-8">
                                <img src={data?.user?.avatar} alt="user avatar" className="w-[40px] h-[40px] rounded-full" />
                                <h4 className="text-2xl text-[#8B8B8B]">{data?.user?.name}</h4>
                            </Link>
                            <div className="md:rounded-3xl bg-[#ECECEC] md:p-8 p-4 mt-5">
                                {currentUser && (
                                    <>
                                        {reply && (
                                            <div className="mb-4 mr-auto shadow rounded-xl p-3 bg-white">
                                                <span className="block mb-1">Replying to {reply?.user?.name}</span>
                                                <span className="text-xs ml-2">{reply?.comment}</span>
                                            </div>
                                        )}
                                        <form onSubmit={addComment} className="flex items-center gap-5 mb-6">
                                            <img src={currentUser?.avatar} className="sm:w-[45px] w-[25px] sm:h-[45px] h-[25px] rounded-full" alt="Avatar" />
                                            <input type="text" ref={commentInput} className="text-[#ACACAC] border-0 border-b-[1px] border-b-[#ACACAC] sm:flex-1 w-1/2 bg-transparent outline-none py-2" placeholder="Add Comment" onChange={(e) => setComment(e.target.value)} />
                                            <button type="submit">
                                                <BiLogoTelegram className="sm:text-4xl text-xl cursor-pointer" />
                                            </button>
                                        </form>
                                    </>
                                )}
                                <div className="bg-[#FFFFFF] rounded-2xl pt-2 pb-6 px-5">{comments?.length > 0 ? displayComments(comments) : <h1 className="text-center mt-4 text-lg font-medium">No comments yet...</h1>}</div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 lg:grid-cols-1 grid-cols-1 w-full lg:max-w-[300px] gap-5 md:p-2 rounded">
                            {relatedVideos.map((video, key) => (
                                <VideoBox key={key} info={video} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleVideo;
