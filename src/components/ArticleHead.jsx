import findmore_sport from "../images/findmore_sport.png";
const ArticleHead = () => {
  return (
    <div className=" flex items-center justify-center md:my-14">
      <div className="w-full flex items-center max-w-[1450px] justify-center lg:justify-start lg:px-14 ">
        <div className="flex flex-col justify-center items-center lg:items-start">
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
            className=" object-cover lg:w-[1450px] lg:h-[617px] md:w-[1000px] md:h-[428px] sm:w-[850px] sm:h-[365px] w-[650px] h-[278px]"
            src={findmore_sport} // Replace with your image URL
            alt="imagine sport"
          />
          <div className="flex px-4 md:px-0 flex-col lg:w-[950px] md:w-[750px] sm:w-[625px] sm:max-w-[1500px] max-w-[500px]">
            <div className="flex items-center gap-12 pt-1">
              <p>autor</p>
              <p>data</p>
              <p>timp de citire?</p>
            </div>
            <div className="pt-1">
              <p className="text-2xl mt-2 md:mt-8 lg:text-3xl">
                Imbunatatirea sănătății seniorilor. Un ghid cuprinzător pentru
                bunăstarea în anii de aur.
              </p>
              <p className="text-md md:text-lg lg:text-xl mt-3 lg:mt-6">
                Imbunatatirea sănătății seniorilor. Un ghid cuprinzător pentru
                bunăstarea în anii de aur Pe măsură ce indivizii trec cu grație
                în anii lor de aur, prioritizarea sănătății devine esențială
                pentru menținerea unui stil de viață vibrant și împlinit.
                Îmbătrânirea este un proces natural care aduce schimbări în
                bunăstarea fizică.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleHead;
