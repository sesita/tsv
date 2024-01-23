import { useParams } from "react-router-dom";
import NormalLayout from "../../components/Layouts/NormalLayout";
import Banner from "../../components/SingleVideo/Banner";
import MainBox from "../../components/SingleVideo/MainBox";

const SingleVideo = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <NormalLayout>
        <Banner text="Animal Videos" />
        <MainBox />
      </NormalLayout>
    </>
  );
};

export default SingleVideo;
