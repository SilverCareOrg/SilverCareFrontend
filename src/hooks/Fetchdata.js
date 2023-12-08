import { useEffect, useState } from "react";
import product_data from "../product_data/product_data.json";

const Fetchdata = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // const res = await fetch("https://itproducts.onrender.com/products");
      // if (!res.ok) throw new Error("Oops! An error has occured");
      // const json = await res.json();
      const json = product_data;

      setProducts(json);
    };
    getData();
  }, []);

  return products;
};

export default Fetchdata;
