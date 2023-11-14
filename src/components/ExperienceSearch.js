import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeSearchGif from '../styles/icons/icons8-search.gif';

const ExperienceSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = () => {
      // Redirect to the search results page with the search term
      navigate(`/product?search=${searchTerm}`);
      window.location.reload();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
  return (
    <div className="bg-light-purple flex flex-col items-center justify-start max-lg:py-[2rem] lg:py-[3.5rem] px-[0rem] box-border text-center max-lg:text-[1.88rem] lg:text-[2.5rem]">
        <div className="max-lg:w-[20rem] max-lg:h-[15rem] lg:w-[77rem] flex flex-col items-center justify-center">
        <div className="self-stretch flex flex-col items-center justify-center max-lg:gap-[1.5rem] lg:gap-[2.5rem]">
            <div className="max-lg:self-stretch flex flex-col items-start justify-start max-lg:gap-[1rem] lg:gap-[1.5rem]">
            <div className="max-lg:self-stretch relative tracking-[0.12em] leading-[120%] max-lg:text-[1.5rem] lg:text-[2rem] font-semibold lg:w-[57rem] lg:h-[2.5rem]">
                Experiențe
            </div>
            <div className="relative max-lg:text-[1.13rem] lg:text-[1.5rem] tracking-[0.1em] max-lg:text-[0.9rem] lg:text-[1.2rem] leading-[120%] max-lg:font-medium lg:font-semibold flex items-center justify-center lg:w-[57rem]">
                Alege experiența perfectă pentru tine !
            </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-end lg:px-[13.13rem] text-left max-lg:text-[0.75rem] lg:text-[1rem] text-text-fields-grey-hf">
            <div className="self-stretch rounded-lg bg-white box-border max-lg:h-[3rem] lg:h-[3.5rem] flex flex-row items-center justify-start py-[0rem] pr-[1.5rem] pl-[1rem] gap-[1rem] border-[1.5px] border-solid border-text-fields-grey-hf">
                <div className="flex-1 relative tracking-[0.08em] leading-[120%] flex items-center h-[2rem]">
                <input
                    type="text"
                    className="flex-1 relative tracking-0.08em leading-120% h-2rem outline-none"
                    placeholder="Caută o experiență"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
                <img
                className="relative w-[1.5rem] h-[1.5rem] cursor-pointer"
                alt="Search"
                src={HomeSearchGif}
                onClick={handleSearch}
                />
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ExperienceSearch;
