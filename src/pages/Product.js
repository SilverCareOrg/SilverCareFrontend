import { Fragment, useState, useEffect, useRef } from "react";
import SingleProduct from "../components/SingleProduct";
import { Link, useParams  } from "react-router-dom";
import axios_api from '../api/axios_api';
import { useLocation } from 'react-router-dom';
import HomeSearchGif from '../styles/icons/icons8-search.gif';
import { useNavigate } from 'react-router-dom';
import filter_svg from "../styles/icons/filter.svg";
import axios from "axios";
import Pagination from "../components/Pagination";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesMenu, setCategoriesMenu] = useState(false);
  const [err, setErr] = useState(null);
  var FileSaver = require('file-saver');
  const [catPath, setCatPath] = useState("Toate experiențele");
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const currentURL = location.pathname;
  const queryParams = new URLSearchParams(location.search);

  const [search, setSearch] = useState(queryParams.get('search') || '');
  const [category, setCategory] = useState(queryParams.get('category') || '');
  const [locationOption, setLocationOption] = useState(queryParams.get('location') || '');

  const [isStringInURL, setIsStringInUrl] = useState(currentURL.includes('product/search/'));
  const para = useRef(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [numberProducts, setNumberProducts] = useState(0);

  const categories = [
    { name: 'Toate experiențele', link: '/product'},
    { name: 'Spiritualitate', link: '/product?category=Spiritualitate'},
    { name: 'Excursii', link: '/product?category=Excursii'},
    { name: 'Sănătate', link: '/product?category=Sanatate'},
    { name: 'Sport', link: '/product?category=Sport'},
    { name: 'Divertisment', link: '/product?category=Divertisment'},
    { name: 'Artă', link: '/product?category=Arta'},
    { name: 'Cursuri', link: '/product?category=Cursuri%20de%20limbi%20străine'},
    { name: 'Hobby', link: '/product?category=Hobby'},
  ];

  const locations = [
    { name: 'Bucharest', link: '/product?location=Bucharest'},
    { name: 'Cluj', link: '/product?location=Cluj'},
    { name: 'Timisoara', link: '/product?location=Timisoara'},
    { name: 'Iasi', link: '/product?location=Iasi'},
    { name: 'Constanta', link: '/product?location=Constanta'},
    { name: 'Sibiu', link: '/product?location=Sibiu'},
    { name: 'Oradea', link: '/product?location=Oradea'},
    { name: 'Brasov', link: '/product?location=Brasov'},
    { name: 'Craiova', link: '/product?location=Craiova'},
  ];

  useEffect(() => {
    const handleWindowResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setPageSize(isLargeScreen ? 12 : 6);
    };

    window.addEventListener('resize', handleWindowResize);

    handleWindowResize();

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const get_all_services =  (cat) => {
    try {
      setIsLoading(true);

      axios_api.get("/get_all_services", {withCredentials: true}).then((response) => {
        if (response.status === 200) {
          const json = response.data;
          setIsLoading(false);
          setProducts(json);

          if (category) {
            const filters = json.filter(
              (product) => product.category === category
            );
            setFilterProducts(filters);
            setNumberProducts(json.length);
            setCatPath(category);
          } else {
            setFilterProducts(json);
            setNumberProducts(json.length);
          }

          if (cat) {
            const filters = products.filter(
              (product) => product.category === cat
            );
            setFilterProducts(filters);
            setNumberProducts(filterProducts.length);
          }

        }
      }).catch((error) => {
        console.log("Error:", error);
      });

    } catch (err) {
      setIsLoading(false);
      setErr(err.message);
    }
  };

  const getData = async () => {
    try {

      setIsLoading(true);

      if (search === "") {
        get_all_services(null);
      } else {
        axios_api.post("/search_ex", {
          searched: search
        }, {withCredentials: true}).then((response) => {
          if (response.status === 200) {
            const json = response.data;
            setIsLoading(false);
            setProducts(json);
            setFilterProducts(json);
            setNumberProducts(json.length);
          }
        }).catch((error) => {
          console.log("Error:", error);
        });
      }

      // if (isStringInURL) {

      //   if (search === "") {
      //     setIsStringInUrl(false);
      //   } else {
      //     console.log(search);
      //     axios_api.post("/search_ex", {
      //       searched: search
      //     }, {withCredentials: true}).then((response) => {
      //       if (response.status === 200) {
      //         const json = response.data;
      //         setIsLoading(false);
      //         setProducts(json);
      //         setFilterProducts(json);
      //         setCatPath("Toate experiențele");
      //       }
      //     }).catch((error) => {
      //       console.log("Error:", error);
      //     });
      //   }
        
      // } else {
      //   get_all_services(null);
      // }

    } catch (err) {
      setIsLoading(false);
      setErr(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

    const handleSearch = () => {
      navigate(`/product?search=${searchTerm}`);
      getData();
    };

    const handleCategory = (category) => {
      navigate(`/product?category=${category}`);
    }

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    const lg_rows = [];
    for (let i = 0; i < filterProducts.length; i += 3) {
        lg_rows.push(filterProducts.slice(i, i + 3));
    }

    const max_lg_rows = [];
    for (let i = 0; i < filterProducts.length; i += 1) {
        max_lg_rows.push(filterProducts.slice(i, i + 1));
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

    const ExperienceSearch = () => {
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

    const LargeMenuBar = () => {
      return (
        <div className="max-lg:hidden bg-gray-100 w-[17.75rem] flex flex-col items-start justify-start p-[1rem] box-border gap-[3rem]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem]">
            <b className="self-stretch relative tracking-[0.05em] leading-[1.5rem] flex items-center h-[1.5rem] shrink-0">
              Toate
            </b>
            <div className="self-stretch flex flex-col items-start justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf">
            {categories.map((category, index) => (
              <a className="cursor-pointer self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0"
              href = {category.link}>
              <span>{category.name}</span>
            </a>
            ))}
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem]">
            <b className="self-stretch relative tracking-[0.05em] leading-[1.5rem] flex items-center h-[1.5rem] shrink-0">
              Locatii
            </b>
            <div className="self-stretch flex flex-col items-start justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf">
              {locations.map((location, index) => (
                <a className="cursor-pointer self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0"
                href = {location.link}>
                <span>{location.name}</span>
              </a>
              ))}
            </div>
          </div>
        </div>
      );
    };

  const LoadMore = () => {
    return (
      <div className="self-stretch flex flex-col items-center justify-start text-center text-[0.88rem] text-dark-navy">
      <a href="/product" className="button-link">
        <div className="rounded box-border w-[15rem] h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] border-[1.5px] border-solid border-dark-navy">
            <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                Încarcă mai multe
            </b>
        </div>
      </a>
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
      <div className="max-lg:hidden w-full flex flex-col items-center justify-start pt-[5rem] pb-[4rem] box-border text-[1rem]">
          <div className="flex flex-col items-center justify-center">
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-row items-start justify-start gap-[2rem]">
                <LargeMenuBar />
                <div className="lg:h-[70rem] flex flex-col max-lg:items-center lg:items-start justify-start gap-[2.5rem] text-[1.5rem] text-white">
                  <div className="lg:w-[57.25rem] flex flex-row items-end justify-start gap-[1rem] text-[1rem] text-dark-navy">
                    
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
                  </div>
                  <div className="max-lg:hidden flex-1 flex flex-col items-start justify-start gap-[1rem] lg:w-[57.25rem]">
                    {lg_rows.map((productGroup, index) => (
                        <ProductRow key={index} products={productGroup} />
                    ))}
                  </div>
                  <LoadMore />
                  <Pagination currentPage={currentPage} pageSize={pageSize} numberOfProducts={numberProducts} onPageChange={handlePageChange}/>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Mobile View */}
      <div className="lg:hidden w-full flex flex-col items-center justify-start pt-[2rem] pb-[4rem] px-[2rem] box-border text-[1rem]">
          <div className="flex flex-col items-center justify-center">
            <div className="self-stretch flex flex-col items-end justify-start">
              
              <div className="lg:w-[57.25rem] flex items-end justify-start gap-[1rem] text-[1rem] text-dark-navy pb-[2rem]">
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
              </div>
                <div className="lg:h-[70rem] flex flex-col max-lg:items-center lg:items-start justify-start gap-[2.5rem] text-[1.5rem] text-white">
                  <div className="relative lg:hidden flex-1 flex flex-col items-center justify-start gap-[2rem]">
                    {max_lg_rows.map((productGroup, index) => (
                        <ProductRow key={index} products={productGroup} />
                    ))}
                  </div>
                  <LoadMore />
                  <Pagination currentPage={currentPage} pageSize={pageSize} numberOfProducts={numberProducts} onPageChange={handlePageChange}/>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Products;
