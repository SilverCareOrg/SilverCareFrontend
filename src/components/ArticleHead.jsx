const ArticleHead = ({ article }) => {
  return (
      <div className=" flex flex-col">
          <div className="flex flex-col min-[1300px]:items-center items-center justify-start">
            <img
              className=" object-cover min-[1300px]:w-[1200px] lg:w-[848px] lg:h-[530px] md:w-full md:h-[428px] sm:w-full sm:h-[365px] w-[500px] h-[278px]"
              src={article?.main_image} // Replace with your image URL
              alt="main article"
          />
          <div className="flex md:px-0 flex-col min-[1300px]:w-[1200px] lg:w-[848px] md:max-w-full max-[768px]:px-[16px] xl:px-[0rem] xl:mr-[8px] md:w-[750px] sm:w-[625px] sm:max-w-full max-w-[500px]">
            <div className="flex items-center gap-12 pt-1">
              <p>{article?.author}</p>
              <p>{article?.reading_time} min</p>
            </div>
            <div className="pt-1 flex">
              <p className="text-xl sm:text-2xl mt-2 md:mt-8 lg:text-3xl min-[1300px]:w-[1200px] lg:w-[848px]">
                {article?.title}
              </p>
            </div>
            <p className="text-md md:text-lg lg:text-xl my-2 md:px-0 md:my-4">
              {article?.description}
            </p>
          </div>
        </div>
    </div>
  );
};
export default ArticleHead;
