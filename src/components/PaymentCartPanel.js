import axios_api from "../api/axios_api";

import { useEffect, useState } from "react";
import back_icon_arrow from "../styles/icons/back_icon_arrow.svg";
import ProgressBar from "./ProgressBar";
import ProductsList from "./ProductList";

const PaymentCartPanel = ({}) => {
  const [price_total, setPriceTotal] = useState(0);
  const baseUrl = window.location.origin + "/images/";
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [acceptTermsChecked, setAcceptTermsChecked] = useState(false);
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =
    useState(false);

  const calculateTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].price !== "free") {
        total += parseFloat(products[i].price);
      }
    }
    return total;
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const total = calculateTotalPrice();
    setPriceTotal(total);
  }, [products]);

  const getData = () => {
    if (isLoggedIn) {
      try {
        axios_api
          .get("/get_cart", { withCredentials: true })
          .then((response) => {
            if (response.status === 200) {
              const json = response.data;
              setProducts(json);
              let total = 0;
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } catch (err) {}
    } else {
      var services = localStorage.getItem("services");

      if (services) {
        services = JSON.parse(services);
      } else {
        services = [];
      }

      setProducts(services);
    }
  };

  useEffect(() => {
    getData();
  }, [isLoggedIn]);

  const handleRemoveButton = (id, price) => {
    let tmp_price = price;
    if (isLoggedIn) {
      axios_api
        .delete("/remove_from_cart", {
          withCredentials: true,
          data: { id: id },
        })
        .then((response) => {
          if (response.status === 200) {
            const json = response.data;
            setProducts(json);
            let total = price_total - tmp_price;
            total < 0 ? (total = 0) : (total = total);
            setPriceTotal(total);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } else {
      var services = localStorage.getItem("services");

      if (services) {
        services = JSON.parse(services);
      } else {
        services = [];
      }

      for (let i = 0; i < services.length; i++) {
        if (services[i].service_id === id) {
          services.splice(i, 1);
        }
      }

      if (services.length === 0) {
        localStorage.removeItem("services");
      } else {
        localStorage.setItem("services", JSON.stringify(services));
      }

      getData();
    }
  };

  return (
    <>
      <ProgressBar cartStep={"1"} />
      <div className="w-[wh] flex flex-col bg-white overflow-hidden text-left text-[1rem] text-dark-navy font-text-body">
        <div className="w-[wh] max-w-[1050px] flex justify-center items-center xl:mr-[36rem] lg:mr-[22rem] md:mr-[9rem] sm:ml-[0rem] ">
          <div className=" flex flex-col items-center sm:items-start py-[1.5rem] gap-[2.5rem]">
            <div className="flex">
              <button
                className="self-stretch flex flex-row  gap-[1rem]"
                onClick={() => (window.location.href = "/product")}
              >
                <img
                  className="relative rounded-sm w-[0.83rem] h-[1.63rem]"
                  alt=""
                  src={back_icon_arrow}
                />
                <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                  Continua cumparaturile
                </div>
              </button>
            </div>
            <div className="flex flex-col gap-[1.5rem] text-text-fields-grey-hf w-[wh]">
              <ProductsList
                handleRemoveButton={handleRemoveButton}
                products={products}
                baseUrl={baseUrl}
              />

              <div className=" tracking-[0.08em] leading-[120%] font-bold text-[1.2rem] flex gap-[0.5rem] text-dark-navy">
                Total de plată: {price_total} RON
              </div>

              <div className="flex text-dark-navy">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="acceptTermsCheckbox"
                    className="mr-2 cursor-pointer h-5 w-5"
                    checked={acceptTermsChecked}
                    onChange={() => setAcceptTermsChecked(!acceptTermsChecked)}
                  />
                  <span className=" tracking-[0.08em] leading-[120%] text-xs sm:text-[16px] flex items-center  cursor-pointer">
                    Accept prelucrarea datelor cu caracter personal
                  </span>
                </div>
              </div>
              <div className="flex text-dark-navy">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="termsAndConditionsCheckbox"
                    className="mr-2 cursor-pointer h-5 w-5"
                    checked={termsAndConditionsChecked}
                    onChange={() =>
                      setTermsAndConditionsChecked(!termsAndConditionsChecked)
                    }
                  />
                  <span className=" tracking-[0.08em] leading-[120%] text-xs sm:text-[16px] flex items-center cursor-pointer">
                    Sunt de acord cu &nbsp;
                    <span className="underline">Termenii și Conditiile</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[20rem] mt-5 flex flex-col items-start justify-center gap-[1.5rem]">
              <div className="self-stretch flex flex-col items-start justify-start cursor-pointer text-center text-[0.88rem] text-white">
                <div
                  className="self-stretch rounded bg-accent h-[2.25rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border "
                  onClick={
                    () => {
                      termsAndConditionsChecked && acceptTermsChecked
                        ? console.log("NEXT PAGE")
                        : console.log("STAY ON THIS PAGE");
                    }
                    //IF ACCEPT TERMS AND ACCEPT PRELUCRARE -> NEXT PAGE
                  }
                >
                  <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                    Continuă
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCartPanel;
