import axios from "axios";
import Skeleton from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
                <div className="md:w-10/12 mx-auto overflow-x-scroll hide-scrollbar">
                    <div className="flex md:gap-x-8 gap-x-4 md:text-lg">
                        {categories?.length > 0 ? (
                            categories?.map((category, key) => (
                                <>
                                    <div className={location.search === `?q=${category?.title}` ? "font-medium" : ""}>
                                        <Link to={`/search?q=${category?.title}`}>{category?.title}</Link>
                                    </div>
                                </>
                            ))
                        ) : (
                            <div className="flex gap-x-8">
                                <Skeleton borderRadius={150} width={120} height={25} />
                                <Skeleton borderRadius={150} width={80} height={25} />
                                <Skeleton borderRadius={150} width={150} height={25} />
                                <Skeleton borderRadius={150} width={180} height={25} />
                                <Skeleton borderRadius={150} width={100} height={25} />
                                <Skeleton borderRadius={150} width={70} height={25} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Categories;
