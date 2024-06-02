import React from "react";

const Banner = ({ pageTitle, children }) => {
    return (
        <>
            <div
                className="pt-12 pb-32"
                style={{
                    background: `url(${require("../../assets/img/User-page-banner.png")})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    aspectRatio: "16:9",
                }}
            >
                <div className="mx-auto sm:w-10/12 sm:px-0 px-2 flex justify-between items-center">
                    {pageTitle && <h2 className="text-white md:text-6xl text-3xl font-medium mb-14 mt-6">{pageTitle}</h2>}
                    {children}
                    <div>
                        <ul className="text-white text-2xl font-medium">
                            <li>
                                <a href="#">Videos</a>
                            </li>
                            <li>
                                <a href="#">Videos</a>
                            </li>
                            <li>
                                <a href="#">Videos</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
