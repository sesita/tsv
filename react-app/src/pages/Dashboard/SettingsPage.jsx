import React from "react";
import { useEffect } from "react";
import Settings from "../../components/User/Settings";
import { usePageTitle } from "../../components/Layouts/UserLayout";

const SettingsPage = () => {
    const setPageTitle = usePageTitle();

    useEffect(() => {
        setPageTitle("Settings");
    }, [setPageTitle]);

    return (
        <>
            <Settings />
        </>
    );
};

export default SettingsPage;
