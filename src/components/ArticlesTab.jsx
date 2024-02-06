import findmore_spiritualitate from "../images/findmore_spiritualitate.png";
import findmore_excursii from "../images/findmore_excursii.png";
import findmore_sanatate from "../images/findmore_sanatate.png";
import findmore_sport from "../images/findmore_sport.png";

const articles = [
  {
    name: "Spiritualitate",
    link: "/article-page/1",
    image: findmore_spiritualitate,
  },
  {
    name: "Excursii",
    link: "/article-page/2",
    image: findmore_excursii,
  },
  {
    name: "Sănătate",
    link: "/article-page/3",
    image: findmore_sanatate,
  },
  { name: "Sport", link: "/article-page/4", image: findmore_sport },
];

export const Article = ({ article }) => {
  return (
    <div>
      <div
        className="relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] h-[calc(15rem/1.675)] w-[calc(17.75rem/1.675)] md:h-[15rem] md:w-[17.75rem]"
        style={{
          transition: "transform 0.2s", // Add a smooth transition effect
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.025)"; // Increase the scale when hovering
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
        }}
      >
        <a href={article.link}>
          <div className="absolute top-[0rem] left-[0rem] rounded w-full h-full  overflow-hidden">
            <img
              className="h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] overflow-hidden "
              alt=""
              src={article.image}
            />

            <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(0deg,_rgba(0,_0,_0,_0.55),_rgba(0,_0,_0,_0))] overflow-hidden w-full h-full" />
          </div>
        </a>
      </div>
      <p className="mt-2 text-black">date: 12/12/12</p>
      <p className="text-2xl text-black">Titlu articol</p>
    </div>
  );
};

const FindArticles = () => {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="w-[30rem] md:w-[55rem] xl:w-[77.09rem] flex flex-col items-center justify-center">
        <div className="self-stretch flex flex-col gap-[2.5rem]">
          <div className="text-[1.5rem] text-center sm:text-[2rem] md:text-[2.25rem] lg:tracking-[0.05em] max-lg:tracking-[0.02em] leading-[120%] font-semibold flex items-center justify-center xl:justify-normal h-[2.5rem] ">
            Descoperă articolele noastre.
          </div>

          <div className="flex flex-wrap justify-center gap-4 xl:gap-8 text-white">
            {articles.map((article, index) => (
              <Article key={index} article={article} />
            ))}
          </div>
          <div className="flex justify-center xl:justify-end ">
            <a href="/articles" className="button-link">
              <div className="rounded w-[15rem] h-[3rem] flex flex-row items-center justify-center py-[0rem] px-[1rem] border-[1.5px] border-solid border-dark-navy">
                <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                  VEZI MAI MULT
                </b>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindArticles;
