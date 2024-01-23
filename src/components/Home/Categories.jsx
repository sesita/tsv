import React from "react";
import { Link, useLocation  } from "react-router-dom";

const Categories = () => {
  const location = useLocation();
  return (
    <>
      <section className="mt-4 mb-1 px-3">
        <div className="container mx-auto overflow-x-scroll hide-scrollbar">
          <div className="flex gap-x-8">
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
