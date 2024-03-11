import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Categories = () => {
    const location = useLocation();
    const [categories, setCategories] = useState();

    const getCategories = async () => {
        axios.get("Main/getCategories").then((res) => {
            setCategories(res.data);
        });
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <section className="mt-4 mb-1 px-3">
                <div className="container mx-auto overflow-x-scroll hide-scrollbar">
                    <div className="flex md:gap-x-8 gap-x-4 md:text-lg">
                        {categories?.map((category, key) => (
                            <>
                                <div className={location.search === `?q=${category?.title}` ? "font-medium" : ""}>
                                    <Link to={`/search?q=${category?.title}`}>{category?.title}</Link>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Categories;
