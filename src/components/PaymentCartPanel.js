import { Link, NavLink } from "react-router-dom";
import axios_api from "../api/axios_api";
import RegistrationService from "./RegistrationService";
import { useEffect, useRef, useState } from "react";
import back_icon_arrow from "../styles/icons/back_icon_arrow.svg";
import DottedLine from "./DottedLine";

const PaymentCartPanel = ({}) => {
  const [price_total, setPriceTotal] = useState(0);
  const baseUrl = window.location.origin + "/images/";
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [acceptTermsChecked, setAcceptTermsChecked] = useState(false);
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =
    useState(false);

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

  const ProgressBar = () => {
    return (
      <div className="self-stretch bg-light-purple h-[9rem] flex flex-col items-center justify-start text-center">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-[0.25rem]">
              <div className="rounded-[5rem] bg-dark-navy w-[2.75rem] h-[2.75rem] md:w-[3.5rem] md:h-[3.5rem] flex flex-col items-center justify-center">
                <div className="text-[1.5rem] text-white">1</div>
              </div>
              <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
                Coș
              </div>
            </div>
            <DottedLine />
            <div className="flex flex-col items-center justify-center gap-[0.25rem]">
              <div className="rounded-[5rem] bg-white w-[2.75rem] h-[2.75rem] md:w-[3.5rem] md:h-[3.5rem] flex flex-col items-center justify-center">
                <div className="text-[1.5rem]">2</div>
              </div>
              <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
                Detalii
              </div>
            </div>
            <DottedLine />
            <div className="flex flex-col items-center justify-center gap-[0.25rem]">
              <div className="rounded-[5rem] bg-white w-[2.75rem] h-[2.75rem] md:w-[3.5rem] md:h-[3.5rem] flex flex-col items-center justify-center">
                <div className="text-[1.5rem]">3</div>
              </div>
              <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
                Plată
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ConvertDurationToHoursAndMinutes = ({ durationString }) => {
    // Extract hours and minutes
    const hours = parseInt(durationString.match(/(\d+)H/)[1] || 0);
    const minutes = parseInt(durationString.match(/(\d+)M/)[1] || 0);

    // Format the duration
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  };

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
            (duration =
              option.duration != ""
                ? ConvertDurationToHoursAndMinutes({
                    durationString: option.duration,
                  })
                : null),
            (image_path = baseUrl + product.service_image_path),
            (
              <div className="">
                <div className="self-stretch flex flex-row items-start justify-start gap-[1rem]">
                  <img
                    className="relative rounded-lg w-[13.17rem] h-[13.13rem] object-cover"
                    alt=""
                    src={image_path}
                  />
                  <div className="flex-1 flex flex-col items-start justify-start py-[0rem] px-[1rem] gap-[0.1rem] w-full h-[13rem]">
                    <div className="self-stretch flex flex-row items-start justify-start gap-[0.63rem] text-dark-navy">
                      <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-bold text-[1.4rem] flex items-center h-[2rem]">
                        {product.service_name}
                      </div>
                      <b className="tracking-[0.15em] leading-[120%] text-[1.4rem] uppercase flex font-open-sans text-right items-end jusify-end h-[2rem]">
                        {product.price}RON
                      </b>
                    </div>
                    <div className="mt-2 self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                      <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center">
                        Număr de rezervări: {product.number_of_participants}
                      </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                      <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center">
                        {dateArray != null && (
                          <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[1rem]">
                            <div className="flex flex-row items-start justify-start gap-[0.25rem]">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] text-text-fields-grey-hf font-medium ">{`Data:  `}</div>
                              <div className="self-stretch relative text-[0.88rem] tracking-[0.08em] leading-[120%] font-open-sans font-normal flex items-center shrink-0">
                                {dateArray[0]}{" "}
                                {monthNumberToAbbreviationMap[dateArray[1]]}{" "}
                                {dateArray[2]}
                              </div>
                            </div>
                            <div className="flex flex-row items-center justify-center gap-[0.25rem]">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] text-text-fields-grey-hf font-medium ">{`Ora: `}</div>
                              <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
                                {dateArray[3]}:{dateArray[4]}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                      <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center ">
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
                        {option.location != "" && (
                          <div className="self-stretch relative tracking-[0.05em] leading-[120%] text-text-fields-grey-hf font-medium  flex items-center shrink-0 text-[1rem]">
                            Locație:{" "}
                            <span className="ml-2 text-[1rem] font-open-sans font-normal">
                              {option.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-row items-end justify-end text-right">
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
                <div className="mt-3 mb-3 self-stretch relative box-border h-[0.06rem] border-t-[1px] border-solid border-text-fields-grey-hf" />
              </div>
            )
          )
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="w-[wh] flex flex-col bg-white overflow-hidden text-left text-[1rem] text-dark-navy font-text-body">
        <ProgressBar />
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
              <ProductsList />

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

          {/* ^^^^astaeclassulacarelucrez */}
        </div>
      </div>
    </div>
  );
};

export default PaymentCartPanel;
