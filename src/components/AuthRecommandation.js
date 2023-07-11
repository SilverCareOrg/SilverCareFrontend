import { useNavigate } from "react-router-dom";
import React from 'react';
import { Link } from "react-router-dom";

const Offers = () => {
  return (
    <section className="offer flex flex-col  justify-center items-center h-[30rem] pb-20">
      <div className="flex container mx-auto flex-col gap-5 justify-center w-[90%] ">
        <h3 className="max-md:text-4xl text-6xl font-semibold text-gray-50">
          Înregistrează-te la noi pe platformă
        </h3>
        <h1 className="font-semibold max-md:text-xl text-2xl text-gray-50">
          Stai la curent cu noutățile
        </h1>
        <p className="md:text-xl max-md:text-md text-gray-50">
          Platforma noastră este în continuă expansiune. Nu rata ocazia de a-ți face cont și afla noutățile înaintea celorlalți. 
        </p>

        <div className="mt-5">
          <Link
            to="/signup"
            className="border border-solid mt-2 border-white text-white px-8 py-3"
          >
            Înregistrează-te
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Offers;