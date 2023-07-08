import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Slide from "./Slide";
import homepage_photo_4 from "../images/homepage-photo-4.jpg";
import homepage_photo_3 from "../images/homepage-photo-3.jpg";
import homepage_photo_2 from "../images/homepage-photo-2.jpg";
import homepage_photo_1 from "../images/homepage-photo-1.jpg";

const data = [
  {
    id: 1,
    src: homepage_photo_1,
    headline: "Arată-le părinților tăi că îți pasă",
    body: "Înțelegem importanța relației cu părinții și dorința ta de a le oferi cele mai bune experiențe și servicii. Prin intermediul platformei noastre, poți descoperi o varietate de activități și servicii special concepute pentru părinții tăi, oferindu-le oportunități de bucurie, socializare și îmbunătățire a calității vieții.  Demonstrează-le părinților tăi că le acorzi atenția și grija pe care le merită, prin intermediul serviciilor noastre dedicate părinților și prin crearea de amintiri de neuitat pentru ei.",
    cta: "Cumpără acum",
    category: "divertisment",
  },
  {
    id: 2,
    src: homepage_photo_2,
    headline: "Conectează-te și trăiește viața la maxim",
    body: "Platforma noastră este locul ideal pentru seniori să se conecteze și să participe la diverse activități care îi ajută să se integreze într-o comunitate activă și dinamică. Descoperă evenimente sociale, cursuri tematice și experiențe captivante care facilitează legături puternice și prietenii pe termen lung.",
    cta: "Cumpără acum",
    category: "hobby",
  },
  {
    id: 3,
    src: homepage_photo_3,
    headline: "Alătură-te comunității noastre",
    body: "Platforma noastră este un loc unic destinat seniorilor, unde poți cumpăra și participa la diverse activități care promovează interacțiunea socială și integrarea într-o comunitate prietenoasă. Descoperă opțiuni variate, inclusiv excursii, ateliere, evenimente culturale și multe altele, toate menite să îți ofere o experiență memorabilă și să îți faciliteze îmbinarea într-un mediu comunitar plin de viață.",
    cta: "Cumpără acum",
    category: "excursii",
  },
  {
    id: 4,
    src: homepage_photo_4,
    headline: "Adoptă un stil de viață sănătos",
    body: " De la clase de fitness și ateliere de hobby până la evenimente culturale, platforma noastră te conectează cu experiențe captivante care stimulează bunăstarea fizică, mentală și socială.",
    cta: "Cumpără acum",
    category: "sport",
  },
];
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? data.length - 1 : (prevSlide) => prevSlide - 1
    );
  };
  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === data.length - 1 ? 0 : (prevSlide) => prevSlide + 1
    );
  };

  return (
    <div className="frame relative overflow-x-hidden">
      <div
        className="slider relative "
        style={{ transform: `translateX(-${100 * currentSlide}vw)` }}
      >
        {data.map((image) => (
          <Slide image={image} key={image.id} />
        ))}
      </div>
      <div className="btns absolute z-[1]  text-gray-50 bottom-[40%] w-screen ">
        <div className="flex  justify-between pr-7 pl-2 gap-10 ">
          <button
            onClick={prevSlide}
            className="backdrop-blur-xl bg-black bg-opacity-50 text-sky-50 px-4 py-7"
          >
            <span>
              <BsArrowLeft />
            </span>
          </button>

          <button
            onClick={nextSlide}
            className="backdrop-blur-xl bg-black bg-opacity-50 text-sky-50 px-4 py-5"
          >
            <span>
              <BsArrowRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
