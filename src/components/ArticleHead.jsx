const ArticleHead = ({ article }) => {
  return (
    <div className=" flex items-center justify-center md:my-14">
      <div className="w-full flex items-center justify-center ">
        <div className="flex flex-col justify-center items-center min-[1300px]:items-start">
          <img
            className=" object-cover min-[1300px]:w-[1200px] lg:w-[1000px] lg:h-[530px] md:w-[1000px] md:h-[428px] sm:w-[850px] sm:h-[365px] w-[650px] h-[278px]"
            src={article?.main_image} // Replace with your image URL
            alt="main article"
          />
          <div className="flex px-4 md:px-0 flex-col min-[1300px]:w-[1200px] lg:w-[1000px] md:w-[750px] sm:w-[625px] sm:max-w-[1500px] max-w-[500px]">
            <div className="flex items-center gap-12 pt-1">
              <p>{article?.author}</p>
              <p>{article?.reading_time} min</p>
            </div>
            <div className="pt-1 flex min-[1300px]:justify-normal justify-center">
              <p className="text-xl sm:text-2xl mt-2 md:mt-8 lg:text-3xl min-[1300px]:w-[1200px] lg:w-[848px]">
                {article?.title}
              </p>
            </div>
            <p className="text-md md:text-lg lg:text-xl my-2 px-4 md:px-0 md:my-4">
              {article?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleHead;
