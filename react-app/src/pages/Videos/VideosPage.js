import Videos from "../../components/Home/Videos";
import UserLayout from "../../components/Layouts/UserLayout";
import FilterOptions from "../../components/Common/FilterOptions";

const VideosPage = () => {
    return (
        <>
            <UserLayout>
                <div className="flex justify-center">
                    <FilterOptions />
                </div>
                <div className="mt-16">
                    <Videos hideShadow={true} />
                </div>
            </UserLayout>
        </>
    );
};

export default VideosPage;
