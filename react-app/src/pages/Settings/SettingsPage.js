import React from "react";
import UserLayout from "../../components/Layouts/UserLayout";
import Settings from "../../components/User/Settings";

const SettingsPage = () => {
  return (
    <>
      <UserLayout pageTitle={"Settings"}>
        <Settings />
      </UserLayout>
    </>
  );
};

export default SettingsPage;
