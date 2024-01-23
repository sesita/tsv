import FilterOptions from "../../components/Common/FilterOptions";
import Videos from "../../components/Home/Videos";
import UserLayout from "../../components/Layouts/UserLayout";
import ProfileInfoBox from "../../components/User/ProfileInfoBox";

const VideosPage = () => {
  return (
    <>
      <UserLayout pageTitle="Videos">
        <ProfileInfoBox />
        <div>
          <FilterOptions />
          <div className="mt-24">
            <Videos hideShadow={true} />
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default VideosPage;
