import React from "react";
import { useState, useEffect } from "react";
import axios_api from "../api/axios_api";
function AdminUpdateJson() {
  const [products, setProducts] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [productJson, setProductJson] = useState("");
  const get_all_services = () => {
    try {
      axios_api
        .get("/get_services", {
          params: {
            // for category iterate through selectCategories and choose the name with the same raw
          },
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

  function handleDisplayService(id) {
    console.log(id);
    setSelectedProductIndex(id - 1);
    // console.log(productJson);
    handleJsonChange(id);
  }

  function handleJsonChange() {
    setProductJson(JSON.stringify(products[selectedProductIndex], null, 2));
  }

  return (
    <>
      <div className="mb-4">
        <label htmlFor="id" className="block font-semibold">
          Select Service Name
        </label>
        <select
          id="service_name"
          name="service_name"
          placeholder="Select a service name"
          className="w-full border rounded-md p-2"
          onClick={(e) => handleDisplayService(e.target.value)}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>
      <div id="editableTextbox">
        <form>
          <textarea
            value={productJson}
            onChange={(e) => setProductJson(e.target.value)}
            className="w-full border rounded-md p-10 h-[50vh]"
          />
        </form>
        {/* //onClick .put function  */}
        <div onClick={() => console.log(productJson)}>
          <button className="w-full hover:bg-56 h-10 bg-blue-500 hover:bg-blue-700 text-lg">
            Update Service with id:{selectedProductIndex + 1}
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminUpdateJson;
