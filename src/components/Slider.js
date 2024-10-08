import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Slide from "./Slide";
import hero_1_desktop from "../images/hero_1_desktop.png";
import hero_1_mobile from "../images/hero_1_mobile.png";
import homepage_photo_4 from "../images/homepage-photo-4.jpg";
import homepage_photo_3 from "../images/homepage-photo-3.jpg";
import homepage_photo_2 from "../images/homepage-photo-2.jpg";
import homepage_photo_1 from "../images/homepage-photo-1.jpg";

const data = [
  {
    id: 1,
    src_desktop: hero_1_desktop,
    src_mobile: hero_1_mobile,
    headline: "Reconectează-te cu natura",
    body: " Aventura începe aici, iar noi suntem ghidul tău către explorarea profundă și autentică a naturii. Prin experiențe captivante și unice, te invităm să evadezi din agitația cotidiană și să redescoperi frumusețea lumii înconjurătoare. ",
    cta: "Cumpără experiența",
    category: "sport",
  },
  {
    id: 2,
    src_desktop: homepage_photo_1,
    src_mobile: homepage_photo_1,
    headline: "Arată-le părinților tăi că îți pasă",
    body: "Înțelegem importanța relației cu părinții și dorința ta de a le oferi cele mai bune experiențe și servicii. Prin intermediul platformei noastre, poți descoperi o varietate de activități și servicii special concepute pentru părinții tăi, oferindu-le oportunități de bucurie, socializare și îmbunătățire a calității vieții.  Demonstrează-le părinților tăi că le acorzi atenția și grija pe care le merită, prin intermediul serviciilor noastre dedicate părinților și prin crearea de amintiri de neuitat pentru ei.",
    cta: "Cumpără experiența",
    category: "divertisment",
  },
  {
    id: 3,
    src_desktop: homepage_photo_2,
    src_mobile: homepage_photo_2,
    headline: "Conectează-te și trăiește viața la maxim",
    body: "Platforma noastră este locul ideal pentru seniori să se conecteze și să participe la diverse activități care îi ajută să se integreze într-o comunitate activă și dinamică. Descoperă evenimente sociale, cursuri tematice și experiențe captivante care facilitează legături puternice și prietenii pe termen lung.",
    cta: "Cumpără experiența",
    category: "hobby",
  },
  {
    id: 4,
    src_desktop: homepage_photo_3,
    src_mobile: homepage_photo_3,
    headline: "Alătură-te comunității noastre",
    body: "Platforma noastră este un loc unic destinat seniorilor, unde poți cumpăra și participa la diverse activități care promovează interacțiunea socială și integrarea într-o comunitate prietenoasă. Descoperă opțiuni variate, inclusiv excursii, ateliere, evenimente culturale și multe altele, toate menite să îți ofere o experiență memorabilă și să îți faciliteze îmbinarea într-un mediu comunitar plin de viață.",
    cta: "Cumpără experiența",
    category: "excursii",
  },
  {
    id: 5,
    src_desktop: homepage_photo_4,
    src_mobile: homepage_photo_4,
    headline: "Adoptă un stil de viață sănătos",
    body: " De la clase de fitness și ateliere de hobby până la evenimente culturale, platforma noastră te conectează cu experiențe captivante care stimulează bunăstarea fizică, mentală și socială.",
    cta: "Cumpără experiența",
    category: "sport",
  },

];
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <div className="flex w-full relative overflow-x-hidden overflow-y-hidden">
      <div
        className="h-[calc(101vh-5rem)] w-[500vw] flex transition duration-1000 ease-linear relative "
        style={{ transform: `translateX(-${100 * currentSlide}vw)` }}
      >
        {data.map((image) => (
          <Slide image={image} key={image.id} />
        ))}
      </div>
      <div className="btns absolute z-[1] text-gray-50 bottom-[40%] w-full ">
        <div className="flex justify-between mx-auto gap-10 ">
          <button
            onClick={prevSlide}
            className="backdrop-blur-xl bg-black bg-opacity-50 text-sky-50 px-2 py-7 lg:px-5"
          >
            <span>
              <BsArrowLeft />
            </span>
          </button>

          <button
            onClick={nextSlide}
            className="backdrop-blur-xl bg-black bg-opacity-50 text-sky-50 px-2 py-7 lg:px-5"
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
