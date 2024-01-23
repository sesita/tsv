import React from "react";
import { Link } from "react-router-dom";
import AdsRibon from "../Common/AdsRibon";

const Featured = () => {
  return (
    <>
      <section
        className="pt-20 pb-36 md:px-0 px-3"
        style={{
          background: `url(${require("../../assets/img/Home-Featured.png")})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto text-white">
          <div className="w-[100%] max-w-[450px]">
            <h4 className="md:text-3xl text-lg">
              Lorem Ipsum
              <AdsRibon />
            </h4>
            <h1 className="md:text-5xl text-2xl font-semibold my-3">
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
