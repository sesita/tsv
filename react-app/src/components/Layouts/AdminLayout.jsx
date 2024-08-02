import Banner from "../Common/Banner";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <>
            <Banner pageTitle={"Admin Panel"} />
            <section className="sm:container -mt-28 mb-14">
                <div className="shadow-lg rounded-2xl py-10 px-12 bg-white">
                    <Outlet />
                </div>
            </section>
        </>
    );
};

export default AdminLayout;
