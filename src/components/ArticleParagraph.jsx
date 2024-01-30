import findmore_sport from "../images/findmore_sport.png";
const ArticleParagraph = () => {
  return (
    <div className=" flex items-center justify-center my-2">
      <div className="w-full flex items-center lg:max-w-[1320px] justify-center min-[1300px]:justify-start md:px-14 ">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col lg:w-[848px] md:w-[750px] sm:w-[625px] sm:max-w-[1500px] max-w-[500px]">
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
              className="cursor-pointer object-cover lg:w-[848px] lg:h-[407px] md:w-[750px] md:h-[320px] sm:w-[625px] sm:h-[267px] 
              px-4 md:px-0 sm:max-w-[1500px] sm:max-h-[1500px] max-w-[500px] max-h-[215px] my-5"
              src={findmore_sport} // Replace with your image URL
              alt="imagine sport"
            />
            <p className="text-md md:text-lg lg:text-xl my-2 px-4 md:px-0 md:my-4">
              Imbunatatirea sănătății seniorilor. Un ghid cuprinzător pentru
              bunăstarea în anii de aur Pe măsură ce indivizii trec cu grație în
              anii lor de aur, prioritizarea sănătății devine esențială pentru
              menținerea unui stil de viață vibrant și împlinit. Îmbătrânirea
              este un proces natural care aduce schimbări în bunăstarea fizică.
              Imbunatatirea sănătății seniorilor. Un ghid cuprinzător pentru
              bunăstarea în anii de aur Pe măsură ce indivizii trec cu grație în
              anii lor de aur, prioritizarea sănătății devine esențială pentru
              menținerea unui stil de viață vibrant și împlinit. Îmbătrânirea
              este un proces natural care aduce schimbări în bunăstarea fizică.
              Imbunatatirea sănătății seniorilor. Un ghid cuprinzător pentru
              bunăstarea în anii de aur Pe măsură ce indivizii trec cu grație în
              anii lor de aur, prioritizarea sănătății devine esențială pentru
              menținerea unui stil de viață vibrant și împlinit. Îmbătrânirea
              este un proces natural care aduce schimbări în bunăstarea fizică.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleParagraph;
