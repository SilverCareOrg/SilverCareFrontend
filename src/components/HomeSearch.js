import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeSearchGif from '../styles/icons/icons8-search.gif';

const HomeSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = () => {
      // Redirect to the search results page with the search term
      navigate(`/product/search/${searchTerm}`);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    

  return (
    <div className="flex flex-col items-center justify-start py-[3.5rem] px-[0rem] box-border text-center text-[2.5rem]">
      <div className="w-[77rem] flex flex-col items-center justify-center">
        <div className="self-stretch flex flex-col items-center justify-start gap-[2.5rem]">
          <div className="flex flex-col items-start justify-start gap-[1.5rem]">
            <div className="relative tracking-[0.12em] leading-[120%] font-semibold flex items-center justify-center w-[57rem] h-[2.5rem] shrink-0">
              Redescoperă magia vieții!
            </div>
            <div className="relative text-[1.5rem] tracking-[0.1em] leading-[120%] font-semibold flex items-center justify-center w-[57rem]">
              Activități și experiențe pentru vârstnici
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-end py-[0rem] px-[13.13rem] text-left text-[1rem] text-text-fields-grey-hf">
            <div className="self-stretch rounded-lg bg-white box-border h-[3.5rem] flex flex-row items-center justify-start py-[0rem] pr-[1.5rem] pl-[1rem] gap-[1rem] border-[1.5px] border-solid border-text-fields-grey-hf">
                <div className="flex-1 relative tracking-[0.08em] leading-[120%] flex items-center h-[2rem]">
                <input
                    type="text"
                    className="flex-1 relative tracking-0.08em leading-120% h-2rem outline-none" // Remove border here
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

export default HomeSearch;
