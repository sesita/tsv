import React from "react";
import Upload from "../../components/User/Upload";
import UserLayout from "../../components/Layouts/UserLayout";

const SettingsPage = () => {
    return (
        <>
            <UserLayout pageTitle={"Upload New Video 🥳"}>
                <Upload />
            </UserLayout>
        </>
    );
};

export default SettingsPage;
