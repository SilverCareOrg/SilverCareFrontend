import findmore_sport from "../images/findmore_sport.png";
const ArticleHead = () => {
  return (
    <div className=" flex items-center justify-center md:my-14">
      <div className="w-full flex items-center justify-center ">
        <div className="flex flex-col justify-center items-center min-[1300px]:items-start">
          <img
            // style={{
            //   transition: "transform 0.2s", // Add a smooth transition effect
            // }}
            // onMouseEnter={(e) => {
            //   e.currentTarget.style.transform = "scale(1.0025)"; // Increase the scale when hovering
            // }}
            // onMouseLeave={(e) => {
            //   e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
            // }}
            className=" object-cover min-[1300px]:w-[1200px] lg:w-[1000px] lg:h-[530px] md:w-[1000px] md:h-[428px] sm:w-[850px] sm:h-[365px] w-[650px] h-[278px]"
            src={findmore_sport} // Replace with your image URL
            alt="imagine sport"
          />
          <div className="flex px-4 md:px-0 flex-col min-[1300px]:w-[1200px] lg:w-[1000px] md:w-[750px] sm:w-[625px] sm:max-w-[1500px] max-w-[500px]">
            <div className="flex items-center gap-12 pt-1">
              <p>autor</p>
              <p>data</p>
              <p>timp de citire?</p>
            </div>
            <div className="pt-1 flex min-[1300px]:justify-normal justify-center">
              <p className="text-xl sm:text-2xl mt-2 md:mt-8 lg:text-3xl min-[1300px]:w-[1200px] lg:w-[848px]">
                Imbunatatirea sănătății seniorilor. Un ghid cuprinzător pentru
                Imbunatatirea sănătății seniorilor. Un ghid cuprinzător pentru
                bunăstarea în anii de aur. bunăstarea în anii de aur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleHead;
