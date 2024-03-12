import React from "react";
import Upload from "../../components/User/Upload";
import PriceTable from "../../components/Common/PriceTable";
import UserLayout from "../../components/Layouts/UserLayout";

const SettingsPage = () => {
    return (
        <>
            <UserLayout pageTitle={"Upload New Video 🥳"}>
                <div className="flex items-center justify-center">
                    <PriceTable tableId={"prctbl_1OtHkRB9uNXBCzh8JtU0CaoD"} />
                    <PriceTable tableId={"prctbl_1OtHUHB9uNXBCzh8U8U7xBYY"} />
                    <PriceTable tableId={"prctbl_1OtHpwB9uNXBCzh8TSnkzLmQ"} />
                </div>
                <Upload />
            </UserLayout>
        </>
    );
};

export default SettingsPage;
