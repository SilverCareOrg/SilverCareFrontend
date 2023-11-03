import findmore_spiritualitate_mare from "../images/findmore_spiritualitate_mare.png";
import findmore_excursii_mare from "../images/findmore_excursii_mare.png";
import findmore_sanatate_mare from "../images/findmore_sanatate_mare.png";
import findmore_sport_mare from "../images/findmore_sport_mare.png";
import findmore_evenimente_mare from "../images/findmore_evenimente_mare.png";
import findmore_arta_mare from "../images/findmore_arta_mare.png";
import findmore_cursuri_mare from "../images/findmore_cursuri_mare.png";
import findmore_hobby_mare from "../images/findmore_hobby_mare.png";
import findmore_spiritualitate from "../images/findmore_spiritualitate.png";
import findmore_excursii from "../images/findmore_excursii.png";
import findmore_sanatate from "../images/findmore_sanatate.png";
import findmore_sport from "../images/findmore_sport.png";
import findmore_evenimente from "../images/findmore_evenimente.png";
import findmore_arta from "../images/findmore_arta.png";
import findmore_cursuri from "../images/findmore_cursuri.png";
import findmore_hobby from "../images/findmore_hobby.png";
import category_hero from "../images/category_hero.png";


const CategoryRow = ({ categories }) => {
    return (
        <div className="flex flex-row items-start justify-start max-lg:gap-[1rem] lg:gap-[2rem] text-white">
          {categories.map((category, index) => (
            <div className="flex-1 category" key={index}>
              <div
                className="relative rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] max-lg:h-[11rem] max-lg:w-[11rem] lg:h-[27rem] lg:w-[23rem] overflow-hidden"
                style={{
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <a href={category.link}>
                  <div className="absolute top-[0rem] left-[0rem] rounded max-lg:w-[17.75rem] max-lg:h-[15rem] lg:h-[27rem] lg:w-[23rem] overflow-hidden">
                    <img
                      className="max-lg:hidden lg:h-[27rem] lg:w-[23rem] object-cover"
                      alt=""
                      src={category.big_image}
                    />
                    <img
                      className="lg:hidden max-lg:h-full max-lg:w-fullobject-cover"
                      alt=""
                      src={category.small_image}
                    />
                    <div className="max-lg:hidden absolute top-0 left-0" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0))", width: "23rem", height: "27rem" }} />
                    <div className="lg:hidden absolute top-0 left-0" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 3), rgba(0, 0, 0, 0))", width: "15rem", height: "21rem" }} />
                  </div>
                  <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 flex flex-row items-end justify-start py-[1.5rem] max-lg:px-[1rem] lg:px-[2rem] box-border">
                    <div className="relative tracking-[0.1em] leading-[120%] font-semibold max-lg:text-[1.1rem] lg:text-[1.5rem]">
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
    { name: 'Spiritualitate', link: '/product?category=Spiritualitate', big_image: findmore_spiritualitate_mare, small_image: findmore_spiritualitate },
    { name: 'Excursii', link: '/product?category=Excursii', big_image: findmore_excursii_mare, small_image: findmore_excursii },
    { name: 'Sănătate', link: '/product?category=Sanatate', big_image: findmore_sanatate_mare, small_image: findmore_sanatate },
    { name: 'Sport', link: '/product?category=Sport', big_image: findmore_sport_mare, small_image: findmore_sport },
    { name: 'Evenimente', link: '/product?category=Evenimente', big_image: findmore_evenimente_mare, small_image: findmore_evenimente },
    { name: 'Artă', link: '/product?category=Arta', big_image: findmore_arta_mare, small_image: findmore_arta },
    { name: 'Cursuri', link: '/product?category=Cursuri%20de%20limbi%20străine', big_image: findmore_cursuri_mare, small_image: findmore_cursuri },
    { name: 'Hobby', link: '/product?category=Hobby', big_image: findmore_hobby_mare, small_image: findmore_hobby },
];

const category_hero_style = {
  backgroundImage: `url(${category_hero})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  margin: '0 auto',
  position: 'relative',
};

const Categories = () => {
    const lg_rows = [];
    for (let i = 0; i < categories.length; i += 3) {
        lg_rows.push(categories.slice(i, i + 3));
    }

    const max_lg_rows = [];
    for (let i = 0; i < categories.length; i += 2) {
        max_lg_rows.push(categories.slice(i, i + 2));
    }

    return (
    <div className="mt-2 mb-10">
    <div
      className="self-stretch bg-[your-background-image] max-lg:h-40 lg:h-60 flex flex-col items-center justify-start text-center"
      style={category_hero_style}
    >
      <div className="flex-1 w-[1232px] flex flex-col items-center justify-center">
        <div style={{ fontSize: '30px' }} className="relative tracking-[0.05em] leading-[120%] font-semibold flex items-center justify-center w-[1232px] h-10 shrink-0">
          Categorii
        </div>
      </div>
    </div>

    <div className="max-lg:hidden flex flex-col items-center justify-start pt-[4rem] px-[0rem] pb-[2rem] box-border">
        <div className="flex flex-col items-start justify-start">
            <div className="max-lg:hidden self-stretch flex flex-col items-start justify-start gap-[2.5rem]">
                {lg_rows.map((categoryGroup, index) => (
                    <CategoryRow key={index} categories={categoryGroup} />
                ))}
            </div>
        </div>
    </div>
    <div className="lg:hidden flex flex-col items-center justify-start pt-[4rem] px-[0rem] pb-[2rem] box-border">
        <div className="flex flex-col items-center justify-start">
            <div className="self-stretch flex flex-col items-start justify-start gap-[1rem]">
                {max_lg_rows.map((categoryGroup, index) => (
                    <CategoryRow key={index} categories={categoryGroup} />
                ))}
            </div>
        </div>
    </div>
    </div>
    );
};

export default Categories;
