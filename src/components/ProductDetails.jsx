import { Link, useLocation, useParams } from "react-router-dom";
import "../styles/styles.css";
import axios_api from "../api/axios_api";
import { useEffect, useRef, useState } from "react";
import RegistrationService from "./RegistrationService";
import product_page_location_icon from "../images/product_page_location_icon.svg";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import marker_icon_png from "../images/marker_icon.png";
import e from "cors";
import CartPanel from "./CartPanel";

const ProductDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { state: product } = useLocation();
  const [visibleCartPanel, setVisibleCartPanel] = useState(false);
  const [visibleRegistrationService, setVisibleRegistrationService] =
    useState(false);
  // const {
  //   city,
  //   county,
  //   common_location,
  //   options_common_city,
  //   img_path,
  //   name,
  //   description,
  //   category,
  //   organiser,
  //   sections,
  //   options,
  //   location,
  //   map_location,
  // } = product;
  const {
    city,
    county,
    common_location,
    img_path,
    name,
    sections,
    options_common_city,
    location,
    options,
    map_location,
    description,
    category,
    organiser,
  } = service;

  useEffect(() => {
    get_service_by_id(id);
  }, []);

  var final_img_path = `${process.env.REACT_APP_SERVER_IMAGE_PATH}${img_path}`;
  const main_option = options?.length === 1 ? options[0] : null;

  const get_service_by_id = (id) => {
    try {
      axios_api
        .get("/get_service_by_id", {
          params: {
            id: id,
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;

            setService(data.service[0][0]);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const toggleCartPanel = () => {
    setVisibleCartPanel((prevState) => !prevState);
  };

  const closeCartPanel = () => {
    setVisibleCartPanel(false);
  };


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

  const handleAddCart = async (event) => {
    event.preventDefault();

    // if not logged in, tell the user to login
    if (!isLoggedIn) {
      alert("Trebuie să vă autentificați pentru a adăuga produse în coș!");
      return;
    } else {
      // check if local storage contains a token
      var token = localStorage.getItem("token");

      // if there is no token set, it means that there's a guest user
      if (token === null) {
        // add the product to cart using the localstorage
        // store the name of the product, the number of participants, the id of the product
        // the price and the option
        var cart = localStorage.getItem("services");

        if (cart === null) {
          cart = [
            {
              service_image_path: img_path,
              service_name: service.name,
              number_of_participants: numberOfParticipants,
              id: service.service_id,
              option_name:
                main_option === null
                  ? options.find((option) => option.id === selectedOption).name
                  : main_option.name,
              option_id: main_option === null ? selectedOption : main_option.id,
              option_details: {
                id: main_option === null ? selectedOption : main_option.id,
              },
              price:
                main_option != null
                  ? numberOfParticipants * main_option.price
                  : numberOfParticipants *
                    options.find((option) => option.id === selectedOption)
                      .price,
            },
          ];
          console.log(cart);
          localStorage.setItem("services", JSON.stringify(cart));
        } else {
          cart = JSON.parse(cart);
          cart.push({
            service_image_path: img_path,
            service_name: service.name,
            number_of_participants: numberOfParticipants,
            id: service.service_id,
            option_name:
              main_option === null
                ? options.find((option) => option.id === selectedOption).name
                : main_option.name,
            option_id: main_option === null ? selectedOption : main_option.id,
            option_details: {
              id: main_option === null ? selectedOption : main_option.id,
            },
            price:
              main_option != null
                ? numberOfParticipants * main_option.price
                : numberOfParticipants *
                  options.find((option) => option.id === selectedOption).price,
          });
          localStorage.setItem("services", JSON.stringify(cart));
        }
      } else {
        // otherwise, if the token is set, we send the request back to the api to keep track of the cart
        axios_api
          .post(
            "/add_to_cart",
            {
              service_id: service.id,
              number_of_participants: numberOfParticipants,
              option_id: main_option === null ? selectedOption : main_option.id,
              price:
                main_option !== null
                  ? numberOfParticipants * main_option.price
                  : numberOfParticipants *
                    options.find((option) => option.id === selectedOption)
                      .price,
            },
            {
              sameSite: "none",
              withCredentials: true,
              headers: {
                // 'X-CSRFToken': csrfToken, // Set the CSRF token in the request headers
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            // Handle the response
            if (response.status == 200) {
            } else {
              console.log("Failed to send login data to the API");
            }
          })
          .catch((error) => {
            // Handle errors
            console.log("Error:", error);
          });
      }

      toggleCartPanel();
    }
  };

  const parentRef = useRef(null);
  const mobileParentRef = useRef(null);
  const cartRef = useRef(null);
  const mobileCartRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileIsSticky, setMobileIsSticky] = useState(false);

  const handleScroll = () => {
    if (parentRef.current && cartRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const cartRect = cartRef.current.getBoundingClientRect();

      var pos_cond =
        parentRect.top <= 0 && parentRect.bottom >= cartRect.height;

      setIsSticky(pos_cond);

      if (pos_cond) {
        cartRef.current.style.position = "fixed";
        cartRef.current.style.top = "0px";
      } else {
        cartRef.current.style.position = "relative";
      }
    }
  };

  const handleMobileScroll = () => {
    if (mobileParentRef.current && mobileCartRef.current) {
      // const parentRect = parentRef.current.getBoundingClientRect();
      const cartRect = mobileCartRef.current.getBoundingClientRect();
      const parentRect = mobileParentRef.current.getBoundingClientRect();

      const pos_cond =
        cartRect.top <= 0 &&
        !(
          mobileCartRef.current.style.position == "fixed" &&
          cartRect.bottom <= parentRect.top - 40
        );

      setMobileIsSticky(pos_cond);

      if (pos_cond) {
        mobileCartRef.current.style.top = "0px";
        mobileCartRef.current.style.zIndex = "1500";
      } else {
        mobileCartRef.current.style.position = "relative";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleMobileScroll);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleMobileScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleRegistrationService = () => {
    setVisibleRegistrationService((prevState) => !prevState);
  };

  const closeRegistrationService = () => {
    setVisibleRegistrationService(false);
  };

  const participantsMapper = {
    "o persoană": 1,
    "două persoane": 2,
    "trei persoane": 3,
    "patru persoane": 4,
    "cinci persoane": 5,
  };
  const participants_options = Object.keys(participantsMapper);
  const [strNumberOfParticipants, setStrNumberOfParticipants] =
    useState("o persoana");
  const [numberOfParticipants, setNumberOfParticipants] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleParticipantsOptionChange = (event) => {
    setNumberOfParticipants(participantsMapper[event.target.value]);
    setStrNumberOfParticipants(event.target.value);

    setTimeout(() => {
      if (parentRef.current && cartRef.current) {
        const parentRect = parentRef.current.getBoundingClientRect();
        const cartRect = cartRef.current.getBoundingClientRect();

        var pos_cond =
          parentRect.top <= 0 && parentRect.bottom >= cartRect.height;

        setIsSticky(pos_cond);
        if (pos_cond) {
          cartRef.current.style.position = "fixed";
          cartRef.current.style.top = "0px";
        } else {
          cartRef.current.style.position = "relative";
        }
      }
    }, 1);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
    setIsSticky(true);

    setTimeout(() => {
      if (parentRef.current && cartRef.current) {
        const parentRect = parentRef.current.getBoundingClientRect();
        const cartRect = cartRef.current.getBoundingClientRect();

        var pos_cond =
          parentRect.top <= 0 && parentRect.bottom >= cartRect.height;

        setIsSticky(pos_cond);
        if (pos_cond) {
          cartRef.current.style.position = "fixed";
          cartRef.current.style.top = "0px";
        } else {
          cartRef.current.style.position = "relative";
        }
      }
    }, 1);
  };

  const handleMobileParticipantsOptionChange = (event) => {
    setNumberOfParticipants(participantsMapper[event.target.value]);
    setStrNumberOfParticipants(event.target.value);

    setTimeout(() => {
      if (mobileParentRef.current && mobileCartRef.current) {
        const parentRect = mobileParentRef.current.getBoundingClientRect();
        const cartRect = mobileCartRef.current.getBoundingClientRect();

        const pos_cond =
          cartRect.top <= 0 &&
          !(
            mobileCartRef.current.style.position == "fixed" &&
            cartRect.bottom <= parentRect.top - 40
          );

        setMobileIsSticky(pos_cond);
        if (pos_cond) {
          mobileCartRef.current.style.top = "0px";
          mobileCartRef.current.style.zIndex = "1500";
        } else {
          mobileCartRef.current.style.position = "relative";
        }
      }
    }, 1);
  };

  const handleMobileOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
    setIsSticky(true);

    setTimeout(() => {
      if (mobileParentRef.current && cartRef.current) {
        const parentRect = mobileParentRef.current.getBoundingClientRect();
        const cartRect = mobileCartRef.current.getBoundingClientRect();

        const pos_cond =
          cartRect.top <= 0 &&
          !(
            mobileCartRef.current.style.position == "fixed" &&
            cartRect.bottom <= parentRect.top - 40
          );

        setMobileIsSticky(pos_cond);
        if (pos_cond) {
          mobileCartRef.current.style.top = "0px";
          mobileCartRef.current.style.zIndex = "1500";
        } else {
          mobileCartRef.current.style.position = "relative";
        }
      }
    }, 1);
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const markerIcon = new L.Icon({
    iconUrl: marker_icon_png,
    iconRetinaUrl: marker_icon_png,
    popupAnchor: [-0, -0],
    iconSize: [25, 25],
  });

  const MapSection = (e) => {
    const map_e = {
      lat: e?.e?.[0] || 0,
      lng: e?.e?.[1] || 0,
    };

    return (
      <div className="w-full h-80 border rounded-md z-0">
        <MapContainer
          center={map_e}
          zoom={18}
          style={{ height: "100%" }}
          // onClick={handleMapLocationChange}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={map_e} icon={markerIcon}>
            <Popup>Selected Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  };

  const ExtraDetailsBlock = ({ sections }) => {
    return (
      <div>
        {sections?.map((section, index) => (
          <div key={index} className="flex flex-col items-start justify-start">
            <div className="mb-8 self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0">
              {section.question}
            </div>
            <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf flex items-center w-[43.94rem] shrink-0">
              {section.answer}
            </div>
            {index != sections?.length - 1 ? <div className="mb-8" /> : <div />}
          </div>
        ))}
      </div>
    );
  };

  const ExtraDetailsMobileBlock = ({ sections }) => {
    return (
      <div>
        {sections?.map((section, index) => (
          <div key={index} className="flex flex-col items-start justify-start">
            <div className="mb-4 self-stretch relative tracking-[0.1em] leading-[120%] text-[1.3rem] font-semibold flex items-center shrink-0">
              {section.question}
            </div>
            <div className="relative text-[0.88rem] tracking-[0.05em] leading-[1.31rem] font-medium text-text-fields-grey-hf flex items-center w-full shrink-0">
              {section.answer}
            </div>
            {index != sections?.length - 1 ? <div className="mb-8" /> : <div />}
          </div>
        ))}
      </div>
    );
  };

  // const ConvertDurationToHoursAndMinutes = ({ durationString }) => {
  //   const parts = durationString.split(" ");
  //   let hours = 0;
  //   let minutes = 0;

  //   for (const part of parts) {
  //     const value = parseInt(part);
  //     if (!isNaN(value)) {
  //       if (part.includes("h")) {
  //         hours += value;
  //       } else if (part.includes("m")) {
  //         minutes += value;
  //       }
  //     }
  //   }

  //   // Format the duration
  //   if (hours === 0) return `${minutes}min`;
  //   if (minutes === 0) return `${hours}h`;
  //   return `${hours}h ${minutes}min`;
  // };

  const ExtractOptionDate = ({ option }) => {
    const dateString = option.date;

    // Check if the date string is empty
    if (dateString === "") {
      return null;
    }

    const date = new Date(dateString);

    // Get the current date
    const today = new Date();

    // Check if the date is earlier than today's date
    if (date < today) {
      return null;
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    const dateArray = [day, month, year, hour, minutes];

    return dateArray;
  };

  const OneOptionBlock = ({ option, index }) => {
    const dateArray = ExtractOptionDate({ option });

    return (
      <div className="gap-[0.5rem] flex flex-col">
        <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0">
          {name}
        </div>
        {dateArray != null && (
          <div className="self-stretch flex flex-row gap-[1rem] text-[1rem]">
            <div className="flex flex-row items-start justify-start gap-[0.25rem]">
              <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Data:  `}</div>
              <div className="self-stretch relative text-[0.88rem] tracking-[0.08em] leading-[120%] font-open-sans flex items-center shrink-0">
                {dateArray[0]} {monthNumberToAbbreviationMap[dateArray[1]]}{" "}
                {dateArray[2]}
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-[0.25rem]">
              <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Ora: `}</div>
              <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
                {dateArray[3]}:{dateArray[4]}
              </div>
            </div>
          </div>
        )}
        <div className="text-[1rem] text-text-fields-grey-hf font-medium tracking-[0.05em] leading-[1.5rem]">
          {option.details}
        </div>

        <div className="mt-2 mb-2 relative box-border w-full border-t-[1px] border-solid border-text-fields-grey-hf" />

        <div>
          {option?.map_location != "" && option?.map_location != null && (
            <div className="w-[44.13rem] flex flex-col items-start justify-center gap-[1.5rem]">
              <div className="relative tracking-[0.1em] leading-[120%] font-semibold flex items-center w-[39.5rem] h-[1.5rem] shrink-0">
                LOCAȚIE
              </div>
              <MapSection e={option?.map_location} />
              <div
                key={index}
                className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[43.94rem] h-[1rem] shrink-0"
              >
                {option.location}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const OneOptionMobileBlock = ({ option }) => {
    const dateArray = ExtractOptionDate({ option });

    return (
      <div className="relative w-full self-stretch flex flex-col items-center justify-center">
        <div className="gap-[0.5rem] w-[20.44rem] sm:w-[30rem] md:w-[40rem] lg:w-[50rem] flex flex-col items-start justify-center">
          <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0">
            {name}
          </div>
          {dateArray != null && (
            <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[1rem]">
              <div className="flex flex-row items-start justify-start gap-[0.25rem]">
                <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Data:  `}</div>
                <div className="self-stretch relative text-[0.88rem] tracking-[0.08em] leading-[120%] font-open-sans flex items-center shrink-0">
                  {dateArray[0]} {monthNumberToAbbreviationMap[dateArray[1]]}{" "}
                  {dateArray[2]}
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-[0.25rem]">
                <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Ora: `}</div>
                <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
                  {dateArray[3]}:{dateArray[4]}
                </div>
              </div>
            </div>
          )}
          <div className="text-[1rem] text-text-fields-grey-hf font-medium tracking-[0.05em] leading-[1.5rem]">
            {option.details}
          </div>

          <div className="mt-2 mb-2 relative box-border w-full border-t-[1px] border-solid border-text-fields-grey-hf" />

          <div>
            {option?.map_location != "" && option?.map_location != null && (
              <div className="w-[20.44rem] sm:w-[30rem] md:w-[40rem] lg:w-[50rem] flex flex-col items-start justify-center gap-[1.5rem]">
                <div className="relative tracking-[0.1em] leading-[120%] font-semibold flex items-center w-[20.44rem] sm:w-[30rem] md:w-[40rem] lg:w-[50rem] h-[1.5rem] shrink-0">
                  LOCAȚIE
                </div>
                <MapSection e={option?.map_location} />
                <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[20.44rem] h-[1rem] shrink-0">
                  {option.location}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const MoreOptionsBlock = ({ options }) => {
    var dateArray, duration;

    return (
      <div className="gap-[0.5rem] flex flex-col">
        <div className="mb-5 text-[1.2rem] self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0">
          Experiența aceasta este disponibilă în mai multe variante
        </div>
        <div className="pl-6 gap-[1rem] flex flex-col">
          {options?.map(
            (option, index) => (
              (dateArray = ExtractOptionDate({ option })),
              (duration = option.duration != "" ? null : null),
              (
                <div key={index} className="relative flex-1 flex flex-col">
                  <div className="relative gap-[8rem] flex flex-row">
                    {option.name != "" && (
                      <div
                        className="text-[1.2rem] text-text-fields-grey-hf font-medium tracking-[0.05em] leading-[1.5rem]"
                        style={{
                          maxWidth: dateArray !== null ? "20rem" : "50rem",
                          wordBreak: "break-all",
                        }}
                      >
                        {option.name}{" "}
                        {duration && (
                          <span className="text-[1rem]">- {duration}</span>
                        )}{" "}
                        |{" "}
                        {option.price === 0 ? (
                          <span className="text-blue-500 text-[1rem]">
                            Gratis
                          </span>
                        ) : (
                          <span className="text-[1rem]">
                            {option.price} RON
                          </span>
                        )}
                      </div>
                    )}

                    <div className="items-start justify-end gap-[1rem] flex flex-col">
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
                      {option.city != "" && (
                        <div className="self-stretch relative tracking-[0.1em] leading-[120%] text-text-fields-grey-hf font-medium  flex items-center shrink-0 text-[1rem]">
                          Oraș:{" "}
                          <span className="ml-2 text-[1rem] font-open-sans font-normal">
                            {option.city}, {option.county}
                          </span>
                        </div>
                      )}
                      {option.location != "" && (
                        <div className="self-stretch relative tracking-[0.1em] leading-[120%] text-text-fields-grey-hf font-medium  flex items-center shrink-0 text-[1rem]">
                          Locație:{" "}
                          <span className="ml-2 text-[1rem] font-open-sans font-normal">
                            {option.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative flex mt-5 text-[1rem] text-text-fields-grey-hf font-medium tracking-[0.05em] leading-[1.5rem] shring-0">
                    {option.details}
                  </div>

                  <div className="mt-5">
                    {!common_location &&
                      option?.map_location != "" &&
                      option?.map_location != null && (
                        <div className="w-[44.13rem] flex flex-col items-start justify-center gap-[1.5rem]">
                          <MapSection e={option?.map_location} />
                        </div>
                      )}
                  </div>
                  {index != options?.length - 1 ? (
                    <div className="mt-2 mb-2 relative box-border w-full border-t-[1px] border-solid border-text-fields-grey-hf" />
                  ) : (
                    <div />
                  )}
                </div>
              )
            )
          )}
        </div>
      </div>
    );
  };

  const MoreOptionsMobileBlock = ({ options }) => {
    var dateArray, duration;

    return (
      <div className="relative w-full self-stretch flex flex-col items-center justify-center">
        <div className="gap-[0.5rem] w-[20.44rem] flex flex-col items-start justify-center">
          <div className="mb-5 text-[1.2rem] self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0">
            Experiența aceasta este disponibilă în mai multe variante
          </div>
          <div className="gap-[1rem] flex flex-col">
            {options?.map(
              (option, index) => (
                (dateArray = ExtractOptionDate({ option })),
                (duration = option.duration != "" ? null : null),
                (
                  <div key={index} className="relative flex-1 flex flex-col">
                    <div className="relative gap-[1rem] flex flex-col">
                      {option.name != "" && (
                        <div
                          className="text-[1.2rem] text-text-fields-grey-hf font-medium tracking-[0.05em] leading-[1.5rem]"
                          style={{ maxWidth: "20rem", wordBreak: "break-all" }}
                        >
                          {option.name}{" "}
                          {duration && (
                            <span className="text-[1rem]">- {duration}</span>
                          )}{" "}
                          |{" "}
                          {option.price === 0 ? (
                            <span className="text-blue-500 text-[1rem]">
                              Gratis
                            </span>
                          ) : (
                            <span className="text-[1rem]">
                              {option.price} RON
                            </span>
                          )}
                        </div>
                      )}

                      <div className="items-start justify-end gap-[1rem] flex flex-col">
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
                        {option.city != "" && (
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] text-text-fields-grey-hf font-medium  flex items-center shrink-0 text-[1rem]">
                            Oraș:{" "}
                            <span className="ml-2 text-[1rem] font-open-sans font-normal">
                              {option.city}, {option.county}
                            </span>
                          </div>
                        )}
                        {option.location != "" && (
                          <div className="self-stretch relative tracking-[0.1em] leading-[120%] text-text-fields-grey-hf font-medium  flex items-center shrink-0 text-[1rem]">
                            Locație:{" "}
                            <span className="ml-2 text-[1rem] font-open-sans font-normal">
                              {option.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative flex mt-5 text-[1rem] text-text-fields-grey-hf font-medium tracking-[0.05em] leading-[1.5rem] shring-0">
                      {option.details}
                    </div>

                    <div className="mt-5">
                      {!common_location &&
                        option?.map_location != "" &&
                        option?.map_location != null && (
                          <div className="w-[20.44rem] flex flex-col items-start justify-center gap-[1.5rem]">
                            <MapSection e={option?.map_location} />
                          </div>
                        )}
                    </div>
                    {index != options?.length - 1 ? (
                      <div className="mt-2 mb-2 relative box-border w-full border-t-[1px] border-solid border-text-fields-grey-hf" />
                    ) : (
                      <div />
                    )}
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  const CommonLocationBlock = () => {
    return (
      <div className="mt-[2rem]">
        {common_location &&
          map_location != "" &&
          (main_option === null ||
            (main_option != null && main_option?.map_location == "")) && (
            <div className="max-lg:w-[20.44rem] lg:w-[44.13rem] flex flex-col items-start justify-center gap-[1.5rem]">
              <div className="relative box-border w-full border-t-[1px] border-solid border-text-fields-grey-hf" />

              <div className="relative tracking-[0.1em] leading-[120%] font-semibold flex items-center max-lg:w-[20.44rem] lg:w-[39.5rem] h-[1.5rem] shrink-0">
                LOCAȚIE
              </div>
              <MapSection e={map_location} />
              <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium flex items-center max-lg:w-[20.44rem] lg:w-[43.94rem] h-[1rem] shrink-0">
                {location}
              </div>
            </div>
          )}
      </div>
    );
  };

  const DetailsBlock = () => {
    return (
      <div className="mb-5 w-[44.13rem] flex flex-col items-start justify-center">
        <div className="mb-5 w-[44.13rem] flex flex-col items-start justify-center gap-[2rem]">
          <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf flex items-center shrink-0">
            {description}
          </div>

          <ExtraDetailsBlock sections={sections} />

          <div className="relative box-border w-full border-t-[1px] border-solid border-text-fields-grey-hf" />
        </div>

        {options?.length === 1 && <OneOptionBlock option={main_option} />}
        {options?.length > 1 && <MoreOptionsBlock options={options} />}

        <CommonLocationBlock />
      </div>
    );
  };

  const DetailsMobileBlock = () => {
    return (
      <div
        ref={mobileParentRef}
        className="relative mt-10 w-full self-stretch flex flex-col items-center justify-center"
      >
        <div className="mb-5 w-[20.44rem] sm:w-[30rem] md:w-[40rem] lg:w-[50rem] flex flex-col items-start justify-center gap-[2rem]">
          <div className="self-stretch relative text-[0.88rem] tracking-[0.05em] leading-[1.31rem] font-medium text-text-fields-grey-hf">
            {description}
          </div>

          <ExtraDetailsMobileBlock sections={sections} />

          <div className="relative box-border w-full border-t-[1px] border-solid border-text-fields-grey-hf" />
        </div>

        {options?.length === 1 && <OneOptionMobileBlock option={main_option} />}
        {options?.length > 1 && <MoreOptionsMobileBlock options={options} />}

        <CommonLocationBlock />
      </div>
    );
  };

  const RatingStarsBlock = () => {
    return (
      <div>
        {/* <div className="h-[0.75rem] flex flex-row items-start justify-start gap-[0.25rem]">
            <img
              className="relative w-[0.75rem] h-[0.72rem]"
              alt=""
              src="/-icon-star1.svg"
            />
            <img
              className="relative w-[0.75rem] h-[0.72rem]"
              alt=""
              src="/-icon-star1.svg"
            />
            <img
              className="relative w-[0.75rem] h-[0.72rem]"
              alt=""
              src="/-icon-star1.svg"
            />
            <img
              className="relative w-[0.75rem] h-[0.72rem]"
              alt=""
              src="/-icon-star1.svg"
            />
            <img
              className="relative w-[0.75rem] h-[0.72rem]"
              alt=""
              src="/-icon-star1.svg"
            />
          </div> */}
      </div>
    );
  };

  const HeroSection = () => {
    return (
      <div className="self-stretch flex flex-col items-center justify-start">
        <div className="flex flex-col items-center justify-center">
          <div className="self-stretch flex flex-row items-center justify-start gap-[1rem]">
            {/* <img
            className="relative rounded-sm w-[0.83rem] h-[1.63rem]"
            alt=""
            src={final_img_path}
          /> */}
            <div className="flex flex-col items-center justify-center gap-[1.5rem]">
              <img
                className="relative lg:rounded-lg max-lg:w-full lg:w-[77rem] max-lg:h-full lg:h-[33rem] object-cover"
                alt=""
                src={final_img_path}
              />
              {/* <img
              className="relative w-[7rem] h-[1rem]"
              alt=""
              src="/group-18357.svg"
            /> */}
            </div>
            {/* <img
            className="relative rounded-sm w-[0.83rem] h-[1.63rem]"
            alt=""
            src="/vector-2.svg"
          /> */}
          </div>
        </div>
      </div>
    );
  };

  const HeaderSection = () => {
    return (
      <div className="w-[17.5rem] flex flex-col items-end justify-center gap-[1rem] text-[0.88rem] text-text-fields-grey-hf">
        <div className="w-[17.5rem] flex flex-row items-center justify-between gap-[0.63rem]">
          <b className="relative tracking-[0.15em] leading-[120%] uppercase">{`ORGANIZATOR: `}</b>
          <div className=" relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-dark-navy text-right">
            {organiser}
          </div>
        </div>
        {(main_option != null || options_common_city) && (
          <div className="flex flex-row items-center justify-start gap-[1rem] text-[1rem] text-dark-navy ">
            <img
              className="relative w-[1.13rem] h-[1.5rem]"
              alt=""
              src={product_page_location_icon}
            />
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
              {city != null && options_common_city ? city : ""}
              {main_option != null ? main_option.city : ""}

              {county != null && county != city && options_common_city
                ? ", " + county
                : ""}
              {main_option != null && main_option.city != main_option.county
                ? ", " + main_option.county
                : ""}
            </div>
          </div>
        )}
      </div>
    );
  };

  const HeaderMobileSection = () => {
    return (
      <div className="relative pt-[2rem] pb-[2rem] w-full self-stretch flex flex-col items-center justify-start">
        <div className="flex-1 w-[20.44rem] flex flex-row items-center justify-center">
          <div className="flex-1 flex flex-row items-center justify-center">
            <div className="flex-1 flex flex-col items-start justify-center gap-[0.5rem]">
              <div className="self-stretch flex flex-row items-center justify-start gap-[0.5rem]">
                <div className="flex-1 relative tracking-[0.05em] leading-[120%] font-semibold flex text-dark-navy items-center text-[1.2rem]">
                  {name}
                </div>
                <div className="self-stretch flex flex-col items-start justify-start text-right text-[0.75rem]">
                  <div className="flex-1 relative tracking-[0.05em] leading-[1.31rem] font-medium">
                    {organiser}
                  </div>
                  {(main_option != null || options_common_city) && (
                    <div className="flex flex-row items-center justify-start gap-[0.5rem] ">
                      <img
                        className="relative w-[0.88rem] h-[1.13rem]"
                        alt=""
                        src={product_page_location_icon}
                      />
                      <div className="relative tracking-[0.05em] leading-[1.31rem] font-medium">
                        {city != null && options_common_city ? city : ""}
                        {main_option != null ? main_option.city : ""}

                        {county != null && county != city && options_common_city
                          ? ", " + county
                          : ""}
                        {main_option != null &&
                        main_option.city != main_option.county
                          ? ", " + main_option.county
                          : ""}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartSectionMoreOptions = ({
    options,
    selectedOption,
    handleOptionChange,
  }) => {
    return (
      <div className="flex-1 relative">
        <div ref={cartRef} className={`${isSticky ? "top-0" : ""}`}>
          <div className="pl-[4.5rem] self-stretch flex flex-row items-start justify-start">
            <div className="sticky top-0 rounded-lg bg-light-purple w-[24.25rem] flex flex-col items-start justify-between py-[3.5rem] px-[2rem] box-border">
              <div className="self-stretch flex flex-col items-start justify-center gap-[3rem]">
                <div className="w-[25.25rem] flex flex-col items-start justify-start">
                  <div className="mb-5 self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0 text-[1.5rem]">
                    {name}
                  </div>
                  {common_location && (
                    <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0 text-[1rem]">
                      Locație:{" "}
                      <span
                        className="ml-2 text-[1rem] font-open-sans font-normal"
                        style={{ maxWidth: "15rem", wordBreak: "break-all" }}
                      >
                        {location}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0 text-[1rem] select-label">
                  Alege varianta dorită:
                </div>
                <div className="relative flex flex-col items-start justify-start gap-[0.5rem]">
                  {options?.map((option) => (
                    <div
                      className="relative flex items-start justify-start"
                      key={option.id}
                    >
                      <div className="relative rounded-50% box-border border-2px border-solid border-text-fields-grey-hf" />
                      <div className="relative tracking-0.05em leading-1.5rem font-medium flex items-center">
                        <label className="flex flex-row items-center gap-[1rem] text-[1.2rem]">
                          <input
                            type="radio"
                            name="option"
                            value={option.id}
                            checked={selectedOption === option.id}
                            onChange={handleOptionChange}
                            style={{ backgroundColor: "red" }}
                          />
                          <div
                            className="relative text-[1.2rem]"
                            style={{
                              maxWidth: "20rem",
                              wordBreak: "break-all",
                            }}
                          >
                            {option.name} -{" "}
                            {option.price === 0 ? (
                              <span className="text-blue-500">Gratis</span>
                            ) : (
                              <span>{option.price} RON</span>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="self-stretch h-[5.13rem] flex flex-col items-start justify-center gap-[1rem] text-[1rem]">
                  <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[15rem]">
                    Număr de participanti
                  </div>
                  <div className="self-stretch rounded bg-white box-border h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf border-[1px] border-solid border-dark-navy">
                    <select
                      value={strNumberOfParticipants}
                      onChange={handleParticipantsOptionChange}
                      className="rounded px-3 w-full bg-white flex-1 relative tracking-[0.08em] leading-[120%] flex items-center h-[2rem]"
                      style={{ border: "none" }}
                    >
                      {participants_options?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="self-stretch flex flex-row items-center justify-start gap-[1.5rem]">
                  <div className="relative tracking-[0.1em] leading-[120%] font-semibold">{`Preț : `}</div>
                  <div className="flex-1 relative tracking-[0.1em] leading-[120%] font-semibold font-open-sans flex items-center h-[2rem]">
                    {selectedOption ? (
                      <span className="text-[1.5rem]">
                        {numberOfParticipants *
                          options.find((option) => option.id === selectedOption)
                            .price}{" "}
                        RON
                      </span>
                    ) : (
                      <span className="text-[1.5rem]">0 RON</span>
                    )}
                  </div>
                </div>

                <div
                  className="self-stretch flex flex-col items-start justify-start cursor-pointer text-center text-[0.88rem] text-white"
                  onClick={handleAddCart}
                >
                  <div className="self-stretch rounded bg-accent h-[2.25rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border">
                    <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                      ADAUGĂ IN COS
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartSectionOneOption = ({ option }) => {
    const dateArray = ExtractOptionDate({ option });

    return (
      <div className="flex-1 relative">
        <div ref={cartRef} className={`${isSticky ? "top-0" : ""}`}>
          <div className="pl-[4.5rem] self-stretch flex flex-row items-start justify-start">
            <div className="sticky top-0 rounded-lg bg-light-purple w-[24.25rem] flex flex-col items-start justify-between py-[3.5rem] px-[2rem] box-border">
              <div className="self-stretch flex flex-col items-start justify-center gap-[3rem]">
                <div className="w-[20.25rem] flex flex-col items-start justify-start">
                  <div className="mb-5 self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0 text-[1.5rem]">
                    {name}
                  </div>
                  {dateArray != null && (
                    <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[1rem]">
                      <div className="flex flex-row items-start justify-start gap-[0.25rem]">
                        <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Data:  `}</div>
                        <div className="self-stretch relative text-[0.88rem] tracking-[0.08em] leading-[120%] font-open-sans flex items-center shrink-0">
                          {dateArray[0]}{" "}
                          {monthNumberToAbbreviationMap[dateArray[1]]}{" "}
                          {dateArray[2]}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center gap-[0.25rem]">
                        <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Ora: `}</div>
                        <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
                          {dateArray[3]}:{dateArray[4]}
                        </div>
                      </div>
                    </div>
                  )}
                  {option.location != "" && (
                    <div className="self-stretch relative tracking-[0.05em] leading-[120%] font-semibold flex items-center shrink-0 text-[1rem]">
                      Locație:{" "}
                      <span
                        className="ml-2 text-[1rem] font-open-sans font-normal"
                        style={{ maxWidth: "15rem", wordBreak: "break-all" }}
                      >
                        {option.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 self-stretch h-[5.13rem] flex flex-col items-start justify-center gap-[1rem] text-[1rem]">
                <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[15rem]">
                  Număr de participanti
                </div>
                <div className="self-stretch rounded bg-white box-border h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf border-[1px] border-solid border-dark-navy">
                  <select
                    value={strNumberOfParticipants}
                    onChange={handleParticipantsOptionChange}
                    className="rounded px-3 w-full bg-white flex-1 relative tracking-[0.08em] leading-[120%] flex items-center h-[2rem]"
                    style={{ border: "none" }}
                  >
                    {participants_options?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5 self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                <div className="self-stretch flex flex-row items-center justify-start gap-[1.5rem]">
                  <div className="relative tracking-[0.1em] leading-[120%] font-semibold">{`Preț : `}</div>
                  <div className="flex-1 relative tracking-[0.1em] leading-[120%] font-semibold font-open-sans flex items-center h-[2rem]">
                    <span className="text-[1.5rem]">
                      {numberOfParticipants * option.price} RON
                    </span>
                  </div>
                </div>
                <div
                  className="self-stretch flex flex-col items-start justify-start cursor-pointer text-center text-[0.88rem] text-white"
                  onClick={handleAddCart}
                >
                  <div className="self-stretch rounded bg-accent h-[2.25rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border">
                    <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                      ADAUGĂ IN COS
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartMobileMoreOptionsMain = ({
    options,
    selectedOption,
    handleOptionChange,
  }) => {
    return (
      <div className="self-stretch flex flex-row items-start justify-start -z-10">
        <div className="sticky top-0 rounded-lg bg-light-purple w-full flex flex-col items-start justify-between py-[2rem] px-[2rem] box-border">
          <div className="self-stretch flex flex-col items-start justify-center gap-[3rem]">
            <div className="w-[20.25rem] flex flex-col items-start justify-start">
              <div className="mb-5 self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0 text-[1.5rem]">
                {name}
              </div>
              {common_location && (
                <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0 text-[1rem]">
                  Locație:{" "}
                  <span className="ml-2 text-[1rem] font-open-sans font-normal">
                    {location}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[0.5rem]">
              <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-start justify-start shrink-0 text-[1rem] select-label">
                Alege dintre variantele următoare:
              </div>
              <div className="flex-1 w-full">
                <div className="self-stretch rounded bg-white box-border h-[2rem] flex flex-row items-center justify-start py-[0rem] w-full gap-[1rem] text-text-fields-grey-hf border-[1px] border-solid border-dark-navy">
                  <select
                    value={selectedOption}
                    onChange={handleMobileOptionChange}
                    className="flex-1 relative tracking-[0.08em] leading-[120%] flex items-center h-[1.8rem]"
                    style={{ border: "none", width: "100%" }}
                  >
                    {options?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name} -{" "}
                        {option.price === 0 ? "Gratis" : option.price + " RON"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="flex-1">
                <div className="self-stretch flex flex-row items-start justify-start gap-[0.8rem]">
                  <div className="relative tracking-[0.1em] leading-[120%] font-semibold">{`Preț : `}</div>
                  <div className="relative tracking-[0.1em] leading-[120%] font-semibold font-open-sans flex items-center">
                    {selectedOption ? (
                      <span className="flex-1 text-[1rem]">
                        {numberOfParticipants *
                          options.find((option) => option.id === selectedOption)
                            .price}{" "}
                        RON
                      </span>
                    ) : (
                      <span className="text-[1.5rem]">0 RON</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[0.9rem]">
                  <div className="self-stretch rounded bg-white box-border h-[2rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf border-[1px] border-solid border-dark-navy">
                    <select
                      value={strNumberOfParticipants}
                      onChange={handleMobileParticipantsOptionChange}
                      className="rounded px-3 w-full bg-white flex-1 relative tracking-[0.08em] leading-[120%] flex items-center h-[1.8rem]"
                      style={{ border: "none" }}
                    >
                      {participants_options?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="self-stretch flex flex-col items-start justify-start cursor-pointer text-center text-[0.88rem] text-white"
              onClick={handleAddCart}
            >
              <div className="self-stretch rounded bg-accent h-[2.25rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border">
                <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                  ADAUGĂ IN COS
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartMobileOneOptionMain = ({ option }) => {
    const dateArray = ExtractOptionDate({ option });

    return (
      <div className="self-stretch flex flex-row items-start justify-start">
        <div className="sticky top-0 rounded-lg bg-light-purple w-full flex flex-col items-start justify-between py-[2rem] px-[2rem] box-border">
          <div className="self-stretch flex flex-col items-start justify-center gap-[3rem]">
            <div className="w-[20.25rem] flex flex-col items-start justify-start">
              {dateArray != null && (
                <div className="self-stretch flex flex-row items-center justify-start gap-[1rem] text-[1rem]">
                  <div className="flex flex-row items-center justify-center gap-[0.25rem]">
                    <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Data:  `}</div>
                    <div className="  tracking-[0.08em] leading-[120%] font-open-sans ">
                      {dateArray[0]}{" "}
                      {monthNumberToAbbreviationMap[dateArray[1]]}{" "}
                      {dateArray[2]}
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-[0.25rem]">
                    <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Ora: `}</div>
                    <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
                      {dateArray[3]}:{dateArray[4]}
                    </div>
                  </div>
                </div>
              )}
              {option.location != "" && (
                <div className="self-stretch relative tracking-[0.05em] leading-[120%] font-semibold flex items-center shrink-0 text-[1rem]">
                  Locație:{" "}
                  <span className="ml-2 text-[1rem] font-open-sans font-normal">
                    {option.location}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 w-full flex items-center">
            <div className="flex-1">
              <div className="self-stretch flex flex-row items-start justify-start gap-[0.8rem]">
                <div className="relative tracking-[0.1em] leading-[120%] font-semibold">{`Preț : `}</div>
                <div className="relative tracking-[0.1em] leading-[120%] font-semibold font-open-sans flex items-center">
                  <span className="flex-1 text-[1rem]">
                    {numberOfParticipants * option.price}RON
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[0.9rem]">
                <div className="self-stretch rounded bg-white box-border h-[2rem] flex flex-row items-center justify-start py-[0rem]  gap-[1rem] text-text-fields-grey-hf border-[1px] border-solid border-dark-navy">
                  <select
                    value={strNumberOfParticipants}
                    onChange={handleMobileParticipantsOptionChange}
                    className="rounded px-3 w-full bg-white flex-1 relative tracking-[0.08em] leading-[120%] flex items-center h-[1.8rem]"
                    style={{ border: "none" }}
                  >
                    {participants_options?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
            <div
              className="self-stretch flex flex-col items-start justify-start cursor-pointer text-center text-[0.88rem] text-white"
              onClick={handleAddCart}
            >
              <div className="self-stretch rounded bg-accent h-[2.25rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border">
                <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                  ADAUGĂ IN COS
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartSectionMoreMobileOptions = ({
    options,
    selectedOption,
    handleOptionChange,
  }) => {
    return (
      <>
        {/* Fixed position cart */}
        <div
          ref={mobileCartRef}
          className={`${mobileIsSticky ? "top-0 fixed w-full" : "hidden"}`}
          style={{ zIndex: mobileIsSticky ? "1500" : "auto" }}
        >
          <CartMobileMoreOptionsMain
            options={options}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
        </div>

        {/* Static position cart */}
        <div
          ref={mobileCartRef}
          style={{ opacity: mobileIsSticky ? "0" : "100" }}
        >
          <CartMobileMoreOptionsMain
            options={options}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
        </div>
      </>
    );
  };

  const CartSectionOneMobileOption = ({ option }) => {
    return (
      <>
        {/* Fixed position cart */}
        <div
          ref={mobileCartRef}
          className={`${mobileIsSticky ? "top-0 fixed w-full " : "hidden"}`}
          style={{ zIndex: mobileIsSticky ? "1500" : "auto" }}
        >
          <CartMobileOneOptionMain option={option} />
        </div>

        {/* Static position cart */}
        <div
          ref={mobileCartRef}
          style={{ opacity: mobileIsSticky ? "0" : "100" }}
        >
          <CartMobileOneOptionMain option={option} />
        </div>
      </>
    );
  };

  return (
    <div>
      {visibleCartPanel && <CartPanel onClose={closeCartPanel}></CartPanel>}
      {/* Desktop view */}
      <div className="mb-5 max-xl:hidden">
        <HeroSection />
        <div className="pt-[2rem] pb-[1rem] self-stretch flex flex-col items-center justify-start">
          <div className="w-[77rem] h-[4rem] flex flex-col items-center justify-center">
            <div className="self-stretch flex-1 flex flex-row items-center justify-center">
              <div className="flex-1 h-[4rem] flex flex-col items-start justify-center gap-[1rem]">
                <div className="self-stretch relative tracking-[0.05em] leading-[120%] font-semibold flex items-center h-[2rem] shrink-0 text-[2rem]">
                  {name}
                </div>
                <RatingStarsBlock />
              </div>
              <HeaderSection />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-center justify-start text-[1.5rem]">
          <div className="w-[77rem] flex flex-row items-center justify-center">
            <div
              ref={parentRef}
              className="flex flex-row items-start justify-center py-[0rem] pr-[0rem] gap-[4rem] flex-grow"
            >
              <DetailsBlock />

              {options?.length === 1 && (
                <CartSectionOneOption option={main_option} />
              )}
              {options?.length > 1 && (
                <CartSectionMoreOptions
                  options={options}
                  selectedOption={selectedOption}
                  handleOptionChange={handleOptionChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="mb-5 xl:hidden">
        <HeroSection />
        <HeaderMobileSection />

        {options?.length === 1 && (
          <CartSectionOneMobileOption option={main_option} />
        )}
        {options?.length > 1 && (
          <CartSectionMoreMobileOptions
            options={options}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
        )}

        <DetailsMobileBlock />
      </div>
    </div>
  );
};

export default ProductDetails;
