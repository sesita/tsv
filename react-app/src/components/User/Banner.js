import React from "react";

const Banner = ({ pageTitle, children }) => {
    return (
        <>
            <section
                className="pt-12 pb-32"
                style={{
                    background: `url(${require("../../assets/img/User-page-banner.png")})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    aspectRatio: "16:9",
                }}
            >
                <div className="container mx-auto lg:px-0 px-2">
                    {pageTitle ? (
                        <h2 className="text-white text-6xl font-medium mb-14 mt-6">
                            {pageTitle}
                        </h2>
                    ) : null}
                    {children}
                </div>
            </section>
        </>
    );
};

export default Banner;
