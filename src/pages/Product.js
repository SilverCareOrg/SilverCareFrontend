import { useState, useEffect, useRef } from "react";
import SingleProduct from "../components/SingleProduct";
import { Link } from "react-router-dom";
import axios_api from '../axios_api';
import { saveAs } from 'file-saver';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  var FileSaver = require('file-saver');
  const [catPath, setCatPath] = useState("all categories");
  // const fs = require('fs');

  const para = useRef(null);

  const categories = [
    "spiritualitate",
    "excursii",
    "cursuri de limbi străine",
    "hobby",
    "sport",
    "educatie",
    "sanatate",
    "divertisment",
    "arta"
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
      <h2 className="text-center text-3xl py-10">All Products</h2>
      <div className="flex justify-between gap-10">
        <div className="w-[20%] bg-gray-50 flex flex-col gap-3 px-3 pt-2">
          <h3
            className="select-none cursor-pointer flex justify-between"
            onClick={() => {
              setFilterProducts(products);
              setCatPath("all categories");
            }}
          >
            <span className="font-semibold">All Categories</span>
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
        <div>
          <p className="text-gray-500 pb-4">
            {<Link to="/">Home </Link>}/
            <span className="text-sky-400 px-1">{catPath}</span>
          </p>
          <div className="grid grid-cols-3 gap-10 ">
            {filterProducts &&
              filterProducts.map((product) => (
                <SingleProduct key={product.service_id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
