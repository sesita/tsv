import React, { useEffect, useState } from "react";
import { RiFilter2Fill } from "react-icons/ri";
import { FiChevronRight } from "react-icons/fi";

const FilterOptions = () => {
  const [activeTag, setActiveTag] = useState("");
  const [terms, setTerms] = useState(null);
  useEffect(() => {
    setTerms(["Songs", "Movies", "Cartoons", "Series", "Animal", "Food"]);
  }, []);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <section className="mt-5 mb-8">
        <div className="flex gap-2 flex-wrap">
          <button
            className={`py-1 px-5 rounded-full text-sm text-center ${
              activeTag === ""
                ? "text-white bg-[#0A2A8D]"
                : "text-[#0A2A8D] bg-[#A3A3A336]"
            }`}
            onClick={() => setActiveTag("")}
          >
            All
          </button>
          {terms?.map((term) => (
            <button
              className={`py-1 px-5 rounded-full text-sm text-center ${
                activeTag === term
                  ? "text-white bg-[#0A2A8D]"
                  : "text-[#0A2A8D] bg-[#A3A3A336]"
              }`}
              onClick={() => setActiveTag(term)}
            >
              {term}
            </button>
          ))}
        </div>
        <div className="relative mt-4">
          <button
            className="flex items-center gap-3"
            onClick={() => setShowFilter(!showFilter)}
          >
            <span className="bg-[#C60C0D] rounded-full w-10 h-10 flex items-center justify-center">
              <RiFilter2Fill className="text-white text-2xl" />
            </span>
            <span className="text-[#0A2A8D] flex items-center text-sm">
              Show Filters <FiChevronRight />
            </span>
          </button>
          {showFilter && (
            <div className="rounded-2xl shadow-lg py-8 px-6 max-w-[500px] w-full absolute top-16 left-0 bg-[#fafafa] z-20 gap-5 flex flex-col">
              <input
                type="text"
                className="bg-[#ECECEC] text-[#B9B9B9] py-2 px-5 rounded-full w-full outline-none"
                placeholder="Select your city"
              />
              <input
                type="text"
                className="bg-[#ECECEC] text-[#B9B9B9] py-2 px-5 rounded-full w-full outline-none"
                placeholder="Select your country"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FilterOptions;
