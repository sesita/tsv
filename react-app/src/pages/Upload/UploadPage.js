import React from "react";
import Upload from "../../components/User/Upload";
import PriceTable from "../../components/Common/PriceTable";
import UserLayout from "../../components/Layouts/UserLayout";

const SettingsPage = () => {
    return (
        <>
            <UserLayout pageTitle={"Upload New Video 🥳"}>
                    <PriceTable tableId={"prctbl_1OtW9ZB9uNXBCzh8wvxphwYE"} className="col-span-1" />
                <Upload />
            </UserLayout>
        </>
    );
};

export default SettingsPage;
