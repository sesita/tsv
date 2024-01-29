import React from "react";
import { Link } from "react-router-dom";
import { FaFire } from "react-icons/fa";

const Featured = () => {
    return (
        <>
            <section
                className="pt-16 pb-32 md:px-0 px-3"
                style={{
                    background: `url(${require("../../assets/img/Home-Featured.png")})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="container mx-auto text-white">
                    <div className="w-[100%] max-w-[450px]">
                        <h4 className="md:text-3xl text-lg flex items-center gap-4">
                            <span>Lorem Ipsum</span>
                            <span className="text-[12px] bg-[#c70b0d] font-italic rounded-[4px] px-[14px] font-semibold shadow-lg flex items-center gap-2">
                                <FaFire /> Featured
                            </span>
                        </h4>
                        <h1 className="md:text-5xl text-2xl font-semibold md:font-bold my-3 md:leading-tight text-white opacity-95">
                            Lorem Ipsum is simply dummy text of the printing
                        </h1>
                        <Link to={""}>
                            <img
                                src={require("../../assets/img/PlayIcon.png")}
                                alt="Play Icon"
                                className="inline w-full md:max-w-[100px] max-w-[45px]"
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Featured;
