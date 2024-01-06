import { Link, NavLink } from "react-router-dom";
import axios_api from "../api/axios_api";
import RegistrationService from "./RegistrationService";
import { useEffect, useRef, useState } from "react";
import back_icon_arrow from "../styles/icons/back_icon_arrow.svg";

import ProgressBar from "./ProgressBar";

// Defines
const FIRST_CART_PANEL = 1;
const SECOND_CART_PANEL = 2;
const THIRD_CART_PANEL = 3;

const PaymentCartPanel = ({}) => {
  const [price_total, setPriceTotal] = useState(0);
  const baseUrl = window.location.origin + "/images/";
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [acceptTermsChecked, setAcceptTermsChecked] = useState(false);
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =
    useState(false);

  /*
    Stage of the payment process 
  */
  const [cartPanelStage, setCartPanelStage] = useState(FIRST_CART_PANEL);

  const monthNumberToAbbreviationMap = {
    1: "ian",
    2: "feb",
    3: "mar",
    4: "apr",
    5: "mai",
    6: "iun",
    7: "iul",
    8: "aug",
    9: "sep",
    10: "oct",
    11: "nov",
    12: "dec",
  };

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

  // const ConvertDurationToHoursAndMinutes = ({ durationString }) => {
  //   // Extract hours and minutes
  //   const hours = parseInt(durationString.match(/(\d+)H/)[1] || 0);
  //   const minutes = parseInt(durationString.match(/(\d+)M/)[1] || 0);

  //   // Format the duration
  //   if (hours === 0) return `${minutes}min`;
  //   if (minutes === 0) return `${hours}h`;
  //   return `${hours}h ${minutes}min`;
  // };

  const ExtractOptionDate = ({ option }) => {
    if (option.date === "") return null;

    const dateString = option.date;
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    const dateArray =
      dateString === "" ? null : [day, month, year, hour, minutes];
    return dateArray;
  };

  const handleCartPanelStageChange = (stage) => {
    setCartPanelStage(stage);

    // bring the user to the top of the page
    window.scrollTo(0, 0);
  };

  const ProductsList = () => {
    var image_path;
    var dateArray, duration;
    var option;

    return (
      <div>
        {products.map(
          (product, index) => (
            (option = product.option_details),
            (dateArray = ExtractOptionDate({ option })),
            // (duration =
            //   option.duration != ""
            //     ? ConvertDurationToHoursAndMinutes({
            //         durationString: option.duration,
            //       })
            //     : null),
            (image_path = baseUrl + product.service_image_path),
            (
              <div className="flex flex-col">
                <div className="self-stretch flex flex-col items-start justify-start gap-[1rem]">
                  <img
                    className=" rounded-lg w-full h-[15rem] object-cover"
                    alt=""
                    src={image_path}
                  />

                  <div className="flex-1 flex flex-col py-[0rem] gap-[0.1rem] w-full h-[13rem]">
                    <div className="self-stretch flex gap-[0.63rem] text-dark-navy">
                      <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-bold text-[1.4rem] flex items-center h-[2rem]">
                        {product.service_name}
                      </div>
                      <b className="tracking-[0.15em] leading-[120%] text-[1.4rem] uppercase flex font-open-sans h-[2rem]">
                        {product.price}RON
                      </b>
                    </div>

                    <div className=" self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                      <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center">
                        Număr de rezervări: {product.number_of_participants}
                      </div>
                    </div>
                    <div className=" self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                      <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center">
                        Data: {dateArray[0]}{" "}
                        {monthNumberToAbbreviationMap[dateArray[1]]}{" "}
                        {dateArray[2]}
                      </div>
                    </div>
                    <div className=" self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                      <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center">
                        {dateArray != null && (
                          <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[1rem]">
                            <div className="flex flex-row items-center justify-center gap-[0.25rem]">
                              <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
                                Ora: {dateArray[3]}:{dateArray[4]}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                      <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center">
                        {option.city != "" && (
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] text-text-fields-grey-hf font-medium  flex items-center shrink-0 text-[1rem]">
                            Oraș:{" "}
                            <span className="ml-2 text-[1rem] font-open-sans font-normal">
                              {option.city}, {option.county}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                      <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center">
                        {option.location ? "Locație:" : ""}
                        <span className="ml-2 text-[1rem] font-open-sans font-normal">
                          {option.location}
                        </span>
                      </div>
                    </div>

                    <div className="w-full flex-1 flex justify-end">
                      <button
                        className="relative tracking-[0.08em] leading-[120%]"
                        onClick={() =>
                          handleRemoveButton(product.service_id, product.price)
                        }
                      >
                        ȘTERGE
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-7 mb-7 self-stretch relative box-border h-[0.06rem] border-t-[1px] border-solid border-text-fields-grey-hf" />
              </div>
            )
          )
        )}
      </div>
    );
  };

  return (
    <div>
  
      {/* First stage of the payment process, where the client visualise the cart only. */}
      {cartPanelStage === FIRST_CART_PANEL && (
      <div>
      <ProgressBar progressBarIndex={1} />
      <div className="w-[wh] flex flex-col bg-white overflow-hidden text-left text-[1rem] text-dark-navy font-text-body">
        <div className="w-[wh] max-w-[1050px] flex justify-center items-center xl:mr-[36rem] lg:mr-[22rem] md:mr-[9rem] sm:ml-[0rem] mr-0 ">
          <div className=" flex flex-col items-start py-[1.5rem] gap-[2.5rem]">
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
                  Continuă cumpărăturile
                </div>
              </button>
            </div>
            <div className="flex flex-col gap-[1.5rem] text-text-fields-grey-hf w-[100%]">
              <ProductsList />

              <div className=" tracking-[0.08em] leading-[120%] font-bold text-[1.2rem] flex gap-[0.5rem] text-dark-navy">
                Total de plată: {price_total} RON
              </div>

            </div>
            <div className="w-[20rem] mt-5 flex flex-col items-start justify-center gap-[1.5rem]">
              <div
                className="self-stretch flex flex-col items-start justify-start cursor-pointer text-center text-[0.88rem] text-white"
                onClick={() => handleCartPanelStageChange(SECOND_CART_PANEL)}
              >
                <div className="self-stretch rounded bg-accent h-[2.25rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border">
                  <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                    Continuă
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>)}

      {/* Second stage of the payment process, where the client has to introduce their phone number, name and email address, eventually the address where they live or whatever. */}
      {cartPanelStage === SECOND_CART_PANEL && (
      <div>
      <ProgressBar progressBarIndex={2} />
      <div className="w-[wh] flex flex-col bg-white overflow-hidden text-left text-[1rem] text-dark-navy font-text-body">
        <div className="w-[wh] max-w-[1050px] flex justify-center items-center xl:mr-[36rem] lg:mr-[22rem] md:mr-[9rem] sm:ml-[0rem] mr-0 ">
          <div className=" flex flex-col items-start py-[1.5rem] gap-[2.5rem]">
            <div className="flex">
              <button
                className="self-stretch flex flex-row  gap-[1rem]"
                onClick={() => setCartPanelStage(FIRST_CART_PANEL)}
              >
                <img
                  className="relative rounded-sm w-[0.83rem] h-[1.63rem]"
                  alt=""
                  src={back_icon_arrow}
                />
                <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center h-[1.5rem] shrink-0">
                  Înapoi la coș
                </div>
              </button>
            </div>
            <div className="flex flex-col gap-[1.5rem] text-text-fields-grey-hf w-[wh]">

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
                    <span className="underline">Termenii și Condițiile</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[20rem] mt-5 flex flex-col items-start justify-center gap-[1.5rem]">
              <div
                className="self-stretch flex flex-col items-start justify-start cursor-pointer text-center text-[0.88rem] text-white"
                // onClick todo
              >
                <div className="self-stretch rounded bg-accent h-[2.25rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border">
                  <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                    Continuă
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>)}
    </div>
  );
};

export default PaymentCartPanel;
