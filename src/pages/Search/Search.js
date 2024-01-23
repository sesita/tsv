import React from "react";
import NormalLayout from "../../components/Layouts/NormalLayout";
import Featured from "../../components/Home/Featured";
import Videos from "../../components/Search/Videos";
import { useLocation } from "react-router-dom";
import Categories from "../../components/Home/Categories";

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("q");

  console.log(searchText);

  return (
    <>
      <NormalLayout searchQuery={searchText}>
        <Categories />
        <Featured />
        <Videos searchQuery={searchText} />
      </NormalLayout>
    </>
  );
};

export default Search;
