import React from "react";
import NormalLayout from "../../components/Layouts/NormalLayout";
import Categories from "../../components/Home/Categories";
import Featured from "../../components/Home/Featured";
import Videos from "../../components/Home/Videos";

const Home = () => {
  return (
    <>
      <NormalLayout>
        <Categories />
        <Featured />
        <Videos />
      </NormalLayout>
    </>
  );
};

export default Home;
