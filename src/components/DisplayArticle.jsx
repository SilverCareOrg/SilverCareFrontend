import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const DisplayArticle = ({ article }) => {

  const [shortDescription, setShortDescription] = useState("");
  
  useEffect(() => {
    setShortDescription(article.description.slice(0,135))
  }, []);

  const navigate = useNavigate();
  return (
    <div className=" flex items-center justify-center md:my-14 py-6">
      <div className="w-full flex items-center lg:max-w-[1450px] justify-center lg:justify-start md:px-14 lg:px-28 ">
        <div className="flex flex-col justify-center items-center">
          <img
            onClick={() => navigate(`/article-page/${article?.id}`)}
            className="cursor-pointer object-cover lg:w-[850px] lg:h-[364px] sm:w-[550px] sm:h-[235px]  w-[335px] h-[143px]"
            src={article?.main_image}
            alt="article"
          />
          <div className="flex flex-col lg:w-[850px] sm:w-[550px] w-[335px]">
            <div className="flex items-center gap-12 pt-1">
              <p>{article?.author}</p>
              <p>{article?.reading_time} min</p>
            </div>
            <div className="pt-1">
              <p
                onClick={() => navigate(`/article-page/${article?.id}`)}
                className="text-2xl lg:text-3xl cursor-pointer"
              >
                {article?.title}
              </p>
              <p className="text-md md:text-lg lg:text-xl mt-3 lg:mt-6">
                {shortDescription} 
                <a className="text-midnightblue italic" href={`/article-page/${article?.id}`}> citeste mai mult...</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayArticle;
