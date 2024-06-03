import React, { useEffect } from "react";
import Upload from "../components/User/Upload";
import { usePageTitle } from "../components/Layouts/UserLayout";

const SettingsPage = () => {
    const setPageTitle = usePageTitle();

    useEffect(() => {
        setPageTitle("Upload New Video 🥳");
    }, [setPageTitle]);

    return (
        <>
            <Upload />
        </>
    );
};

export default SettingsPage;
