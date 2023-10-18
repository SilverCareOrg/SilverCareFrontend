import React from 'react';
import linkedin_svg from "../styles/icons/linkedin.svg";
import instagram_svg from "../styles/icons/instagram.svg";
import slash_svg from "../styles/icons/slash.svg";
import {NavLink} from "react-router-dom";
import JoinUs from './JoinUs';

const Footer = () => {
  return (
  <div>
  <JoinUs />
  <div className="self-stretch bg-midnightblue flex flex-col items-center justify-center text-base text-light-grey">
  <div className="w-[1232px] flex flex-col items-center justify-center">
    <div className="self-stretch flex flex-col items-center justify-center pt-[120px] px-0 pb-20 gap-[64px]">
      <div className="self-stretch flex flex-row items-start justify-start gap-[96px]">
        <div className="flex-1 flex flex-row items-start justify-start py-2 px-0 gap-[56px]">
          <div className="flex-1 flex flex-col items-start justify-start gap-[24px]">
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

              {/* <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium">{`Promotii & Cupoane`}</div> */}
              <NavLink to="/contact">
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium">
                Intrebari și raspunsuri
              </div>
              </NavLink>

            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[24px]">
            <div className="relative tracking-[0.05em] leading-[24px] font-extrabold">
              Categories
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
              <a href="/product/Spiritualitate">
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Spiritualitate
              </div>
              </a>

              <a href="/product/Excursii">
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Excursii
              </div>
              </a>

              <a href="/product/Sanatate">
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Sănătate
              </div>
              </a>

              <a href="/product/Sport">
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Sport
              </div>
              </a>

              <a href="/product/Divertisment">
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Divertisment
              </div>
              </a>

              <a href="/product/Arta">
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Artă
              </div>
              </a>

              <a href="/product/Cursuri%20de%20limbi%20străine">
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Cursuri
              </div>
              </a>

              <a href="/product/Hobby">
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Hobby
              </div>
              </a>

            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[24px]">
            <div className="relative tracking-[0.05em] leading-[24px] font-extrabold">
              Locations
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Bucharest
              </div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">{`Cluj `}</div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Timisoara
              </div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Iasi
              </div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Constanta
              </div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Sibiu
              </div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Oradea
              </div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Brasov
              </div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Craiova
              </div>
            </div>
          </div>
          {/* <div className="flex-1 flex flex-col items-start justify-start gap-[24px]">
            <div className="relative tracking-[0.05em] leading-[24px] font-extrabold">
              Events
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Craciun
              </div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Anul nou
              </div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Paste
              </div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Vara
              </div>
              <div className="self-stretch relative tracking-[0.05em] leading-[24px] font-medium flex items-center h-6 shrink-0">
                Aniversari
              </div>
            </div>
          </div> */}
        </div>
        <div className="self-stretch w-72 flex flex-col items-start justify-start gap-[48px] text-right text-17xl text-white">
        <div style={{ textAlign: 'right' }} className="self-stretch relative tracking-[0.05em] leading-[120%] font-semibold text-3xl flex items-end justify-end h-8 shrink-0">{`SilverCare `}</div>
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
      </div>
      <div className="self-stretch flex flex-row items-center justify-between">
        <div className="relative tracking-[0.05em] leading-[24px] font-medium">
          @ Copyright 2023, SilverCare, All Rights Reserved
        </div>
        <div className="flex flex-row items-center justify-start gap-[32px]">
          <div className="relative tracking-[0.05em] leading-[24px] font-medium">
            Legal
          </div>
          <img
            className="relative w-[1rem] h-[1rem]"
            alt=""
            src={slash_svg}
          />
          <div className="relative tracking-[0.05em] leading-[24px] font-medium">
            Termeni și conditii
          </div>
          <img
            className="relative w-[1rem] h-[1rem]"
            alt=""
            src={slash_svg}
          />
          <div className="relative tracking-[0.05em] leading-[24px] font-medium">
            Politică de confidențialitate
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default Footer;
