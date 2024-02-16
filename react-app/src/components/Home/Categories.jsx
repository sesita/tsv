import React from "react";
import { Link, useLocation  } from "react-router-dom";

const Categories = () => {
  const location = useLocation();
  return (
    <>
      <section className="mt-4 mb-1 px-3">
        <div className="container mx-auto overflow-x-scroll hide-scrollbar">
          <div className="flex md:gap-x-8 gap-x-4 md:text-lg">
            <div className={location.search === '?q=plumbers' ? 'font-medium': ''}>
              <Link to={"/search?q=plumbers"}>Plumbers</Link>
            </div>
            <div className={location.search === '?q=doctors' ? 'font-medium': ''}>
              <Link to={"/search?q=doctors"}>Doctors</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
