import { Fragment, useState, useEffect, useRef } from "react";
import SingleProduct from "../components/SingleProduct";
import { Link, useParams } from "react-router-dom";
import axios_api from "../api/axios_api";
import { useLocation } from "react-router-dom";
import HomeSearchGif from "../styles/icons/icons8-search.gif";
import { useNavigate } from "react-router-dom";
import filter_svg from "../styles/icons/filter.svg";
import axios from "axios";
import Pagination from "../components/Pagination";
import ExperienceSearch from "../components/ExperienceSearch";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Products = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(null);

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesMenu, setCategoriesMenu] = useState(false);
  const [err, setErr] = useState(null);
  var FileSaver = require("file-saver");
  const [catPath, setCatPath] = useState("Toate experiențele");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const currentURL = location.pathname;
  const queryParams = new URLSearchParams(location.search);

  const [search, setSearch] = useState(queryParams.get("search") || "");
  const [category, setCategory] = useState(queryParams.get("category") || "");
  const [locationOption, setLocationOption] = useState(
    queryParams.get("location") || ""
  );
  const [firstAccess, setFirstAccess] = useState(false);

  const [isStringInURL, setIsStringInUrl] = useState(
    currentURL.includes("product/search/")
  );
  const para = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [numberProducts, setNumberProducts] = useState(0);

  const selectCategories = [
    { name: "Toate categoriile", raw: "" },
    { name: "Spiritualitate", raw: "Spiritualitate" },
    { name: "Excursii", raw: "Excursii" },
    { name: "Sănătate", raw: "Sanatate" },
    { name: "Sport", raw: "Sport" },
    { name: "Divertisment", raw: "Divertisment" },
    { name: "Artă", raw: "Arta" },
    { name: "Cursuri", raw: "Cursuridelimbistrăine" },
    { name: "Hobby", raw: "Hobby" },
  ];

  const selectLocations = [
    { name: "Toate locațiile", raw: "" },
    { name: "București", raw: "Bucuresti" },
    { name: "Cluj", raw: "Cluj" },
    { name: "Timișoara", raw: "Timisoara" },
    { name: "Iasi", raw: "Iasi" },
    { name: "Constanța", raw: "Constanta" },
    { name: "Sibiu", raw: "Sibiu" },
    { name: "Oradea", raw: "Oradea" },
    { name: "Brașov", raw: "Brasov" },
    { name: "Craiova", raw: "Craiova" },
  ];

  const categories = [
    { name: "Toate experiențele", link: "/product" },
    { name: "Spiritualitate", link: "/product?category=Spiritualitate" },
    { name: "Excursii", link: "/product?category=Excursii" },
    { name: "Sănătate", link: "/product?category=Sanatate" },
    { name: "Sport", link: "/product?category=Sport" },
    { name: "Divertisment", link: "/product?category=Divertisment" },
    { name: "Artă", link: "/product?category=Arta" },
    {
      name: "Cursuri",
      link: "/product?category=Cursuri%20de%20limbi%20străine",
    },
    { name: "Hobby", link: "/product?category=Hobby" },
  ];

  const locations = [
    { name: "București", link: "/product?location=Bucuresti" },
    { name: "Cluj", link: "/product?location=Cluj" },
    { name: "Timișoara", link: "/product?location=Timisoara" },
    { name: "Iasi", link: "/product?location=Iasi" },
    { name: "Constanța", link: "/product?location=Constanta" },
    { name: "Sibiu", link: "/product?location=Sibiu" },
    { name: "Oradea", link: "/product?location=Oradea" },
    { name: "Brașov", link: "/product?location=Brasov" },
    { name: "Craiova", link: "/product?location=Craiova" },
  ];

  useEffect(() => {
    if (!firstAccess) {
      if (category === "") {
        setSelectedCategory(null);
        setCategory("-");
      } else if (category !== "" && category !== "-") {
        setSelectedCategory(category);
        setCategory("-");
      }

      if (locationOption === "") {
        setSelectedLocation(null);
        setLocationOption("-");
      } else if (locationOption !== "" && locationOption !== "-") {
        setSelectedLocation(locationOption);
        setLocationOption("-");
      }

      setFirstAccess(true);
    }
  }, []);

  const getCategory = (category) => {
    if (category === null) {
      return "";
    }

    if (category == "") {
      return "";
    }

    for (let i = 0; i < selectCategories.length; i++) {
      if (selectCategories[i].raw === category) {
        return selectCategories[i].name;
      }
    }
  };

  const getLocation = (location) => {
    if (location === null) {
      return "";
    }

    if (location == "") {
      return "";
    }

    for (let i = 0; i < selectLocations.length; i++) {
      if (selectLocations[i].raw === location) {
        return selectLocations[i].name;
      }
    }
  };

  const get_all_services = (cat) => {
    try {
      setIsLoading(true);

      axios_api
        .get("/get_services", {
          params: {
            // for category iterate through selectCategories and choose the name with the same raw
            category: getCategory(selectedCategory),
            location: getLocation(selectedLocation),
            sort: sortByPrice,
            inf_limit: (currentPage - 1) * pageSize,
            sup_limit: currentPage * pageSize,
            searched: search,
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            const json = response.data;
            setIsLoading(false);
            setProducts(json.services);
            setFilterProducts(json.services);
            setNumberProducts(json.total);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (err) {
      setIsLoading(false);
      setErr(err.message);
    }
  };

  const getData = async () => {
    try {
      if (firstAccess === true || (category === "" && locationOption === "")) {
        get_all_services(null);
      }
    } catch (err) {
      setIsLoading(false);
      setErr(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedCategory, selectedLocation, pageSize, currentPage]);

  const handleSearch = () => {
    navigate(`/product?search=${searchTerm}`);
    getData();
  };

  const handleCategory = (category) => {
    navigate(`/product?category=${category}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryMenuChange = (category) => {
    setSelectedCategory(category.raw);
  };

  const handleLocationMenuChange = (location) => {
    setSelectedLocation(location.raw);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleSortChange = (sortOption) => {
    setSortByPrice(sortOption);
  };

  const increasePageSize = () => {
    setPageSize(pageSize + 6);
  };

  const lg_rows = [];
  for (let i = 0; i < filterProducts.length; i += 3) {
    lg_rows.push(filterProducts.slice(i, i + 3));
  }

  const max_lg_rows = [];
  for (let i = 0; i < filterProducts.length; i += 1) {
    max_lg_rows.push(filterProducts.slice(i, i + 1));
  }

  const max_lg_rows_double = [];
  for (let i = 0; i < filterProducts.length; i += 2) {
    max_lg_rows_double.push(filterProducts.slice(i, i + 2));
  }

  const ProductRow = ({ products }) => {
    return (
      <div className="flex flex-row items-start justify-start max-lg:gap-[1rem] lg:gap-[2rem] text-white">
        {products.map((product, index) => (
          <div className="flex-1 product" key={index}>
            <SingleProduct key={product.service_id} product={product} />
          </div>
        ))}
      </div>
    );
  };

  const LargeMenuBar = () => {
    return (
      <div className="max-lg:hidden bg-gray-100 w-[17.75rem] flex flex-col items-start justify-start p-[1rem] box-border gap-[3rem]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem]">
          <b className="self-stretch relative tracking-[0.05em] leading-[1.5rem] flex items-center h-[1.5rem] shrink-0">
            Categorii
          </b>
          <div className="self-stretch flex flex-col items-start justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf">
            {selectCategories.map((category, index) => (
              <button
                key={index}
                className="cursor-pointer self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0"
                onClick={() => handleCategoryMenuChange(category)}
              >
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem]">
          <b className="self-stretch relative tracking-[0.05em] leading-[1.5rem] flex items-center h-[1.5rem] shrink-0">
            Locatii
          </b>
          <div className="self-stretch flex flex-col items-start justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf">
            {selectLocations.map((location, index) => (
              <button
                key={index}
                className="cursor-pointer self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0"
                onClick={() => handleLocationMenuChange(location)}
              >
                <span>{location.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const LargeFilter = () => {
    return (
      <div>
        <button
          className="lg:w-[57.25rem] flex flex-row items-end justify-start gap-[1rem] text-[1rem] text-dark-navy"
          onClick={toggleFilter}
        >
          <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium text-right flex items-center justify-end h-[1.5rem]">
            Filtru
          </div>
          <div className="h-[1.5rem] flex flex-col items-center justify-center">
            <img
              className="relative w-[1.5rem] h-[1.31rem]"
              alt=""
              src={filter_svg}
            />
          </div>
        </button>

        {/* Filtering options */}
        {showFilter && (
          <div className="w-full flex flex-row items-start justify-start gap-[2rem] p-4 bg-white shadow-md rounded-md">
            {/* Category Dropdown */}
            <div className="mb-4">
              <select
                className="text-[1rem] mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">Selectează categoria</option>
                {selectCategories.map((category, index) => (
                  <option key={index} value={category.raw}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Dropdown */}
            <div className="mb-4">
              <select
                className="text-[1rem] mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                value={selectedLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
              >
                <option value="">Selectează locația</option>
                {selectLocations.map((location, index) => (
                  <option key={index} value={location.raw}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                className="text-[1rem] mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                value={sortByPrice}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Sortează</option>
                <option value="ascending">Preț crescător</option>
                <option value="descending">Preț descrescător</option>
              </select>
            </div>

            {/* Apply Filters Button */}
            <button
              className="login-button-link mt-1 ml-auto text-white p-2 rounded font-normal text-[1rem]"
              onClick={getData}
            >
              Aplică filtre
            </button>
          </div>
        )}
      </div>
    );
  };

  const SmallFilter = () => {
    return (
      <div className="w-full mb-8 flex flex-col items-start justify-start">
        <button
          className="lg:w-[57.25rem] flex flex-row items-end justify-start gap-[1rem] text-[1rem] text-dark-navy"
          onClick={toggleFilter}
        >
          <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium text-right flex items-center justify-end h-[1.5rem]">
            Filtru
          </div>
          <div className="h-[1.5rem] flex flex-col items-center justify-center">
            <img
              className="relative w-[1.5rem] h-[1.31rem]"
              alt=""
              src={filter_svg}
            />
          </div>
        </button>

        {/* Filtering options */}
        {showFilter && (
          <div className="w-full flex flex-col items-start justify-start gap-[2rem] p-4 bg-white shadow-md rounded-md">
            {/* Category Dropdown */}
            <div className="mb-4 w-full">
              <select
                className="text-[1rem] mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">Selectează categoria</option>
                {selectCategories.map((category, index) => (
                  <option key={index} value={category.raw}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Dropdown */}
            <div className="mb-4 w-full">
              <select
                className="text-[1rem] mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                value={selectedLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
              >
                <option value="">Selectează locația</option>
                {selectLocations.map((location, index) => (
                  <option key={index} value={location.raw}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full">
              <select
                className="text-[1rem] mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                value={sortByPrice}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Sortează</option>
                <option value="ascending">Preț crescător</option>
                <option value="descending">Preț descrescător</option>
              </select>
            </div>

            {/* Apply Filters Button */}
            <div className="w-full">
              <button
                className="login-button-link w-full mt-1 text-white p-2 rounded font-normal text-[1rem]"
                onClick={getData}
              >
                Aplică filtre
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const LoadMore = () => {
    return (
      <div className="self-stretch flex flex-col items-center justify-start text-center text-[0.88rem] text-dark-navy">
        {pageSize * currentPage < numberProducts && (
          <button className="button-link" onClick={increasePageSize}>
            <div className="rounded box-border w-[15rem] h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] border-[1.5px] border-solid border-dark-navy">
              <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                Încarcă mai multe
              </b>
            </div>
          </button>
        )}
      </div>
    );
  };

  if (isLoading)
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        Loading...
      </p>
    );
  if (err)
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        <span>{err}</span>
        <Link to="/product" className="text-lg text-gray-500 font-semibold">
          &larr;Refresh page
        </Link>
      </p>
    );

  return (
    <div>
      <ExperienceSearch />

      {/* Desktop View */}
      <div className="max-xl:hidden w-full flex flex-col items-center justify-start pt-[5rem] pb-[4rem] box-border text-[1rem]">
        <div className="flex flex-col items-center justify-center">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-row items-start justify-start gap-[2rem]">
              <LargeMenuBar />
              <div className="lg:min-h-[70rem] flex flex-col max-lg:items-center lg:items-start justify-start gap-[2.5rem] text-[1.5rem]">
                <LargeFilter />

                {/* Check if there are products */}
                {products.length > 0 ? (
                  <div>
                    <div className="max-lg:hidden flex-1 flex flex-col items-start justify-start gap-[1rem] lg:w-[57.25rem]">
                      {lg_rows.map((productGroup, index) => (
                        <ProductRow key={index} products={productGroup} />
                      ))}
                    </div>
                    <LoadMore />
                    <Pagination
                      currentPage={currentPage}
                      pageSize={pageSize}
                      numberOfProducts={numberProducts}
                      onPageChange={handlePageChange}
                    />
                  </div>
                ) : (
                  // Display this message if there are no products
                  <p className="text-center w-full mt-10 text-xl">Revenim cât mai curând cu lista plină de activități, special alese pentru dumneavoastră!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="xl:hidden w-full flex flex-col items-center justify-start pt-[2rem] pb-[4rem] px-[2rem] box-border text-[1rem]">
        <div className="flex flex-col items-center justify-center">
          <div className="self-stretch flex flex-col justify-start">
            <SmallFilter />
            <div className="xl:h-[70rem] flex flex-col max-x:items-center xl:items-start justify-start gap-[2.5rem] text-[1.5rem] text-white">
              {/* Check if there are products */}
              {products.length > 0 ? (
                  <div>
                    <div className="sm:hidden relative xl:hidden flex-1 flex flex-col items-center justify-start gap-[2rem]">
                      {max_lg_rows.map((productGroup, index) => (
                        <ProductRow key={index} products={productGroup} />
                      ))}
                    </div>
                    <div className="max-sm:hidden relative lg:hidden flex-1 flex flex-col items-start justify-start gap-[2rem]">
                      {max_lg_rows_double.map((productGroup, index) => (
                        <ProductRow key={index} products={productGroup} />
                      ))}
                    </div>
                    <div className="max-lg:hidden relative xl:hidden flex-1 flex flex-col items-start justify-start gap-[2rem]">
                      {lg_rows.map((productGroup, index) => (
                        <ProductRow key={index} products={productGroup} />
                      ))}
                    </div>
                    <LoadMore />
                    <Pagination
                      currentPage={currentPage}
                      pageSize={pageSize}
                      numberOfProducts={numberProducts}
                      onPageChange={handlePageChange}
                    />
                  </div>
                ) : (
                  // Display this message if there are no products
                  <p className="text-center w-full mt-10 text-lg text-black">Revenim cât mai curând cu lista plină de activități, special alese pentru dumneavoastră!</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
