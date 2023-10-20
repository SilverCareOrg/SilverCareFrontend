import findmore_spiritualitate from "../images/findmore_spiritualitate.png";
import findmore_excursii from "../images/findmore_excursii.png";
import findmore_sanatate from "../images/findmore_sanatate.png";
import findmore_sport from "../images/findmore_sport.png";
import findmore_evenimente from "../images/findmore_evenimente.png";
import findmore_arta from "../images/findmore_arta.png";
import findmore_cursuri from "../images/findmore_cursuri.png";
import findmore_hobby from "../images/findmore_hobby.png";

const categories = [
    { name: 'Spiritualitate', link: '/product/Spiritualitate', image: findmore_spiritualitate },
    { name: 'Excursii', link: '/product/Excursii', image: findmore_excursii },
    { name: 'Sănătate', link: '/product/Sanatate', image: findmore_sanatate },
    { name: 'Sport', link: '/product/Sport', image: findmore_sport },
    { name: 'Divertisment', link: '/product/Divertisment', image: findmore_evenimente },
    { name: 'Artă', link: '/product/Arta', image: findmore_arta },
    { name: 'Cursuri', link: '/product/Cursuri%20de%20limbi%20străine', image: findmore_cursuri },
    { name: 'Hobby', link: '/product/Hobby', image: findmore_hobby },
]

const Category = ({ category }) => {
    return (
      <div className="flex-1 relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] lg:h-[15rem] max-lg:h-[10rem]"
          style={{
              transition: "transform 0.2s", // Add a smooth transition effect
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale when hovering
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Reset the scale on mouse leave
            }}>

          <a href={category.link}>
              <div className="absolute top-[0rem] left-[0rem] rounded max-lg:w-full max-lg:h-[10rem] lg:w-[17.75rem] lg:h-[15rem] overflow-hidden">
                  <img
                      className="absolute max-lg:h-[10rem] w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden "
                      alt=""
                      src={category.image}
                      />
                      
                      <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(0deg,_rgba(0,_0,_0,_0.55),_rgba(0,_0,_0,_0))] overflow-hidden max-lg:w-full max-lg:h-[10rem] lg:w-[17.75rem] lg:h-[15rem]" />
                  </div>
                  <div className="absolute max-lg:h-[10rem] h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] flex flex-row items-end justify-start text-[1.4rem] max-lg:text-[1.2rem] py-[1.2rem] max-lg:px-[1rem] lg:px-[2rem] box-border">
                      <div className="relative tracking-[0.1em] leading-[120%] font-semibold">
                        {category.name}
                      </div>
                  </div>
          </a>
      </div>
    );
}

const FindMore = () => {
    return (
      <div className="flex flex-col items-center justify-start box-border">
            <div className="max-lg:w-6/7 lg:w-[77.09rem] flex flex-col items-center justify-center">
                <div className="self-stretch flex flex-col items-start justify-start gap-[2.5rem]">
                <div className="relative text-[2.25rem] lg:tracking-[0.05em] max-lg:tracking-[0.02em] leading-[120%] font-semibold flex items-center max-lg:w-[22rem] max-lg:text-[1.7rem] w-[37rem] h-[2.5rem] shrink-0">
                    Descoperă categoriile noastre
                </div>
                <div className="self-stretch flex flex-row items-start justify-start lg:gap-[2rem] max-lg:gap-[1rem] text-white grid max-lg:grid-cols-2 lg:grid-cols-4 max-lg:grid-rows-4 lg:grid-rows-2">
                  {categories.map((category, index) => (
                    <Category key={index} category={category} />
                  ))}
                </div>
                    <div className="lg:self-stretch flex flex-col lg:items-end justify-start pt-[1rem] px-[0rem] pb-[0rem] text-center text-[0.88rem]">
                        <a href="/product" className="button-link">
                            <div className="rounded box-border w-[15rem] h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] border-[1.5px] border-solid border-dark-navy">
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
