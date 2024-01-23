import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <section className="py-2 md:px-0 px-3">
        <div className="container mx-auto overflow-x-scroll hide-scrollbar">
          <div className="flex gap-x-8">
            <div className="min-w-fit">
              <Link to={"/search?q=plumbers"}>Plumbers</Link>
            </div>
            <div className="min-w-fit">
              <Link to={"/search?q=doctors"}>Doctors</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
            <div className="min-w-fit">
              <Link to={""}>Lorem ipsum</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
