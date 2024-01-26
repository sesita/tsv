import Header from "../Common/Header";

const NormalLayout = ({ children, searchQuery }) => {
  return (
    <>
      <Header searchQuery={searchQuery} />
      {children}
    </>
  );
};

export default NormalLayout;
