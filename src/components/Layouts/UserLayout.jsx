import React from "react";
import NormalLayout from "./NormalLayout";
import Banner from "../User/Banner";

const UserLayout = ({ pageTitle, children }) => {
  return (
    <>
      <NormalLayout>
        <Banner pageTitle={pageTitle} />
        <section className="container mx-auto lg:px-0 px-2 -mt-28 mb-14">
          <div className="shadow-lg rounded-2xl py-14 px-10 bg-white">
            {children}
          </div>
        </section>
      </NormalLayout>
    </>
  );
};

export default UserLayout;
