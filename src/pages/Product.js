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
                  <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem] font-montserrat">
                    <b className="self-stretch relative tracking-[0.05em] leading-[1.5rem] flex items-center h-[1.5rem] shrink-0">
                      Ocazii
                    </b>
                    <div className="self-stretch flex flex-col items-start justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf font-h3">
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Craciun
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Anul nou
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Paste
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Vara
                      </div>
                      <div className="self-stretch relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                        Aniversari
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[91.5rem] flex flex-col items-start justify-start gap-[2.5rem] text-[1.5rem] text-white">
                  <div className="w-[57.25rem] flex flex-row items-start justify-start gap-[1rem] text-[1rem] text-dark-navy">
                    <div className="h-[1.5rem] flex flex-col items-center justify-center">
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
                    </div>
                    <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium text-right flex items-center h-[1.5rem]">
                      filtru
                    </div>
                    <div className="h-[1.5rem] flex flex-col items-center justify-center">
                      <img
                        className="relative w-[1.5rem] h-[1.31rem]"
                        alt=""
                        src="/-icon-horizontal-sliders.svg"
                      />
                    </div>
                  </div>
                  <div className="flex-1 relative w-[57.25rem]">
                    <div className="absolute top-[0rem] left-[0rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Pelerinaj la Manastirile Rupestre
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[0rem] left-[19.75rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Terapie culinara
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[0rem] left-[39.5rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Terapie Psihologica
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[10.69rem] left-[21.19rem] w-[13.74rem]" />
                    <img
                      className="absolute top-[0rem] left-[19.75rem] rounded-lg w-[17.75rem] h-[17.75rem] object-cover"
                      alt=""
                      src="/image-109@2x.png"
                    />
                    <img
                      className="absolute top-[0rem] left-[39.5rem] rounded-lg w-[17.75rem] h-[17.75rem] object-cover"
                      alt=""
                      src="/image-110@2x.png"
                    />
                    <img
                      className="absolute top-[0rem] left-[0rem] rounded-lg w-[17.75rem] h-[17.75rem] object-cover"
                      alt=""
                      src="/image-108@2x.png"
                    />
                  </div>
                  <div className="flex-1 relative w-[57.25rem]">
                    <div className="absolute top-[0rem] left-[0rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Sedinta de cuplu
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[0rem] left-[19.75rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Consiliere in nutritie
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[0rem] left-[39.5rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Cursuri de limbi straine
                          </div>
                        </div>
                      </div>
                    </div>
                    <img
                      className="absolute top-[-0.06rem] left-[0rem] rounded-lg w-[17.75rem] h-[17.69rem] object-cover"
                      alt=""
                      src="/image-111@2x.png"
                    />
                    <img
                      className="absolute top-[0.13rem] left-[19.75rem] rounded-lg w-[17.75rem] h-[17.63rem] object-cover"
                      alt=""
                      src="/image-112@2x.png"
                    />
                    <img
                      className="absolute top-[-0.12rem] left-[39.5rem] rounded-lg w-[17.75rem] h-[17.69rem] object-cover"
                      alt=""
                      src="/image-113@2x.png"
                    />
                  </div>
                  <div className="flex-1 relative w-[57.25rem]">
                    <div className="absolute top-[0rem] left-[0rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Masaj terapeutic
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[0rem] left-[19.75rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Masaj Ayurvedic
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[0rem] left-[39.5rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Respiratie somatica
                          </div>
                        </div>
                      </div>
                    </div>
                    <img
                      className="absolute top-[-0.12rem] left-[39.5rem] rounded-lg w-[17.75rem] h-[17.75rem] object-cover"
                      alt=""
                      src="/image-115@2x.png"
                    />
                    <img
                      className="absolute top-[0rem] left-[19.69rem] rounded-lg w-[17.81rem] h-[17.75rem] object-cover"
                      alt=""
                      src="/image-114@2x.png"
                    />
                    <img
                      className="absolute top-[0rem] left-[0rem] rounded-lg w-[17.75rem] h-[17.63rem] object-cover"
                      alt=""
                      src="/image-120@2x.png"
                    />
                  </div>
                  <div className="flex-1 relative w-[57.25rem]">
                    <div className="absolute top-[0rem] left-[0rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Consiliere emotionala
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[0rem] left-[19.75rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Constelatii familiale
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[0rem] left-[39.5rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[17.63rem] overflow-hidden">
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                        alt=""
                        src="/rectangle-4215@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4216@2x.png"
                      />
                      <img
                        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover hidden"
                        alt=""
                        src="/rectangle-4217@2x.png"
                      />
                      <div className="absolute h-full w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
                        <img
                          className="relative w-[2rem] h-[2rem]"
                          alt=""
                          src="/-icon-gratipay-gittip.svg"
                        />
                        <div className="self-stretch flex flex-col items-start justify-end">
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold">
                            Terapie prin Yoga
                          </div>
                        </div>
                      </div>
                    </div>
                    <img
                      className="absolute top-[-0.19rem] left-[0rem] rounded-lg w-[17.75rem] h-[17.81rem] object-cover"
                      alt=""
                      src="/image-117@2x.png"
                    />
                    <img
                      className="absolute top-[0rem] left-[19.81rem] rounded-lg w-[17.63rem] h-[17.63rem] object-cover"
                      alt=""
                      src="/image-118@2x.png"
                    />
                    <img
                      className="absolute top-[0rem] left-[39.5rem] rounded-lg w-[17.75rem] h-[17.81rem] object-cover"
                      alt=""
                      src="/image-119@2x.png"
                    />
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
    <div className="container mx-auto pb-20">
      <h2 className="text-center text-3xl py-10">{catPath}</h2>
      <div className="flex max-sm:flex-col justify-between gap-10">

        {/* Categories static panel */}
        <div className="max-sm:hidden w-[20%] bg-gray-50 flex flex-col gap-3 px-3 pt-2">
          <h3
            className="select-none cursor-pointer flex justify-between"
            onClick={() => {
              if (isStringInURL) {
                setIsStringInUrl(false);
                get_all_services();
              }

              setFilterProducts(products);
              setCatPath("Toate experiențele");
            }}
          >
            <span className="font-semibold">Toate experiențele</span>
            <span>{`(${products.length})`}</span>
          </h3>
          {categories.map((cat, i) => (
            <p
              ref={para}
              className="select-none cursor-pointer capitalize font-semibold"
              key={i}
              onClick={() => {
                if (isStringInURL) {
                  setIsStringInUrl(false);
                  get_all_services(cat);
                }

                const filters = products.filter(
                  (product) => product.category === cat
                );

                setFilterProducts(filters);
                setCatPath(categories[i]);
              }}
            >
              <span>{cat}</span>
            </p>
          ))}
        </div>

        {/* Categories trigger panel */}
        <div className="sm:hidden">
          <div className="pl-3">
            <Menu as="div" className="relative text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-md font-medium text-gray-700 hover:text-gray-900">
                        Categorii
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute left-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sm_categories.map((cat, i) => (
                            <Menu.Item key={i}>
                              {({ active }) => (
                                <p
                                ref={para}
                                key={i}
                                onClick={() => {
                                  if (isStringInURL) {
                                    setIsStringInUrl(false);
                                    get_all_services(cat);
                                  }

                                  const filters = products.filter(
                                    (product) => product.category === cat
                                  );

                                  setFilterProducts(filters);
                                  setCatPath(sm_categories[i]);

                                  if (sm_categories[i] === "Toate experiențele") {
                                    setFilterProducts(products);
                                    setCatPath("Toate experiențele");
                                  }
                                }}
                                className={classNames(
                                  cat.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                <span>{cat}</span>
                              </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
              </div>
          </div>

        <div className="">
          <p className="max-sm:hidden max-sm:px-2 text-gray-500 pb-4">
            {<Link to="/">Home </Link>}/
            <span className="text-sky-400 px-1">{catPath}</span>
          </p>
          <div className="max-sm:flex max-sm:justify-center">
            <div className="grid max-sm:mx-auto max-md:grid-cols-1 max-xl:grid-cols-2 grid-cols-3 gap-10 ">
              {filterProducts &&
                filterProducts.map((product) => (
                  <SingleProduct key={product.service_id} product={product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Products;
