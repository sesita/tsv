import React from "react";
import UserLayout from "../../components/Layouts/UserLayout";
import TotalInfo from "../../components/Analytics/TotalInfo";
import Devices from "../../components/Analytics/Devices";
import Graph from "../../components/Analytics/Graph";

const AnalyticsSinglePage = () => {
  return (
    <UserLayout pageTitle={"Analytics Single"}>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={require("../../assets/img/Video1.png")}
          alt="Play Icon White"
          className="w-full max-w-[250px]"
        />
        <h2 className="text-[25px] font-bold max-w-[400px] w-full">
          Lorem Ipsum is simply dummy text of the printing.
        </h2>
      </div>
      <TotalInfo />
      <div className="flex justify-between gap-6 md:flex-row flex-col">
        <Graph />
        <Devices />
      </div>
    </UserLayout>
  );
};

export default AnalyticsSinglePage;
