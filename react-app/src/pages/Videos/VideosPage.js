import Videos from "../../components/Home/Videos";
import UserLayout from "../../components/Layouts/UserLayout";
import FilterOptions from "../../components/Common/FilterOptions";

const VideosPage = () => {
    return (
        <>
            <UserLayout>
                <FilterOptions />
                <div className="mt-24">
                    <Videos hideShadow={true} />
                </div>
            </UserLayout>
        </>
    );
};

export default VideosPage;
