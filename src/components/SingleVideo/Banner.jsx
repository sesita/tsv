const Banner = ({ text }) => {
  return (
    <>
      <section className="bg-[#000000] pt-10 pb-20">
        <div className="container mx-auto md:px-0 px-2">
          <h2 className="text-white text-5xl font-semibold">{text}</h2>
        </div>
      </section>
    </>
  );
};

export default Banner;
