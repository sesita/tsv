import React from "react";

const Banner = ({ pageTitle }) => {
  return (
    <>
      <section
        className="pt-20 pb-48"
        style={{
          background: `url(${require("../../assets/img/User-page-banner.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          aspectRatio: "16:9",
        }}
      >
        <div className="container mx-auto lg:px-0 px-2">
          <h2 className="text-white text-5xl font-medium">{pageTitle}</h2>
        </div>
      </section>
    </>
  );
};

export default Banner;
