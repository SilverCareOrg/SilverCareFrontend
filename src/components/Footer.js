import React from 'react';
import linkedin_svg from "../styles/icons/linkedin.svg";
import instagram_svg from "../styles/icons/instagram.svg";
import slash_svg from "../styles/icons/slash.svg";
import {NavLink} from "react-router-dom";
import JoinUs from './JoinUs';

const categories = [
  { name: 'Spiritualitate', link: '/product/Spiritualitate'},
  { name: 'Excursii', link: '/product/Excursii'},
  { name: 'Sănătate', link: '/product/Sanatate'},
  { name: 'Sport', link: '/product/Sport'},
  { name: 'Divertisment', link: '/product/Divertisment'},
  { name: 'Artă', link: '/product/Arta'},
  { name: 'Cursuri', link: '/product/Cursuri%20de%20limbi%20străine'},
  { name: 'Hobby', link: '/product/Hobby'},
];

const locations = [
  { name: 'Bucharest', link: '/product/Bucharest'},
  { name: 'Cluj', link: '/product/Cluj'},
  { name: 'Timisoara', link: '/product/Timisoara'},
  { name: 'Iasi', link: '/product/Iasi'},
  { name: 'Constanta', link: '/product/Constanta'},
  { name: 'Sibiu', link: '/product/Sibiu'},
  { name: 'Oradea', link: '/product/Oradea'},
  { name: 'Brasov', link: '/product/Brasov'},
  { name: 'Craiova', link: '/product/Craiova'},
]

const CategoryRow = ({ categories }) => {
  return (
    <div>
    {
        categories.map((category, index) => (
          <div className="pt-2" key={index}>
            <a href={category.link}>
                <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                  {category.name}
                </div>
            </a>
          </div>
      ))
    }
    </div>
  );
};

const LocationRow = ({ locations }) => {
  return (
    <div>
    {
        locations.map((location, index) => (
          <div className="pt-2" key={index}>
            <a href={location.link}>
                <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                  {location.name}
                </div>
            </a>
          </div>
      ))
    }
    </div>
  );
};

const AboutSection = () => {
  return (
    <div className="flex-1 flex flex-col items-start justify-start max-lg:gap-[10px] lg:gap-[24px]">
      <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-extrabold">
        Despre SilverCare
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
        <NavLink to="/about">
        <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium">
          Povestea noastră
        </div>
        </NavLink>

        <NavLink to="/contact">
        <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium">
          Devino partener
        </div>
        </NavLink>

        <NavLink to="/contact">
        <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium">
          Intrebari și raspunsuri
        </div>
        </NavLink>

      </div>
    </div>
  );
}

const OptionsSection = () => {
  return (
    <div className="self-stretch flex-1 flex flex-row justify-start items-start lg:gap-[96px]">
      <div className="flex-1 flex flex-col items-start justify-start max-lg:gap-[5px] lg:gap-[24px]">
        <div className="relative tracking-[0.05em] leading-[24px] font-extrabold">
          Categorii
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
          <CategoryRow categories={categories}/>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-start justify-start max-lg:gap-[5px] lg:gap-[24px]">
        <div className="relative tracking-[0.05em] leading-[24px] font-extrabold">
          Locații
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
          <LocationRow locations={locations}/>
        </div>
      </div>
    </div>
  );
}

const ExtraSection = () => {
  return (
    <div className="self-stretch w-72 flex flex-col items-start justify-start gap-[48px] text-right text-17xl text-white">
      <div className="lg:text-right self-stretch relative tracking-[0.05em] leading-[120%] font-semibold text-3xl flex lg:items-end lg:justify-end h-8 shrink-0">{`SilverCare `}</div>
        <div className="self-stretch h-5 flex flex-row items-end justify-end gap-[15px]">
        <a href="https://www.linkedin.com/company/96455905" target="_blank" rel="noopener noreferrer">
          <img
            className="relative h-10"
            alt="LinkedIn"
            src={linkedin_svg}
          />
        </a>
        <a href="https://www.instagram.com/the_silver_care/" target="_blank" rel="noopener noreferrer">
          <img
            className="relative h-10"
            alt=""
            src={instagram_svg}
          />
        </a>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start gap-[8px] text-left text-base text-light-grey">
          <div className="relative tracking-[0.05em] leading-[24px] font-medium">{`Contact: `}</div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[16px] text-right font-open-sans">
            <b className="self-stretch relative tracking-[0.1em] leading-[24px]">
              office@silvercare.com
            </b>
            <b className="self-stretch relative tracking-[0.1em] leading-[24px]">
              +40 766 551 409
            </b>
            <b className="self-stretch relative tracking-[0.1em] leading-[24px]">
              +40 761 148 821
            </b>
          </div>
        </div>
      </div>
  );
}

const Copyright = () => {
  return (
    <div className="relative tracking-[0.05em] leading-[24px] max-lg:font-xsmall lg:font-medium">
          @ Copyright 2023, SilverCare, All Rights Reserved
    </div>
  );
}

const TermsSection = () => {
  return (
    <div className='max-lg:flex max-lg:flex-col justify-start'>
      <div className="flex flex-row items-center justify-start gap-[32px]">
        <div className="relative tracking-[0.05em] leading-[24px] max-lg:font-small lg:font-medium">
          Legal
        </div>
        <img
          className="relative w-[1rem] h-[1rem]"
          alt=""
          src={slash_svg}
        />
        <div className="relative tracking-[0.05em] leading-[24px] max-lg:font-small lg:font-medium">
          Termeni și conditii
        </div>
        <img
          className="max-lg:hidden relative w-[1rem] h-[1rem]"
          alt=""
          src={slash_svg}
        />
        <div className="max-lg:hidden relative tracking-[0.05em] leading-[24px] max-lg:font-small lg:font-medium">
          Politică de confidențialitate
        </div>
      </div>

      <div className="lg:hidden flex flex-row items-center justify-start pt-2">
        <div className="relative tracking-[0.05em] leading-[24px] max-lg:font-small lg:font-medium">
          Politică de confidențialitate
        </div>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
  <div>
    <JoinUs />

    <div className="max-lg:hidden">
      <div className="self-stretch bg-midnightblue flex flex-col items-center justify-center text-base text-light-grey">
        <div className="w-4/5 flex flex-col items-center justify-center">
          <div className="self-stretch flex flex-col items-center justify-center pt-[120px] px-0 pb-20 gap-[64px]">
            <div className="self-stretch flex flex-row items-start justify-start gap-[96px]">
              <div className="flex-1 flex flex-row items-start justify-start py-2 px- gap-[20px]">
                <AboutSection />
                <OptionsSection />
              </div>
              <ExtraSection />
            </div>
            <div className="self-stretch flex flex-row items-center justify-between">
              <Copyright />
              <TermsSection />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="lg:hidden">
      <div className="self-stretch bg-midnightblue flex flex-row items-center justify-center text-base text-light-grey">
        <div className="w-4/5 flex flex-row items-center justify-center">
          <div className="self-stretch flex flex-col items-center justify-center pt-[120px] pb-20 gap-[64px]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[40px]">
              <ExtraSection />
              <OptionsSection />
              <AboutSection />
              <TermsSection />

            </div>
            <div className="self-stretch flex flex-row items-center justify-between">
              <Copyright />
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  );
};

export default Footer;
