import SingleProduct from "./SingleProduct";
import axios_api from '../api/axios_api';
import { useState, useEffect, useRef } from "react";

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const getData = async () => {
    try {

      axios_api.get("/get_homepage_best_selling_products", {withCredentials: true}).then((response) => {
        if (response.status === 200) {
          const json = response.data;
          setProducts(json);
        }
      }).catch((error) => {
        console.log("Error:", error);
      });
    } catch (err) {
      setErr(err.message);
    }
    };
    getData();
  }, []);

  return (
    <section className="container mx-auto">
      <h2 className="text-4xl py-10 text-center font-medium text-gray-700">
        Cele mai apreciate servicii
      </h2>
      {/* Desktop */}
      <div className="max-xl:hidden">
        <div className="grid grid-cols-3 gap-10 w-[80%] mx-auto pb-20">
          {products &&
            products
              .map((product) => {
                return <SingleProduct key={product.name} product={product} />;
              })}
        </div>
      </div>
      {/* Mobile */}
      <div className="xl:hidden">
        <div className="grid grid-rows-3 gap-10  mx-auto pb-20">
          {products &&
            products
              .map((product) => {
                return <SingleProduct key={product.name} product={product} />;
              })}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
