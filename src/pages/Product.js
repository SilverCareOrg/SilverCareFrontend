import { Fragment, useState, useEffect, useRef } from "react";
import SingleProduct from "../components/SingleProduct";
import { Link } from "react-router-dom";
import axios_api from '../axios_api';
import { saveAs } from 'file-saver';
import { GoFilter } from "react-icons/go";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

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
  const [catPath, setCatPath] = useState("Toate serviciile");
  // const fs = require('fs');

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
    "Toate serviciile",
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

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        axios_api.get("http://127.0.0.1:8000/get_all_services", {withCredentials: true}).then((response) => {
          if (response.status === 200) {
            // Save file on local frontend server - FOR FUTURE USE
            // for (let i = 0; i < response.data.length; i++) {
            //   const encodedPhoto = response.data[i]["image"];
            //   const decodedPhoto = atob(encodedPhoto);
            //   const photoBlob = new Blob([decodedPhoto], { type: 'image/' + response.data[i]["image_type"] });
            //   // saveAs(photoBlob, '../images/' + response.data[i]["image_path"]);
            //   fs.writeFile("../images/" + response.data[i]["image_path"], decodedPhoto, (err) => {
            //     if (err) {
            //         return console.log(err);
            //     }
            //     console.log("file saved!");
            // }); 
            //   // FileSaver.saveAs("../images/", response.data[i]["image_path"]);
            // }

            const json = response.data;
            setIsLoading(false);
            setProducts(json);
            setFilterProducts(json);
          }
        }).catch((error) => {
          console.log("Error:", error);
        });
      } catch (err) {
        setIsLoading(false);
        setErr(err.message);
      }
    };
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
              setFilterProducts(products);
              setCatPath("Toate serviciile");
            }}
          >
            <span className="font-semibold">Toate serviciile</span>
            <span>{`(${products.length})`}</span>
          </h3>
          {categories.map((cat, i) => (
            <p
              ref={para}
              className="select-none cursor-pointer capitalize font-semibold"
              key={i}
              onClick={() => {
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
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
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
                                  const filters = products.filter(
                                    (product) => product.category === cat
                                  );
                                  setFilterProducts(filters);
                                  setCatPath(sm_categories[i]);

                                  if (sm_categories[i] === "Toate serviciile") {
                                    setFilterProducts(products);
                                    setCatPath("Toate serviciile");
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

        <div classname="">
          <p className="max-sm:hidden max-sm:px-2 text-gray-500 pb-4">
            {<Link to="/">Home </Link>}/
            <span className="text-sky-400 px-1">{catPath}</span>
          </p>
          <div clasName="max-sm:flex max-sm:justify-center">
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
