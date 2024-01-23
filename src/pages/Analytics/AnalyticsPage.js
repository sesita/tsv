import React, { useEffect, useState } from "react";
import UserLayout from "../../components/Layouts/UserLayout";
import TotalInfo from "../../components/Analytics/TotalInfo";
import Graph from "../../components/Analytics/Graph";
import Devices from "../../components/Analytics/Devices";
import VideoBox from "../../components/Common/VideoBox";

const AnalyticsPage = () => {
  const [resultType, setResultType] = useState("organic");

  useEffect(() => {
    console.log(resultType);
  }, [resultType]);

  return (
    <>
      <UserLayout pageTitle={"Analytics"}>
        <div className="flex items-center justify-end">
          <div className=" flex items-center gap-2 shadow-lg rounded-lg py-3 px-8 bg-slate-300">
            <span>Type: </span>
            <select
              className="bg-transparent outline-none"
              onChange={(e) => {
                setResultType(e.target.value);
              }}
            >
              <option
                value="organic"
                selected={resultType === "organic" ? true : false}
              >
                Organic
              </option>
              <option
                value="promoted"
                selected={resultType === "promoted" ? true : false}
              >
                Promoted
              </option>
            </select>
          </div>
        </div>
        <TotalInfo />
        <div className="flex justify-between gap-6 md:flex-row flex-col">
          <Graph />
          <Devices />
        </div>
        <div className="mt-16">
          <h2 className="text-center text-black text-[40px] font-light mb-8">
            Your top content in this period
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <VideoBox
              info={{
                _id: 1,
                thumbnail: require("../../assets/img/Video1.png"),
                title: "Lorem Ipsum is simply dummy text of the printing.",
              }}
              hidePlayBtn={true}
              analytics={true}
            />
            <VideoBox
              info={{
                _id: 1,
                thumbnail: require("../../assets/img/Video1.png"),
                title: "Lorem Ipsum is simply dummy text of the printing.",
              }}
              hidePlayBtn={true}
              analytics={true}
            />
            <VideoBox
              info={{
                _id: 1,
                thumbnail: require("../../assets/img/Video1.png"),
                title: "Lorem Ipsum is simply dummy text of the printing.",
              }}
              hidePlayBtn={true}
              analytics={true}
            />
            <VideoBox
              info={{
                _id: 1,
                thumbnail: require("../../assets/img/Video1.png"),
                title: "Lorem Ipsum is simply dummy text of the printing.",
              }}
              hidePlayBtn={true}
              analytics={true}
            />
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default AnalyticsPage;
