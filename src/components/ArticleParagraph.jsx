const ArticleParagraph = ({ paragraphData }) => {
  return (
    <div className=" flex items-center justify-center my-2">
      <div className="w-full flex items-center lg:max-w-[1320px] justify-center min-[1300px]:justify-start md:px-14 ">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col lg:w-[848px] md:w-[750px] sm:w-[625px] sm:max-w-[1500px] max-w-[500px]">
            {paragraphData?.image ? (
              <img
                className="cursor-pointer object-cover lg:w-[848px] lg:h-[407px] md:w-[750px] md:h-[320px] sm:w-[625px] sm:h-[267px] 
              px-4 md:px-0 sm:max-w-[1500px] sm:max-h-[1500px] max-w-[500px] max-h-[215px] my-5"
                src={`data:image/jpeg;base64,${paragraphData?.image}`}
                alt="paragraph article"
              />
            ) : null}
            <p className="text-md md:text-lg lg:text-xl my-2 px-4 md:px-0 md:my-4">
              {paragraphData?.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleParagraph;
