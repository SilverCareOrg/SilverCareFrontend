import findmore_spiritualitate from "../images/findmore_spiritualitate.png";
import findmore_excursii from "../images/findmore_excursii.png";
import findmore_sanatate from "../images/findmore_sanatate.png";
import findmore_sport from "../images/findmore_sport.png";
import findmore_evenimente from "../images/findmore_evenimente.png";
import findmore_arta from "../images/findmore_arta.png";
import findmore_cursuri from "../images/findmore_cursuri.png";
import findmore_hobby from "../images/findmore_hobby.png";

const categories = [
  {
    name: "Spiritualitate",
    link: "/product?category=Spiritualitate",
    image: findmore_spiritualitate,
  },
  {
    name: "Excursii",
    link: "/product?category=Excursii",
    image: findmore_excursii,
  },
  {
    name: "Sănătate",
    link: "/product?category=Sanatate",
    image: findmore_sanatate,
  },
  { name: "Sport", link: "/product?category=Sport", image: findmore_sport },
  {
    name: "Divertisment",
    link: "/product?category=Divertisment",
    image: findmore_evenimente,
  },
  { name: "Artă", link: "/product?category=Arta", image: findmore_arta },
  {
    name: "Cursuri",
    link: "/product?category=Cursuri%20de%20limbi%20străine",
    image: findmore_cursuri,
  },
  { name: "Hobby", link: "/product?category=Hobby", image: findmore_hobby },
];

const Category = ({ category }) => {
  return (
    <div
      className="relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] h-[calc(15rem/1.675)] w-[calc(17.75rem/1.675)] md:h-[15rem] md:w-[17.75rem]"
      style={{
        transition: "transform 0.2s", // Add a smooth transition effect
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale when hovering
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
      }}
    >
      <a href={category.link}>
        <div className="absolute top-[0rem] left-[0rem] rounded w-full h-full  overflow-hidden">
          <img
            className="h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] overflow-hidden "
            alt=""
            src={category.image}
          />

          <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(0deg,_rgba(0,_0,_0,_0.55),_rgba(0,_0,_0,_0))] overflow-hidden w-full h-full" />
        </div>
        <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-end justify-start text-[1.4rem] max-lg:text-[1.2rem] py-[1.2rem] max-lg:px-[1rem] lg:px-[2rem] box-border">
          <div className="relative tracking-[0.1em] leading-[120%] font-semibold">
            {category.name}
          </div>
        </div>
      </a>
    </div>
  );
};

const FindMore = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[30rem] md:w-[55rem] xl:w-[77.09rem] flex flex-col items-center justify-center">
        <div className="self-stretch flex flex-col gap-[2.5rem]">
          <div className="text-[1.5rem] text-center sm:text-[2rem] md:text-[2.25rem] lg:tracking-[0.05em] max-lg:tracking-[0.02em] leading-[120%] font-semibold flex items-center justify-center xl:justify-normal h-[2.5rem] ">
            Descoperă categoriile noastre
          </div>

          <div className="flex flex-wrap justify-center gap-4 xl:gap-8 text-white">
            {categories.map((category, index) => (
              <Category key={index} category={category} />
            ))}
          </div>
          <div className="flex justify-center xl:justify-end ">
            <a href="/product" className="button-link">
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

export default FindMore;
