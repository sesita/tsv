const Video = () => {
    return (
        <>
            <section className="max-h-[800px] md:h-[500px] w-full flex justify-center items-center relative">
                <img
                    src={require("../../assets/img/SingleVideo.png")}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl"
                />
                <button className="absolute">
                    <img
                        src={require("../../assets/img/PlayIcon3.png")}
                        alt=""
                        className="text-3xl w-20"
                    />
                </button>
            </section>
        </>
    );
};

export default Video;
