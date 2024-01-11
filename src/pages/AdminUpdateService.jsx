import React from "react";
import axios_api from "../api/axios_api";
import { useEffect, useState } from "react";

function AdminUpdateService() {
  const product = { id: 1, name: "stefan", organization: "org123" };

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
    } catch (err) {}
  };

  useEffect(() => {
    get_all_services();
    console.log(products);
  }, []);

  function goToProductUpdatePage(id) {
    window.location.href = `/adminUpdateServiceProduct/${id}`;
  }

  return (
    <>
      <button onClick={() => console.log(products)}>APASA</button>
      <div className="h-[50vh] py-20">
        {products.map((product) => (
          <div className="flex justify-center items-center">
            id: {product.id} name: {product.name} organization:{" "}
            {product.organiser} category: {product.category}
            <button onClick={() => goToProductUpdatePage(product.id)}>
              update
            </button>
          </div>
        ))}
        )
      </div>
    </>
  );
}

export default AdminUpdateService;
