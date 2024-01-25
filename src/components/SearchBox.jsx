import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import HomeSearchGif from "../styles/icons/icons8-search.gif";
import HomeSearchIcon from "../styles/icons/icons8-search.svg";

const SearchBox = ({ text, path }) => {
  const [isSearching, setIsSearching] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const handleSearch = () => {
    setIsSearching((prevState) => !prevState);
    // Redirect to the search results page with the search term
    navigate(`/${path}?search=${searchTerm}`);
    window.location.reload();
  };
  return (
    <div className="self-stretch rounded-lg bg-white box-border max-lg:h-[3rem] lg:h-[3.5rem] flex flex-row items-center justify-start pr-[1.5rem] pl-[1rem] gap-[1rem] border-[1.5px] border-solid border-text-fields-grey-hf">
      <div className="flex-1 relative tracking-[0.08em] leading-[120%] flex items-center h-[2rem]">
        <input
          type="text"
          className="flex-1 relative tracking-0.08em leading-120% h-2rem outline-none" // Remove border here
          placeholder={text}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <img
        className="relative w-[1.5rem] h-[1.5rem] cursor-pointer"
        onMouseOver={() => setIsSearching(true)}
        onMouseLeave={() => setIsSearching(false)}
        alt="Search"
        src={isSearching ? HomeSearchGif : HomeSearchIcon}
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBox;
