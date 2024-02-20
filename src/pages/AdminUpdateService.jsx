import React from "react";
import axios_api from "../api/axios_api";
import { useEffect, useState } from "react";

function AdminUpdateService() {
  const [products, setProducts] = useState([]);
  const get_all_services = () => {
    try {
      axios_api
        .get("/get_services?type_of_query=2", {
          params: {},
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            const json = response.data;
            setProducts(json.services);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (err) { }
  };

  useEffect(() => {
    get_all_services();
    console.log(products);
  }, []);

  function goToProductUpdatePage(id) {
    window.location.href = `/adminUpdateServiceProduct/${id}`;
  }

  function handleProductVisibility(product) {
    console.log(product.name)
  }

  return (
    <>
      <div className=" pb-32 pt-16">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center m-auto max-w-[300px] sm:max-w-[350px] md:max-w-[650px] lg:max-w-[900px] xl:max-w-[1100px] 2xl:max-w-[1300px] p-4"
          >
            <div className="flex flex-col items-start">
              <div className="text-blue-600 text-2xl">
                ID: {product?.id} Product name: {product?.name}
              </div>
              <div>
                <p>Organiser: {product?.organiser}</p>
                <p>Category: {product?.category}</p>
              </div>
            </div>
            <div>
            <button
              onClick={() => goToProductUpdatePage(product?.id)}
              className="btn-submit ml-12 bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 hover:shadow-md transition-all"
            >
              Update Service with ID:{product?.id}
            </button>
            <div className="flex align-center items-center ml-16 mt-2">
                <p className="text-red-600 text-xl">Hide Service</p>
                <input
                  type="checkbox"
                  id="common_location"
                  name="common_location"
                  checked={product?.isVisible}
                  onChange={() => handleProductVisibility(product)}
                  className="w-10 h-10 ml-2 mr-2"
                />
            </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminUpdateService;
