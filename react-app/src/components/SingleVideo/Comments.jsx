import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiLogoTelegram } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Comments = ({ info }) => {
    const { currentUser } = useAuth();
    const [comment, setComment] = useState();
    const [reply, setReply] = useState();
    const [comments, setComments] = useState({});
    const commentInput = useRef();

    useEffect(() => {
        setComments(info?.comments);
    }, [info]);

    function displayComments(comments) {
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
                {(key !== comments.length - 1 && comment.replies?.length > 0) && <hr className="bg-[#000000] mt-2 mb-3" />}
            </div>
        ));
    }

    const addComment = (e) => {
        e.preventDefault();
        commentInput.current.value = '';
        const res = axios
            .post("Video/addComment", {
                comment: comment,
                video_id: info.id,
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

        return res;
    };

    const interaction = () => {};

    return (
        <>
            <div className="rounded-3xl bg-[#ECECEC] p-8 mt-5">
                {currentUser && (
                    <>
                        {reply && (
                            <div className="mb-4 mr-auto shadow rounded-xl p-3">
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

                <div className="bg-[#FFFFFF] rounded-2xl pt-2 pb-6 px-5">
                    {comments?.length > 0 ? (
                        displayComments(comments)
                    ) : (
                        <>
                            <h1 className="text-center mt-4 text-lg font-medium">No comments yet...</h1>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Comments;
