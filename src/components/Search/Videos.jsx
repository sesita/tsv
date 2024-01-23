import React from "react";
import VideoBox from "../Common/VideoBox";
import FilterOptions from "../Common/FilterOptions";

const Videos = ({ searchQuery }) => {
  return (
    <>
      <section className="md:px-0 px-2">
        <div className="container mx-auto">
          <div className="shadow-lg rounded-2xl py-8 px-6 bg-white -mt-20 mb-12">
            <FilterOptions />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
              <VideoBox
                info={{
                  _id: 1,
                  thumbnail: require("../../assets/img/Video1.png"),
                  title: "Lorem Ipsum is simply dummy text of the printing.",
                }}
              />
              <VideoBox
                info={{
                  _id: 2,
                  thumbnail: require("../../assets/img/Video2.png"),
                  title: "Lorem Ipsum is simply dummy text of the printing.",
                }}
              />
              <VideoBox
                info={{
                  _id: 3,
                  thumbnail: require("../../assets/img/Video3.png"),
                  title: "Lorem Ipsum is simply dummy text of the printing.",
                }}
              />
              <VideoBox
                info={{
                  _id: 4,
                  thumbnail: require("../../assets/img/Video4.png"),
                  title: "Lorem Ipsum is simply dummy text of the printing.",
                }}
              />
              <VideoBox
                info={{
                  _id: 5,
                  thumbnail: require("../../assets/img/Video1.png"),
                  title: "Lorem Ipsum is simply dummy text of the printing.",
                }}
              />
              <VideoBox
                info={{
                  _id: 6,
                  thumbnail: require("../../assets/img/Video2.png"),
                  title: "Lorem Ipsum is simply dummy text of the printing.",
                }}
              />
              <VideoBox
                info={{
                  _id: 7,
                  thumbnail: require("../../assets/img/Video3.png"),
                  title: "Lorem Ipsum is simply dummy text of the printing.",
                }}
              />
              <VideoBox
                info={{
                  _id: 8,
                  thumbnail: require("../../assets/img/Video4.png"),
                  title: "Lorem Ipsum is simply dummy text of the printing.",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Videos;
