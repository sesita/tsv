import { BiLogoTelegram } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";

const Comments = ({ info }) => {
    const { currentUser } = useAuth();

    return (
        <>
            <div className="rounded-3xl bg-[#ECECEC] p-8 mt-5">
                {currentUser && (
                    <div className="flex items-center gap-5 mb-4">
                        <img src={currentUser?.avatar} className="w-[45px] h-[45px] rounded-full" alt="Avatar" />
                        <input type="text" className="text-[#ACACAC] border-0 border-b-[1px] border-b-[#ACACAC] flex-1 bg-transparent outline-none py-1" placeholder="Add Comment" />
                        <BiLogoTelegram className="text-4xl cursor-pointer" />
                    </div>
                )}

                <div className="bg-[#FFFFFF] rounded-2xl pt-2 pb-6 px-5">
                    {info.comments?.length > 0 ? (
                        info.comments.map((comment, key) => (
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
                                </div>
                                {comment.replies.length > 0 && (
                                    <div className="pl-[25px] mt-[20px] mb-[20px]">
                                        {comment.replies.map((reply, replyKey) => (
                                            <div key={replyKey} className="flex items-center gap-3">
                                                <img src={reply.user.avatar} className="w-[35px] h-[35px] rounded-full" alt="User Avatar" />
                                                <div>
                                                    <h4 className="flex items-center gap-2 font-bold text-xs">
                                                        {reply.user.name}
                                                        <span className="text-[10px] text-[#BCBCBC]">{reply.created_at}</span>
                                                    </h4>
                                                    <p className="text-[11px] text-[#000000]">{reply.comment}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {key !== info.comments.length - 1 && <hr className="bg-[#000000] mt-2 mb-3" />}
                            </div>
                        ))
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
