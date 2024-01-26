import React from "react";
import UserLayout from "../../components/Layouts/UserLayout";
import ProfileInfoBox from "../../components/User/ProfileInfoBox";
import Settings from "../../components/User/Settings";

const SettingsPage = () => {
  return (
    <>
      <UserLayout pageTitle={"Settings"}>
        <ProfileInfoBox />
        <Settings />
      </UserLayout>
    </>
  );
};

export default SettingsPage;
