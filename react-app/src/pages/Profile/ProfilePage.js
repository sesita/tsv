import UserLayout from "../../components/Layouts/UserLayout";
import Profile from "../../components/User/Profile";

const ProfilePage = () => {
  return (
    <>
      <UserLayout pageTitle={"Profile"}>
        <Profile />
      </UserLayout>
    </>
  );
};

export default ProfilePage;
