import { Link, useLocation } from "react-router-dom";
import '../styles/styles.css';
import axios_api from '../api/axios_api';
import { useEffect, useRef, useState  } from "react";
import RegistrationService from "./RegistrationService";
import product_page_location_icon from '../images/product_page_location_icon.svg';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import marker_icon_png from '../images/marker_icon.png';

const ProductDetails = () => {
  const { state: product } = useLocation();
  const [visibleRegistrationService, setVisibleRegistrationService] = useState(false);
  const { city, county, common_location, options_common_city, img_path, name, description, category, organiser, sections, options, location, map_location } = product;
  var final_img_path = `${process.env.REACT_APP_SERVER_IMAGE_PATH}${img_path}`;

  const main_option = options.length === 1 ? options[0] : null;

  const monthNumberToAbbreviationMap = {
    1: 'ian',
    2: 'feb',
    3: 'mar',
    4: 'apr',
    5: 'mai',
    6: 'iun',
    7: 'iul',
    8: 'aug',
    9: 'sep',
    10: 'oct',
    11: 'nov',
    12: 'dec'
  };

  const handleAddCart = async (event) => {
    //Prevent page reload
    event.preventDefault();

    axios_api.post("/add_to_cart", {
        service_id: product.service_id,
        senior_name: "senior1",
        adult_name: "adult1",
        phone_number: "1234567890",
        companion: "companion1",
        email: "user@user"
    }, {sameSite: 'none', withCredentials: true,
    headers: {
      // 'X-CSRFToken': csrfToken, // Set the CSRF token in the request headers
      'Content-Type': 'application/json'
  }})
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
  };

  const parentRef = useRef(null);
  const cartRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (parentRef.current && cartRef.current) {
        const parentRect = parentRef.current.getBoundingClientRect();
        const cartRect = cartRef.current.getBoundingClientRect();
        
        var pos_cond = parentRect.top <= 0 && parentRect.bottom >= cartRect.height;

        setIsSticky(pos_cond);

        if (pos_cond) {
          cartRef.current.style.position = 'fixed';
          cartRef.current.style.top = '0px';
        } else {
          cartRef.current.style.position = 'relative';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleRegistrationService = () => {
    setVisibleRegistrationService(prevState => !prevState);
  };

  const closeRegistrationService = () => {
    setVisibleRegistrationService(false);
    console.log("Function" + visibleRegistrationService)
  };

  const markerIcon = new L.Icon({
    iconUrl: marker_icon_png,
    iconRetinaUrl: marker_icon_png,
    popupAnchor:  [-0, -0],
    iconSize: [25,25],     
  });

  const MapSection = (e) => {
    const map_e = {
      lat: e.e[0],
      lng: e.e[1]
    };

    return (
      <div className="w-full h-80 border rounded-md">
        <MapContainer
          center={map_e}
          zoom={18}
          style={{ height: "100%" }}
          // onClick={handleMapLocationChange}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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
        {sections.map((section, index) => (
          <div className="flex flex-col items-start justify-start">
            <div className="mb-8 self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0">
              {section.question}
            </div>
            <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf flex items-center w-[43.94rem] shrink-0">
              {section.answer}
            </div>
            {index != sections.length - 1 ? <div className="mb-8"/> : <div/>}
          </div>
        ))}
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
    return`${hours}h ${minutes}min`;
  };

  const ExtractOptionDate = ({ option }) => {
    const dateString = option.date;
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    const dateArray = dateString === "" ? null : [day, month, year, hour, minutes];
    return dateArray;
  };

  const OneOptionBlock = ({ option }) => {
    const dateArray = ExtractOptionDate({ option });

    return (
      <div className="gap-[0.5rem] flex flex-col">
        <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0">
          {name}
        </div>
        {dateArray != null && <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[1rem]">
          <div className="flex flex-row items-start justify-start gap-[0.25rem]">
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Data:  `}</div>
            <div className="self-stretch relative text-[0.88rem] tracking-[0.08em] leading-[120%] font-open-sans flex items-center shrink-0">{dateArray[0]} {monthNumberToAbbreviationMap[dateArray[1]]} {dateArray[2]}</div>
          </div>
          <div className="flex flex-row items-center justify-center gap-[0.25rem]">
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Ora: `}</div>
            <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
              {dateArray[3]}:{dateArray[4]}
            </div>
          </div>
        </div>}
        <div className="text-[1rem] text-text-fields-grey-hf font-medium tracking-[0.05em] leading-[1.5rem]">
          {option.details}
        </div>
        
        <div className="mt-2 mb-2 relative box-border w-full border-t-[1px] border-solid border-text-fields-grey-hf" />

        <div>
          {option.map_location != "" && option.map_location != null && <div className="w-[44.13rem] flex flex-col items-start justify-center gap-[1.5rem]">
            <div className="relative tracking-[0.1em] leading-[120%] font-semibold flex items-center w-[39.5rem] h-[1.5rem] shrink-0">
              LOCAȚIE
            </div>
              <MapSection e={option.map_location} />
            <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[43.94rem] h-[1rem] shrink-0">
              {option.location}
            </div>
          </div>}
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
        <div className = "pl-6 gap-[1rem] flex flex-col">
        {options.map((option, index) => (
          dateArray = ExtractOptionDate({ option }),
          duration = option.duration != "" ? ConvertDurationToHoursAndMinutes({ durationString: option.duration }) : null,
          <div key={index} className="relative flex-1 flex flex-col">
            <div className="relative gap-[8rem] flex flex-row">
              {option.name != "" && <div className="text-[1.2rem] text-text-fields-grey-hf font-medium tracking-[0.05em] leading-[1.5rem]">
                {option.name} {duration && <span className="text-[1rem]">- {duration}</span>} | {option.price === 0 ? <span className="text-blue-500 text-[1rem]">Gratis</span>: <span className="text-[1rem]">{option.price} RON</span>}
              </div>}

              <div className="items-start justify-end gap-[1rem] flex flex-col">
                {dateArray != null && <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[1rem]">
                  <div className="flex flex-row items-start justify-start gap-[0.25rem]">
                    <div className="relative tracking-[0.05em] leading-[1.5rem] text-text-fields-grey-hf font-medium ">{`Data:  `}</div>
                    <div className="self-stretch relative text-[0.88rem] tracking-[0.08em] leading-[120%] font-open-sans font-normal flex items-center shrink-0">{dateArray[0]} {monthNumberToAbbreviationMap[dateArray[1]]} {dateArray[2]}</div>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-[0.25rem]">
                    <div className="relative tracking-[0.05em] leading-[1.5rem] text-text-fields-grey-hf font-medium ">{`Ora: `}</div>
                    <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
                      {dateArray[3]}:{dateArray[4]}
                    </div>
                  </div>
                </div>}
                {option.city != "" && <div className="self-stretch relative tracking-[0.1em] leading-[120%] text-text-fields-grey-hf font-medium  flex items-center shrink-0 text-[1rem]">Oraș: <span className="ml-2 text-[1rem] font-open-sans font-normal">{option.city}, {option.county}</span></div>}
                {option.location != "" && <div className="self-stretch relative tracking-[0.1em] leading-[120%] text-text-fields-grey-hf font-medium  flex items-center shrink-0 text-[1rem]">Locație: <span className="ml-2 text-[1rem] font-open-sans font-normal">{option.location}</span></div>}
              </div>
            </div>
              
              <div className="relative flex mt-5 text-[1rem] text-text-fields-grey-hf font-medium tracking-[0.05em] leading-[1.5rem]">
                {option.details}
              </div>
              
                <div className="mt-5">
                  {!common_location && option.map_location != "" && option.map_location != null && <div className="w-[44.13rem] flex flex-col items-start justify-center gap-[1.5rem]">
                      <MapSection e={option.map_location} />
                  </div>}
                </div>
              {index != options.length - 1 ? <div className="mt-2 mb-2 relative box-border w-full border-t-[1px] border-solid border-text-fields-grey-hf" /> : <div/>}
            </div>
        ))}
        </div>
    </div>
      );
  };

  const CommonLocationBlock = () => {
    console.log(main_option);
    return (
      <div className="mt-[2rem]">
        {common_location && map_location != "" && (main_option === null || (main_option != null && main_option.map_location == "")) && <div className="w-[44.13rem] flex flex-col items-start justify-center gap-[1.5rem]">
          <div className="relative box-border w-full border-t-[1px] border-solid border-text-fields-grey-hf" />
          
          <div className="relative tracking-[0.1em] leading-[120%] font-semibold flex items-center w-[39.5rem] h-[1.5rem] shrink-0">
            LOCAȚIE
          </div>
            <MapSection e={map_location} />
          <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[43.94rem] h-[1rem] shrink-0">
            {location}
          </div>
        </div>}
      </div>
    );
  };

  const DetailsBlock = () => {
    return (
      <div className="mb-5 w-[44.13rem] flex flex-col items-start justify-center">
        <div className="mb-5 w-[44.13rem] flex flex-col items-start justify-center gap-[2rem]">
          <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf flex items-center w-[44rem] shrink-0">
            {description}
          </div>
            
          <ExtraDetailsBlock sections={sections.sections} />
          
          <div className="relative box-border w-full border-t-[1px] border-solid border-text-fields-grey-hf" />
        </div>
        
        {options.length === 1 && <OneOptionBlock option={main_option} />}
        {options.length > 1 && <MoreOptionsBlock options={options} />}
        
        <CommonLocationBlock />
      </div>
    );
  }

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
      <div className="max-lg:hidden self-stretch flex flex-col items-center justify-start">
      <div className="flex flex-col items-center justify-center">
        <div className="self-stretch flex flex-row items-center justify-start gap-[1rem]">
          {/* <img
            className="relative rounded-sm w-[0.83rem] h-[1.63rem]"
            alt=""
            src={final_img_path}
          /> */}
          <div className="flex flex-col items-center justify-center gap-[1.5rem]">
            <img
              className="relative rounded-lg w-[77rem] h-[33rem] object-cover"
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
      <div className="w-[17.5rem] flex flex-col items-end justify-start gap-[1rem] text-[0.88rem] text-text-fields-grey-hf">
        <div className="w-[17.5rem] flex flex-row items-center justify-start gap-[0.63rem]">
          <b className="relative tracking-[0.15em] leading-[120%] uppercase">{`ORGANIZATOR: `}</b>
          <div className="flex-1 relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-dark-navy text-right">
            {organiser}
          </div>
        </div>
        {(main_option != null || options_common_city) &&
        <div className="flex flex-row items-center justify-start gap-[1rem] text-[1rem] text-dark-navy">
          <img
            className="relative w-[1.13rem] h-[1.5rem]"
            alt=""
            src={product_page_location_icon}
          />
          <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
            {city != null && options_common_city ? city : ""}
            {main_option != null ? main_option.city : ""}

            {county != null && county != city && options_common_city ? ", " + county : ""}
            {main_option != null && main_option.city != main_option.county ? ", " + main_option.county : ""}
          </div>
        </div>}
      </div>

    );
  };

  const CartSectionMoreOptions = () => {
  }

  const CartSectionOneOption = ({ option }) => {
    const dateString = option.date;
    const date = new Date(dateString);
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return (
      <div className="flex-1 relative">
      <div ref={cartRef} className={`${isSticky ? 'top-0' : ''}`}>
        <div className="self-stretch flex flex-row items-start justify-start">
            <div className="rounded-lg bg-light-purple w-[24.25rem] flex flex-col items-start justify-between py-[3.5rem] px-[2rem] box-border">
            <div className="self-stretch flex flex-col items-start justify-center gap-[3rem]">
                <div className="w-[20.25rem] flex flex-col items-start justify-start">
                  <div className="mb-5 self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0 text-[1.5rem]">{name}</div>
                  <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[1rem]">
                    <div className="flex flex-row items-start justify-start gap-[0.25rem]">
                      <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Data:  `}</div>
                      <div className="self-stretch relative text-[0.88rem] tracking-[0.08em] leading-[120%] font-open-sans flex items-center shrink-0">{day} {monthNumberToAbbreviationMap[month]} {year}</div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-[0.25rem]">
                      <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Ora: `}</div>
                      <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
                        {hour}:{minutes}
                      </div>
                    </div>
                  </div>
                  {option.location != "" && <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center shrink-0 text-[1rem]">Locație: <span className="ml-2 text-[1rem] font-open-sans font-normal">{option.location}</span></div>}
                </div>
              </div>
              <div className="mt-5 self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                <div className="self-stretch flex flex-row items-center justify-start gap-[1.5rem]">
                  <div className="relative tracking-[0.1em] leading-[120%] font-semibold">{`Preț : `}</div>
                  <div className="flex-1 relative tracking-[0.1em] leading-[120%] font-semibold font-open-sans flex items-center h-[2rem]">
                    {option.price === 0 ? <span className="text-blue-500">Gratis</span>: option.price + " RON"}
                  </div>
                </div>
                <div
                  className="self-stretch flex flex-col items-start justify-start cursor-pointer text-center text-[0.88rem] text-white"
                  onClick={handleAddCart}
                >
                  <div className="self-stretch rounded bg-accent h-[2.25rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border">
                    <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                      ADAUGA IN COS
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

  return (
      <div className="mb-5">
          <HeroSection />
          <div className="pt-[2rem] pb-[01rem] self-stretch flex flex-col items-center justify-start">
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
              <div ref={parentRef} className="flex flex-row items-start justify-center py-[0rem] pr-[0rem] pl-[4.5rem] gap-[4rem] flex-grow">
                <DetailsBlock />
                
                {options.length === 1 && <CartSectionOneOption option={main_option} />}
                {options.length > 1 && <CartSectionMoreOptions />}
              </div>
            </div>
          </div>
        </div>
  );

};

export default ProductDetails;