import axios from "axios";
import { RiFilter2Fill } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

const FilterOptions = ({ searchQuery, activeTag, setActiveTag }) => {
    const [terms, setTerms] = useState([]);

    const getTags = async () => {
        const res = await axios.get("Main/getTags", {
            params: {
                search: searchQuery,
            },
        });
        setTerms(res.data);
    };

    const [filters, setFilters] = useState({});
    const [filterDropdown, setfilterDropdown] = useState(false);

    const closeFilterDropdown = () => {
        setfilterDropdown(false);
    };

    const filterDropdownRef = useDetectClickOutside({ onTriggered: closeFilterDropdown });

    const filtersChange = (e) => {
        if (e.target.value.length > 0) {
            setFilters({
                countries: [e.target.value],
            });
        } else {
            setFilters({});
        }
    };

    useEffect(() => {
        getTags();
    }, [searchQuery]);

    return (
        <>
            <section className="flex items-center gap-6 mb-8">
                <div className="flex gap-2 flex-wrap">
                    <button className={`py-1 px-5 rounded-full text-sm text-center ${activeTag === null ? "text-white bg-[#0A2A8D]" : "text-[#0A2A8D] bg-[#A3A3A336]"}`} onClick={() => setActiveTag(null)}>
                        All
                    </button>
                    {terms?.map((term) => (
                        <button className={`py-2 px-6 rounded-full text-center ${activeTag === term?.id ? "text-white bg-[#0A2A8D]" : "text-[#0A2A8D] bg-[#A3A3A336]"}`} onClick={() => setActiveTag(term?.id)}>
                            {term?.title}
                        </button>
                    ))}
                </div>
                <div className="relative" ref={filterDropdownRef}>
                    <button className="flex items-center gap-3" onClick={() => setfilterDropdown(!filterDropdown)}>
                        <span className="bg-[#C60C0D] rounded-full w-10 h-10 flex items-center justify-center">
                            <RiFilter2Fill className="text-white text-2xl" />
                        </span>
                        <span className={`text-[#0A2A8D] flex items-center gap-1.5 ${filters.countries?.length > 0 ? "font-medium underline" : ""}`}>
                            Show Filters
                            <span className={`transition-transform duration-300 transform ${filterDropdown ? "rotate-180" : "rotate-0"}`}>
                                <FiChevronDown />
                            </span>
                        </span>
                    </button>
                    {filterDropdown && (
                        <div className="rounded-2xl py-8 px-6 w-[500px] absolute right-0 bg-[#fafafa] z-10 gap-5 top-12 flex flex-col  border border-gray-200 shadow-[0px_0px_24px_0px_rgba(0,0,0,0.25)]">
                            <select className="bg-gray-200 text-gray-600 py-2 px-5 rounded-full w-full outline-none" onChange={filtersChange}>
                                <option>Select your country</option>
                                <option>USA</option>
                                <option>GEORGIA</option>
                            </select>
                            <select className="bg-gray-200 text-gray-600 py-2 px-5 rounded-full w-full outline-none">
                                <option>Select your city</option>
                                <option>TBILISI</option>
                                <option>RUSTAVI</option>
                            </select>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default FilterOptions;
