import findmore_spiritualitate from "../images/findmore_spiritualitate.png";
import findmore_excursii from "../images/findmore_excursii.png";
import findmore_sanatate from "../images/findmore_sanatate.png";
import findmore_sport from "../images/findmore_sport.png";
import findmore_evenimente from "../images/findmore_evenimente.png";
import findmore_arta from "../images/findmore_arta.png";
import findmore_cursuri from "../images/findmore_cursuri.png";
import findmore_hobby from "../images/findmore_hobby.png";

const CategoryRow = ({ categories }) => {
    return (
        <div className="flex flex-row items-start justify-start gap-[2rem] text-white">
          {categories.map((category, index) => (
            <div className="flex-1 category" key={index}>
              <div
                className="relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] h-[15rem] w-[17.75rem] overflow-hidden"
                style={{
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <a href={category.link}>
                  <div className="absolute top-[0rem] left-[0rem] rounded w-[17.75rem] h-[15rem] overflow-hidden">
                    <img
                      className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                      alt=""
                      src={category.image}
                    />
                    <div className="absolute top-0 left-0" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0))", width: "17.75rem", height: "15rem" }} />
                  </div>
                  <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 flex flex-row items-end justify-start py-[1.5rem] px-[2rem] box-border">
                    <div className="relative tracking-[0.1em] leading-[120%] font-semibold">
                      {category.name}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    };
    
const categories = [
    { name: 'Spiritualitate', link: '/product/Spiritualitate', image: findmore_spiritualitate },
    { name: 'Excursii', link: '/product/Excursii', image: findmore_excursii },
    { name: 'Sănătate', link: '/product/Sanatate', image: findmore_sanatate },
    { name: 'Sport', link: '/product/Sport', image: findmore_sport },
    { name: 'Divertisment', link: '/product/Divertisment', image: findmore_evenimente },
    { name: 'Artă', link: '/product/Arta', image: findmore_arta },
    { name: 'Cursuri', link: '/product/Cursuri%20de%20limbi%20străine', image: findmore_cursuri },
    { name: 'Hobby', link: '/product/Hobby', image: findmore_hobby },
];

const Categories = () => {
    const rows = [];
    for (let i = 0; i < categories.length; i += 3) {
        rows.push(categories.slice(i, i + 3));
    }

    return (
    <div>
    <div className="self-stretch bg-gray-100 h-40 flex flex-col items-center justify-start text-center">
          <div className="flex-1 w-[1232px] flex flex-col items-center justify-center">
            <div style={{ fontSize: '30px' }} className="relative tracking-[0.05em] leading-[120%] font-semibold flex items-center justify-center w-[1232px] h-10 shrink-0">
              Categorii
            </div>
          </div>
    </div>

    <div className="flex flex-col items-center justify-start pt-[4rem] px-[0rem] pb-[2rem] box-border">
        <div className="w-[60rem] flex flex-col items-center justify-start">
            <div className="self-stretch flex flex-col items-start justify-start gap-[2.5rem]">
                {rows.map((categoryGroup, index) => (
                    <CategoryRow key={index} categories={categoryGroup} />
                ))}
            </div>
        </div>
    </div>
    </div>
    );
};

export default Categories;
