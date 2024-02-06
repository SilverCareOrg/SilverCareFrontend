import findmore_sport from "../images/findmore_sport.png";
import { useNavigate } from "react-router-dom";
const DisplayArticle = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div className=" flex items-center justify-center md:my-14 py-6">
      <div className="w-full flex items-center lg:max-w-[1450px] justify-center lg:justify-start md:px-14 lg:px-28 ">
        <div className="flex flex-col justify-center items-center">
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
            onClick={() => navigate(`/article-page/${id}`)}
            className="cursor-pointer object-cover lg:w-[850px] lg:h-[364px] sm:w-[550px] sm:h-[235px]  w-[335px] h-[143px]"
            src={findmore_sport} // Replace with your image URL
            alt="imagine sport"
          />
          <div className="flex flex-col lg:w-[850px] sm:w-[550px] w-[335px]">
            <div className="flex items-center gap-12 pt-1">
              <p>autor</p>
              <p>data</p>
              <p>timp de citire?</p>
            </div>
            <div className="pt-1">
              <p
                onClick={() => navigate(`/article-page/${id}`)}
                className="text-2xl lg:text-3xl cursor-pointer"
              >
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

export default DisplayArticle;
