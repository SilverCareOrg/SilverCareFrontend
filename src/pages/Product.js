import { Fragment, useState, useEffect, useRef } from "react";
import SingleProduct from "../components/SingleProduct";
import { Link, useParams  } from "react-router-dom";
import axios_api from '../api/axios_api';
import { saveAs } from 'file-saver';
import { GoFilter } from "react-icons/go";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { useLocation } from 'react-router-dom';
import HomeSearchGif from '../styles/icons/icons8-search.gif';
import { useNavigate } from 'react-router-dom';
import filter_svg from "../styles/icons/filter.svg";

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
  const { category } = useParams();
  const { search_input } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const currentURL = location.pathname;
  const [isStringInURL, setIsStringInUrl] = useState(currentURL.includes('product/search/'));

  const para = useRef(null);

  const categories = [
    "Toate experiențele",
    "Spiritualitate",
    "Excursii",
    "Cursuri de limbi străine",
    "Hobby",
    "Sport",
    "Educatie",
    "Sanatate",
    "Divertisment",
    "Arta"
  ];

  const sm_categories = [
    "Toate experiențele",
    "Spiritualitate",
    "Excursii",
    "Cursuri de limbi străine",
    "Hobby",
    "Sport",
    "Educatie",
    "Sanatate",
    "Divertisment",
    "Arta"
  ];

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
            setCatPath(category);
          } else {
            setFilterProducts(json);
          }

          if (cat) {
            const filters = products.filter(
              (product) => product.category === cat
            );
            setFilterProducts(filters);
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
      if (isStringInURL) {

        if (search_input === "") {
          setIsStringInUrl(false);
        } else {
          axios_api.post("/search_ex", {
            searched: search_input
          }, {withCredentials: true}).then((response) => {
            if (response.status === 200) {
              const json = response.data;
              setIsLoading(false);
              setProducts(json);
              setFilterProducts(json);
              setCatPath("Toate experiențele");
            }
          }).catch((error) => {
            console.log("Error:", error);
          });
        }
        
      } else {
        get_all_services(null);
      }

    } catch (err) {
      setIsLoading(false);
      setErr(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

  
    const handleSearch = () => {
      navigate(`/product/search/${searchTerm}`);
      getData();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const lg_rows = [];
    for (let i = 0; i < filterProducts.length; i += 3) {
        lg_rows.push(filterProducts.slice(i, i + 3));
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

  return (
    <div>
    <div className="bg-light-purple w-full h-[20rem] flex flex-col items-center justify-center py-[3.5rem] px-[0rem] box-border text-center">
      <div className="w-[77rem] flex flex-col items-center justify-center">
        <div className="self-stretch flex flex-col items-center justify-start gap-[2.5rem]">
          <div className="flex flex-col items-start justify-start gap-[1.5rem]">
                <div className="relative tracking-[0.05em] leading-[120%] font-semibold flex items-center text-[2rem] justify-center w-[57rem] h-[2.5rem] shrink-0">
                  Experiențe
                </div>
                <div className="relative tracking-[0.1em] leading-[120%] font-semibold text-[1.2rem] flex items-center justify-center w-[57rem]">
                  Alege experiența perfectă pentru tine !
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
    <div className="w-[90rem] flex flex-col items-center justify-start pt-[5rem] px-[0rem] pb-[4rem] box-border text-[1rem]">
          <div className="w-[77rem] flex flex-col items-center justify-center">
            <div className="self-stretch flex flex-col items-start justify-start">
              <div className="self-stretch flex flex-row items-start justify-start gap-[2rem]">
                <div className="bg-gray-100 w-[17.75rem] flex flex-col items-start justify-start p-[1rem] box-border gap-[3rem]">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem]">
                    <b className="self-stretch relative tracking-[0.05em] leading-[1.5rem] flex items-center h-[1.5rem] shrink-0">
                      Toate
                    </b>
                    <div className="self-stretch flex flex-col items-start justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf">
                    {categories.map((category, index) => (
                      <p
                      ref={para}
                      className="cursor-pointer self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0"
                      key={index}
                      onClick={() => {
                        if (isStringInURL) {
                          setIsStringInUrl(false);
                          get_all_services(category);
                        }
        
                        const filters = products.filter(
                          (product) => product.category === category
                        );
        
                        setFilterProducts(filters);
                        setCatPath(categories[index]);
                      }}
                    >
                      <span>{category}</span>
                    </p>
                    ))}
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem]">
                    <b className="self-stretch relative tracking-[0.05em] leading-[1.5rem] flex items-center h-[1.5rem] shrink-0">
                      Locatii
                    </b>
                    <div className="self-stretch flex flex-col items-start justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf">
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Bucuresti
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">{`Cluj `}</div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Timisoara
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Iasi
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Constanta
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Sibiu
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Oradea
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Brasov
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Craiova
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[70rem] flex flex-col items-start justify-start gap-[2.5rem] text-[1.5rem] text-white">
                  <div className="w-[57.25rem] flex flex-row items-start justify-start gap-[1rem] text-[1rem] text-dark-navy">
                    {/* <div className="h-[1.5rem] flex flex-col items-center justify-center">
                      <img
                        className="relative w-[1.5rem] h-[1.31rem]"
                        alt=""
                        src="/-icon-th.svg"
                      />
                    </div>
                    <div className="h-[1.5rem] flex flex-col items-center justify-center">
                      <img
                        className="relative w-[1.5rem] h-[1.31rem]"
                        alt=""
                        src="/-icon-th1.svg"
                      />
                    </div>
                    <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem]">
                      afisare
                    </div> */}
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
                  <div className=" flex-1 flex flex-col items-start justify-start gap-[1rem] w-[57.25rem]">
                    {lg_rows.map((productGroup, index) => (
                        <ProductRow key={index} products={productGroup} />
                    ))}
                  </div>
                  
                  <div className="self-stretch flex flex-col items-center justify-start text-center text-[0.88rem] text-dark-navy">
                    <div className="rounded box-border w-[15rem] h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] border-[1.5px] border-solid border-dark-navy">
                      <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                        incarca MAI MULTe
                      </b>
                    </div>
                  </div>
                  <div className="w-[57.25rem] flex flex-row items-start justify-center gap-[1.5rem] text-[1rem] text-dark-navy">
                    <div className="w-[1.5rem] h-[1.5rem] flex flex-row items-center justify-center">
                      <img
                        className="relative rounded-sm w-[0.7rem] h-[1.38rem]"
                        alt=""
                        src="/vector-5.svg"
                      />
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-center gap-[1.5rem]">
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[0.56rem] shrink-0">
                        1
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[0.56rem] shrink-0">
                        2
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[0.56rem] shrink-0">
                        3
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[0.56rem] shrink-0">
                        4
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[0.56rem] shrink-0">
                        5
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[0.56rem] shrink-0">
                        6
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[0.56rem] shrink-0">
                        7
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[0.81rem] shrink-0">
                        ...
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[1.25rem] shrink-0">
                        20
                      </div>
                    </div>
                    <div className="w-[1.5rem] h-[1.5rem] flex flex-row items-center justify-center [transform:_rotate(180deg)] [transform-origin:0_0]">
                      <img
                        className="relative rounded-sm w-[0.7rem] h-[1.38rem]"
                        alt=""
                        src="/vector-51.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Products;
