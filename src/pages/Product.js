import { Fragment, useState, useEffect, useRef } from "react";
import SingleProduct from "../components/SingleProduct";
import { Link, useParams  } from "react-router-dom";
import axios_api from '../api/axios_api';
import { saveAs } from 'file-saver';
import { GoFilter } from "react-icons/go";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { useLocation } from 'react-router-dom';

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
      console.log(isStringInURL);
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

  return (
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
  );
};

export default Products;
